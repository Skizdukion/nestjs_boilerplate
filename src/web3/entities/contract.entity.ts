import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  ManyToOne,
} from 'typeorm';
import { Network } from './network.entity';
import { ethers } from 'ethers';
import { EntityHelper } from 'src/utils/entity-helper';

export class ContractEntity<T extends ethers.Contract> extends EntityHelper {
  @ManyToOne(() => Network, {
    eager: true,
  })
  network: Network;

  protected contract: T;

  protected abi: ethers.ContractInterface;

  @Column({ nullable: false })
  address: string;

  async getContract(): Promise<T> {
    const _currentContractNetworkUrl = (
      this.contract?.provider as ethers.providers.JsonRpcProvider
    )?.connection.url;
    const _currentNetworkUrl = this.network.getCurrentRpc().connection.url;
    if (_currentContractNetworkUrl != _currentNetworkUrl) {
      this.contract = new ethers.Contract(
        this.address,
        this.abi,
        this.network.getCurrentRpc(),
      ) as T;
    }
    return this.contract;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async lowercaseAddress() {
    this.address = this.address.toLowerCase();
  }

  stripResponseData() {
    super.stripResponseData();
    delete this.contract;
    delete this.abi;
  }
}
