import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Products } from './products/products';
import { Blog } from './blog/blog';
import { Account } from './account/account';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'products', component: Products },
  { path: 'blog', component: Blog },
  { path: 'account', component: Account },
  { path: '**', component: NotFound },
];
