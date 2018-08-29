import { Component, OnDestroy, OnInit, PipeTransform, Pipe, Injectable } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AskService } from '../services/ask.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User.model';

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
  initForm() {
    this.offerForm = this.formBuilder.group({
      recipient: ['', Validators.required],
      text: ['', Validators.required],

     
      
    });
  }
  

  onNewAsk() {
    this.router.navigate(['/demandes-en-cours', 'new']);
  }

  onDeleteask(ask: Ask) {
    this.asksService.removeAsk(ask);
  }

  onViewAsk(id: number) {
    this.router.navigate(['/demandes-en-cours', id]);
  }
  
  ngOnDestroy() {
    this.asksSubscription.unsubscribe();
  }

  getColor(a) { 
    if(a.user.email == this.user.email)
    {
      return '#FDE966';
    }
  }
}
