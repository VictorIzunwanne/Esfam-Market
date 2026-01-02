import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TAndC } from './t-and-c';

describe('TAndC', () => {
  let component: TAndC;
  let fixture: ComponentFixture<TAndC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TAndC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TAndC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
