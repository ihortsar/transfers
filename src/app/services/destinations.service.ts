import { Injectable } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  googleMapApi = 'AIzaSyCFHWFqS7so7BKfoeECJvb6KfW-FusXqmY'
  departurePlace: any
  arrivalPlace: any
  standardPriceForKM = 4.50
  distance = 0
  duration = null
  fare = 0
  drivers: any[] = []
  driversSortedByCity: any[] = []
  errorSameDepartureDestination = ''

  async calculateDistance() {
    try {
      const response = await fetch(`http://localhost/distance_matrix_proxy.php?departure_place=${encodeURIComponent(this.departurePlace)}&arrival_place=${encodeURIComponent(this.arrivalPlace)}`);
      const data = await response.json();

      if (data.rows[0] && data.rows[0].elements[0]) {
        const distanceAsText = data.rows[0].elements[0].distance.text;
        this.duration = data.rows[0].elements[0].duration.text;
        this.distance = parseFloat(distanceAsText.split(' ')[0].replace(',', '.'));
      } else {
        console.error('Invalid response data', data);
      }
    } catch (error) {
      console.error('Error fetching distance data:', error);
    }
  }



  onDepartureChange(event: MatSelectChange) {
    this.departurePlace = event.value;
    this.assignDriver(this.departurePlace);
    this.checkDepartureAndArrival()
  }


  onArrivalChange(event: MatSelectChange) {
    this.arrivalPlace = event.value;
    this.checkDepartureAndArrival()
  }


  checkDepartureAndArrival() {
    if (this.departurePlace === this.arrivalPlace) {
      this.errorSameDepartureDestination = 'Dein Abfahrt- und Ankunftpünkte dürfen nich gleich sein';
      return false
    } else {
      this.errorSameDepartureDestination = ''
    }
    return true
  }


  calculatePrice(price: number) {
    if (this.distance) {
      return price * this.distance
    }
    return 0
  }


  async assignDriver(pickUpAddress: string) {
    const lastCommaIndex = pickUpAddress.lastIndexOf(',');
    const city = pickUpAddress.substring(lastCommaIndex + 1).trim();
    this.driversSortedByCity = this.drivers.filter((driver: any) =>
      driver.city === city
    )
  }
}