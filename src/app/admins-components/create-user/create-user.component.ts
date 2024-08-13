import { Component, inject, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../user.class';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { UserService } from '../../services/user.service';
import { LazyLoadService } from '../../services/lazy-load.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-create-user',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  imports: [MatCardModule, MatRadioModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatButtonModule, FormsModule, NgIf, NgFor, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  selected = '';
  maxDate: Date | undefined
  passErrors: string[] = []
  mailErrors: string[] = []
  userCreated = false
  user: User | undefined
  constructor(private us: UserService, public ll: LazyLoadService) { }



  ngOnInit() {
    this.maxDate = new Date();
  }


  /**
   * Form group used for adding a new user.
   * Contains form controls for the user's first name, last name, birthday, email, role, and status.
   */
  addUserForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('Reviewer', Validators.required),
      status: new FormControl(true, Validators.required),
    }
  )


  /**
    * Converts the form data into a `User` object if the form is valid.
    * Transforms the `birthday` field to a `yyyy-MM-dd` string format.
    * 
    * @returns {User | undefined} A `User` object if the form is valid, otherwise `undefined`.
    */
  usersValues() {
    if (this.addUserForm.valid) {
      const date = this.addUserForm.get('birthday')?.value as string | undefined;
      const birthday = date ? new DatePipe('en-GB').transform(date, 'yyyy-MM-dd')?.toString() : '';
      let user = new User({
        email: this.addUserForm.get('email')?.value as string,
        firstName: this.addUserForm.get('firstName')?.value as string,
        lastName: this.addUserForm.get('lastName')?.value as string,
        birthday: birthday || '',
        role: this.selected || '',
        active: this.addUserForm.get('status')?.value
      })
      return user
    }
    return undefined
  }


  /**
     * Creates a new user by extracting form values and adding the user to the list.
     * Displays a success message and redirects to 'View all users' after a delay.
     * 
     * @returns {Promise<void>}
     */
  async createUser() {
    this.user = this.usersValues()
    if (this.user) {
      this.us.users.unshift(this.user)
      console.log(this.us.users);

      this.userCreated = true
      setTimeout(() => {
        this.ll.loadForm('View all users')
      }, 2000);
    }
  }
}
