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
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Factory } from './factory.entity';
import { Network } from '../../web3/entities/network.entity';

@Entity()
@Unique('UQ_ADDRESS_T', ['address', 'network'])
export class Token extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 0 })
  countExists: number;

  @ManyToOne(() => Network, {
    eager: true,
  })
  network: Network;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async lowercaseAddress() {
    this.address = this.address.toLowerCase();
  }
}
