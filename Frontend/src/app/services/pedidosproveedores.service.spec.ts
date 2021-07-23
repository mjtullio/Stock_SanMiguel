import { TestBed } from '@angular/core/testing';

import { PedidosproveedoresService } from './pedidosproveedores.service';

describe('PedidosproveedoresService', () => {
  let service: PedidosproveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosproveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
