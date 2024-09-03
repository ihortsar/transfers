import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatButtonModule, FormsModule, NgIf, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  invalidData: string = '';

  constructor(private router: Router, private us: UserService, private ts: TransferService, private http: HttpClient) {
  }

  emailFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', Validators.required);


  async signin() {
    const url = `http://localhost/login.php`;
    let body = {
      'email': this.extractValues().email,
      'password': this.extractValues().password,
    }
    try {
      const response = await lastValueFrom(this.http.post<any>(url, body));
      if (response && response.user && response.user.id) {
        const user = response.user;
        this.us.setDataInLocalStorage('currentUser', user)
        this.router.navigate(['/confirm']);
        this.setUsersType()
        this.ts.transfer.created_by = user.id;
        this.us.setDataInLocalStorage('currentTransfer', this.ts.transfer)
      } else {
        this.invalidData = response.message;
      }
    } catch (er) {
      console.log(er);
    }
  }


  extractValues() {
    const email = this.emailFormControl.value as string
    const password = this.passwordFormControl.value as string
    return { email, password }
  }


  displayError(message: string) {
    console.error(message);
  }


  setUsersType() {
    let currentUser: any = this.us.getDataInLocalStorage('currentUser');
    let usersType = currentUser.users_type;
    if (usersType === 'private') {
      this.ts.transfer.customer_information = currentUser.id;
    } else {
      this.ts.transfer.customer_information = undefined;
    }
  }


  async logInRedirectBasedOnTransfers() {
    const transfers = await this.us.checkUsersTransfers();
    if (transfers.length === 0) {
      console.log('No transfers found for the user.');
    }
  }
}