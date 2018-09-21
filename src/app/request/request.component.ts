import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferService } from '../services/offer.service';
import { AskService } from '../services/ask.service';
import { AuthService } from '../services/auth.service';
import { Offer } from '../models/Offer.model';
import { User } from '../models/User.model';
import { Ask } from '../models/Ask.model';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit
{
	offer: Offer;
 	id: number;
	user: User;
	ask: Ask;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthService,
		private offerService: OfferService,
		private askService: AskService) {}

	ngOnInit()
	{
		this.user = new User(" "," ", " ", " ");
		this.offer = new Offer(" ", " ", " ", " ", " ", " ", " ", " ")
		this.authService.getAuthData(this);
		this.id = this.route.snapshot.params['id'];
		this.offerService.getSingleOffer(+this.id).then(
	      (offer: Offer) => {
	        this.offer = offer;
	      }
	    );
	}

	Accepted(offer)
	{
		this.offer = new Offer( offer.rest, offer.type, offer.teamNb, offer.phone, offer.message, offer.askRef, offer.user, true);
		this.offerService.editOffer(this.offer, this.id);

		this.askService.getSingleAsk(null, this.offer.askRef).then(
	      (ask: Ask) => {
	      	this.ask = ask;
	        this.askService.removeAsk(this.ask);
	      });
      	
      	this.router.navigate(['mes-requetes']);
    

	}

	Refused(offer)
	{
		this.offer = new Offer( offer.rest, offer.type, offer.teamNb, offer.phone, offer.message, offer.askRef, offer.user, false);
		this.offerService.editOffer(this.offer, this.id);
	}

}
