import { Component, OnInit, Output, OnDestroy } from '@angular/core';
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
  	notif: NodeService;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private nodeService: NodeService
		)
	{}

	ngOnInit()
	{	this.notif = new NodeService('');
		this.user = new User('', '', '', '', '');
		this.authService.getAuthData(this);
	}

	ngDoCheck()
	{
		if(this.user.email != "")
		{
			if(this.notif.ask != this.nodeService.notif.ask
	   			|| this.notif.offer != this.nodeService.notif.offer
	  		 	|| this.notif.answer != this.nodeService.notif.answer
		 	  )
			{
				this.notif.ask = this.nodeService.notif.ask;
				this.notif.offer = this.nodeService.notif.offer;
				this.notif.answer = this.nodeService.notif.answer;
			}
		}
	}

	onSignOut(user: User)
	{
		this.nodeService.Save(user);
		this.authService.signOutUser();
		this.user = new User('', '', '', '', '');
	}

}
