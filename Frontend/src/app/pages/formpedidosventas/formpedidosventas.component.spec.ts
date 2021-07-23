import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpedidosventasComponent } from './formpedidosventas.component';

describe('FormpedidosventasComponent', () => {
  let component: FormpedidosventasComponent;
  let fixture: ComponentFixture<FormpedidosventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormpedidosventasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpedidosventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
