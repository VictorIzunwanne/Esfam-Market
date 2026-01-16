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
  protected title = 'Elispot';

  openMenu() {
    const menu = document.querySelector('.menu');
    const darkBg = document.querySelector('.dark-background');

    if (menu && darkBg) {
      menu.classList.toggle('open');
      darkBg.classList.toggle('show');
    }
  }

  closeMenu() {
    const menu = document.querySelector('.menu');
    const darkBg = document.querySelector('.dark-background');

    if (menu && darkBg) {
      menu.classList.remove('open');
      darkBg.classList.remove('show');
    }
  }

  ngAfterViewInit() {}
}
