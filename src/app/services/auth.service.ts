import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable();

export class AuthService
{
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

	getAuthData(a)
	{
		firebase.auth().onAuthStateChanged(
			(user) => {
				if(user)
				{
					a.authdata = user;
					a.isAuth = true;
					//return 'toto';
				}
				else
				{
					a.authdata = null;
					a.isAuth = false;
					//return 'snif';
				}
			}
		);
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
}