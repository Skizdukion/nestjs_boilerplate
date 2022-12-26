import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/roles/roles.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    const countAdmin = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.admin,
        },
      },
    });

    if (countAdmin === 0) {
      await this.repository.save(
        this.repository.create({
          email: 'admin@gmail.com',
          password: 'matkhau123',
          firstName: 'Long',
          lastName: 'Pham',
          role: {
            id: 2,
          },
        }),
      );
    }

    const countUser = await this.repository.count({
      where: {
        role: {
          id: RoleEnum.user,
        },
      },
    });

    if (countUser === 0) {
      await this.repository.save(
        this.repository.create({
          email: 'user@gmail.com',
          password: 'matkhau123',
          firstName: 'GA',
          lastName: 'VCL',
          role: {
            id: 1,
          },
        }),
      );
    }
  }
}
