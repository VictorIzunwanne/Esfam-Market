import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Box } from './box/box';
import { Footer } from './footer/footer'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Box, NgIf, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Esfam Market';

  box = false;

  showBox() {
    this.box = !this.box;
  }
}
