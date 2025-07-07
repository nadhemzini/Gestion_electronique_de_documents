import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { Prisma } from '../../generated/prisma';
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  create(@Body() createSubCategoryDto: Prisma.SubCategoryCreateInput) {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @Get()
  findAll() {
    return this.subCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: Prisma.SubCategoryUpdateInput,
  ) {
    return this.subCategoryService.update(id, updateSubCategoryDto);
  }
  @Get(':id/document-count')
  countDocs(@Param('id') id: string) {
    return this.subCategoryService.countDocuments(id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subCategoryService.remove(id);
  }
}
