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
  Unique,
  AfterLoad,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Network } from '../../web3/entities/network.entity';
import { UniswapProtocolFactory } from 'src/abi/UniswapProtocolFactory';
import FactoryAbi from 'src/abi/UniswapFactoryAbi.json';
import { ethers } from 'ethers';
import { ContractEntity } from 'src/web3/entities/contract.entity';

@Entity()
@Unique('UQ_ADDRESS_F', ['address', 'network'])
export class Factory extends ContractEntity<UniswapProtocolFactory> {
  abi: ethers.ContractInterface = FactoryAbi;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 0 })
  defaultSwapFee: number;

  @Column({ default: false })
  isPoolHaveCustomSwapFee: boolean;

  @Column({ default: 0 })
  @Column({ type: 'bigint' })
  totalPoolCounts: string;

  @BeforeInsert()
  @BeforeUpdate()
  async lowercaseAddress() {
    this.address = this.address.toLowerCase();
  }
}
