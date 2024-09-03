import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, RouterModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'world-transfer';
  userSignedIn = false
  constructor(public us: UserService, public router: Router) {
    this.userSignedIn = us.getDataInLocalStorage('currentUser')
  }



  backToNewTransfer() {
    this.us.deleteDataInLocalStorage('currentTransfer')
    this.router.navigate(['/'])
    this.us.customerInfo = false
  }


  logout() {
    this.us.deleteDataInLocalStorage('currentTransfer')
    this.us.deleteDataInLocalStorage('currentUser')
    this.us.customerInfo = false
    this.router.navigate(['/'])
  }
}
