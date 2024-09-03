import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-transfers',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule],
  templateUrl: './users-transfers.component.html',
  styleUrl: './users-transfers.component.scss'
})
export class UsersTransfersComponent implements OnInit {
  usersTransfers: any[] = []

  constructor(public us: UserService, private router: Router) { }


  async ngOnInit() {
    let response = await this.us.checkUsersTransfers();
    this.usersTransfers = response.transfers;
  }


  formatTime(time: string) {
    if (!time) return '';
    const parts = time.split(':');
    return `${parts[0]}:${parts[1]}`;
  }
}
