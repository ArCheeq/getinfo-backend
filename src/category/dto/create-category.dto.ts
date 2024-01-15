import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateSubcategoryDto } from 'src/subcategory/dto/create-subcategory.dto';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  color: string;
  @ValidateNested({ each: true })
  @Type(() => CreateSubcategoryDto)
  subcategories: CreateSubcategoryDto[];
}
