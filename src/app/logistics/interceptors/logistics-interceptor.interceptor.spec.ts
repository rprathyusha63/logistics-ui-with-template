import { TestBed } from '@angular/core/testing';

import { LogisticsInterceptorInterceptor } from './logistics-interceptor.interceptor';

describe('LogisticsInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LogisticsInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LogisticsInterceptorInterceptor = TestBed.inject(LogisticsInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
