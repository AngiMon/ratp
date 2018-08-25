import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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
	constructor(private authService: AuthService)
	{

	}

	ngOnInit()
	{
		this.authService.getAuthData(this);
	}

	/*getAuthData(a)
	{
		firebase.auth().onAuthStateChanged(
			(user) => {
				if(user)
				{
					this.authdata = user;
					this.isAuth = true;
					return 'toto';
				}
				else
				{
					this.authdata = null;
					this.isAuth = false;
					return 'snif';
				}
			}
		);
	}*/

	onSignOut()
	{
		this.authService.signOutUser();
	}

}
