import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Web3Service } from '../web3.service';
import e from 'express';

@Injectable()
export class AddressToEntity implements PipeTransform {
  constructor(private readonly web3Service: Web3Service) {}

  transform(body: any, metadata: ArgumentMetadata) {
    
  }
}
