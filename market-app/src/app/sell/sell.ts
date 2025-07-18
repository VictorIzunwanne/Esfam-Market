import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  imports: [],
  templateUrl: './sell.html',
  styleUrl: './sell.css',
})
export class Sell {
  constructor(private productService: ProductService, private router: Router) {}

  isSeller: Boolean = false;

  ngAfterViewInit() {
    this.findIfUserIsSeller();
  }
  userName = localStorage.getItem('userName');

  async findIfUserIsSeller() {
    const isUserSeller = await fetch(
      `http://192.168.15.213:3000/api/users/${this.userName}`
    );

    try {
      if (!isUserSeller.ok) {
        throw new Error(isUserSeller.status.toString());
      }

      const result = await isUserSeller.json();

      if (!result) {
        alert(
          'You are not registered as a seller. Please register as a seller'
        );

        this.router.navigate(['/seller-register']);

        return;
      }
    } catch (error) {
      console.error('Something went wrong somewhere', error);
    }
  }

  sellerId = localStorage.getItem('sellerId') || '686288f0421c92c917c8b665';

  startUpload() {
    const btn = document.querySelector(
      '.upload-finished-product'
    ) as HTMLButtonElement;
    btn.innerText = 'Upload';

    const uploadForm = document.querySelector('.upload-form');
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;

    if (uploadForm && modalBackground) {
      modalBackground.style.display = 'flex';
      uploadForm.classList.add('start-upload');
    }

    this.name();
  }

