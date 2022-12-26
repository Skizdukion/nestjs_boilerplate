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
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DexService } from './dex.service';
import { AddHttpNetworkProviderDto } from '../web3/dto/add-http-provider';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateFactoryDto } from './dto/create-factory';
import { NetworkChainId } from 'src/web3/custom-pipe/network-by-chain-id.pipe';
import { Web3Service } from 'src/web3/web3.service';
import { CrawlPoolDto } from './dto/crawl-factory-pool';
import { SearchFactoryQuery } from './query/search-factory';

@ApiBearerAuth()
@ApiTags('Dex')
@Controller({
  path: 'dex',
  version: '1',
})
@Controller('dex')
export class DexController {
  constructor(private readonly dexService: DexService) {}

  @Post('/factory')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  async createNewFactory(@Body(NetworkChainId) factory: CreateFactoryDto) {
    return this.dexService.createNewFactory(factory);
  }

  @Post('/factory/crawl')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async crawlFactory(@Body() crawPoolDto: CrawlPoolDto) {
    return this.dexService.crawFactoryPool(crawPoolDto);
  }

  @Get('/factory/search')
  @HttpCode(HttpStatus.OK)
  async searchFactory(@Query() searchFactoryQuery: SearchFactoryQuery) {
    return this.dexService.searchFactory(searchFactoryQuery);
  }
}
