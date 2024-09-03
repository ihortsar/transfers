import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DestinationsService } from '../services/destinations.service';
import { Transfer } from '../../classes/transfer.class.';
import { TransferService } from '../services/transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, FormsModule, NgIf, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, NgFor, HttpClientModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideNativeDateAdapter()]

})
export class HomeComponent implements OnInit {
  minDate: Date = new Date();
  transferForm: FormGroup
  addresses: any[] = []
  seatNumbers: number[] = [1, 2, 3, 4, 5, 6, 7];

  constructor(private router: Router, public us: UserService, private fb: FormBuilder, public ds: DestinationsService, public ts: TransferService) {
    this.transferForm = this.fb.group({
      departurePlace: ['', Validators.required],
      arrivalPlace: ['', Validators.required],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      numberOfPeople: ['', [Validators.required, Validators.min(1), Validators.max(7)]]
    });
  }


  async ngOnInit() {
    await this.us.loadData('users');
    this.addresses = await this.us.loadData('addresses');
    this.ds.drivers = await this.us.loadData('drivers')
  }


  async onSubmit() {
    if (this.transferForm.valid && this.ds.checkDepartureAndArrival()) {
      await this.ds.calculateDistance()
      this.ts.transfer = new Transfer({
        route: this.transferForm.value.departurePlace + '->' + this.transferForm.value.arrivalPlace,
        date: this.transformedDate(),
        pickup_time: this.transferForm.value.pickupTime,
        number_of_passengers: this.transferForm.value.numberOfPeople,
        drivers_id: this.ds.driversSortedByCity[0].id
      })
      this.us.setDataInLocalStorage('currentTransfer', this.ts.transfer)
      this.router.navigate(['/choose-vehicle']);
    } else {
      console.log('Form is invalid');
    }
  }


  transformedDate() {
    const datePipe = new DatePipe('en-US');
    const date = this.transferForm.value.pickupDate
    const formattedDate = datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate
  }
}