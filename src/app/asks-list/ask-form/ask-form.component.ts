import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ask } from '../../models/Ask.model';
import { AskService} from '../../services/ask.service';

@Component({
  selector: 'app-ask-form',
  templateUrl: './ask-form.component.html',
  styleUrls: ['./ask-form.component.scss']
})
export class AskFormComponent implements OnInit
{
	array = new Array(25);
	askForm: FormGroup;
   constructor(private formBuilder: FormBuilder, private asksService: AskService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.askForm = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      teamNb: ['', Validators.required],
      type: ['', Validators.required],
      
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
    const teamNb = this.askForm.get('teamNb').value;

    const newAsk = new Ask(start, end, teamNb, type);
    this.asksService.createNewAsk(newAsk);
    this.router.navigate(['/demandes-en-cours']);
  }
}
