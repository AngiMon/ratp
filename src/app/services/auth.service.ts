import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

@Injectable();

export class AuthService
{
	user;
	constructor(){}
	ngOnInit()
	{
		
	}
	createNewUser(email: string, password: string)
	{
		return new Promise(
			(resolve, reject) => {
				firebase.auth().createUserWithEmailAndPassword(email, password).then(
					() => {
						resolve();
					},
					(error) => {
						reject(error);
					}
				)
			}
		)
	}

	signInUser(email: string, password: string)
	{
		return new Promise(
			(resolve, reject) => {
				firebase.auth().signInWithEmailAndPassword(email, password).then(
					() => {
						resolve();
					},
					(error) => {
						reject(error);
					}
				)
			}
		)
	}

	signOutUser()
	{
		firebase.auth().signOut();
	}

	reset(email)
	{
		firebase.auth().sendPasswordResetEmail(email);
	}

	getAuthData(a)
	{
		firebase.auth().onAuthStateChanged(
			(user) => {
				if(user)
				{
					a.authdata = user;
					a.isAuth = true;
					this.getUser(a, user);
				}
				else
				{
					a.authdata = null;
					a.isAuth = false;
				}
			}
		);
	}

	getUser(a, u)
	{
		firebase.database().ref('/auth/')
		.on('value', (data: DataSnapshot) => {
				var users = data.val() ? data.val() : [];
				users.forEach(function(user)
					{
						if(user.email == u.email)
						{
							a.user = user
						}
					}
				)
			}
		)
	}

}