import { Module } from '@nestjs/common';
import { DexController } from './dex.controller';
import { DexService } from './dex.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Network } from '../web3/entities/network.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Factory } from './entities/factory.entity';
import { Web3Service } from 'src/web3/web3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Network, Factory])],
  controllers: [DexController],
  providers: [IsExist, IsNotExist, DexService, Web3Service],
  exports: [DexService],
})
export class DexModule {}
