import { Injectable } from '@angular/core';
import { Transfer } from '../../classes/transfer.class.';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor() { }

  transfer: Transfer = {
    route: undefined,
    date: undefined,
    pick_up_time: undefined,
    number_of_passengers: undefined,
    drivers_id: undefined,
  }
}
