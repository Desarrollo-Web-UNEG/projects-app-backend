import { Module } from '@nestjs/common';
import { CategoryController } from '@category/controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '@category/services/category.service';
import { Category } from '@category/entities/category.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
