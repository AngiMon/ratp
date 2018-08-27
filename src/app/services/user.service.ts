import { User } from '../models/User.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import  * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

export class UserService
{
	users: User[] = [];
	userSubject = new Subject<User[]>();

	constructor()
	{
		this.getUsers();
	}

	emitUsers()
	{
		this.userSubject.next(this.users.slice());
	}

	addUser(user: User)
	{
		this.users.push(user);
		this.emitUsers();
	}

	createNewUser(user: User)
	{
		this.users.push(user);
		this.saveUsers();
		this.emitUsers();
	}

	saveUsers()
	{
		firebase.database().ref('auth').set(this.users);
	}

	getUsers()
	{
		firebase.database().ref('/auth/')
		.on('value', (data: DataSnapshot) => {
				this.users = data.val() ? data.val() : [];
				this.emitUsers();
			})
	}
}
