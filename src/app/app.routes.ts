import { Routes } from '@angular/router';
import { SignInComponent } from './auth.components/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { ChooseVehicleComponent } from './choose-vehicle/choose-vehicle.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { UsersTransfersComponent } from './users-transfers/users-transfers.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'choose-vehicle', component: ChooseVehicleComponent, canActivate: [AuthGuard] },
    { path: 'confirm', component: ConfirmBookingComponent, canActivate: [AuthGuard] },
    { path: 'users-transfers', component: UsersTransfersComponent, canActivate: [AuthGuard] },
];
