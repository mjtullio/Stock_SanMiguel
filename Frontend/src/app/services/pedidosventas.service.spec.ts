import { TestBed } from '@angular/core/testing';

import { PedidosventasService } from './pedidosventas.service';

describe('PedidosventasService', () => {
  let service: PedidosventasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidosventasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
