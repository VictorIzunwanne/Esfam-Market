import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edible } from './edible';

describe('Edible', () => {
  let component: Edible;
  let fixture: ComponentFixture<Edible>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Edible]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Edible);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
