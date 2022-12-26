import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  async run() {
    const countUser = await this.repository.count({
      where: {
        id: RoleEnum.user,
      },
    });

    if (countUser === 0) {
      console.log('CREATE USER ROLE');
      await this.repository.save(
        this.repository.create({
          id: RoleEnum.user,
          name: 'User',
        }),
      );
    }

    const countAdmin = await this.repository.count({
      where: {
        id: RoleEnum.admin,
      },
    });

    const admin = await this.repository.find({
      where: {
        id: RoleEnum.admin,
      },
    });

    console.log(RoleEnum.admin);

    console.log(admin);

    if (countAdmin === 0) {
      console.log('CREATE ADMIN ROLE');

      await this.repository.save(
        this.repository.create({
          id: RoleEnum.admin,
          name: 'Admin',
        }),
      );
    }
  }
}
