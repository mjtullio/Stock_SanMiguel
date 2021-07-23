import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdetallesComponent } from './formdetalles.component';

describe('FormdetallesComponent', () => {
  let component: FormdetallesComponent;
  let fixture: ComponentFixture<FormdetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormdetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
