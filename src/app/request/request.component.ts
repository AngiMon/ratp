import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferService } from '../services/offer.service';
import { AuthService } from '../services/auth.service';
import { Offer } from '../models/Offer.model';
import { User } from '../models/User.model';
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

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthService,
		private offerService: OfferService) {}

	ngOnInit()
	{
		this.user = new User(" "," ", " ", " ");
		this.offer = new Offer(" ", " ", " ", " ", " ", " ", " ")
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
		console.log(offer);
		console.log(this.id);
		this.offer = new Offer(parseInt(offer.rest), offer.type, offer.teamNb, offer.phone, offer.message, offer.askRef, offer.user, true);
		this.offerService.editOffer(this.offer, this.id);
	}

}
