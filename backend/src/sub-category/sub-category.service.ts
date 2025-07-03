import { Injectable } from '@nestjs/common';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '../../generated/prisma';
@Injectable()
export class SubCategoryService {
  // don't forget to import the CONSTRUCTORRRRRRRRRR
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSubCategoryDto: Prisma.SubCategoryCreateInput) {
    return this.databaseService.subCategory.create({
      data: createSubCategoryDto,
    });
  }

  async findAll() {
    return this.databaseService.subCategory.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.subCategory.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.databaseService.subCategory.update({
      where: { id },
      data: updateSubCategoryDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.subCategory.delete({
      where: { id },
    });
  }
}
