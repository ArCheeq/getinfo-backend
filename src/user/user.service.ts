import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateStudentDto,
  CreateTeacherDto,
  CreateUserDto,
} from './dto/user.dto';
import { hash } from 'bcrypt';
import { prismaExclude } from 'src/utils/exclude';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    dto: CreateUserDto,
    userType: 'admin' | 'teacher' | 'student',
  ) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user)
      throw new ConflictException(
        'Користувач із цією електронною поштою вже зареєстрований',
      );

    dto.password = await hash(dto.password, 10);

    switch (userType) {
      case 'admin':
        return await this.createAdmin(dto);
      case 'teacher':
        return await this.createTeacher(dto);
      case 'student':
        return await this.createStudent(dto);
    }
  }

  async createAdmin(dto: CreateUserDto) {
    const { password, ...rest } = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstname: dto.firstname,
        lastname: dto.lastname,
        password: dto.password,
        roleId: 1,
      },
    });
    return rest;
  }

  async createTeacher(dto: CreateTeacherDto) {
    const { password, ...rest } = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstname: dto.firstname,
        lastname: dto.lastname,
        password: dto.password,
        roleId: 2,
        teacherInfo: {
          create: dto.teacherInfo,
        },
      },
      include: { teacherInfo: true },
    });
    return rest;
  }

  async createStudent(dto: CreateStudentDto) {
    const { password, ...rest } = await this.prisma.user.create({
      data: {
        email: dto.email,
        firstname: dto.firstname,
        lastname: dto.lastname,
        password: dto.password,
        roleId: 3,
        studentInfo: {
          create: dto.studentInfo,
        },
      },
      include: { studentInfo: true },
    });
    return rest;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        password: false,
        firstname: true,
        lastname: true,
        role: true,
        studentInfo: true,
        teacherInfo: true,
      },
    });
    return users;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: { studentInfo: true, teacherInfo: true, role: true },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { studentInfo: true, teacherInfo: true, role: true },
    });

    console.log('ID: ', id);
    console.log('USER: ', user);
    return user;
  }
}
