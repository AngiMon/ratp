import { Component, OnDestroy, OnInit, PipeTransform, Pipe, Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AskService } from '../services/ask.service';
import { AuthService } from '../services/auth.service';
import { OfferService } from '../services/offer.service';
import { NodeService } from '../services/node.service';
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
  public data: any;
  asks: Ask[];
  offers: Offer[];
  ask: Ask;
	asksSubscription: Subscription;
  offersSubscription: Subscription;
  authdata = null;
  isAuth;
  user: User;
  myOffers = Array();
  today = new Date().getTime();
  i;
  y = 0;
  pageIndex = 0;
  mfRowsOnPage;
  is: boolean;

	constructor(
    private asksService: AskService, 
    private router: Router,
    private authService: AuthService,
    private offerService: OfferService,
    private nodeService: NodeService
     )
	{}

	ngOnInit()
  {
    this.Init();
  }

  ngAfterContentInit()
  {
    this.Init();
  }

  async Init()
  {
    this.user = new User('', '', '', '', '');
    this.authService.getAuthData(this);
    this.asksSubscription = await this.asksService.askSubject.subscribe(
      async (asks: Ask[]) => {
        this.asks = asks;
        this.data = asks;
        this.offersSubscription =  await this.offerService.offerSubject.subscribe(
        (offers: Offer[]) => {
          this.offers = offers;
          if(this.i == true && this.y == 1)
          {
            this.DateLimit(this.asks);
          }
          this.Checked();
          }
        )  
      }
    );
    this.offerService.emitOffers();
    this.asksService.emitAsks();
  }

  onChangePage(mf)
  {
    var index = document.getElementsByClassName("page-item active")[0].textContent;
    this.pageIndex = (parseInt(index)-1)*-1;
    this.ngAfterContentInit();
  }

  DateLimit(asks)
  {
    var day, month, year, dateStart;

    function getDate(x)
    {
      day = x.substring(0, 2);
      month = x.substring(3, 5);
      year = x.substring(6, 10);
      return month + "/" + day + "/" + year;
    }

    for(var i = 0; i < asks.length; i++)
    {
      dateStart = new Date(getDate(asks[i].start));
      dateStart.getTime();

      if( dateStart <= this.today)
      {
        this.asksService.removeAsk(asks[i]);
      } 
    }
  }

  Checked()
  {
    this.myOffers = [];

    if(JSON.stringify(this.asks) !== JSON.stringify([]) )
    {
      this.i = true;
      this.y++;
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
  }

  IsMyOffers(ask)
  { 
    var is;
    
    for(var i = 0; i < this.myOffers.length; i++)
    {
      if(JSON.stringify(ask) == JSON.stringify(this.myOffers[i]))
      {
         is = true;
         break;
      }
    }
    
    if(is)
      return false;
    else
      return true;    
  }

  onNewAsk()
  {
    this.router.navigate(['/demandes-en-cours', 'new']);
  }

  onDeleteask(ask: Ask)
  {
    this.asksService.removeAsk(ask);
  }

  onViewAsk(ask: Ask)
  {
    var id = this.asksService.getId(ask, this.asks);
    this.router.navigate(['/demandes-en-cours', id]);
  }
  
  ngOnDestroy()
  {
    this.asksSubscription.unsubscribe();
    this.offersSubscription.unsubscribe();
  }

  getColor(a)
  { 
    if(a.user.email == this.user.email)
    {
      return '#FFF8CD';
    }
  }
  Hide(is: boolean)
  {
    var toto = document.getElementById('my');
    var my = document.getElementsByClassName('is');
    var not = document.getElementsByClassName('not');
    if(is == undefined)
    {
      is = toto.checked;
      this.Hide(is);
    }
    if(is)
    {
      
      for(var i = 0; i < my.length; i++)
      {
        my[i].parentNode.classList.add("hide");
      }
    }
    else
    {
      for(var i = 0; i < my.length; i++)
      {
        my[i].parentNode.classList.remove("hide");
        
      }
    }
  }
}
