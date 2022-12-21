import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Network } from '../web3/entities/network.entity';
import { Repository } from 'typeorm';
import { AddHttpNetworkProviderDto } from '../web3/dto/add-http-provider';
import { CreateFactoryDto } from './dto/create-factory';
import { Factory } from './entities/factory.entity';
import { retry } from 'rxjs';

@Injectable()
export class DexService {
  constructor(
    @InjectRepository(Factory) private factoryRepo: Repository<Factory>,
  ) {}

  async createNewFactory(factory: CreateFactoryDto) {
    return await this.factoryRepo
      .save(this.factoryRepo.create(factory))
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
