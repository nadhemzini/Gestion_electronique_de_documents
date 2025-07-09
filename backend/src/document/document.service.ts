import { Prisma } from '../../generated/prisma';
import * as path from 'node:path';
import {
  // BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { unlink } from 'node:fs/promises';
import { DatabaseService } from '../database/database.service';
import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';
// Omit => le controller n’a pas besoin de fournir fileKey
type CreateDocWithoutFileKey = Omit<
  Prisma.DocumentUncheckedCreateInput,
  'fileKey'
>;

@Injectable()
export class DocumentService {
  constructor(private readonly db: DatabaseService) {}

  /** Crée un document et génère fileKey automatiquement */
  async create(dto: CreateDocWithoutFileKey) {
    const fileKey = path.basename(dto.filePath);
    return this.db.document.create({
      data: { ...dto, fileKey },
    });
  }

  findAll() {
    return this.db.document.findMany({
      orderBy: { createdAt: 'desc' },
      include: { subCategory: true },
    });
  }

  findBySubCategory(subCategoryId: string) {
    return this.db.document.findMany({
      where: { subCategoryId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.db.document.findUnique({
      where: { id },
      include: { subCategory: true },
    });
  }

  update(id: string, dto: Prisma.DocumentUpdateInput) {
    return this.db.document.update({ where: { id }, data: dto });
  }

  /** Supprime la ligne Document + le fichier physique */
  async removeOne(id: string) {
    // 1. supprime en DB et récupère le filePath
    const doc = await this.db.document
      .delete({
        where: { id },
        select: { filePath: true },
      })
      .catch(() => {
        throw new NotFoundException('Document introuvable');
      });

    // 2. supprime le fichier (ignore si déjà effacé)
    await unlink(doc.filePath).catch(() => null);

    return { deleted: true };
  }
  /** Supprime plusieurs documents + fichiers (transaction) */
  async removeMany(ids: string[]) {
    if (!ids.length) return { deleted: 0 };

    // 1. récupère les chemins avant delete
    const docs = await this.db.document.findMany({
      where: { id: { in: ids } },
      select: { id: true, filePath: true },
    });

    // 2. supprime en DB dans une transaction
    await this.db.$transaction([
      this.db.document.deleteMany({ where: { id: { in: ids } } }),
    ]);

    // 3. supprime physiquement (best‑effort)
    await Promise.all(docs.map((d) => unlink(d.filePath).catch(() => null)));

    return { deleted: docs.length };
  }

  async mergeMany(ids: string[]) {
    console.log('Merging documents:', ids);
    // if (ids.length < 2)
    //   throw new BadRequestException(
    //     'Il faut au moins deux documents à fusionner',
    //   );

    // 1. charge les PDFs (chemins)
    const docs = await this.db.document.findMany({
      where: { id: { in: ids } },
      select: { id: true, title: true, filePath: true, subCategoryId: true },
    });
    // if (docs.length !== ids.length)
    //   throw new NotFoundException('Un ou plusieurs documents manquants');

    // 2. crée un PDF vierge
    const merged = await PDFDocument.create();

    // 3. ajoute chaque page
    for (const d of docs) {
      const bytes = await readFile(d.filePath);
      const src = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(src, src.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
    }

    const mergedBytes = await merged.save();

    // 4. enregistre le fichier
    const fileKey = `${randomUUID()}.pdf`;
    const filePath = join(process.cwd(), 'uploads', fileKey);
    await writeFile(filePath, mergedBytes);

    // 5. crée une ligne Document
    const title = `Fusion (${docs.map((d) => d.title).join(' + ')})`;
    const newDoc = await this.db.document.create({
      data: {
        title,
        filePath,
        fileKey,
        mimeType: 'application/pdf',
        // rattache à la 1ʳᵉ sous‑catégorie ou une par défaut
        subCategoryId: docs[0].subCategoryId,
      },
    });

    return { id: newDoc.id, fileKey };
  }
}
