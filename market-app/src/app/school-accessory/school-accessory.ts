import { Component } from '@angular/core';

@Component({
  selector: 'app-school-accessory',
  imports: [],
  templateUrl: './school-accessory.html',
  styleUrl: './school-accessory.css',
})
export class SchoolAccessory {
  ngAfterViewInit() {
    this.mostPurchasedProducts();
  }

  products: any[] = [];

  async mostPurchasedProducts() {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) throw new Error(response.status.toString());
      this.products = await response.json();
    } catch (error) {
      console.error('Cannot fetch most purchased products', error);
    }
  }

  showForm(e: Event) {
    e.preventDefault();

    (e.target as HTMLFormElement).reset();

    this.openSearch();
  }

  openSearch() {
    const search = document.querySelector('.search-results');
    const form = document.querySelector('form');
    // const searchContent = document.querySelector('.content');

    // console.log(searchContent);
    if (form) {
      (form as HTMLFormElement)['disabled'] = true;
    }

    search?.classList.add('searched');
  }

  closeSearch() {
    const search = document.querySelector('.search-results');

    search?.classList.remove('searched');
  }
}
