import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AskService } from '../services/ask.service';
import { Ask } from '../models/Ask.model'; 
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-single-ask',
  templateUrl: './single-ask.component.html',
  styleUrls: ['./single-ask.component.scss']
})
export class SingleAskComponent implements OnInit {

  ask: Ask;
  user;

  constructor(
    private route: ActivatedRoute,
    private asksService: AskService,
    private router: Router) {}

  ngOnInit() {
    this.ask = new Ask( '', '', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.asksService.getSingleAsk(+id).then(
      (ask: Ask) => {
        this.ask = ask;
      }
    );
  }

  onBack() {
    this.router.navigate(['/demandes-en-cours']);
  }
}
