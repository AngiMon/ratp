import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AskService } from '../services/ask.service';
import { OfferService } from '../services/offer.service';
import { User } from "../models/User.model";
import { Ask } from "../models/Ask.model";
import { Offer } from "../models/Offer.model";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-asks',
  templateUrl: './user-asks.component.html',
  styleUrls: ['./user-asks.component.scss']
})
export class UserAsksComponent implements OnInit
{
	asksSubscription: Subscription;
	offersSubscription: Subscription;
	asks : Ask[];
	offers: Offer[];
	authdata = null;
	isAuth: boolean;
	user: User;
	myAsk: boolean;
	myAnswer: boolean;
	mySend : boolean;

	constructor(
		private authService: AuthService,
		private asksService: AskService,
		private offerService: OfferService,
		private router: Router) { }

	async ngOnInit()
	{
		console.log('init');
		this.user = new User('', '', '', '');
		this.authService.getAuthData(this);
		this.asksSubscription = await this.asksService.askSubject.subscribe(
        (asks: Ask[]) => {
          	this.asks = asks;
          	for(var i = 0; i < asks.length; i++)
	      		{	
	      			if(asks[i] != undefined)
	      			{
	      				if(asks[i].user.email == this.user.email)
	      				{
	      					this.myAsk = true;
	      					console.log( 'myAsk = ' + 'true');
	      				}
	      			}	
	      		}
        	}
      	);
		this.asksService.emitAsks();
		this.offersSubscription = await this.offerService.offerSubject.subscribe(
        (offers: Offer[]) => {
          	this.offers = offers;
	          	for(var i = 0; i < offers.length; i++)
	      		{	
	      			if(offers[i] != undefined)
	      			{
	      				if(offers[i].user.email == this.user.email)
	      				{
	      					this.mySend = true;
	      					console.log( 'mySend =' + 'true');
	      				}
	      				if(offers[i].askRef.user.email == this.user.email)
		      			{
		      				this.myAnswer = true;
		      				console.log( 'myAnswer =' + 'true');
		      			}
	      			}

	      		}
        	}
      	);
      	this.offerService.emitOffers();
	}

	onDeleteAsk(ask: Ask)
	{
    	this.asksService.removeAsk(ask);
    	this.myAsk = false;
    	this.mySend = false;
    	this.myAnswer = false;

    	this.ngOnInit();
	}

	onDeleteOffer(offer: Offer)
	{
    	this.offerService.removeOffer(offer);
    	this.mySend = false;
		this.myAsk = false;
		this.myAnswer = false;

    	this.ngOnInit();
	}
	onViewRequest(id: number)
  {
    this.router.navigate(['mes-requetes/requete', id ]);
  }
}
