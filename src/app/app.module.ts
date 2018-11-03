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
import { OfferService } from './services/offer.service';
import { NodeService } from './services/node.service'; 
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './user-list/user-list.component';
import { AsksListComponent } from './asks-list/asks-list.component';
import { SingleAskComponent } from './single-ask/single-ask.component';
import { AskFormComponent } from './asks-list/ask-form/ask-form.component';
import { UserAsksComponent } from './user-asks/user-asks.component';
import { ForgetComponent } from './forget/forget.component';
import { OfferComponent } from './offer/offer.component';
import { FooterComponent } from './footer/footer.component';
import { RequestComponent } from './request/request.component';
import { DataTableModule } from "angular-6-datatable";
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DocumentComponent } from './document/document.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'nouvelle-demande', canActivate: [AuthGuardService], component: AskComponent },
  { path: 'demandes-en-cours', component: AsksListComponent},
  { path: 'demandes-en-cours/:id', component: SingleAskComponent},
  { path: 'mes-requetes', component: UserAsksComponent},
  { path: 'auth/reset', component: ForgetComponent},
  { path: 'mes-requetes/requete/:id', component: RequestComponent},
  { path: 'feuille-de-permutation-de-service/:id', component: DocumentComponent},
  { path: '', component: HomeComponent},

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
    ForgetComponent,
    OfferComponent,
    FooterComponent,
    RequestComponent,
    DocumentComponent,
    HomeComponent,
  ],
  imports: [
    SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn'
        }),
  	BrowserModule,
    DataTableModule,
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
  providers: [AuthService, AuthGuardService, UserService, AskService, OfferService, NodeService],
  bootstrap: [AppComponent],

})
export class AppModule { }

