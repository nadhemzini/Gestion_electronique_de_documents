import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.databaseService.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.databaseService.category.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        subCategories: {
          include: {
            _count: {
              select: { documents: true }, // <- documents appartient à SubCategory
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.databaseService.category.findUnique({
      where: { id },
      include: {
        subCategories: true, // Include related products if needed
      },
    });
  }

  async update(id: string, updateCategoryDto: Prisma.CategoryUpdateInput) {
    return this.databaseService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.category.delete({
      where: { id },
    });
  }
}
