import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, UpdateResult } from 'typeorm';
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
    try {
      const user = this.userRepository.create(data);
      return await this.userRepository.save(user);
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'E-mail already registered',
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ 
      select: ['id', 'name', 'email']
    });
  }

  findOne(id: number): Promise<User> {
    try {
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new NotFoundException({error: "Entity not found"});
    }
  }

  findOneOrFail(options: FindOneOptions<User>): Promise<User> {
    try {
      return this.userRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException({error: "Entity not found"});
    }
  }

  async remove(id: number) {
    await this.userRepository.findOneByOrFail({id})
    this.userRepository.delete(id);
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({id});
    this.userRepository.merge(user, data)
    return this.userRepository.save(user);
  }
}