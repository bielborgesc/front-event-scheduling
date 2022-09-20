import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
        private userService: UserService,
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) {}

    async create(data: CreateEventDto) {
      data.users = [];
      data.guests
        .forEach(
          (email) => this.userService.findOneOrFail({ where: { email: email }})
          .then(user => {
            console.log(user);
            data.users.push(user)
          })
        );
      delete data.guests;
      console.log(data);
      return await this.eventRepository.save(data);
    }
    
    async findAll(): Promise<Event[]> {
      let events = await this.eventRepository.find()
      return events.sort((a, b) => (a.start < b.finish) ? -1 : 1);
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
          `SELECT * FROM event where userId = '${(event)}'
          and start  BETWEEN '${event.start}' and '${event.finish}'
          or finish BETWEEN '${event.start}' and '${event.finish}'`);
          if(userEvents.length >= 1) throw new Error();
          if( new Date(event.start) > new Date(event.finish)) throw new Error();
          if( new Date(event.start) < new Date()) throw new Error();
        return this.eventRepository.save(event);
      } catch (error) {
        throw new BadRequestException({message: "Event conflict, an event already exists for that date or date not is valid"})
      }
    }
    

}