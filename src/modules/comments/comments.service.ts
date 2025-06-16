import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async create(commentData: Partial<Comments>): Promise<Comments> {
    const newComment = this.commentsRepository.create(commentData);
    return this.commentsRepository.save(newComment);
  }

  async findAll(): Promise<Comments[]> {
    return this.commentsRepository.find();
  }

  async findOne(id: number): Promise<Comments> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async update(id: number, commentData: Partial<Comments>): Promise<Comments> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    Object.assign(comment, commentData);
    return this.commentsRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
