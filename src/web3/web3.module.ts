import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { Web3Controller } from './web3.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Network } from './entities/network.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Network])],
  providers: [Web3Service],
  controllers: [Web3Controller],
})
export class Web3Module {}
