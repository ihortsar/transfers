import { Component, OnInit } from '@angular/core';
import { TransferService } from '../services/transfer.service';
import { UserService } from '../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { DestinationsService } from '../services/destinations.service';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from "../auth.components/sign-in/sign-in.component";
import { SignupComponent } from "../auth.components/signup/signup.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-vehicle',
  standalone: true,
  imports: [MatButtonModule, NgFor, NgIf, SignInComponent, SignupComponent],
  templateUrl: './choose-vehicle.component.html',
  styleUrl: './choose-vehicle.component.scss'
})
export class ChooseVehicleComponent implements OnInit {
  constructor(public ts: TransferService, private us: UserService, private ds: DestinationsService, private router: Router) { }
  signUp = false
  vehicles: any[] = []
  vehicleClasses: any[] = []
  prices: number[] = []
  signedIn = false

  async ngOnInit() {
    this.vehicleClasses = await this.us.loadData('vehicle_classes');
    this.us.setDataInLocalStorage('distance', this.ds.distance)
    this.countClassPrices()
    let user = this.us.getDataInLocalStorage('currentUser')
    this.signedIn = user
  }


  countClassPrices() {
    let distance = this.us.getDataInLocalStorage('distance')
    this.vehicleClasses.forEach((vehicleClass: any) => {
      let classPrice = (vehicleClass.fare * distance).toFixed(2);
      this.prices.push(+classPrice);
    })
  }


  addFareToTransfer(fare: number) {
    this.ts.transfer.fare = fare;
  }


  addVehicleClassToTransfer(vehicle_class: number) {
    this.ts.transfer.vehicle_class = vehicle_class;
  }


  addFareAndClass(fare: number, vehicle_class: number) {
    this.addFareToTransfer(fare)
    this.addVehicleClassToTransfer(vehicle_class)
    this.addCustomerInfo()
  }


  openSignUp() {
    this.signUp = true
  }


  onSignUpComplete() {
    this.signUp = false;
  }


  addCustomerInfo() {
    if (this.signedIn) {
      let user: any = this.us.getDataInLocalStorage('currentUser')
      let created_by = user.id
      if (user.user_type === 'agency') {
        this.ts.transfer.customer_information = null
      }
      this.ts.transfer.created_by = created_by
      this.us.setDataInLocalStorage('currentTransfer', this.ts.transfer)
      this.router.navigate(['/confirm'])
    }
  }


  checkCapacityWithPassengersNumber(className: string) {
    if (this.ts.transfer.number_of_passengers > 3 && className === 'sedan') {
      return false
    } else {
      return true
    }
  }
}