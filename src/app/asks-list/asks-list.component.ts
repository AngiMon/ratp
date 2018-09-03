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
  offerForm : FormGroup;
  asks: Ask[];
  ask: Ask;
	asksSubscription: Subscription;
  authdata = null;
  isAuth;
  objectKeys = Object.keys;
  user: User;
  array = Array(24);
  rest = Array(6);

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
      teamNb: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['', Validators.required],

    });
  }

  onSaveOffer(i)
  {
    console.log('save!');
    const rest = this.offerForm.get('rest').value;
    const type = this.offerForm.get('type').value;
    const teamNb = this.offerForm.get('teamNb').value;
    const phone = this.offerForm.get('phone').value;
    const message = this.offerForm.get('message').value;
    this.getAsk(i, rest, type, teamNb, phone, message);


  }

  getAsk(i, rest, type, teamNb, phone, message)
  {
    this.asksService.getSingleAsk(i).then(
      (ask: Ask) => {
        this.ask = ask;
        const offer = new Offer(rest, type, teamNb, phone, message, this.ask, this.user);
        //this.offerService.createNewOffer(offer);
        var templateParams = 
        {
          name: this.user.firstname + " " + this.user.name + " ",
          email: this.ask.user.email,
          phone: this.getPhone(phone),
          ask: this.ask,
          note: this.getNote(message)
        };

    emailjs.init("user_Usc4NFXBOwanzq1ziU15b");
 
    emailjs.send('gmail', 'template_4qbcMMOk', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
    this.router.navigate(['/']);    
      }
    );
  }

  getNote(m)
  {
    if(m != "")
    {
      var note = "Son message : " + '"' + m + '"';
      return note;
    }
    else{
      return "";
    }
  }

  getPhone(p)
  {
    if(p != "")
    {
      var phone = "téléphone ou sms : " + p;
      return phone;
    }
    else
      return "";
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
