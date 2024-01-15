import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsInt()
  @IsOptional()
  fileId?: number;
  @IsString()
  @IsOptional()
  additionalInfo?: string;
  @IsBoolean()
  @IsNotEmpty()
  downloadFile: boolean;
  @IsBoolean()
  @IsNotEmpty()
  textField: boolean;
}
