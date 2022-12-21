import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsNotEmpty,
  Validate,
} from 'class-validator';
import { IsValidAddress } from 'src/utils/validators/is-address.validator';

export class CreateFactoryDto {
  @ApiProperty({ example: 'Winery Dex' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  name: string | null;

  @ApiProperty({ example: 97 })
  @IsNotEmpty()
  chainId: number;

  @ApiProperty({
    example: '0x79C342FddBBF376cA6B4EFAc7aaA457D6063F8Cb',
  })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  @Validate(IsValidAddress, [], {
    message: 'addressNotValid',
  })
  address: string;
}
