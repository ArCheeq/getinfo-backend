import { OmitType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateSubcategoryDto } from 'src/subcategory/dto/update-subcategory.dto';

export class UpdateCategoryDto extends OmitType(CreateCategoryDto, [
  'subcategories',
] as const) {
  subcategories?: UpdateSubcategoryDto[];
}
