import { User } from "./user.model";
import { Event } from "./event.model";

export class Invitation {
  id!: number;
  user!: User;
  event!: Event;
  status!: string;
}
