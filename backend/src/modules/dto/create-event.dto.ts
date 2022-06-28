import { IsDateString, IsNotEmpty, Matches } from "class-validator";
import { MessagesHelper } from "src/helpers/messages.helper";
import { RegExHelper } from "src/helpers/regex.helper";
import { User } from "../user/user.entity";

export class CreateEventDto{
  @IsNotEmpty()
  user: User;
  
  @IsNotEmpty()
  description: string;
  
  @IsNotEmpty()
  @Matches(RegExHelper.date, {message: MessagesHelper.DATE_VALID})
  start: Date;
  
  @IsNotEmpty()
  @Matches(RegExHelper.date, {message: MessagesHelper.DATE_VALID})
  finish: Date;
 
}