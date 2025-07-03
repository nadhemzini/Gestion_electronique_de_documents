import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [DatabaseModule, CategoryModule, SubCategoryModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
