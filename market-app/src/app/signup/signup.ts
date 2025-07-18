import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  userDetails: {} = {
    userName: '',
    userEmail: '',
    userGender: '',
    userFullName: '',
  };

  async signup(e: Event) {
    e.preventDefault();

    const message = document.querySelector('.message') as HTMLParagraphElement;
    const firstName = document.querySelector('#first-name') as HTMLInputElement;
    const lastName = document.querySelector('#last-name') as HTMLInputElement;
    const gender = document.querySelector('#gender') as HTMLSelectElement;
    const email = document.querySelector('#email') as HTMLInputElement;
    const userName = document.querySelector('#user-name') as HTMLInputElement;
    const password = document.querySelector('#password') as HTMLInputElement;
    const registerBtn = document.querySelector(
      '.register-button'
    ) as HTMLButtonElement;

    if (
      message &&
      firstName &&
      lastName &&
      gender &&
      email &&
      userName &&
      password &&
      registerBtn
    ) {
      registerBtn.innerText = 'Loading. Please wait...';
      registerBtn['disabled'] = true;

      const userInfo = {
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        email: email.value,
        gender: gender.value,
        password: password.value,
        isSeller: false,
      };

      try {
        const signupResult = await fetch(
          'http://192.168.15.213:3000/api/users/signup',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo),
          }
        );

        if (!signupResult.ok) {
          throw new Error(signupResult.status.toString());
        }

        const result = await signupResult.json();

        message.innerText = result.message;

        if (
          result.message === 'User name has been taken. Please use another' ||
          result.message === 'Email exist already. Please login'
        ) {
          message.style.color = 'red';

          registerBtn.innerText = 'Register';
          registerBtn['disabled'] = false;
        } else if (
          result.message.includes('You have successfully created your account')
        ) {
          message.style.color = 'green';

          registerBtn.innerText = 'Register';
          registerBtn['disabled'] = false;

          firstName.value = '';
          lastName.value = '';
          userName.value = '';
          email.value = '';
          password.value = '';
        } else {
          message.style.color = 'var(--primary-text-color)';

          registerBtn.innerText = 'Register';
          registerBtn['disabled'] = false;
        }
      } catch (error) {
        message.innerText = `Something went wrong somewhere: ${error}`;
      }
    }
  }
}
