import { Module } from '@nestjs/common';
import { AiController } from '@IA/controllers/ai.controller';
import { AiService } from '@IA/services/ai.service';

@Module({
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
