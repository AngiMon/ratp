import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Offer } from '../models/offer.model';
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

export class OfferService
{
	offers: Offer[] = [];
	offerSubject = new Subject<Offer[]>();

	constructor()
	{
		this.getOffers();
	}
	getId(offer: Offer, offers)
	{
		
		for(var i = 0; i < offers.length; i++)
		{ 
			if(JSON.stringify(offers[i]) == JSON.stringify(offer) )
			{
				return i;
			}
		}
	}
	emitOffers()
	{	
		this.offerSubject.next(this.offers.slice());
	}
	addoffers(offer: Offer)
	{
		this.offers.push(offer);
		this.emitOffers();
	}
	saveOffers()
	{
		firebase.database().ref('/offer').set(this.offers);
	}
	getOffers()
	{
		firebase.database().ref('/offer/')
		.on('value', (data: DataSnapshot) => {
				this.offers = data.val() ? data.val() : [];
				this.emitOffers();
			})
	}
	getSingleOffer(id : number)
	{
		return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/offer/' + id).once('value').then(
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
	createNewOffer(newOffer: Offer)
	{
		this.offers.push(newOffer);
		this.saveOffers();
		this.emitOffers();
	}
	editOffer(Offer: Offer, id)
	{
		this.offers[id] = Offer;
		this.saveOffers();
		this.emitOffers();
	}
	removeOffer(offer: Offer)
	{
		const offerIndexToRemove = this.offers.findIndex(
			(offerE1) => {
				if(offerE1 === offer)
				{
					return true;
				}
			}
		);
		this.offers.splice(offerIndexToRemove, 1);
		this.saveOffers();
		this.emitOffers();
	}
}