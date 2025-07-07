import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { DocumentModule } from './document/document.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    SubCategoryModule,
    DocumentModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'), // dossier sur le disque
      serveRoot: '/uploads', // <-- URL publique
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
