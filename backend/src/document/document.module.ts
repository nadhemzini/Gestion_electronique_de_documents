// src/document/document.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname } from 'path';

import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DatabaseModule } from '../database/database.module'; // ← ICI

@Module({
  imports: [
    DatabaseModule, // ← indispensable
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) =>
          cb(null, `${randomUUID()}${extname(file.originalname)}`),
      }),
    }),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
