import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';

export class CrawlPoolDto {
  @ApiProperty({ example: 'Factory Address' })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Validate(IsExist, ['Factory', 'id'], {
    message: 'factoryNotExists',
  })
  factoryId: number;

  @ApiProperty({ example: '200', default: 200 })
  @Transform(({ value }) => (value ?? 200 < 0 ? 200 : value))
  @IsNotEmpty()
  range: number | null;
}
