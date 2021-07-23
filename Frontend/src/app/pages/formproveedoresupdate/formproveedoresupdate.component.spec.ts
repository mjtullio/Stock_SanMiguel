import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormproveedoresupdateComponent } from './formproveedoresupdate.component';

describe('FormproveedoresupdateComponent', () => {
  let component: FormproveedoresupdateComponent;
  let fixture: ComponentFixture<FormproveedoresupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormproveedoresupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormproveedoresupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
