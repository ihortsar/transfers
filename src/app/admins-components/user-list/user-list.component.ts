import { NgFor } from '@angular/common';
import { Component, model } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, MatRadioModule, NgFor, MatFormFieldModule, MatSelectModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  selected: string[] = [];
  constructor(public us: UserService) { }



  ngOnInit(): void {
    this.selected = this.us.users.map(user => user.role || '');

  }

}
