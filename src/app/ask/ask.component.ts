import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['../app.component.css']
})
export class AskComponent implements OnInit
{

	askForm: FormGroup;
	array = new Array(25);
    day = new Array(31);
    month = new Array(12);
    year = new Date().getFullYear();

	constructor(private formBuilder: FormBuilder) { }

	public ngOnInit()
	{
	this.askForm = this.formBuilder.group({
	    	name: '',
	    	firstname: '',
	    	mail: '',
	    	telephon: '',
	    	teamNb: '',
	    	type: '',
	    	start: '',
	    	end: ''
		});
	}

	Toto()
	{
	}

	onSubmitForm()
	{
		
	}

	
}


