import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AskService } from '../services/ask.service';
import { Ask } from '../models/Ask.model'; 


@Component({
  selector: 'app-single-ask',
  templateUrl: './single-ask.component.html',
  styleUrls: ['./single-ask.component.scss']
})
export class SingleAskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
