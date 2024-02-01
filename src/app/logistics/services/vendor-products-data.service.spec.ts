import { TestBed } from '@angular/core/testing';

import { VendorProductsDataService } from './vendor-products-data.service';

describe('VendorProductsDataService', () => {
  let service: VendorProductsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorProductsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
