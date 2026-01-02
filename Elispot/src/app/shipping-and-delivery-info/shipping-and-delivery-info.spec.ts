import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAndDeliveryInfo } from './shipping-and-delivery-info';

describe('ShippingAndDeliveryInfo', () => {
  let component: ShippingAndDeliveryInfo;
  let fixture: ComponentFixture<ShippingAndDeliveryInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingAndDeliveryInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingAndDeliveryInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
