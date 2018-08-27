import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/User.model';


import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit
{
	signupForm: FormGroup;
	errorMessage: string;
	constructor(private formBuilder: FormBuilder,
				private authService: AuthService,
				private userService: UserService,
				private router: Router)
	{

	}

	ngOnInit()
	{
		this.initForm();
	}

	initForm()
	{
		this.signupForm = this.formBuilder.group(
		{
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
			name: ['', [Validators.required]],
			firstname: ['', [Validators.required]]
		});
	}

	onSubmit()
	{
		const email = this.signupForm.get('email').value;
		const password = this.signupForm.get('password').value;
		const firstname = this.signupForm.get('firstname').value;
		const name = this.signupForm.get('name').value;
		const newUser = new User( email, firstname, name );

		this.userService.createNewUser(newUser);
		this.authService.createNewUser(email, password).then(
			() => {
				this.router.navigate(['/']);
			},
			(error) => {
				this.errorMessage = error;
			}
		) 
	}
}
