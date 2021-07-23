import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtiposComponent } from './formtipos.component';

describe('FormtiposComponent', () => {
  let component: FormtiposComponent;
  let fixture: ComponentFixture<FormtiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormtiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
