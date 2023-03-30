import { TestBed } from '@angular/core/testing';

import { PaymentauthService } from './paymentauth.service';

describe('PaymentauthService', () => {
  let service: PaymentauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
