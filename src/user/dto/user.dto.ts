import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class StudentInfoDto {
  @IsString()
  @IsNotEmpty()
  group: string;
}

export class TeacherInfoDto {
  @IsString()
  @IsNotEmpty()
  academicStatus: string;
}

export class CreateTeacherDto extends CreateUserDto {
  @ValidateNested()
  @Type(() => TeacherInfoDto)
  @IsOptional()
  teacherInfo?: TeacherInfoDto;
}

export class CreateStudentDto extends CreateUserDto {
  @ValidateNested()
  @Type(() => StudentInfoDto)
  @IsOptional()
  studentInfo?: StudentInfoDto;
}
