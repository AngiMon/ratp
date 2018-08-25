import { Component } from '@angular/core';
import * as firebase from 'firebase';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
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

	title = 'app';

}
