import { Component, OnInit } from '@angular/core';
import { TransferService } from '../services/transfer.service';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { SignupComponent } from "../auth.components/signup/signup.component";
import { User } from '../../classes/user.class';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-booking',
  standalone: true,
  imports: [NgIf, MatButtonModule, SignupComponent],
  templateUrl: './confirm-booking.component.html',
  styleUrl: './confirm-booking.component.scss'
})
export class ConfirmBookingComponent implements OnInit {
  constructor(public ts: TransferService, private http: HttpClient, public us: UserService, private router: Router) { }
  transfer: any
  signUp = false
  formName = 'Add user'

  ngOnInit(): void {
    this.transfer = this.us.getDataInLocalStorage('currentTransfer');
    let user: any = this.us.getDataInLocalStorage('currentUser')
    if (user.user_type === 'private') {
      this.transfer.customer_information = user.id;
      this.transfer.created_by = user.id;
      this.us.setDataInLocalStorage('currentTransfer', this.transfer)
    }
    if (this.transfer.customer_information) {
      this.us.customerInfo = true
    }
  }


  checkForUserType(): boolean {
    if (typeof localStorage !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user: User = JSON.parse(storedUser);
        return user?.user_type === 'private';
      }
    }
    return false;
  }


  async sendTransferToDB() {
    try {
      this.transfer = this.us.getDataInLocalStorage('currentTransfer')
      const url = `http://localhost/create_transfer.php`;
      await lastValueFrom(this.http.post<any>(url, this.transfer));
      this.router.navigate(['/users-transfers'])
      this.us.customerInfo = false
    } catch (er) {
      console.log(er);
    }
  }


  onSignUpComplete() {
    this.signUp = false;
  }


  openSignUp() {
    this.signUp = true
  }
}
