import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AskComponent } from './ask/ask.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'nouvelle-demande', component: AskComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AskComponent,
  ],
  imports: [
  	BrowserModule,
  	ReactiveFormsModule,
  	RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

