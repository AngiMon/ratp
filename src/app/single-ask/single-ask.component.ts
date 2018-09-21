import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AskService } from '../services/ask.service';
import { AuthService } from '../services/auth.service';
import { Ask } from '../models/Ask.model';
import { User } from '../models/User.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-single-ask',
  templateUrl: './single-ask.component.html',
  styleUrls: ['./single-ask.component.scss']
})
export class SingleAskComponent implements OnInit
{
  ask: Ask;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private asksService: AskService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.user = new User('', '', '',' ');
    this.ask = new Ask('', '', '', '', '', '', '');
    this.authService.getAuthData(this);
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
