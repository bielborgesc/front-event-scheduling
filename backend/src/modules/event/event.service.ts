import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) {}

    async create(data: CreateEventDto) {
      try {
      const event = this.eventRepository.create(data);
        const userEvents: Event[] = await this.eventRepository.query(
          `SELECT * FROM event where userId = '${(event.user.id)}'
          and start  BETWEEN '${event.start}' and '${event.finish}'
          or finish BETWEEN '${event.start}' and '${event.finish}'`);
        if(userEvents.length >= 1) throw new Error();
        return await this.eventRepository.save(event);
      } catch (error) {
        throw new BadRequestException({message: "Event conflict, an event already exists for that date"})
      }
    }
    
    findAll(): Promise<Event[]> {
      return this.eventRepository.find();
    }
    
    async findOneOrFail(options: FindOneOptions<Event>): Promise<Event> {
      return await this.eventRepository.findOneOrFail(options).catch(() => {throw new NotFoundException("Event not found")});
    }
    
    async remove(id: number) {
      await this.eventRepository.findOneOrFail({where: {id: id}}).catch(() => {throw new NotFoundException("Event not found")});
      this.eventRepository.delete(id);
    }

    async update(id: number, data: UpdateEventDto): Promise<Event> {
      try {
        const event = await this.eventRepository.findOneOrFail({where: {id: id}}).catch(() => {throw new NotFoundException("Event not found")});
        this.eventRepository.merge(event, data);
        const userEvents: Event[] = await this.eventRepository.query(
          `SELECT * FROM event where userId = '${(event.user.id)}'
          and start  BETWEEN '${event.start}' and '${event.finish}'
          or finish BETWEEN '${event.start}' and '${event.finish}'`);
        if(userEvents.length >= 1) throw new Error();
        if(event.start > event.finish || event.start < new Date()) throw new Error();
        return this.eventRepository.save(event);
      } catch (error) {
        throw new BadRequestException({message: "Event conflict, an event already exists for that date or date not is valid"})
      }
    }
    

}