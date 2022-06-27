import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Event } from './event.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
    ) {}

      create(event: Event): Promise<Event> {
        return this.eventRepository.save(event);
      }
    
      findAll(): Promise<Event[]> {
        return this.eventRepository.find();
      }
    
      findOne(id: number): Promise<Event> {
        return this.eventRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        await this.eventRepository.delete(id);
      }
    
      update(id: number, event: Event,): Promise<UpdateResult> {
        return this.eventRepository.update(id, event);
      }

}