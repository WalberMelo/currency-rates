import { Controller, Get, Param, Query } from '@nestjs/common';
import { RatesService } from '../service/Rates.service';

@Controller('rates')
export class RatesController {
  constructor(private ratesService: RatesService) {}

  @Get('/create')
  CreateRates() {
    this.ratesService.create();
  }

  @Get('/all')
  find() {
    return this.ratesService.findAll();
  }

  @Get('/:id')
  findRate(@Param('id') id: string) {
    return this.ratesService.findOne(parseInt(id));
  }

  @Get()
  findAllRates(@Query('currency') currency: string) {
    return this.ratesService.find(currency.toLocaleUpperCase());
  }
}
