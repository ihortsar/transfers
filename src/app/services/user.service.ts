import { Injectable } from '@angular/core';
import { User } from '../user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: any = null

  constructor() { }

  users = [
    new User({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      birthday: '1990-05-14',
      role: 'Admin',
      active: true
    }),
    new User({
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      birthday: '1985-09-22',
      role: 'Reviewer',
      active: true

    }),
    new User({
      firstName: 'Carol',
      lastName: 'Williams',
      email: 'carol.williams@example.com',
      birthday: '1978-12-30',
      role: 'Manager',
      active: false

    }),
    new User({
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@example.com',
      birthday: '1982-02-19',
      role: 'Admin',
      active: true
    }),
    new User({
      firstName: 'Eve',
      lastName: 'Davis',
      email: 'eve.davis@example.com',
      birthday: '1993-07-09',
      role: 'Reviewer',
      active: true
    }),
    new User({
      firstName: 'Frank',
      lastName: 'Miller',
      email: 'frank.miller@example.com',
      birthday: '1980-11-01',
      role: 'Manager',
      active: true
    }),
    new User({
      firstName: 'Grace',
      lastName: 'Wilson',
      email: 'grace.wilson@example.com',
      birthday: '1988-04-23',
      role: 'Admin',
      active: true
    }),
    new User({
      firstName: 'Hannah',
      lastName: 'Moore',
      email: 'hannah.moore@example.com',
      birthday: '1995-06-15',
      role: 'Reviewer',
      active: false
    }),
    new User({
      firstName: 'Isaac',
      lastName: 'Taylor',
      email: 'isaac.taylor@example.com',
      birthday: '1992-10-30',
      role: 'Manager',
      active: true
    })
  ];

}
