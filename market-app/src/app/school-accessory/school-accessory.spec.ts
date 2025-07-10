import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAccessory } from './school-accessory';

describe('SchoolAccessory', () => {
  let component: SchoolAccessory;
  let fixture: ComponentFixture<SchoolAccessory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolAccessory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolAccessory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
