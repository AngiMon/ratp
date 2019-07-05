import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferService } from '../services/offer.service';
import { AskService } from '../services/ask.service';
import { AuthService } from '../services/auth.service';
import { NodeService } from '../services/node.service';
import { Offer } from '../models/Offer.model';
import { User } from '../models/User.model';
import { Ask } from '../models/Ask.model';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit
{
	offer: Offer;
 	id: number;
	user: User;
	ask: Ask;
	askId: number;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthService,
		private offerService: OfferService,
		private askService: AskService,
		private nodeService: NodeService) {}

	ngOnInit()
	{
		this.user = new User(" "," ", " ", " ", "");
		this.offer = new Offer(0, "", 0, "", "", "", "", null, null);
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
		this.nodeService.Save(offer.user, false);
		this.offer = new Offer( offer.rest, offer.type, offer.teamNb, offer.phone, offer.message, offer.askRef, offer.user, true, null);
		this.offerService.editOffer(this.offer, this.id);

		this.askService.getSingleAsk(null, this.offer.askRef, this).then(
	      (ask: Ask) => {
	      	this.ask = ask;
	        this.askService.removeAsk(ask, this.askId);
	      });
      	
      	this.router.navigate(['mes-requetes']);
	}

	Refused(offer)
	{
		this.nodeService.Save(offer.user, false); 
		this.offer = new Offer( offer.rest, offer.type, offer.teamNb, offer.phone, offer.message, offer.askRef, offer.user, false, null);
		this.offerService.editOffer(this.offer, this.id);
		this.router.navigate(['mes-requetes']);
	}

}
