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
  	notif: Object = {ask : 0, offer : 0};

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private nodeService: NodeService
		)
	{}

	ngOnInit()
	{
		this.user = new User('', '', '');
		this.authService.getAuthData(this);
	}
	ngDoCheck(){
		this.notif.ask = this.nodeService.notif.ask;
		this.notif.offer = this.nodeService.notif.offer;

	}

	onSignOut()
	{
		this.authService.signOutUser();
	}

}
