import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AskService } from '../services/ask.service';
import { OfferService } from '../services/offer.service';
import { NodeService } from '../services/node.service';
import { User } from "../models/User.model";
import { Ask } from "../models/Ask.model";
import { Offer } from "../models/Offer.model";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
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
  	notif: Object = {ask : 0, offer : 0, answer : 0};
	today = new Date().getTime();


	constructor(
		private authService: AuthService,
		private asksService: AskService,
		private offerService: OfferService,
		private router: Router,
		private nodeService: NodeService) { }

	async ngOnInit()
	{
		this.notif.ask = this.nodeService.notif.ask;
		this.notif.offer = this.nodeService.notif.offer;
		this.notif.answer = this.nodeService.notif.answer;
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
	      				}
	      			}	
	      		}
        	}
      	);
		this.asksService.emitAsks();
		this.offersSubscription = await this.offerService.offerSubject.subscribe(
        (offers: Offer[]) => {
          		this.offers = offers;

          		this.DateLimit(this.offers);

	          	for(var i = 0; i < offers.length; i++)
	      		{	
	      			if(offers[i] != undefined)
	      			{
	      				if(offers[i].user.email == this.user.email)
	      				{
	      					this.mySend = true;
	      				}
	      				if(offers[i].askRef.user.email == this.user.email)
		      			{
		      				this.myAnswer = true;
		      			}
	      			}

	      		}
        	}
      	);
      	this.offerService.emitOffers();
	}

	DateLimit(offers)
	{
		var day, month, year, dateStart;

		function getDate(x)
		{
			day = x.substring(0, 2);
			month = x.substring(3, 5);
			year = x.substring(6, 10);
			return month + "/" + day + "/" + year;
		}

		for(var i = 0; i < offers.length; i++)
		{
				
			dateStart = new Date(getDate(offers[i].askRef.start));
			dateStart.getTime();

			if( dateStart <= this.today)
			{
				console.log(offers[i]);
				this.offerService.removeOffer(offers[i]);
			} 
			
		}
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
	onDeleteAnswer(offer: Offer)
	{
		const id = this.offerService.getId(offer, this.offers);
		
		var noOffer = new Offer(
			offer.rest, 
			offer.type,
			offer.teamNb,
			offer.phone,
			offer.message,
			offer.askRef,
			offer.user,
			false,
			true);
		this.offerService.editOffer(noOffer, id);
	}
	onViewRequest(id: number)
	{
    	this.router.navigate(['mes-requetes/requete', id ]);
  	}
  	Notif(check)
  	{
  		switch (check) {
  			case "offer":
				this.nodeService.notif.offer = 0;
  				this.notif.offer = this.nodeService.notif.offer;
  				this.nodeService.Save(this.user);
  				break;
  			case "ask":
				this.nodeService.notif.ask = 0;
  				this.notif.ask = this.nodeService.notif.ask;
  				this.nodeService.Save(this.user);
  				break;
  			case "answer":
				this.nodeService.notif.answer = 0;
  				this.notif.answer = this.nodeService.notif.answer;
  				this.nodeService.Save(this.user);
  				break;
  		}
  		
  	}
  	GeneratePdf(offer: Offer)
  	{
  		console.log("toto");
  		/*var columns = ["", "1er agent", "2ème agent"]; 
		var rows = [ 
			["Nom", offer.user.name, offer.askRef.user.name],
			["Matricule", offer.user.registrationNumber,offer.askRef.user.registrationNumber],
			["Repos", offer.rest, offer.askRef.rest],
			["Service prévu", offer.teamNb, offer.askRef.teamNb],
			["Signature", '', '']
			];
		var pdf = new jsPDF();

		pdf.autoTable(columns, rows);
		pdf.save('table.pdf');*/

	
		
  	}
}
