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
import { AskService } from './services/ask.service';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './user-list/user-list.component';
import { AsksListComponent } from './asks-list/asks-list.component';
import { SingleAskComponent } from './single-ask/single-ask.component';
import { AskFormComponent } from './asks-list/ask-form/ask-form.component';
import { UserAsksComponent } from './user-asks/user-asks.component';
//import { OfferComponent } from './offer/offer.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'nouvelle-demande', canActivate: [AuthGuardService], component: AskComponent },
  { path: 'demandes-en-cours', component: AsksListComponent},
  { path: 'demandes-en-cours/:id', component: SingleAskComponent},
  { path: 'mes-demandes', component: UserAsksComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    AskComponent,
    AsksListComponent,
    SingleAskComponent,
    AuthComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    UserListComponent,
    AskFormComponent,
    UserAsksComponent,
   // OfferComponent,
  ],
  imports: [
  	BrowserModule,
  	HttpModule,
  	HttpClientModule,
  	ReactiveFormsModule,
  	RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ,
    BrowserModule
  ],
  providers: [AuthService, AuthGuardService, UserService, AskService],
  bootstrap: [AppComponent]
})
export class AppModule { }

