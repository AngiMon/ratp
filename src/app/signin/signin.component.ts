import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NodeService } from '../services/node.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

 signupForm: FormGroup;
	errorMessage: string;
	constructor(private formBuilder: FormBuilder,
				private authService: AuthService,
				private router: Router,
				private userService: UserService,
				private nodeService: NodeService)
	{}

	ngOnInit()
	{
		this.initForm();
	}

	initForm()
	{
		this.signupForm = this.formBuilder.group(
		{
			email: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	onSubmit()
	{
		const email = this.signupForm.get('email').value;
		const password = this.signupForm.get('password').value;

		this.authService.signInUser(email, password).then(
			() => {
				var user = this.userService.getUser(email);
				this.nodeService.Init(user);
				this.router.navigate(['/']);
			},
			(error) => {
				this.errorMessage = error;
			}) 
	}
}
