import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor(private router: Router, private us: UserService) { }

    canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {


        if (localStorage.getItem('loggedUser')) {

            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
