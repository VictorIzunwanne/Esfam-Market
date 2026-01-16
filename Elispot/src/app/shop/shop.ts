import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [RouterLink],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  openFilter() {
    const filterBtn = document.querySelector('.filter');
    const filterElement = document.querySelector('.filter-element');

    if (filterBtn && filterElement) {
      filterElement.classList.add('open-filter');
    }
  }

  closeFilter() {
    const closeFilterBtn = document.querySelector('.close-filter-button');
    const filterElement = document.querySelector('.filter-element');

    if (closeFilterBtn && filterElement) {
      filterElement.classList.remove('open-filter');
    }
  }

  openTopSizes() {
    const top = document.querySelector('#top') as HTMLInputElement;
    const trouser = document.querySelector('#trouser') as HTMLInputElement;
    const topAndTrouser = document.querySelector(
      '.top-and-trouser'
    ) as HTMLElement;

    if (top?.checked === true || (trouser?.checked === true && topAndTrouser)) {
      topAndTrouser.style.display = 'flex';
    } else if (
      top?.checked === false ||
      (trouser?.checked === false && topAndTrouser)
    ) {
      topAndTrouser.style.display = 'none';
    }
  }
}
