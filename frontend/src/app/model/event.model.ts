export class Event {
  id!: number;
  description!: string;
  start!: Date;
  finish!: Date;

  constructor(id: number, description: string, start: Date, finish: Date) {
    this.id = id;
    this.description = description;
    this.start = start;
    this.finish = finish;
  }

}
