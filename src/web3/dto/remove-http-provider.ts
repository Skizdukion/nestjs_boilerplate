import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { trimStringArray } from 'src/utils/data-transform-pipe/helper';

export class RemoveHttpNetworkProviderDto {
  @ApiProperty({
    example: [
      'https://bsc-dataseed4.ninicoin.io',
      'https://data-seed-prebsc-1-s1.binance.org:8545',
    ],
  })
  @IsNotEmpty()
  @Transform(trimStringArray)
  rpcUrl: string[];
}
