import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  constructor(private router: Router) {}

  inputColor() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach((input: HTMLInputElement) => {
      input.style.color = '#000';
    });
  }

  async login(e: Event) {
    e.preventDefault();

    const adminName = document.querySelector('#name') as HTMLInputElement;
    const adminEmail = document.querySelector('#email') as HTMLInputElement;
    const password = document.querySelector('#password') as HTMLInputElement;
    const loginButton = document.querySelector(
      '.register-button'
    ) as HTMLButtonElement;
    const message = document.querySelector('.message') as HTMLParagraphElement;

    if (adminName && adminEmail && password && loginButton && message) {
      const adminCred = {
        name: adminName.value,
        email: adminEmail.value,
        password: password.value,
      };

      loginButton.innerText = 'Verifying credentials, please wait';
      loginButton['disabled'] = true;

      try {
        const admin = await fetch('http://192.168.15.213:3000/api/admins', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(adminCred),
        });

        if (!admin.ok) {
          throw new Error(admin.status.toString());
        }

        const result = await admin.json();

        if (result.message === 'Invalid credentials') {
          message.style.color = 'red';

          loginButton.innerText = 'Login';
          loginButton['disabled'] = false;

          adminName.style.color = 'red';
          adminEmail.style.color = 'red';
          password.style.color = 'red';

          localStorage.setItem('isAdmin', 'false');
        } else {
          message.style.color = 'var(--primary-color)';
          setTimeout(() => {
            this.router.navigate(['/esfam-market-admin-panel']);
          }, 3000);

          adminName.value = '';
          adminEmail.value = '';
          password.value = '';

          loginButton.innerText = 'Login';
          loginButton['disabled'] = false;

          localStorage.setItem('isAdmin', 'true');
        }

        message.innerText = result.message;
      } catch (error) {
        console.error('An error occured while trying to log in as admin');
        message.style.color = 'red';
        message.innerText =
          'Could not connect to server. Check network and try again';
        adminName.value = '';
        adminEmail.value = '';
        password.value = '';
      }

      loginButton.innerText = 'Login';
      loginButton['disabled'] = false;
    }
  }
}
