import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../classes/user.class';
import { UserService } from '../../services/user.service';
import { lastValueFrom } from 'rxjs';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatSelectModule, MatButtonModule, NgStyle, MatFormFieldModule, MatInputModule, NgFor, NgIf, HttpClientModule, MatSlideToggleModule, FormsModule, ReactiveFormsModule, MatDatepickerModule, MatExpansionModule, MatIconModule, MatFormFieldModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  maxDate: Date | undefined
  passErrors: string[] = []
  mailErrors: string[] = []
  @Input() formName = ''
  @Output() signUpComplete = new EventEmitter<void>();

  constructor(private http: HttpClient, private us: UserService, private ts: TransferService) { }


  ngOnInit() {
    this.maxDate = new Date();
  }


  signUpForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),
      user_type: new FormControl('private', Validators.required),
      phone_number: new FormControl('', Validators.required),
    }
  )


  usersValues() {
    if (this.signUpForm.valid) {
      const date = this.signUpForm.get('birthday')?.value;
      const birthday = date ? new DatePipe('en-GB').transform(date, 'yyyy-MM-dd')?.toString() : '';
      let user = new User({
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        name: this.signUpForm.get('firstName')?.value + ' ' + this.signUpForm.get('lastName')?.value,
        birthday: birthday || '',
        user_type: this.signUpForm.get('user_type')?.value,
        phone_number: this.signUpForm.get('phone_number')?.value,
      })
      return user
    }
    return undefined
  }


  async createUser() {
    let user = this.usersValues()
    if (user) {
      try {
        await this.signUp(user)
      } catch (error: any) {
        console.log(error);
      }
    }
  }


  async signUp(data: any) {
    try {
      let url = `http://localhost/signup.php`
      let response: any = await lastValueFrom(this.http.post(url, data));
      if (response && response.user_id) {
        this.conditionForAddUserForm(response)
        this.completeSignUp();
      }
    } catch (er: any) {
      console.log(er);
    }
  }


  conditionForAddUserForm(response: any) {
    if (this.formName === 'Add user') {
      let transfer: any = this.us.getDataInLocalStorage('currentTransfer')
      transfer.customer_information = response.user_id
      this.us.setDataInLocalStorage('currentTransfer', transfer)
      if (response.status === 'success') {
        this.us.customerInfo = true
      }
    }
  }


  completeSignUp() {
    this.signUpComplete.emit();
  }
}
