import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { trimStringArray } from 'src/utils/data-transform-pipe/helper';

export class AddHttpNetworkProviderDto {
  @ApiProperty({
    example: [
      'https://bsc-dataseed4.ninicoin.io',
      'https://bsc-dataseed3.defibit.io',
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://rpc.ankr.com/eth',
      'https://goerli.optimism.io',
    ],
  })
  @IsNotEmpty()
  @Transform(trimStringArray)
  rpcUrl: string[];
}
