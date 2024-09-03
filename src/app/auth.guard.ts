import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';
import { TransferService } from './services/transfer.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private us: UserService, private ts: TransferService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const transfer = this.us.getDataInLocalStorage('currentTransfer');
        const user = this.us.getDataInLocalStorage('currentUser');
        const url: string = state.url;

        if (!transfer && !['/home', '/', '/login', '/users-transfers'].includes(url)) {
            this.router.navigate(['/home']);
            return false;
        }
        if (!user && !['/home', '/', '/choose-vehicle', '/login'].includes(url)) {
            this.router.navigate(['/home']);
            return false;
        }

        return true;
    }
}
