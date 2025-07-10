import { Component } from '@angular/core';

@Component({
  selector: 'app-sell',
  imports: [],
  templateUrl: './sell.html',
  styleUrl: './sell.css',
})
export class Sell {
  startUpload() {
    const uploadForm = document.querySelector('.upload-form');
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;
    const name = document.querySelector('#product-name') as HTMLInputElement;
    const nameBtn = document.querySelector('.submit-name') as HTMLButtonElement;

    if (uploadForm && modalBackground && name && nameBtn) {
      modalBackground.style.display = 'flex';
      uploadForm.classList.add('start-upload');
      name['disabled'] = false;
      nameBtn['disabled'] = false;
      name.focus();
    }
  }

  stopUpload() {
    const uploadForm = document.querySelector('.upload-form');
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;

    const forms = document.querySelectorAll('form');

    if (uploadForm && modalBackground && forms) {
      modalBackground.style.display = 'none';
      uploadForm.classList.remove('start-upload');

      forms.forEach((form) => {
        (form as HTMLFormElement).reset();
      });
    }
  }

  description(e: Event) {
    e.preventDefault();

    const name = document.querySelector('#product-name') as HTMLInputElement;
    const nameBtn = document.querySelector('.submit-name') as HTMLButtonElement;
    const description = document.querySelector(
      '#product-description'
    ) as HTMLInputElement;
    const descriptionBtn = document.querySelector(
      '.submit-description'
    ) as HTMLButtonElement;

    if (name && nameBtn && description && descriptionBtn) {
      name['disabled'] = true;
      nameBtn['disabled'] = true;
      description['disabled'] = false;
      description.focus();
      descriptionBtn['disabled'] = false;
    }
  }

  priceStock(e: Event) {
    e.preventDefault();

    const description = document.querySelector(
      '#product-description'
    ) as HTMLFormElement;
    const descriptionBtn = document.querySelector(
      '.submit-description'
    ) as HTMLButtonElement;

    const productPrice = document.querySelector(
      '#product-price'
    ) as HTMLInputElement;
    const productStock = document.querySelector(
      '#product-stock'
    ) as HTMLInputElement;
    const priceStockBtn = document.querySelector(
      '.submit-price-stock'
    ) as HTMLButtonElement;

    if (
      description &&
      descriptionBtn &&
      productPrice &&
      productStock &&
      priceStockBtn
    ) {
      description['disabled'] = true;
      descriptionBtn['disabled'] = true;
      productPrice['disabled'] = false;
      productPrice.focus();
      productStock['disabled'] = false;
      priceStockBtn['disabled'] = false;
    }
  }

  category(e: Event) {
    e.preventDefault();

    const productPrice = document.querySelector(
      '#product-price'
    ) as HTMLInputElement;
    const productStock = document.querySelector(
      '#product-stock'
    ) as HTMLInputElement;
    const priceStockBtn = document.querySelector(
      '.submit-price-stock'
    ) as HTMLButtonElement;

    if (productPrice && productStock && priceStockBtn) {
      productPrice['disabled'] = true;
      productStock['disabled'] = true;
      priceStockBtn['disabled'] = true;
    }
  }
}
