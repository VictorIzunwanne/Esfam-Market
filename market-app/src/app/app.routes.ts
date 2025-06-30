import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { About } from './about/about';
import { Market } from './market/market';
import { Blog } from './blog/blog';
import { Sell } from './sell/sell';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { Setting } from './setting/setting';
import { Notfound } from './notfound/notfound';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: About },
  { path: 'market', component: Market },
  { path: 'blog', component: Blog },
  { path: 'sell', component: Sell },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'setting', component: Setting },
  { path: '**', component: Notfound },
];
