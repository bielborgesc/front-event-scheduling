import { IsNotEmpty } from "class-validator";

export class CreateEventDto{
  @IsNotEmpty()
  user: {
    id: string
  };
  
  @IsNotEmpty()
  description: string;
  
  @IsNotEmpty()
  start: Date;

  @IsNotEmpty()
  finish: Date;
 
}