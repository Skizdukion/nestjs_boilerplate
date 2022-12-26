import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  Index,
  Unique,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Factory } from './factory.entity';
import { Token } from './token.entity';
import { UniswapProtocolPair } from 'src/abi/UniswapProtocolPair';
import { ethers } from 'ethers';
import { Network } from 'src/web3/entities/network.entity';
import PairAbi from 'src/abi/UniswapProtocolPair.json';
import { ContractEntity } from 'src/web3/entities/contract.entity';

@Entity()
@Unique('UQ_ADDRESS_P', ['address', 'factory'])
export class Pool extends ContractEntity<UniswapProtocolPair> {
  abi: ethers.ContractInterface = PairAbi;

  @Index()
  @ManyToOne(() => Token, {
    eager: true,
  })
  token1: Token;

  @Index()
  @ManyToOne(() => Token, {
    eager: true,
  })
  token2: Token;

  @Column({ type: 'bigint' })
  reserve1: string;

  @Column({ type: 'bigint' })
  reserve2: string;

  @Column({ type: 'bigint' })
  swapFee: string;

  @ManyToOne(() => Factory, {
    eager: true,
  })
  factory: Factory;

  @Column({ default: 0 })
  indexCount: number;
}
