import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredProducts } from './filtered-products';

describe('FilteredProducts', () => {
  let component: FilteredProducts;
  let fixture: ComponentFixture<FilteredProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