  stopUpload() {
    const btn = document.querySelector(
      '.upload-finished-product'
    ) as HTMLButtonElement;
    btn.innerText = 'Upload';

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

  name() {
    const name = document.querySelector('#product-name') as HTMLInputElement;
    const nameBtn = document.querySelector('.submit-name') as HTMLButtonElement;

    const description = document.querySelector(
      '#product-description'
    ) as HTMLInputElement;
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

    const categories = document.querySelector(
      '#categories'
    ) as HTMLSelectElement;
    const gender = document.querySelector('#gender') as HTMLSelectElement;
    const categoriesGender = document.querySelector(
      '.submit-category'
    ) as HTMLButtonElement;

    const primaryImageSelect = document.querySelector(
      '#primaryImage'
    ) as HTMLInputElement;
    const secondaryImageSelect = document.querySelector(
      '#secondaryImage'
    ) as HTMLInputElement;
    const thirdImageSelect = document.querySelector(
      '#thirdImage'
    ) as HTMLInputElement;
    const submitImage = document.querySelector(
      '.submit-image'
    ) as HTMLButtonElement;
    const uploadProductBtn = document.querySelector(
      '.upload-finished-product'
    ) as HTMLButtonElement;

    if (
      name &&
      nameBtn &&
      description &&
      descriptionBtn &&
      productPrice &&
      productStock &&
      priceStockBtn &&
      categories &&
      gender &&
      categoriesGender &&
      primaryImageSelect &&
      secondaryImageSelect &&
      thirdImageSelect &&
      submitImage &&
      uploadProductBtn
    ) {
      name['disabled'] = false;
      name.focus();
      nameBtn['disabled'] = false;
      description['disabled'] = true;
      descriptionBtn['disabled'] = true;
      productPrice['disabled'] = true;
      productStock['disabled'] = true;
      priceStockBtn['disabled'] = true;
      categories['disabled'] = true;
      gender['disabled'] = true;
      categoriesGender['disabled'] = true;
      primaryImageSelect['disabled'] = true;
      secondaryImageSelect['disabled'] = true;
      thirdImageSelect['disabled'] = true;
      submitImage['disabled'] = true;
      uploadProductBtn['disabled'] = true;
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
    const productName = document.querySelector(
      '.preiew-product-name'
    ) as HTMLDivElement;

    if (name && nameBtn && description && descriptionBtn && productName) {
      name['disabled'] = true;
      nameBtn['disabled'] = true;
      description['disabled'] = false;
      description.focus();
      descriptionBtn['disabled'] = false;

      productName.innerText = name['value'];
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
    const desc = document.querySelector('.desc') as HTMLDivElement;

    if (
      description &&
      descriptionBtn &&
      productPrice &&
      productStock &&
      priceStockBtn &&
      desc
    ) {
      description['disabled'] = true;
      descriptionBtn['disabled'] = true;
      productPrice['disabled'] = false;
      productPrice.focus();
      productStock['disabled'] = false;
      priceStockBtn['disabled'] = false;
      desc.innerText = description['value'];
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

    const categories = document.querySelector(
      '#categories'
    ) as HTMLSelectElement;
    const gender = document.querySelector('#gender') as HTMLSelectElement;
    const categoriesGender = document.querySelector(
      '.submit-category'
    ) as HTMLButtonElement;
    const pri = document.querySelector('.pri') as HTMLDivElement;
    const sto = document.querySelector('.sto') as HTMLDivElement;

    if (
      productPrice &&
      productStock &&
      priceStockBtn &&
      categories &&
      gender &&
      categoriesGender &&
      pri &&
      sto
    ) {
      productPrice['disabled'] = true;
      productStock['disabled'] = true;
      priceStockBtn['disabled'] = true;

      categories['disabled'] = false;
      gender['disabled'] = false;
      categoriesGender['disabled'] = false;

      pri.innerHTML = Number(productPrice['value']).toLocaleString();
      sto.innerHTML = productStock['value'];
    }
  }

  images(e: Event) {
    e.preventDefault();

    const categories = document.querySelector(
      '#categories'
    ) as HTMLSelectElement;
    const gender = document.querySelector('#gender') as HTMLSelectElement;
    const categoriesGender = document.querySelector(
      '.submit-category'
    ) as HTMLButtonElement;

    const primaryImageSelect = document.querySelector(
      '#primaryImage'
    ) as HTMLInputElement;
    const secondaryImageSelect = document.querySelector(
      '#secondaryImage'
    ) as HTMLInputElement;
    const thirdImageSelect = document.querySelector(
      '#thirdImage'
    ) as HTMLInputElement;
    const submitImage = document.querySelector(
      '.submit-image'
    ) as HTMLButtonElement;
    const cat = document.querySelector('.cat') as HTMLParagraphElement;
    const fo = document.querySelector('.fo') as HTMLParagraphElement;

    if (
      categories &&
      gender &&
      categoriesGender &&
      primaryImageSelect &&
      secondaryImageSelect &&
      thirdImageSelect &&
      submitImage &&
      cat &&
      fo
    ) {
      categories['disabled'] = true;
      gender['disabled'] = true;
      categoriesGender['disabled'] = true;

      primaryImageSelect['disabled'] = false;
      secondaryImageSelect['disabled'] = false;
      thirdImageSelect['disabled'] = false;
      submitImage['disabled'] = false;

      cat.innerText = categories['value'];
      fo.innerText = gender['value'];
    }
  }

  submitImage(e: Event) {
    e.preventDefault();

    const primaryImageSelect = document.querySelector(
      '#primaryImage'
    ) as HTMLInputElement;
    const secondaryImageSelect = document.querySelector(
      '#secondaryImage'
    ) as HTMLInputElement;
    const thirdImageSelect = document.querySelector(
      '#thirdImage'
    ) as HTMLInputElement;
    const submitImage = document.querySelector(
      '.submit-image'
    ) as HTMLButtonElement;
    const uploadProductBtn = document.querySelector(
      '.upload-finished-product'
    ) as HTMLButtonElement;

    if (
      primaryImageSelect &&
      secondaryImageSelect &&
      thirdImageSelect &&
      submitImage &&
      uploadProductBtn
    ) {
      primaryImageSelect['disabled'] = true;
      secondaryImageSelect['disabled'] = true;
      thirdImageSelect['disabled'] = true;
      submitImage['disabled'] = true;
      uploadProductBtn['disabled'] = false;
    }
  }

  primaryImageUrl: string | null = null;
  primaryImageFile: any | null = '';
  secondaryImageUrl: string | null = null;
  secondaryImageFile: any | null = '';
  thirdImageUrl: string | null = null;
  thirdImageFile: any | null = '';

  changePrimaryImage(e: Event) {
    const input = document.querySelector('#primaryImage') as HTMLInputElement;
    const target = document.querySelector('.primary-image') as HTMLDivElement;

    if (input && target) {
      const file = input.files?.[0];

      if (file && file.type.startsWith('image/')) {
        if (this.primaryImageUrl) {
          URL.revokeObjectURL(this.primaryImageUrl);
        }

        if (this.primaryImageFile) {
          this.primaryImageFile = '';
        }

        this.primaryImageFile = file;
        this.primaryImageUrl = URL.createObjectURL(file);
      }

      target.style.backgroundImage = `url(${this.primaryImageUrl})`;
    }
  }

  changeSecondaryImage(e: Event) {
    const input = document.querySelector('#secondaryImage') as HTMLInputElement;
    const target = document.querySelector('.secondary-image') as HTMLDivElement;

    if (input && target) {
      const file = input.files?.[0];

      if (file && file.type.startsWith('image/')) {
        if (this.secondaryImageUrl) {
          URL.revokeObjectURL(this.secondaryImageUrl);
        }

        if (this.secondaryImageFile) {
          this.secondaryImageFile = '';
        }

        this.secondaryImageFile = file;
        this.secondaryImageUrl = URL.createObjectURL(file);
      }

      target.style.backgroundImage = `url(${this.secondaryImageUrl})`;
    }
  }

  changeThirdImage(e: Event) {
    const input = document.querySelector('#thirdImage') as HTMLInputElement;
    const target = document.querySelector('.third-image') as HTMLDivElement;

    if (input && target) {
      const file = input.files?.[0];

      if (file && file.type.startsWith('image/')) {
        if (this.thirdImageUrl) {
          URL.revokeObjectURL(this.thirdImageUrl);
        }

        if (this.thirdImageFile) {
          this.thirdImageFile = '';
        }

        this.thirdImageFile = file;

        this.thirdImageUrl = URL.createObjectURL(file);
      }

      target.style.backgroundImage = `url(${this.thirdImageUrl})`;
    }
  }

  async uploadProduct() {
    const btn = document.querySelector(
      '.upload-finished-product'
    ) as HTMLButtonElement;
    btn.innerText = 'Uploading, please wait';

    const previewProductName = document.querySelector(
      '.preiew-product-name'
    ) as HTMLDivElement;
    const pri = document.querySelector('.pri') as HTMLSpanElement;
    const sto = document.querySelector('.sto') as HTMLSpanElement;
    const desc = document.querySelector('.desc') as HTMLParagraphElement;
    const cat = document.querySelector('.cat') as HTMLParagraphElement;
    const fo = document.querySelector('.fo') as HTMLParagraphElement;

    if (previewProductName && pri && sto && desc && cat && fo) {
      const files = [
        this.primaryImageFile,
        this.secondaryImageFile,
        this.thirdImageFile,
      ];

      const formData = new FormData();
      for (let file of files) {
        formData.append('files', file);
      }
      try {
        const response = await fetch('http://192.168.15.213:3000/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!data.uploaded || data.uploaded.length < 3) {
          throw new Error('Upload failed or incomplete');
        }

        const readyProduct = {
          name: previewProductName.innerText,
          primaryImage: data.uploaded[0]?.url,
          secondaryImage: data.uploaded[1]?.url,
          thirdImage: data.uploaded[2]?.url,
          price: pri.innerText,
          stock: sto.innerText,
          gender: fo.innerText,
          description: desc.innerText,
          category: cat.innerText,
          reviews: [],
          sellerId: this.sellerId,
        };

        this.productService.addProduct(readyProduct).subscribe({
          next: (res) => {
            alert('Product uploaded successfully');
            this.stopUpload();
          },
          error: (error) => {
            alert('Failed to upload product');
            console.error(error);
          },
        });
      } catch (error) {
        alert('Upload failed.');
        console.error(error);
      }
    }
  }
}
