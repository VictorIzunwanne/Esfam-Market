import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'market-app';

  openSearch() {
    const searchBar = document.querySelector('.search') as HTMLInputElement;

    const searchInput = document.querySelector(
      '.search input'
    ) as HTMLInputElement;

    if (searchBar && searchInput) {
      searchBar.style.blockSize === '5rem'
        ? ((searchBar.style.blockSize = '0'), searchInput.blur())
        : ((searchBar.style.blockSize = '5rem'), searchInput.focus());
    }
  }

  openMenu() {
    const menuShadow = document.querySelector('.nav-shadow');
    const menu = document.querySelector('nav');

    if (menuShadow && menu) {
      menuShadow.classList.contains('blurred')
        ? menuShadow.classList.remove('blurred')
        : menuShadow.classList.add('blurred');

      menu.classList.contains('open')
        ? menu.classList.remove('open')
        : menu.classList.add('open');
    }

    this.workWithBody();

    const cartShadow = document.querySelector('.cart-shadow');
    const cart = document.querySelector('.cart-section');

    if (cartShadow && cart) {
      cartShadow.classList.remove('blurred');
      cart.classList.remove('open-cart');
    }
  }

  workWithBody() {
    const cartShadow = document.querySelector('.cart-shadow');
    const body = document.querySelector('body');
    const menuShadow = document.querySelector('.nav-shadow');

    if (cartShadow && body && menuShadow) {
      if (menuShadow?.classList.contains('blurred')) {
        body?.classList.add('hidden');
      } else if (cartShadow?.classList.contains('blurred')) {
        body?.classList.add('hidden');
      } else if (
        menuShadow?.classList.contains('blurred') &&
        cartShadow?.classList.contains('blurred')
      ) {
        body?.classList.add('hidden');
      } else {
        body?.classList.remove('hidden');
      }
    }
  }

  constructor() {}

  ngAfterViewInit() {
    const balls = document.querySelectorAll('.balls');
    balls.forEach((ball) => {
      if (ball) {
        // Use percentages or smaller pixel values for better placement
        (ball as HTMLElement).style.bottom = `${Math.random() * 80}%`;
        (ball as HTMLElement).style.left = `${Math.random() * 90}%`;
        (ball as HTMLElement).style.transform = `scale(${
          0.7 + Math.random() * 0.6
        })`;
      }
    });

    const cartCount = document.querySelector('#cart-count');
    const cartProductContainer = document.querySelector('.cart-products');
    const cartProducts = cartProductContainer?.querySelectorAll('div');

    (cartCount as HTMLSpanElement).innerText = String(
      Number(cartProducts?.length)
    );
  }

  openCart() {
    const cartShadow = document.querySelector('.cart-shadow');
    const cart = document.querySelector('.cart-section');

    if (cart && cartShadow) {
      cartShadow?.classList.contains('blurred')
        ? cartShadow?.classList.remove('blurred')
        : cartShadow?.classList.add('blurred');

      cart.classList.contains('open-cart')
        ? cart.classList.remove('open-cart')
        : cart.classList.add('open-cart');
    }

    this.workWithBody();

    const menuShadow = document.querySelector('.nav-shadow');
    const menu = document.querySelector('nav');

    if (menuShadow && menu) {
      menu.classList.remove('open');
      menuShadow.classList.remove('blurred');
    }
  }
}
