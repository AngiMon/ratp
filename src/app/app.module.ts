import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AskComponent } from './ask/ask.component';

const appRoutes: Routes = [
  { path: 'nouvelle-demande', component: AskComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AskComponent
  ],
  imports: [
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

