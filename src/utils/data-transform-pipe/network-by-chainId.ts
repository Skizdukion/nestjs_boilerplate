import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class NetworkChainId implements PipeTransform {
  constructor(private readonly web3Service: Web3Service) {}

  transform(body: any, metadata: ArgumentMetadata) {
    const network = this.web3Service.getNetworkFromChainId(+body.chainId);
    if (!network) {
      throw new BadRequestException('Network not found');
    }
    delete body.chainId;
    return body;
  }
}
