import { Component, OnDestroy, OnInit, PipeTransform, Pipe, Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AskService } from '../services/ask.service';
import { AuthService } from '../services/auth.service';
import { OfferService } from '../services/offer.service';
import { User } from '../models/User.model';
import { Offer } from '../models/Offer.model';
import * as emailjs from 'emailjs-com';

import { Ask } from '../models/Ask.model'; 
import * as firebase from 'firebase';

@Component({
  selector: 'app-asks-list',
  templateUrl: './asks-list.component.html',
  styleUrls: ['./asks-list.component.scss']
})

export class AsksListComponent implements OnInit, OnDestroy
{

  asks: Ask[];
  offers: Offer[];
  ask: Ask;
	asksSubscription: Subscription;
  offersSubscription: Subscription
  authdata = null;
  isAuth;
  user: User;
  myOffers = Array();

	constructor(
    private asksService: AskService, 
    private router: Router,
    private authService: AuthService,
    private offerService: OfferService,
     )
	{}

	 async ngOnInit()
	 {
      this.user = new User('', '', '', '');
      this.authService.getAuthData(this);
      
      this.asksSubscription = await this.asksService.askSubject.subscribe(
        (asks: Ask[]) => {
          this.asks = asks;
          this.offersSubscription =  this.offerService.offerSubject.subscribe(
          (offers: Offer[]) => {
            this.offers = offers;
            this.Checked();
            }
          )  
        }
      );

      this.offerService.emitOffers();
      this.asksService.emitAsks();
  }

  Checked()
  {
    this.myOffers = [];
    if(JSON.stringify(this.asks) !== JSON.stringify([]) )
    {
      for(var i = 0; i < this.asks.length; i++)
      {
        for(var y = 0; y < this.offers.length; y++)
        {
          if(JSON.stringify(this.asks[i]) == JSON.stringify(this.offers[y].askRef) && JSON.stringify(this.user.email) == JSON.stringify(this.offers[y].user.email))
          {
            this.myOffers.push(this.asks[i]);
          }
        }
      }

    }
    else{
        console.log('no match');
    }
    
  }

  onNewAsk()
  {
    this.router.navigate(['/demandes-en-cours', 'new']);
  }

  onDeleteask(ask: Ask)
  {
    this.asksService.removeAsk(ask);
  }

  onViewAsk(id: number)
  {
    this.router.navigate(['/demandes-en-cours', id]);
  }
  
  ngOnDestroy()
  {
    this.asksSubscription.unsubscribe();
  }

  getColor(a)
  { 
    if(a.user.email == this.user.email)
    {
      return '#FFF8CD';
    }
  }
}
