import {
  Injectable,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserDto | HttpException> {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email, username: createUserDto.username },
      });

      if (existingUser) {
        throw new ConflictException({ message: 'User already exists' });
      }

      if (createUserDto.password !== createUserDto.confirmPassword) {
        throw new HttpException(
          'Password is not matching',
          HttpStatus.CONFLICT,
        );
      }
      const user = this.usersRepository.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        confirmPassword: createUserDto.confirmPassword,
      });

      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      console.error(error.message);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
