import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  ngAfterViewInit() {
    console.log(this.user);
  }

  user = localStorage.getItem('userName');
}
