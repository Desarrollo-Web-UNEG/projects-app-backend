import { Module } from '@nestjs/common';
import { IaService } from '@IA/services/ia.service';
import { IaController } from '@IA/controllers/ia.controller';

@Module({
  providers: [IaService],
  controllers: [IaController],
  exports: [IaService],
})
export class IaModule {}
