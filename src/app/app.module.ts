import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AskComponent } from './ask/ask.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/authGuard.service';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'nouvelle-demande', canActivate: [AuthGuardService], component: AskComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    AskComponent,
    AuthComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
  ],
  imports: [
  	BrowserModule,
  	HttpModule,
  	HttpClientModule,
  	ReactiveFormsModule,
  	RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ,
    BrowserModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

