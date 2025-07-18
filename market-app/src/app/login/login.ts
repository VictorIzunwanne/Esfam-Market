import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router) {}

  async userLogin(e: Event) {
    e.preventDefault();

    const userName = document.querySelector('#user-name') as HTMLInputElement;
    const userEmail = document.querySelector('#email') as HTMLInputElement;
    const userPassword = document.querySelector(
      '#password'
    ) as HTMLInputElement;
    const backendMessage = document.querySelector(
      '.message'
    ) as HTMLParagraphElement;

    if (userName && userEmail && userPassword) {
      const userDetails = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value,
      };

      try {
        const userExist = await fetch('http://192.168.15.213:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        });

        if (!userExist.ok) {
          throw new Error(userExist.status.toString());
        }

        const message = await userExist.json();

        backendMessage.innerText = message.message;

        if (
          message.message === 'Incorrect password' ||
          message.message === 'The user name you provided is incorrect'
        ) {
          backendMessage.style.color = 'red';
        } else if (message.message.includes('Welcome')) {
          console.log(message.isSeller);
          backendMessage.style.color = 'green';

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);

          localStorage.setItem('userName', userDetails.name);
        } else {
          backendMessage.style.color = 'var(--primary-text-color)';
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
