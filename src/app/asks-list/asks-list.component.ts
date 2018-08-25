import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AskService } from '../services/ask.service';
import { Ask } from '../models/Ask.model'; 

@Component({
  selector: 'app-asks-list',
  templateUrl: './asks-list.component.html',
  styleUrls: ['./asks-list.component.scss']
})
export class AsksListComponent implements OnInit, OnDestroy
{
	asks: Ask[];
	asksSubscription: Subscription;

	constructor(private asksService: AskService, private router: Router)
	{}

	 ngOnInit()
	 {
    	this.asksSubscription = this.asksService.askSubject.subscribe(
      (asks: Ask[]) => {
        this.asks = asks;
      }
    );
    this.asksService.emitAsks();
  }

  onNewAsk() {
    this.router.navigate(['/demandes-en-cours', 'new']);
  }

  onDeleteask(ask: Ask) {
    this.asksService.removeAsk(ask);
  }

  onViewAsk(id: number) {
    this.router.navigate(['/demandes-en-cours', id]);
  }
  
  ngOnDestroy() {
    this.asksSubscription.unsubscribe();
  }

}
