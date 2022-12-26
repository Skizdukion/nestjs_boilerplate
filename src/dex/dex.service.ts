import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFactoryDto } from './dto/create-factory';
import { Factory } from './entities/factory.entity';
import { PaginationOptions } from 'src/utils/types/pagination-options';
import { SearchFactoryQuery } from './query/search-factory';
import { infinityPagination } from 'src/utils/infinity-pagination';
import console from 'console';
import { CrawlPoolDto } from './dto/crawl-factory-pool';
import { Pool } from './entities/pool.entity';

@Injectable()
export class DexService {
  constructor(
    @InjectRepository(Factory) private factoryRepo: Repository<Factory>,
    @InjectRepository(Factory) private poolRepo: Repository<Pool>,
  ) {}

  async createNewFactory(factory: CreateFactoryDto) {
    const data = this.factoryRepo.create(factory);

    try {
      const contract = await data.getContract();
      data.totalPoolCounts = (await contract.allPairsLength()).toString();
      console.log(data.totalPoolCounts);
    } catch (e) {
      throw new HttpException(
        {
          message: `Cant not fetch factory total pairs length, ${e.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    this.factoryRepo.save(data);
  }

  async crawFactoryPool(crawPoolDto: CrawlPoolDto) {
    const highestIndexPool = await this.poolRepo
      .createQueryBuilder('pool')
      .select('MAX(value)', 'highest_value')
      .getRawOne();

    const highestIndex = highestIndexPool.indexCount ?? 0;
  }

  async searchFactory(query: SearchFactoryQuery) {
    const offset = (query.page - 1) * query.limit;
    const qBuilder = this.factoryRepo.createQueryBuilder('factory');

    if ((query.address ?? '').length > 0) {
      qBuilder.where('factory.address ILIKE :addressTerm', {
        addressTerm: `%${query.address}%`,
      });
    }

    if ((query.name ?? '').length > 0) {
      qBuilder.where('factory.name ILIKE :nameTerm', {
        nameTerm: `%${query.name}%`,
      });
    }

    qBuilder.skip(offset).take(query.limit);

    const data = await qBuilder.getMany();
    data.map((item) => item.stripResponseData());

    return infinityPagination(data, query);
  }
}
