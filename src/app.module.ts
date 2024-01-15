import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RequestModule, CategoryModule, UserModule, AuthModule],
  controllers: [],
})
export class AppModule {}
