import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(data: CreateUserDto) {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user).catch(() => {
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'E-mail already registered',
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ 
      select: ['id', 'name', 'email']
    });
  }

  async findOneOrFail(options: FindOneOptions<User>): Promise<User> {
    let user = await this.userRepository.findOneOrFail(options).catch(() => {throw new NotFoundException("Entity not found")});
    user.events = user.events.sort((a, b) => (a.start < b.finish) ? -1 : 1);
    return user;
  }

  async remove(id: number) {
    await this.userRepository.findOneOrFail({where: {id: id}}).catch(() => {throw new NotFoundException("Entity not found")});
    this.userRepository.delete(id);
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail({where: {id: id}}).catch(() => {throw new NotFoundException("Entity not found")});
    this.userRepository.merge(user, data)
    return this.userRepository.save(user);
  }
}