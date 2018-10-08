import { User } from '../models/User.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import  * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';


@Injectable()
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
				return this.users;
			})
	}
	getId(user: User)
	{	
		var users = this.users;
		
		for(var i = 0; i < users.length; i++)
		{ 
			if(JSON.stringify(users[i].email) == JSON.stringify(user.email) )
			{
				return i;
			}
		}
	}
	editUser(user: User)
	{
		var id = this.getId(user);
		this.users[id] = user;
		this.saveUsers();
		this.emitUsers();
		this.getUsers();
	}

	getUser(email)
	{
		for(var i = 0; i < this.users.length; i++)
		{ 
			if(JSON.stringify(this.users[i].email) == JSON.stringify(email) )
			{
				return this.users[i];
			}
		}
	}
}
