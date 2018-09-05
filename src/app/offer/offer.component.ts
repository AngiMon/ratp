import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AskService } from '../services/ask.service';
import { AuthService } from '../services/auth.service';
import { OfferService } from '../services/offer.service';
import { User } from '../models/User.model';
import { Offer } from '../models/Offer.model';
import { AsksListComponent } from '../asks-list/asks-list.component'
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
	@Input() ask;
	@Input() asksSubscription: Subscription;
	@Input() authdata = null;
	@Input() isAuth;
	@Input() user;
	@Input() i;
	offerForm : FormGroup;
	array = Array(24);
	rest = Array(6);


  constructor(
  	private asksService: AskService, 
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder, 
    private offerService: OfferService,
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
        this.offerService.createNewOffer(offer);
        var templateParams = 
        {
          user: this.user,
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
}
