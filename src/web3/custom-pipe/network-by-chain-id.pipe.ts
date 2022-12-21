import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Web3Service } from '../web3.service';
import e from 'express';

@Injectable()
export class NetworkChainId implements PipeTransform {
  constructor(private readonly web3Service: Web3Service) {}

  transform(body: any, metadata: ArgumentMetadata) {
    const _network = this.web3Service.getNetworkFromChainId(+body.chainId);
    if (!_network) {
      throw new BadRequestException('Network not found');
    } else {
      body.network = _network;
    }
    delete body.chainId;
    return body;
  }
}
