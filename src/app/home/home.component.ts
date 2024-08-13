import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { NgFor } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LazyLoadService } from '../services/lazy-load.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, MatMenuModule, MatButtonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  menuButtons: string[] = []
  @ViewChild('formComponent', { read: ViewContainerRef }) formComponent!: ViewContainerRef;


  constructor(public us: UserService, public ll: LazyLoadService) { }

  /**
   * Lifecycle hook that is called when the component is initialized.
   * Calls methods to get the logged-in user and configure menu options based on user role.
   */
  ngOnInit(): void {
    this.getUser()
    this.menuOptions()
  }


  /**
  * Lifecycle hook that is called after Angular has fully initialized all of its data-bound properties.
  * Used here to set up the form component container with a custom service.
  */
  ngAfterViewInit() {
    this.ll.setContainer(this.formComponent);
  }


  /**
   * Retrieves the logged-in user's role from local storage and assigns it to the `loggedUser` property.
   */
  getUser() {
    this.us.loggedUser = localStorage.getItem('loggedUser')
  }


  /**
   * Configures menu options based on the role of the logged-in user.
   * Updates the `menuButtons` array with different options for manager, admin, and reviewer roles.
   */
  menuOptions() {
    if (this.us.loggedUser === 'manager') {
      this.menuButtons.push('Create new booking',
        'List existing bookings and view details',
        'Cancel existing booking'
      )
    } else if (this.us.loggedUser === 'admin') {
      this.menuButtons.push('Create a user', 'View all users', 'Other options of reviewer and manager',)
    } else if (this.us.loggedUser === 'reviewer') {
      this.menuButtons.push('Manage your bookings')
    }
  }




}