import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Esfam Market';

  isAdmin() {
    if (localStorage.getItem('isAdmin') === 'true') {
      this.router.navigate(['/esfam-market-admin-panel']);
    } else {
      this.router.navigate(['/admin-login']);
    }
  }

  constructor(private router: Router) {}

  openDropDown() {
    const dropMenu = document.querySelector('.dropdown-content');

    if (dropMenu) {
      dropMenu.classList.toggle('display');
    }
  }

  userName = localStorage.getItem('userName');
  sell: Boolean = false;

  logInOut() {
    const logOut = document.querySelector('.determine') as HTMLDivElement;

    if (logOut) {
      if (logOut.innerHTML === 'Login') {
        this.router.navigate(['/login']);
        return;
      }
    }
  }

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

      this.getUserCart();
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

  openMenu() {
    const menu = document.querySelector('.menu');
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;
    const body = document.body;

    if (menu && modalBackground && body) {
      menu.classList.add('opened');
      modalBackground.style.display = 'flex';
      body.classList.add('no-scroll');
    }
  }

  openMenuDropDown() {
    const dropdown = document.querySelector('.menu-drop-down');

    if (dropdown) {
      dropdown.classList.toggle('dropdown-opened');
    }
  }

  closeMenu() {
    const menu = document.querySelector('.menu');
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;
    const body = document.body;

    if (menu && modalBackground && body) {
      menu.classList.remove('opened');
      modalBackground.style.display = 'none';
      body.classList.remove('no-scroll');
    }

    this.closeShopMenu();
  }

  closeShopMenu() {
    const dropdown = document.querySelector('.menu-drop-down');

    if (dropdown) {
      dropdown.classList.remove('dropdown-opened');
    }
  }

  displayDetails(item: any) {
    console.log(
      'You are viewing an expanded version of this product',
      item.name
    );
  }

  ngAfterViewInit() {
    this.storedThemeF();
    this.getUserCart();
    this.cartCount();

    const loginOut = document.querySelector('.determine');

    if (loginOut) {
      if (localStorage.getItem('userName')) {
        loginOut.innerHTML = `Welcome, ${localStorage
          .getItem('userName')
          ?.toUpperCase()}`;

        return;
      }
    }
  }

  cart: any[] = [];

  async cartCount() {
    const cartCount = document.querySelector('.cart-count') as HTMLDivElement;

    if (cartCount) {
      try {
        const user = localStorage.getItem('userName');

        if (!user) {
          return;
        }

        const thisUser = await fetch(
          `https://esfam-market.onrender.com/api/users/${user}/getCart`,
          {
            credentials: 'include',
          }
        );

        if (!thisUser) {
          alert('There is a problem fetching cart information from the server');

          return;
        }

        const currentUser = await thisUser.json();
        cartCount.innerHTML = currentUser.length;
      } catch (error) {
        console.error('An error occured while trying to fetch the user cart');
      }
    }
  }

  async getUserCart() {
    try {
      const user = localStorage.getItem('userName');

      if (!user) {
        return;
      }

      const thisUser = await fetch(
        `https://esfam-market.onrender.com/api/users/${user}/getCart`,
        {
          credentials: 'include',
        }
      );

      if (!thisUser) {
        alert('There is a problem fetching cart information from the server');

        return;
      }

      const currentUser = await thisUser.json();
      this.cartCount();
      this.cart = currentUser;
    } catch (error) {
      console.error('An error occured while trying to fetch the user cart');
    }
  }

  async deleteProductFromCart(item: any) {
    try {
      const userName = localStorage.getItem('userName');
      const deleteItem = {
        itemId: item.productId,
        itemName: item.name,
      };

      if (!userName) {
        alert('User name is missing. Please re-login');

        this.router.navigate(['/login']);
        return;
      }

      const deleted = await fetch(
        `https://esfam-market.onrender.com/api/users/${userName}/cart`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(deleteItem),
          credentials: 'include',
        }
      );

      if (!deleted.ok) {
        console.log(
          'An error occured while trying to delete product from cart'
        );
        return;
      }

      const done = await deleted.json();
      alert('product deleted from cart');

      this.getUserCart();
    } catch (error) {
      console.error('Could not delete product from cart', error);
    }
  }
}
