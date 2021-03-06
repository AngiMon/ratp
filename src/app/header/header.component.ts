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
	}

	onSignOut()
	{
		this.authService.signOutUser();
	}

}
