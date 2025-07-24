import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  ngAfterViewInit() {
    this.latestProducts();
  }

  constructor(private router: Router) {}

  userName = localStorage.getItem('userName');

  async checkIfUserIsLoggedIn() {
    try {
      const isLoggedIn = await fetch('https://esfam-market.onrender.com/api/users/me', {
        credentials: 'include',
      });

      return isLoggedIn.ok;
    } catch (error) {
      return false;
    }
  }

  products: any[] = [];

  async latestProducts() {
    try {
      const response = await fetch('https://esfam-market.onrender.com/api/latest-products');
      if (!response.ok) throw new Error(response.status.toString());
      this.products = await response.json();
    } catch (error) {
      console.error('Cannot fetch most purchased products', error);
    }
  }

  async addToCart(item: any) {
    try {
      const numOfItem = document.querySelector(
        '.numOfItem'
      ) as HTMLButtonElement;
      const isLoggedIn = await this.checkIfUserIsLoggedIn();

      if (!isLoggedIn) {
        alert('Please login to add items to cart');
        this.router.navigate(['/login']);
        return;
      }
      const userName = localStorage.getItem('userName');

      if (!userName) {
        alert('User name is missing. Please re-login');
        this.router.navigate(['/login']);

        return;
      }

      const cartProduct = {
        productId: item._id,
        productName: item.name,
        productPrice: item.price,
        productImage: item.primaryImage,
        numOfItem: Number(numOfItem.innerHTML),
      };

      const sendProductToCart = await fetch(
        `https://esfam-market.onrender.com/api/users/${userName}/cart`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartProduct),
          credentials: 'include',
        }
      );

      if (!sendProductToCart.ok) {
        console.error('Product could not be added to cart');

        return;
      }

      const message = await sendProductToCart.json();
      this.cartCount();
      alert(message.message);
    } catch (error) {
      console.error('Something went wrong.', error);
    }
  }

  async addToCartFromDescribe() {
    const productId = document.querySelector('.product-id') as HTMLDivElement;

    if (productId) {
      const product = await fetch(
        `https://esfam-market.onrender.com/api/products/specific/${productId.innerHTML}`,
        {
          credentials: 'include',
        }
      );

      if (!product) {
        console.log('Something went wrong while trying to add product to cart');
        return;
      }

      const item = await product.json();
      this.addToCart(item);
    }

    try {
    } catch (error) {
      console.log('Could not add this product to cart');
    }
  }

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

  similarP: any[] = [];

  async similarProducts(item: any) {
    try {
      const similarProduct = await fetch(
        `https://esfam-market.onrender.com/api/products/${item.category}`
      );

      if (!similarProduct.ok) {
        throw new Error(similarProduct.status.toString());
      }

      const result = await similarProduct.json();
      this.similarP = result;
    } catch (error) {
      console.error(
        `Cannot fetch products similar to ${item.name} at the moment`
      );
    }
  }

  reviews: any[] = [];

  displayDetails(item: any, e: Event) {
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;
    const detailsContainer = document.querySelector(
      '.product-details-expand'
    ) as HTMLDivElement;
    const body = document.body;
    const productName = document.querySelector('.names') as HTMLHeadElement;
    const productId = document.querySelector('.product-id') as HTMLDivElement;
    const displayingImage = document.querySelector(
      '.displaying-image'
    ) as HTMLDivElement;
    const image1 = document.querySelector('.image1') as HTMLDivElement;
    const image2 = document.querySelector('.image2') as HTMLDivElement;
    const image3 = document.querySelector('.image3') as HTMLDivElement;
    const aboutTheProduct = document.querySelector(
      '.product-information'
    ) as HTMLDivElement;
    const price = document.querySelector('.displayed-price') as HTMLSpanElement;
    const stockStatus = document.querySelector(
      '.stock-status'
    ) as HTMLDivElement;
    const numberOfReview = document.querySelector(
      '.number-of-reviews'
    ) as HTMLDivElement;

    if (
      modalBackground &&
      detailsContainer &&
      body &&
      productName &&
      productId &&
      displayingImage &&
      image1 &&
      image2 &&
      image3 &&
      aboutTheProduct &&
      price &&
      stockStatus &&
      numberOfReview
    ) {
      modalBackground.style.display = 'flex';
      detailsContainer.classList.add('show-product-details');
      body.classList.add('no-scroll');
      productName.innerText = item.name;
      productId.innerText = item._id;
      displayingImage.style.backgroundImage = `url('${item.primaryImage}')`;
      image1.style.backgroundImage = `url('${item.primaryImage}')`;
      image2.style.backgroundImage = `url('${item.secondaryImage}')`;
      image3.style.backgroundImage = `url('${item.thirdImage}')`;
      aboutTheProduct.innerText = item.description;
      price.innerText = item.price;

      if (item.stock > 20) {
        stockStatus.innerText = 'In Stock';
        stockStatus.style.color = 'green';
      } else if (item.stock < 20 && item.stock > 9) {
        stockStatus.innerText = 'Few stocks left';
        stockStatus.style.color = 'orange';
      } else if (item.stock < 9 && item.stock > 1) {
        stockStatus.innerText = `${item.stock} items left`;
        stockStatus.style.color = 'red';
      } else if (item.stock == 1) {
        stockStatus.innerText = `${item.stock} item left`;
        stockStatus.style.color = 'red';
      } else if (item.stock < 1) {
        stockStatus.innerText = 'Out of stock';
        stockStatus.style.color = 'red';
      }

      this.reviews = item.reviews;

      numberOfReview.innerText = item.reviews.length;

      this.similarProducts(item);
    }
  }

  expandPrimaryImage() {
    const image = document.querySelector('.displaying-image') as HTMLDivElement;

    if (image) {
      image.classList.toggle('image-expanded');
    }
  }

  removeDetails() {
    const modalBackground = document.querySelector(
      '.modal-background'
    ) as HTMLElement;
    const detailsContainer = document.querySelector(
      '.product-details-expand'
    ) as HTMLDivElement;
    const body = document.body;

    if (modalBackground && detailsContainer && body) {
      modalBackground.style.display = 'none';
      detailsContainer.classList.remove('show-product-details');
      body.classList.remove('no-scroll');
    }
  }

  changeToPrimaryImage() {
    const primaryImageContainer = document.querySelector(
      '.image1'
    ) as HTMLDivElement;

    const displayingImage = document.querySelector(
      '.displaying-image'
    ) as HTMLDivElement;

    if (primaryImageContainer && displayingImage) {
      displayingImage.style.backgroundImage =
        primaryImageContainer.style.backgroundImage;
    }
  }

  changeToSecondaryImage() {
    const secondaryImage = document.querySelector('.image2') as HTMLDivElement;
    const displayingImage = document.querySelector(
      '.displaying-image'
    ) as HTMLDivElement;

    if (secondaryImage && displayingImage) {
      displayingImage.style.backgroundImage =
        secondaryImage.style.backgroundImage;
    }
  }

  changeToThirdImage() {
    const thirdImage = document.querySelector('.image3') as HTMLDivElement;
    const displayingImage = document.querySelector(
      '.displaying-image'
    ) as HTMLDivElement;

    if (thirdImage && displayingImage) {
      displayingImage.style.backgroundImage = thirdImage.style.backgroundImage;
    }
  }

  async submitReview(e: Event) {
    e.preventDefault();

    const loggedIn = await this.checkIfUserIsLoggedIn();

    if (!loggedIn) {
      alert('You need to login before you can leave a review');

      this.router.navigate(['/login']);
    }

    const name = localStorage.getItem('userName');

    if (!name) {
      alert('Your user is missing. please re-login');

      this.router.navigate(['/login']);
      this.removeDetails();

      return;
    }

    const textArea = document.querySelector(
      '#write-review'
    ) as HTMLTextAreaElement;
    const product = document.querySelector('.product-id') as HTMLDivElement;
    const productId = product.innerText;

    if (textArea.value.length < 1) {
      alert('Cannot send empty review. Please write something');

      return;
    }

    if (textArea.value.length < 10) {
      alert('Your review is too short. Write more.');

      return;
    }

    if (name && textArea && productId) {
      const review = {
        customerName: name,
        review: textArea.value,
      };

      try {
        const submitReview = await fetch(
          `https://esfam-market.onrender.com/api/products/${productId}/reviews`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
            credentials: 'include',
          }
        );

        if (!submitReview.ok) {
          throw new Error('Something went wrong somewhere');
        }

        alert('Your review have been added, Thanks for the review!');
        textArea.value = '';
      } catch (err) {
        console.error('An error occured', err);
      }
    }
  }

  async uploadProductsButton() {
    try {
      const isLoggedIn = await this.checkIfUserIsLoggedIn();

      if (!isLoggedIn) {
        alert(
          'You have to be logged in and registered as a seller to upload products'
        );

        this.router.navigate(['/login']);

        return;
      }

      const userName = localStorage.getItem('userName');

      if (!userName) {
        alert('User name is missing. Please re-login.');

        this.router.navigate(['/login']);

        return;
      }

      this.router.navigate(['/sell']);
    } catch (error) {
      console.error('Something went wrong', error);
    }
  }
}
