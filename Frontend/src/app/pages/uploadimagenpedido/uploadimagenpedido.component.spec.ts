import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadimagenpedidoComponent } from './uploadimagenpedido.component';

describe('UploadimagenpedidoComponent', () => {
  let component: UploadimagenpedidoComponent;
  let fixture: ComponentFixture<UploadimagenpedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadimagenpedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadimagenpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
