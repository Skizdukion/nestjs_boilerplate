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
import { Network } from '../../web3/entities/network.entity';

@Entity()
@Unique('UQ_ADDRESS_F', ['address', 'network'])
export class Factory extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ default: 0 })
  totalPoolCounts: number;

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
