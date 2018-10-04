import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ask } from '../models/Ask.model';
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

export class AskService
{
	asks: Ask[] = [];
	askSubject = new Subject<Ask[]>();
	//today = new Date("09/01/2018");

	constructor()
	{
		this.getAsks();
		
	}

	emitAsks()
	{
		this.askSubject.next(this.asks.slice());
	}

	addAsks(ask: Ask)
	{
		this.asks.push(ask);
		this.emitAsks();
	}

	saveAsks()
	{
		firebase.database().ref('/demandes-en-cours').set(this.asks);
	}

	getAsks()
	{
		firebase.database().ref('/demandes-en-cours/')
		.on('value', (data: DataSnapshot) => {
				this.asks = data.val() ? data.val() : [];
				this.asks.reverse();
				this.emitAsks();
			})
	}
	getId(ask: Ask, asks)
	{
		asks.reverse();
		for(var i = 0; i < asks.length; i++)
		{ 
			if(JSON.stringify(asks[i]) == JSON.stringify(ask) )
			{
				return i;
			}
			else
			{
				//console.log("no match");
			}
		}
	}
	getSingleAsk(id : number = null, ask = null, request = null)
	{
		if(id !== null)
		{
			return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/demandes-en-cours/' + id).once('value').then(
					(data: DataSnapshot) => {
							resolve(data.val());
						},
						(error) => {
							reject(error);
						}
					);
				}
			);
		}
		else
		{
			for(var i = 0; i < this.asks.length; i++)
			{ 
				if(JSON.stringify(this.asks[i]) == JSON.stringify(ask) )
				{
					return new Promise(
					(resolve, reject) => {
						firebase.database().ref('/demandes-en-cours/' + i).once('value').then(
							(data: DataSnapshot) => {
									resolve(data.val());
									request.askId = i;
								},
								(error) => {
									reject(error);
								}
							);
						}
					);
				}
				else
				{
					console.log("no match");
				}
			}
			
		}
	}

	createNewAsk(newAsk: Ask)
	{
		this.asks.push(newAsk);
		this.saveAsks();
		this.emitAsks();
	}

	removeAsk(ask: Ask, id = null)
	{
		console.log("remove :");
		console.log(ask);
		if(id != null)
		{
			this.asks.splice(id, 1);
		}
		else
		{
			const askIndexToRemove = this.asks.findIndex(
			(askE1) => {
					if(askE1 === ask)
					{
						return true;
					}
				}
			);

			this.asks.splice(askIndexToRemove, 1);
		}
		
		this.saveAsks();
		this.emitAsks();
	}


}