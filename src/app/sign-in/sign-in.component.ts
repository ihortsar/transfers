import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatButtonModule, FormsModule, NgIf, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  invalidData: string = ''
  constructor(private router: Router, private us: UserService) {
  }

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', Validators.required);


  signin() {
    if (this.checkUser()) {
      this.router.navigate(['/home']);
      return true
    } else {
      this.displayError("Can't find the user");
      return false
    }
  }


  checkUser() {
    if (this.extractValues().username === 'admin') {
      this.us.loggedUser = 'admin'
      localStorage.setItem('loggedUser', this.us.loggedUser)
    } else if (this.extractValues().username === 'manager') {
      this.us.loggedUser = 'manager'
      localStorage.setItem('loggedUser', this.us.loggedUser)

    } else if (this.extractValues().username === 'reviewer') {
      this.us.loggedUser = 'reviewer'
      localStorage.setItem('loggedUser', this.us.loggedUser)

    } else {
      this.us.loggedUser = undefined
    }
    return this.us.loggedUser
  }


  extractValues() {
    const username = this.usernameFormControl.value as string
    const password = this.passwordFormControl.value as string
    console.log('value:', username);

    return { username, password }
  }


  displayError(message: string) {
    console.error(message);
  }
}