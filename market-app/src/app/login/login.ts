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
    const loginOut = document.querySelector('.determine') as HTMLDivElement;

    if (userName && userEmail && userPassword && loginOut) {
      const userDetails = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value,
      };

      try {
        const userExist = await fetch('http://192.168.118.213:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
          credentials: 'include',
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
          backendMessage.style.color = 'green';

          const userDataRes = await fetch(
            'http://192.168.118.213:3000/api/users/me',
            {
              credentials: 'include',
            }
          );

          const userData = await userDataRes.json();

          localStorage.setItem('userName', userData.userName);

          loginOut.innerHTML = `Welcome, ${localStorage
            .getItem('userName')
            ?.toUpperCase()}`;

          setTimeout(() => {
            this.router.navigate(['']);
          }, 1000);
        } else {
          backendMessage.style.color = 'var(--primary-text-color)';
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
