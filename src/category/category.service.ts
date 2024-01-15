import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        userId: createCategoryDto.userId,
        color: createCategoryDto.color,
        subcategories: {
          createMany: {
            data: createCategoryDto.subcategories,
          },
        },
      },
    });
    return category;
  }

  findAll() {
    return this.prisma.category.findMany({
      include: {
        subcategories: {
          include: { example: true },
        },
      },
    });
  }

  findOne(id: number) {
    if (Number.isNaN(id)) {
      throw new BadRequestException({
        statusCode: 400,
        error: 'Invalid ID',
        message: 'Invalid unique identifier value',
      });
    }

    const category = this.prisma.category
      .findFirstOrThrow({
        where: { id },
        include: { subcategories: true },
      })
      .catch(() => {
        throw new NotFoundException(`Category with ID ${id} not found`);
      });

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.prisma.category.update({
      where: { id },
      data: {
        name: updateCategoryDto.name,
        description: updateCategoryDto.description,
        userId: updateCategoryDto.userId,
        color: updateCategoryDto.color,
        subcategories: {
          createMany: {
            data: updateCategoryDto.subcategories.filter(
              (subcategory) => !subcategory.id,
            ),
          },
          updateMany: updateCategoryDto.subcategories
            .filter((subcategory) => !subcategory.id)
            .map((subcategory) => {
              const { id, ...rest } = subcategory;
              return {
                where: { id },
                data: {
                  ...rest,
                  updatedAt: new Date().toISOString(),
                },
              };
            }),
        },
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  remove(id: number) {
    this.prisma.category.update({
      where: { id },
      data: {
        subcategories: {
          deleteMany: {},
        },
      },
      include: { subcategories: true },
    });

    const category = this.prisma.category.delete({
      where: { id },
    });

    return category;
  }
}
