import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { User } from '../models/User.model';


@Injectable()
export class NodeService
{
  	notif = {answer : 0, ask : 0, offer : 0};
  	
  	constructor(private userService: UserService)
  	{}

  	Init(user: User)
  	{
  		this.notif.ask = user.notifications.ask;
  		this.notif.offer = user.notifications.offer;
  		this.notif.answer = user.notifications.answer;
  	}

  	Save(user: User, answer:boolean = null)
  	{
  		const update = new User(user.email, user.firstname, user.name, user.registrationNumber, this.notif);
  		if(answer)
  		{
  			this.userService.editUser(update, answer);
  		}
  		else
  		{
  			this.userService.editUser(update);
  		}
  	}
}
