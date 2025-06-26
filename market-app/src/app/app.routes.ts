import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { Product } from './product/product';
import { Notfound } from './notfound/notfound';
import { About } from './about/about';
import { FilteredProducts } from './filtered-products/filtered-products';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: Product },
  { path: 'jsn082[o-fi-dse0wr449jds240420sc=', component: FilteredProducts },
  { path: 'about', component: About },
  { path: '**', component: Notfound },
];
