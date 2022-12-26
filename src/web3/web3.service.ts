import { Injectable } from '@nestjs/common';
import { Network } from './entities/network.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddHttpNetworkProviderDto } from './dto/add-http-provider';
import { ethers } from 'ethers';
import { BatchPromise } from 'src/utils/helpers/batch_promise';
import { RemoveHttpNetworkProviderDto } from './dto/remove-http-provider';
import { OnModuleInit } from '@nestjs/common/interfaces';

@Injectable()
export class Web3Service implements OnModuleInit {
  private networkCache: Map<number, Network> = new Map();
  private contractCache: Map<string, ethers.Contract> = new Map();
  private networkContractMapping: Map<number, ethers.Contract[]> = new Map();

  constructor(
    @InjectRepository(Network) private networkRepo: Repository<Network>,
  ) {}

  async onModuleInit() {
    await this.reloadAllNetwork();
  }

  async reloadNetwork(chainId: number) {
    const _network: Network = await this.networkRepo.findOne({
      where: {
        chainId: chainId,
      },
    });

    this.networkCache.set(chainId, _network);
  }

  async reloadRpc(chainId: number) {
    const _network = this.networkCache.get(chainId);
    if (_network) {
      _network.reloadRpc();
    }

    const _relatedContracts = this.networkContractMapping.get(chainId);

    for (let index = 0; index < _relatedContracts.length; index++) {
      let element = _relatedContracts[index];
      element = new ethers.Contract(
        element.address,
        element.interface,
        _network.getCurrentRpc(),
      );
    }
  }

  public getNetworkFromChainId(chainId: number) {
    return this.networkCache.get(chainId);
  }

  async reloadAllNetwork() {
    this.networkCache.clear();

    const _networks: Network[] = await this.networkRepo.find({});

    for (let index = 0; index < _networks.length; index++) {
      const element = _networks[index];
      this.networkCache.set(element.chainId, element);
    }
  }

  async addHttpProvider(createNetworkDto: AddHttpNetworkProviderDto) {
    const addProviderBathPromise = new BatchPromise(
      createNetworkDto.rpcUrl.length,
      async (index) => {
        const element = createNetworkDto.rpcUrl[index];
        const _provider = new ethers.providers.JsonRpcProvider(element);
        const _network = await _provider.getNetwork();

        const _data = await this.networkRepo.findOne({
          where: {
            chainId: _network.chainId,
          },
        });

        if (!_data) {
          const _newNetWork = new Network();
          _newNetWork.name = _network.name;
          _newNetWork.chainId = _network.chainId;
          _newNetWork.rpcUrl = [element];
          await this.networkRepo.save(_newNetWork);
        } else {
          if (!_data.rpcUrl.includes(element)) {
            _data.rpcUrl.push(element);
          }

          await this.networkRepo.save(_data);
        }
      },
    );

    await addProviderBathPromise.execute();

    await this.reloadAllNetwork();
  }

  async removeHttpProvider(removeNetworkDto: RemoveHttpNetworkProviderDto) {
    const removeProviderBathPromise = new BatchPromise(
      removeNetworkDto.rpcUrl.length,
      async (index) => {
        const element = removeNetworkDto.rpcUrl[index];
        const _provider = new ethers.providers.JsonRpcProvider(element);
        const _network = await _provider.getNetwork();

        const _data = await this.networkRepo.findOne({
          where: {
            chainId: _network.chainId,
          },
        });

        if (_data && _data.rpcUrl.includes(element)) {
          _data.rpcUrl = _data.rpcUrl.filter((item) => item != element);
          await this.networkRepo.save(_data);
        }
      },
    );

    await removeProviderBathPromise.execute();

    await this.reloadAllNetwork();
  }
}
