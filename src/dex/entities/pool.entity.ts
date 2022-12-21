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

@Entity()
@Unique('UQ_ADDRESS_P', ['address', 'factory'])
export class Pool extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  address: string;

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
