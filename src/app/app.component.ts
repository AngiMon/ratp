import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { NodeService } from './services/node.service';
import { User } from "./models/User.model";

import * as firebase from 'firebase';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  authdata = null;
  isAuth:boolean;
  user: User;
  //notif: number = 12;
	constructor()
	{
		const config = {
    apiKey: "AIzaSyBtV9q3zDIUoBMHLIF_s96iI95aFzacjk0",
    authDomain: "ligne10-728b0.firebaseapp.com",
    databaseURL: "https://ligne10-728b0.firebaseio.com",
    //projectId: "ligne10-728b0",
    //storageBucket: "",
   // messagingSenderId: "3208237211"
  };
  firebase.initializeApp(config);
	
  }
  ngOnInit()
  {
    //this.user = new User('', '', '');
    //this.authService.getAuthData(this);
    //this.nodeService.notif = this.notif;
    
  }

	title = 'app';

}
