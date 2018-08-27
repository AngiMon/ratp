import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ask } from '../models/Ask.model';
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

export class AskService
{
	asks: Ask[] = [];
	askSubject = new Subject<Ask[]>();

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
				this.emitAsks();
			})
	}

	getSingleAsk(id : number)
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

	createNewAsk(newAsk: Ask)
	{
		this.asks.push(newAsk);
		this.saveAsks();
		this.emitAsks();
	}

	removeAsk(ask: Ask)
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
		this.saveAsks();
		this.emitAsks();
	}


}