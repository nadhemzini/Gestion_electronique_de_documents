// src/document/document.service.ts
import { Injectable } from '@nestjs/common';
// import { unlink } from 'node:fs/promises';
import { Prisma } from '../../generated/prisma'; // alias selon ton path
import { DatabaseService } from 'src/database/database.service';
import * as path from 'node:path';

@Injectable()
export class DocumentService {
  constructor(private readonly db: DatabaseService) {}

  /** Crée un document lié à une sous‑catégorie */

  async create(createDto: Prisma.DocumentCreateInput) {
    // dérive fileKey depuis filePath ou génère un UUID
    const fileKey = path.basename(createDto.filePath); // «1492bfdf-da42-4984-9a84-22e9801b8d85.pdf»

    return this.db.document.create({
      data: {
        ...createDto,
        fileKey,
        subCategory: {
          connect: {
            id:
              typeof createDto.subCategory === 'object' &&
              createDto.subCategory !== null &&
              'id' in createDto.subCategory
                ? String((createDto.subCategory as { id: unknown }).id)
                : undefined,
          },
        },
      },
    });
  }

  /** Tous les documents (tridesc sur la date) */
  async findAll() {
    return this.db.document.findMany({
      orderBy: { createdAt: 'desc' },
      include: { subCategory: true },
    });
  }

  /** Tous les documents d’une sous‑catégorie */
  async findBySubCategory(subCategoryId: string) {
    return this.db.document.findMany({
      where: { subCategoryId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Détail d’un document */
  async findOne(id: string) {
    return this.db.document.findUnique({
      where: { id },
      include: { subCategory: true },
    });
  }

  /** Mise à jour (ex: titre) */
  async update(id: string, updateDto: Prisma.DocumentUpdateInput) {
    return this.db.document.update({
      where: { id },
      data: updateDto,
    });
  }

  /** Delete + suppression du fichier disque */
  // async remove(id: string) {
  //   const doc = await this.db.document.delete({ where: { id } });
  //   await unlink(doc.filePath).catch(() => null); // ignore si déjà supprimé
  //   return doc;
  // }
}
