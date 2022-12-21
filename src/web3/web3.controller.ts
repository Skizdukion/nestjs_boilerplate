import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { AddHttpNetworkProviderDto } from './dto/add-http-provider';
import { Web3Service } from './web3.service';
import { RemoveHttpNetworkProviderDto } from './dto/remove-http-provider';
import { BadRequestException } from '@nestjs/common/exceptions';

@ApiBearerAuth()
@ApiTags('Web3')
@Controller({
  path: 'web3',
  version: '1',
})
@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}

  @Post('/network/add')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async addHttpProvider(@Body() networkDto: AddHttpNetworkProviderDto) {
    try {
      await this.web3Service.addHttpProvider(networkDto);
    } catch (err) {
      throw new BadRequestException(err.message, {
        cause: err,
        description: 'Cant add http rpc url',
      });
    }
  }

  @Post('/network/remove')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async removeHttpProvider(@Body() networkDto: RemoveHttpNetworkProviderDto) {
    try {
      await this.web3Service.removeHttpProvider(networkDto);
    } catch (err) {
      throw new BadRequestException(err.message, {
        cause: err,
        description: 'Cant remove http rpc url',
      });
    }
  }
}
