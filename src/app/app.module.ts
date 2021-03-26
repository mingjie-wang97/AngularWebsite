import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { ProfileComponent } from './account/profile/profile.component';
import { HeaderComponent } from './commons/header/header.component';
import { FooterComponent } from './commons/footer/footer.component';
import { ErrorPageComponent } from './commons/error-page/error-page.component';
import { FaqComponent } from './commons/faq/faq.component';
import { HomeComponent } from './home/home.component';
import { ProgressBarComponent } from './commons/progress-bar/progress-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToTheMaxComponent } from './projects/to-the-max/to-the-max.component';
import { PasswordKeeperComponent } from './projects/password-keeper/password-keeper.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    FaqComponent,
    HomeComponent,
    ProgressBarComponent,
    ToTheMaxComponent,
    PasswordKeeperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
