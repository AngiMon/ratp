import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AskService } from '../services/ask.service';
import { OfferService } from '../services/offer.service';
import { NodeService } from '../services/node.service';
import { Ask } from "../models/Ask.model";
import { Offer } from "../models/Offer.model";
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
	
	offer: Offer;
  user: User;


  constructor( 
  			private route: ActivatedRoute,
  			private offerService: OfferService,
  			private authService: AuthService,
  			private nodeService: NodeService) {}

  ngOnInit() 
  {
  	this.user = new User("", "", "", "", "");
    this.offer = new Offer("", "", "", "", "", "", "", "", "");
    this.authService.getAuthData(this);
  	const id = this.route.snapshot.params['id'];
  	this.offerService.getSingleOffer(+id).then(
      (offer: Offer) => {
        this.offer = offer;
      }
    );
  }

  GeneratePdf(offer: Offer)
  {
    var data = document.getElementById('pdf');
    html2canvas(data).then(canvas => {  
    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
    var position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, 210, 297)  
    pdf.save('permutation_' + this.offer.askRef.start + '.pdf'); // Generated PDF
  }
}
