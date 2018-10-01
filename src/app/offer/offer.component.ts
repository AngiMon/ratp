import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AskService } from '../services/ask.service';
import { AuthService } from '../services/auth.service';
import { OfferService } from '../services/offer.service';
import { NodeService } from '../services/node.service';
import { User } from '../models/User.model';
import { Offer } from '../models/Offer.model';
import { AsksListComponent } from '../asks-list/asks-list.component';
import { HeaderComponent } from '../header/header.component';
import * as emailjs from 'emailjs-com';

import { Ask } from '../models/Ask.model'; 
import * as firebase from 'firebase';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit
{
  @Input() asks;
	@Input() ask;
	@Input() asksSubscription: Subscription;
	@Input() authdata = null;
	@Input() isAuth;
	@Input() user;
	@Input() i;
  notif: Object = {ask : 0, offer : 0};
	offerForm : FormGroup;
	array = Array(24);
	rest = Array(6);
  errors = new Object();
  alphabet = 'abcdefgh'.split('');


  constructor(
  	private asksService: AskService, 
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private offerService: OfferService,
    private nodeService: NodeService
    ) { }

  ngOnInit()
  {
      this.initForm();
  }

initForm()
  {
    this.offerForm = this.formBuilder.group({
      rest: ['', Validators.required],
      type: ['', Validators.required],
      teamNb: ['', Validators.required],
      phone: ['', Validators.min(10)],
      message: [''],

    });
  }

  onSaveOffer(ask : Ask)
  {
    this.errors = new Object();

    const rest = this.offerForm.get('rest').value;
    const type = this.offerForm.get('type').value;
    const teamNb = this.offerForm.get('teamNb').value;
    const phone = this.offerForm.get('phone').value;
    const message = this.offerForm.get('message').value;

    rest == '' ? this.errors.rest = 'Indiquez votre repos' : '';
    type == '' ? this.errors.type = 'Indiquez votre type de service' : '';
    teamNb == '' ? this.errors.team = 'Indiquez votre numéro d\'équipe' : '';

    var index = this.asksService.getId(ask, this.asks);
    if(this.errors.type == undefined 
      && this.errors.rest == undefined
      && this.errors.team == undefined)
    {
      console.log("all ok");
      this.getAsk(index, rest, type, teamNb, phone, message);
    }
    
  }

  getAsk(i, rest, type, teamNb, phone, message)
  {
    this.asksService.getSingleAsk(i).then(
      (ask: Ask) => {
        this.ask = ask;
        const offer = new Offer(rest, type, teamNb, phone, message, this.ask, this.user, null);
        this.offerService.createNewOffer(offer);
        var templateParams = 
        {
          user: this.user,
          email: this.ask.user.email,
          phone: this.getPhone(phone),
          ask: this.ask,
          note: this.getNote(message)
        };


    /*emailjs.init("user_Usc4NFXBOwanzq1ziU15b");
 
    emailjs.send('gmail', 'template_4qbcMMOk', templateParams)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });*/
    this.nodeService.notif.offer = this.nodeService.notif.offer  + 1;
    console.log("notif.offer: " + this.nodeService.notif.offer);
    this.router.navigate(['/demandes-en-cours']);    
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
}
