import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from "../models/User.model";
import * as firebase from 'firebase';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit
{
	authdata = null;
	name;
	isAuth:boolean;
	user: User;
	constructor(
		private authService: AuthService,
		private userService: UserService)
	{}

	ngOnInit()
	{
		this.user = new User('', '', '');
		this.authService.getAuthData(this);
		/*this.authService.getUser(this).then(
	      (user: User) => {
	        this.user = user;
	      }
	    );*/
	}

	onSignOut()
	{
		this.authService.signOutUser();
	}

}
