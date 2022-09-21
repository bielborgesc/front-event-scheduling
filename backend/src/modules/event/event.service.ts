import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { EntityNotFoundError, FindOneOptions, Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) {}

    private validateDate(data: CreateEventDto): boolean{
      const today = new Date(Date.now()).toISOString();
      const start = new Date(data.start).toISOString();
      const finish = new Date(data.finish).toISOString();

      if(start < today) return false;
      if(finish < today) return false;
      if(finish < start) return false;
      if(finish === start) return false;

      return true;
    }

    async create(data: CreateEventDto) {
      try {
        if(!this.validateDate(data)) throw new Error();
        return await this.eventRepository.save(data);
      } catch (err) {
        throw new HttpException({statusCode: HttpStatus.BAD_REQUEST, message: [MessagesHelper.DATE_MISMATCH]}, HttpStatus.BAD_REQUEST);
      }
    }
    
    async findAll(): Promise<Event[]> {
      try {
        return await this.eventRepository.find()
      } catch (err) {
        throw new HttpException({statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: [MessagesHelper.GENERIC_ERROR]}, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    async findOneOrFail(options: FindOneOptions<Event>): Promise<Event> {
      try {
        return await this.eventRepository.findOneOrFail(options);
      } catch (err) {
        throw new HttpException({statusCode: HttpStatus.NOT_FOUND, message: [MessagesHelper.EVENT_NOT_FOUND]}, HttpStatus.NOT_FOUND);
      }
    }
    
    async remove(id: number) {
      try {
        await this.eventRepository.findOneOrFail({where: {id: id}});
        this.eventRepository.delete(id);
      } catch (err) {
        throw new HttpException({statusCode: HttpStatus.NOT_FOUND, message: [MessagesHelper.EVENT_NOT_FOUND]}, HttpStatus.NOT_FOUND);
      }
    }

    async update(id: number, data: UpdateEventDto): Promise<Event> {
      try {
        const event = await this.eventRepository.findOneOrFail({where: {id: id}});
        this.eventRepository.merge(event, data);
        if(!this.validateDate(data)) throw new Error();
        return this.eventRepository.save(event);
      } catch (err) {
        if(err instanceof EntityNotFoundError) throw new HttpException({statusCode: HttpStatus.NOT_FOUND, message: [MessagesHelper.EVENT_NOT_FOUND]}, HttpStatus.NOT_FOUND);
        else throw new HttpException({statusCode: HttpStatus.BAD_REQUEST, message: [MessagesHelper.DATE_MISMATCH]}, HttpStatus.BAD_REQUEST);
      } 
    }
    

}