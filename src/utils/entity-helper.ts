import { instanceToPlain } from 'class-transformer';
import {
  AfterLoad,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class EntityHelper extends BaseEntity {
  __entity?: string;

  @PrimaryGeneratedColumn()
  id: number;

  constructor() {
    super();
  }

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }

  stripResponseData() {
    delete this.createdAt;
    delete this.updatedAt;
    delete this.deletedAt;
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
