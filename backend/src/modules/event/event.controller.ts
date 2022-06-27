import {Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Event } from './event.entity';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
    constructor(
        private eventService: EventService
    ){}

    @Post()
    create(@Body() event: Event): Promise<Event> {
        return this.eventService.create(event);
    }

    @Get()
    findAll(): Promise<Event[]> {
        return this.eventService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Event> {
        return this.eventService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.eventService.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() event: Event) {
        return this.eventService.update(id, event);
    }
}