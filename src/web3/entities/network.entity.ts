import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { ethers } from 'ethers';

@Entity()
export class Network extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 56 })
  @Column({ nullable: false, unique: true })
  chainId: number;

  @ApiProperty({ example: 'BSC' })
  @Column({ nullable: false })
  name: string;

  @Column('text', { array: true, default: [], nullable: false })
  rpcUrl: string[];

  currentRpc: ethers.providers.JsonRpcProvider | null;

  @AfterLoad()
  public loadHttpRpc(): void {
    if (this.rpcUrl.length > 0) {
      this.currentRpc = new ethers.providers.JsonRpcProvider(this.rpcUrl[0]);
    }
  }

  public reloadRpc() {
    if (this.rpcUrl.length > 0) {
      const _oldRpcUrlIndex = this.rpcUrl.indexOf(
        this.currentRpc.connection?.url ?? '',
      );

      const _newIndex =
        _oldRpcUrlIndex == -1 && _oldRpcUrlIndex == this.rpcUrl.length
          ? 0
          : _oldRpcUrlIndex + 1;

      this.currentRpc = new ethers.providers.JsonRpcProvider(
        this.rpcUrl[_newIndex],
      );
    }
  }
}
