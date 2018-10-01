import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { NodeService } from '../services/node.service';
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
  	notif: number;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private nodeService: NodeService
		)
	{}

	ngOnInit()
	{console.log("header init");
		this.user = new User('', '', '');
		this.authService.getAuthData(this);
	}
	ngDoCheck(){
		this.notif = this.nodeService.notif;

	}

	onSignOut()
	{
		this.authService.signOutUser();
	}

	Event(toto)
	{
		console.log(toto);
	}
}
