import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Elispot';

  openMenu() {
    const menu = document.querySelector('.menu');

    if (menu) {
      menu.classList.toggle('open');
    }
  }

  ngAfterViewInit() {}
}
