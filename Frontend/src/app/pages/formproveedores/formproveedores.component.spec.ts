import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormproveedoresComponent } from './formproveedores.component';

describe('FormproveedoresComponent', () => {
  let component: FormproveedoresComponent;
  let fixture: ComponentFixture<FormproveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormproveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
