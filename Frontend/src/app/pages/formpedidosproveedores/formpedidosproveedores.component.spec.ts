import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpedidosproveedoresComponent } from './formpedidosproveedores.component';

describe('FormpedidosproveedoresComponent', () => {
  let component: FormpedidosproveedoresComponent;
  let fixture: ComponentFixture<FormpedidosproveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormpedidosproveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpedidosproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
