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
  protected title = 'Esfam Market';

  constructor() {}

  closeDropDowns() {
    const dropMenu = document.querySelector('.dropdown-content');
    const themeMenu = document.querySelector('.theme-container');
    const accountMenu = document.querySelector('.account-container');

    if (dropMenu && themeMenu && accountMenu) {
      if (
        dropMenu.classList.contains('display') ||
        themeMenu.classList.contains('display') ||
        accountMenu.classList.contains('display')
      ) {
        setTimeout(() => {
          accountMenu.classList.remove('display');
          themeMenu.classList.remove('display');
          dropMenu.classList.remove('display');
        }, 5000);
      }
    }
  }

  openMenu() {
    console.log('Menu opened!');
  }

  openDropDown() {
    const dropMenu = document.querySelector('.dropdown-content');

    if (dropMenu) {
      dropMenu.classList.toggle('display');
    }
  }

  sell = false;

  openThemeMenu() {
    const themeMenu = document.querySelector('.theme-container');
    const accountMenu = document.querySelector('.account-container');

    if (themeMenu && accountMenu) {
      themeMenu.classList.toggle('display');
      accountMenu.classList.remove('display');
    }
  }

  openAccountMenu() {
    const accountMenu = document.querySelector('.account-container');
    const themeMenu = document.querySelector('.theme-container');

    if (accountMenu && themeMenu) {
      accountMenu.classList.toggle('display');
      themeMenu.classList.remove('display');
    }
  }

  // THEME FUNCTION

  setBackgroundColor(color: string) {
    document.documentElement.style.setProperty('--background-color', color);
  }

  setTextColor(color: string) {
    document.documentElement.style.setProperty('--primary-text-color', color);
  }

  setOtherColor(color: string) {
    document.documentElement.style.setProperty('--other-color', color);
  }

  storedTheme = localStorage.getItem('theme');

  storedThemeF() {
    const lightTheme = document.querySelector('.light-theme');
    const darkTheme = document.querySelector('.dark-theme');
    const autoTheme = document.querySelector('.auto-theme');

    if (this.storedTheme === 'light') {
      this.light();
      lightTheme?.classList.add('active');
    } else if (this.storedTheme === 'dark') {
      this.dark();
      darkTheme?.classList.add('active');
    } else if (this.storedTheme === 'auto') {
      this.auto();
      autoTheme?.classList.add('active');
    }
  }

  private autoIntervalId: any;

  auto() {
    if (this.autoIntervalId) {
      clearInterval(this.autoIntervalId);
    }
    this.autoIntervalId = setInterval(() => {
      const hour = new Date().getHours();

      if (hour < 7) {
        this.dark();
      } else if (hour >= 7 && hour < 19) {
        this.light();
      } else if (hour >= 19) {
        this.dark();
      }
    }, 1000);
  }

  light() {
    this.setBackgroundColor('#fff');
    this.setTextColor('#000');
    this.setOtherColor('#f7f7f7');
  }

  dark() {
    this.setBackgroundColor('#222222');
    this.setTextColor('#fff');
    this.setOtherColor('#464646');
  }

  lightTheme() {
    const lightTheme = document.querySelector('.light-theme');

    if (lightTheme) {
      this.light();

      localStorage.setItem('theme', 'light');
    }

    if (this.autoIntervalId) {
      clearInterval(this.autoIntervalId);
      this.autoIntervalId = null;
    }

    const darkTheme = document.querySelector('.dark-theme');
    const autoTheme = document.querySelector('.auto-theme');

    lightTheme?.classList.add('active');
    darkTheme?.classList.remove('active');
    autoTheme?.classList.remove('active');
  }

  darkTheme() {
    const darkTheme = document.querySelector('.dark-theme');

    if (darkTheme) {
      this.dark();

      localStorage.setItem('theme', 'dark');
    }

    if (this.autoIntervalId) {
      clearInterval(this.autoIntervalId);
      this.autoIntervalId = null;
    }

    const lightTheme = document.querySelector('.light-theme'); // FIXED
    const autoTheme = document.querySelector('.auto-theme');

    darkTheme?.classList.add('active');
    lightTheme?.classList.remove('active');
    autoTheme?.classList.remove('active');
  }

  autoTheme() {
    const autoTheme = document.querySelector('.auto-theme');

    if (autoTheme) {
      this.auto();

      localStorage.setItem('theme', 'auto');
    }

    const darkTheme = document.querySelector('.dark-theme');
    const lightTheme = document.querySelector('.light-theme'); // FIXED

    autoTheme?.classList.add('active');
    lightTheme?.classList.remove('active');
    darkTheme?.classList.remove('active');
  }

  openWishlist() {
    const wishlist = document.querySelector('.wishlist');
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;
    const body = document.body;

    if (wishlist && modalBackground && body) {
      wishlist.classList.add('opened');
      modalBackground.style.display = 'flex';
      body.classList.add('no-scroll');
    }
  }

  closeWishlist() {
    const wishlist = document.querySelector('.wishlist');
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;
    const body = document.body;

    if (wishlist && modalBackground && body) {
      wishlist.classList.remove('opened');
      modalBackground.style.display = 'none';
      body.classList.remove('no-scroll');
    }
  }

  openCart() {
    const cart = document.querySelector('.cart');
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;
    const body = document.body;

    if (cart && modalBackground && body) {
      cart.classList.add('opened');
      modalBackground.style.display = 'flex';
      body.classList.add('no-scroll');
    }
  }

  closeCart() {
    const cart = document.querySelector('.cart');
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;
    const body = document.body;

    if (cart && modalBackground && body) {
      cart.classList.remove('opened');
      modalBackground.style.display = 'none';
      body.classList.remove('no-scroll');
    }
  }

  // THEME FUNCTION END

  ngAfterViewInit() {
    this.storedThemeF();
  }
}
