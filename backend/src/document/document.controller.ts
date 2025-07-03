// src/document/document.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { Prisma } from '../../generated/prisma';

class UploadDto {
  subCategoryId!: string; // champ texte dans le form‑data
}

@Controller('documents')
export class DocumentController {
  constructor(private readonly docs: DocumentService) {}

  /** POST /documents (multipart) */
  @Post()
  @UseInterceptors(FileInterceptor('file')) // hathi mta3 champ fichier = "file"
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDto,
  ) {
    const created = await this.docs.create({
      title: file.originalname,
      filePath: file.path,
      mimeType: file.mimetype,
      subCategory: { connect: { id: dto.subCategoryId } }, // Prisma‑style rel.
    } as unknown as Prisma.DocumentCreateInput);

    return { id: created.id };
  }

  /** GET /documents –tous les documents */
  @Get()
  findAll() {
    return this.docs.findAll();
  }

  /** GET /documents/sub-category/:id – liste par sous‑catégorie */
  @Get('sub-category/:id')
  listBySub(@Param('id') id: string) {
    return this.docs.findBySubCategory(id);
  }

  /** GET /documents/:id – détail */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docs.findOne(id);
  }

  /** PATCH /documents/:id – mise à jour (titre, etc.) */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Prisma.DocumentUpdateInput) {
    return this.docs.update(id, dto);
  }

  /** DELETE /documents/:id – supprime ligne + fichier */
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.docs.remove(id);
  // }
}
