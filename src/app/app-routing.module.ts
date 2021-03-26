import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { ProfileComponent } from './account/profile/profile.component';
import { SignupComponent } from './account/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PasswordKeeperComponent } from './projects/password-keeper/password-keeper.component';
import { ToTheMaxComponent } from './projects/to-the-max/to-the-max.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'account',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  {
    path: 'project',
    children: [
      { path: 'to-the-max', component: ToTheMaxComponent },
      { path: 'password-keeper', component: PasswordKeeperComponent }
    ]
  },
  { path: '#', redirectTo: '' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
