import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventModule } from "./event.module";
import { EventService } from "./event.service";

@Module({
    imports: [EventModule],
    providers: [EventService],
    controllers: [EventController]
  })
  export class EventHttpModule {}