import { TestBed } from '@angular/core/testing';

import { LbreadcrumbService } from './lbreadcrumb.service';

describe('LbreadcrumbService', () => {
  let service: LbreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LbreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
