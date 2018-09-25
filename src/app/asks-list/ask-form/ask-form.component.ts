import { Component, OnInit} from '@angular/core';
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
  errors = new Object();
  alphabet = 'abcdefgh'.split('');
  typeSelected;


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
  
  getSelect(a)
  {
    this.typeSelected = a.target.value;
  }

  onSaveAsk() 
  {
    this.errors = new Object();

//CONTRAINSTS OF VALIDATION
    var startIni = document.getElementById('start').value;
    var endIni = document.getElementById('end').value;
    if(startIni != "" && endIni != "")
    {
      const start = this.askForm.get('start').value;
      start = startIni;
      const end = this.askForm.get('end').value;
      end = endIni;
      this.VerifDate(start, end);
    }
    else
    {
      this.errors.date = "Indiquez la date de début et de fin de votre service"
    }

    const type = this.askForm.get('type').value;
    type == '' ? this.errors.type = 'le type est requis' : '';

    const rest = this.askForm.get('rest').value;
    rest == '' ? this.errors.rest = 'Indiquez votre repos' : '';

    const jour = this.askForm.get('Jour').value;
    const mixte = this.askForm.get('Mixte').value;
    const nuit = this.askForm.get('Nuit').value;
    const typeVs = {jour : jour, mixte : mixte, nuit : nuit};
    typeVs.jour | typeVs.mixte | typeVs.nuit ? '' : this.errors.choice = "Précisez le(s) service(s) souhaité(s) en échange du vôtre";

    const teamNb = this.askForm.get('teamNb').value;
    teamNb == '' ? this.errors.team = "Indiquez votre numéro d'équipe" : '';

//VALIDATION OF THE FORM
    if(  this.errors.date == undefined 
      && this.errors.type == undefined 
      && this.errors.rest == undefined
      && this.errors.team == undefined
      && this.errors.dateBis == undefined)
    {
      const user = this.user;
      const newAsk = new Ask(start, end, rest, teamNb, type, typeVs, user);
      this.asksService.createNewAsk(newAsk);
      this.router.navigate(['/demandes-en-cours']);
    }    
  }
   VerifDate(s, e)
    {  
      var day, month, year, dateStart, dateEnd, start, end, today;

      today = new Date();

      function getDate(x)
      {
        day = x.substring(0, 2);
        month = x.substring(3, 5);
        year = x.substring(6, 10);
        return month + "/" + day + "/" + year;
      }
      
      dateStart = getDate(s);
      dateEnd = getDate(e);
      start = new Date(dateStart);
      end = new Date(dateEnd);
     
      if(start >= end)
      {
        console.log("error");
        this.errors.dateBis = "La date de début ne peut pas être supérieure ou égale à la date de fin";
      }
      else if( start < today || end < today )
      {
        this.errors.dateBis = "La date du jour ne peut pas être supérieure à la période de votre service";
      }
    }
}
