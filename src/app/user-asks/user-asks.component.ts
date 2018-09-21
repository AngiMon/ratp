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

	constructor(
		private authService: AuthService,
		private asksService: AskService,
		private offerService: OfferService,
		private router: Router) { }

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
		this.offersSubscription = this.offerService.offerSubject.subscribe(
        (offers: Offer[]) => {
          	this.offers = offers;
        	}
      	);
      	this.offerService.emitOffers();
	}

	onDeleteAsk(ask: Ask)
	{
    	this.asksService.removeAsk(ask);
	}

	onDeleteOffer(offer: Offer)
	{
    	this.offerService.removeOffer(offer);
	}
	onViewRequest(id: number)
  {
    this.router.navigate(['mes-requetes/requete', id ]);
  }
}
