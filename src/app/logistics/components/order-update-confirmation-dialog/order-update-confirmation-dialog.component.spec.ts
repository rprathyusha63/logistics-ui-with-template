import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUpdateConfirmationDialogComponent } from './order-update-confirmation-dialog.component';

describe('OrderUpdateConfirmationDialogComponent', () => {
  let component: OrderUpdateConfirmationDialogComponent;
  let fixture: ComponentFixture<OrderUpdateConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderUpdateConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderUpdateConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
