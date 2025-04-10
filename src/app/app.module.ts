import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoAngularMaterailModule } from './DemoAngularMaterialModule';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoAngularMaterailModule,
    FormsModule,     //FormsModule permet de lier les données avec [(ngModel)].
    ReactiveFormsModule,   //Formulaires réactifs (Reactive forms) 
    HttpClientModule, //permet d'envoyer des requêtes HTTP (GET, POST, PUT, DELETE...) vers un serveur backend.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
