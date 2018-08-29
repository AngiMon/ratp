import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ask } from '../../models/Ask.model';
import { AskService} from '../../services/ask.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ask-form',
  templateUrl: './ask-form.component.html',
  styleUrls: ['./ask-form.component.scss']
})
export class AskFormComponent implements OnInit
{

  typeVs = {
            types:[
              {name: 'Jour',  selected: false, id: 1},
              {name: 'Mixte', selected: false, id: 2},
              {name: 'Nuit',  selected: false, id: 3}
            ]
          };
  user;
	array = new Array(25);
  repos = new Array(6);
	askForm: FormGroup;
   constructor(
     private formBuilder: FormBuilder, 
     private asksService: AskService,
     private router: Router,
     private authService: AuthService) { }
              
  ngOnInit() {
    this.initForm();
    this.authService.getAuthData(this);
  }
  
  initForm() {
    this.askForm = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      teamNb: ['', Validators.required],
      type: ['', Validators.required],
      Jour: ['', Validators.required],
      Mixte: ['', Validators.required],
      Nuit: ['', Validators.required],
      rest: ['', Validators.required],
      
    });
  }
  
  onSaveAsk() {
    var startIni = document.getElementById('start').value;
    var endIni = document.getElementById('end').value;
    const start = this.askForm.get('start').value;
    start = startIni;
    const end = this.askForm.get('end').value;
    end = endIni;
    const type = this.askForm.get('type').value;

    const jour = this.askForm.get('Jour').value;
    const mixte = this.askForm.get('Mixte').value;
    const nuit = this.askForm.get('Nuit').value;
    const rest = this.askForm.get('rest').value;

    const typeVs = {jour : jour, mixte : mixte, nuit : nuit};
    
    console.log(mixte);
    const teamNb = this.askForm.get('teamNb').value;
    
    const user = this.user;
    const newAsk = new Ask(start, end, rest, teamNb, type, typeVs, user);
    this.asksService.createNewAsk(newAsk);
    this.router.navigate(['/demandes-en-cours']);
  }

  Click(a)
  {
    console.log(a);
  }
}
