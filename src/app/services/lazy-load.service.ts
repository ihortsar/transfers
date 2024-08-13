import { ComponentFactoryResolver, Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { UserListComponent } from '../admins-components/user-list/user-list.component';
import { CreateUserComponent } from '../admins-components/create-user/create-user.component';
import { ReviewerManagerComponent } from '../admins-components/reviewer-manager/reviewer-manager.component';
import { ManageBookingsComponent } from '../reviewers-components/manage-bookings/manage-bookings.component';
import { ManagersOptionsComponent } from '../managers-components/managers-options/managers-options.component';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadService {
  componentContainer: any = ''
  constructor(private componentFactoryResolver: ComponentFactoryResolver,) { }


  /**
    * Sets the container where dynamic components will be inserted.
    * 
    * @param {ViewContainerRef} container - The container where components should be injected.
    */
  setContainer(container: ViewContainerRef) {
    this.componentContainer = container;
  }


  /**
   * Loads a component into the container based on the provided component name.
   * Clears the existing content of the container before adding the new component.
   * 
   * @param {string} componentName - The name of the component to load.
   */
  loadForm(componentName: string) {
    let component = this.checkForComponent(componentName)
    if (component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      this.componentContainer.clear();
      this.componentContainer.createComponent(componentFactory);
    }
  }


  /**
   * Checks and returns the component class based on the provided component name.
   * 
   * @param {string} componentName - The name of the component to find.
   * @returns {any} The component class or `null` if no match is found.
   */
  checkForComponent(componentName: string) {
    let component: any;

    switch (componentName) {
      case 'View all users':
        component = UserListComponent;
        break;
      case 'Create a user':
        component = CreateUserComponent;
        break;
      case 'Other options of reviewer and manager':
        component = ReviewerManagerComponent;
        break;
      case 'Manage your bookings':
        component = ManageBookingsComponent;
        break;

      case 'Create new booking' ||
        'List existing bookings and view details' ||
        'Cancel existing booking':
        component = ManagersOptionsComponent;
        break;

      default:
        component = null;
    }
    return component
  }
}
