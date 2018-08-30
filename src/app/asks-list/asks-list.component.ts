import { Component, OnDestroy, OnInit, PipeTransform, Pipe, Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AskService } from '../services/ask.service';
import { AuthService } from '../services/auth.service';
import { OfferService } from '../services/offer.service';
import { User } from '../models/User.model';
import { Offer } from '../models/Offer.model';

import { Ask } from '../models/Ask.model'; 
import * as firebase from 'firebase';

@Component({
  selector: 'app-asks-list',
  templateUrl: './asks-list.component.html',
  styleUrls: ['./asks-list.component.scss']
})

export class AsksListComponent implements OnInit, OnDestroy
{
  offerForm : FormGroup;
  asks: Ask[];
  ask: Ask;
	asksSubscription: Subscription;
  authdata = null;
  isAuth;
  objectKeys = Object.keys;
  user: User;

	constructor(
    private asksService: AskService, 
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private offerService: OfferService,
     )
	{}

	 ngOnInit()
	 {
      this.asksSubscription = this.asksService.askSubject.subscribe(
        (asks: Ask[]) => {
          this.asks = asks;
        }
      );
      this.user = new User('', '', '');
      this.authService.getAuthData(this);
      this.asksService.emitAsks();
      this.initForm();
  }

  initForm()
  {
    this.offerForm = this.formBuilder.group({
      rest: ['', Validators.required],
      type: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],

    });
  }

  onSaveOffer(i)
  {
    console.log('save!');
    const rest = this.offerForm.get('rest').value;
    const type = this.offerForm.get('type').value;
    const phone = this.offerForm.get('phone').value;
    const message = this.offerForm.get('message').value;
    this.getAsk(i, rest, type, phone, message);   
  }

  getAsk(i, rest, type, phone, message)
  {
    this.asksService.getSingleAsk(i).then(
      (ask: Ask) => {
        this.ask = ask;
        const offer = new Offer(rest, type, phone, message, this.ask, this.user);
    this.offerService.createNewOffer(offer);
    this.router.navigate(['/']);    
      }
    );
  }
  
  onNewAsk() {
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
      return '#FDE966';
    }
  }
}
