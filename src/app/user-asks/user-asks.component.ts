import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AskService } from '../services/ask.service';
import { User } from "../models/User.model";
import { Ask } from "../models/Ask.model";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-asks',
  templateUrl: './user-asks.component.html',
  styleUrls: ['./user-asks.component.scss']
})
export class UserAsksComponent implements OnInit
{
	asksSubscription: Subscription;
	asks : Ask[];
	authdata = null;
	isAuth: boolean;
	user: User;

	constructor(
		private authService: AuthService,
		private asksService: AskService) { }

	ngOnInit()
	{
		this.user = new User('', '', '');
		this.authService.getAuthData(this);
		this.asksSubscription = this.asksService.askSubject.subscribe(
        (asks: Ask[]) => {
          	this.asks = asks;
        	}
      	);
		this.asksService.emitAsks();
	}

	onDeleteAsk(ask: Ask)
	{
    	this.asksService.removeAsk(ask);
	}
}
