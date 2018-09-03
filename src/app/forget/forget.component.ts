import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit
{

	forgetForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router) { }

	ngOnInit()
	{
		this.initForm();
	}

	initForm()
	{
		this.forgetForm = this.formBuilder.group(
		{
			email : ['', [Validators.required, Validators.email]]
		})
	}

	onSubmit()
	{
		console.log('toto');
		const email = this.forgetForm.get('email').value;
		this.authService.reset(email);
		this.router.navigate(['/auth', 'signin']);
	}

}
