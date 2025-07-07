import { Prisma } from '../../generated/prisma';
import * as path from 'node:path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { unlink } from 'node:fs/promises';
import { DatabaseService } from '../database/database.service';

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
  async remove(id: string) {
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
}
