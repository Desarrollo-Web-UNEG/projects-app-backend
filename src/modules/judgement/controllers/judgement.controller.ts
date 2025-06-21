import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { JudgementService } from '@judgement/services/judgement.service';
import { CreateJudgementDto } from '@judgement/dto/create-judgement.dto';
import { Judgement } from '@judgement/entities/judgement.entity';

@Controller('judgements')
export class JudgementController {
  constructor(private readonly judgementService: JudgementService) {}

  @Post()
  create(@Body() createJudgementDto: CreateJudgementDto): Promise<Judgement> {
    return this.judgementService.create(createJudgementDto);
  }

  @Get()
  findAll(): Promise<Judgement[]> {
    return this.judgementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Judgement> {
    return this.judgementService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateJudgementDto: Partial<CreateJudgementDto>,
  ): Promise<Judgement | null> {
    return this.judgementService.update(+id, updateJudgementDto);
  }

  @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
    return this.judgementService.remove(+id);
  }
} 