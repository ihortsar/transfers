import { TestBed } from '@angular/core/testing';

import { DestinationsService } from '../services/destinations.service';
import { beforeEach, describe, it } from 'node:test';

describe('DestinationsService', () => {
  let service: DestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationsService);
  });


});
function expect(service: DestinationsService) {
  throw new Error('Function not implemented.');
}

