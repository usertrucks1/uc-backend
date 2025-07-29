import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserFactory {
  createUser(dto: CreateUserDto): User {
    const user = new User();
    Object.assign(user, dto);
    user.is_active = true;
    return user;
  }

  updateUser(user: User, dto: UpdateUserDto): User {
    Object.assign(user, dto);
    return user;
  }
}
