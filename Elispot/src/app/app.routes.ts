import { Routes } from '@angular/router';
import { Account } from './account/account';
import { Authentication } from './authentication/authentication';
import { Blog } from './blog/blog';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { ContactUs } from './contact-us/contact-us';
import { Faq } from './faq/faq';
import { Home } from './home/home';
import { Notfound } from './notfound/notfound';
import { OrderConfirmation } from './order-confirmation/order-confirmation';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { ReturnPolicy } from './return-policy/return-policy';
import { Reviews } from './reviews/reviews';
import { SearchResult } from './search-result/search-result';
import { ShippingAndDeliveryInfo } from './shipping-and-delivery-info/shipping-and-delivery-info';
import { Shop } from './shop/shop';
import { Support } from './support/support';
import { TAndC } from './t-and-c/t-and-c';
import { Wishlist } from './wishlist/wishlist';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'blog', component: Blog },
  { path: '**', component: Notfound },
];
