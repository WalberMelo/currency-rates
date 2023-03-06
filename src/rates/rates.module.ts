import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatesController } from './controller/rates.controller';
import { RatesService } from './service/Rates.service';
import { Rate } from './service/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rate])],
  controllers: [RatesController],
  providers: [RatesService],
})
export class RatesModule {}
