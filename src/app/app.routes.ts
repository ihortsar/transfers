import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'login', component: SignInComponent },
    { path: 'home', component: HomeComponent,/*  canActivate: [AuthGuard] */ },
];
