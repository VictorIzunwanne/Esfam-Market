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
    const menuShadow = document.querySelector('.nav-shadow') as HTMLDivElement;
    const body = document.querySelector('body') as HTMLBodyElement;
    const menu = document.querySelector('nav') as HTMLDivElement;

    if (menuShadow && body && menu) {
      menuShadow.classList.toggle('blurred');
      body.classList.toggle('hidden');
      menu.classList.toggle('open');
    }
  }

  closeMenu() {
    const menuShadow = document.querySelector('.nav-shadow') as HTMLDivElement;
    const body = document.querySelector('body') as HTMLBodyElement;
    const menu = document.querySelector('nav') as HTMLDivElement;

    if (menuShadow && body && menu) {
      menuShadow.classList.toggle('blurred');
      body.classList.toggle('hidden');
      menu.classList.toggle('open');
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
  }
}
