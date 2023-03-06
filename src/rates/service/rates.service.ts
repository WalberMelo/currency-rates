import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './rate.entity';

@Injectable()
export class RatesService {
  constructor(@InjectRepository(Rate) private repo: Repository<Rate>) {}

  async create() {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest');
      if (!response.ok) throw new Error('Problem getting price rates data');
      const data = await response.json();

      const ratesData = data.rates;
      const lastUpdate = data.time_last_update_utc;

      const exchangeRates = Object.entries(ratesData).map(([currency, rate]) =>
        this.repo.create({
          lastUpdate,
          currency: currency,
          rate: Number(rate),
        }),
      );
      return this.repo.save(exchangeRates);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  async findAll(): Promise<Rate[]> {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async find(currency: string) {
    const rate = await this.repo.findOne({ where: { currency } });
    if (!rate) {
      throw new NotFoundException(`No rate found for currency ${currency}`);
    }
    return rate;
  }
}
