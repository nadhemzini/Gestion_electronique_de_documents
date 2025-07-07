import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { Prisma } from '../../generated/prisma';

class UploadDto {
  subCategoryId!: string; // Champ texte dans le form‑data
}

@Controller('documents')
export class DocumentController {
  constructor(private readonly docs: DocumentService) {}

  /** POST /documents (multipart) */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDto,
  ) {
    return this.docs.create({
      title: file.originalname,
      filePath: file.path,
      mimeType: file.mimetype,
      subCategoryId: dto.subCategoryId,
    });
  }

  /** GET /documents */
  @Get()
  findAll() {
    return this.docs.findAll();
  }

  /** GET /documents/sub-category/:id */
  @Get('sub-category/:id')
  listBySub(@Param('id') id: string) {
    return this.docs.findBySubCategory(id);
  }

  /** GET /documents/:id */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docs.findOne(id);
  }

  /** PATCH /documents/:id */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Prisma.DocumentUpdateInput) {
    return this.docs.update(id, dto);
  }
  /** DELETE /documents/:id */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.docs.remove(id);
  }
}
