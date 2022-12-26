import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationOptions } from 'src/utils/types/pagination-options';

export class SearchFactoryQuery extends PaginationOptions {
  @ApiProperty({
    example: '0x79C342FddBBF376cA6B4EFAc7aaA457D6063F8Cb',
    required: false,
  })
  @IsOptional()
  address: string | null;

  @ApiProperty({ example: 'winery', required: false })  
  @IsOptional()
  name: string | null;
}
