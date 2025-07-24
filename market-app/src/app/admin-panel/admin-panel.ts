import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css',
})
export class AdminPanel {
  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAdminPerm();
  }

  adminName: any;
  adminEmail: any;

  list: any[] = [];

  checkAdminPerm() {
    if (
      localStorage.getItem('isAdmin') != 'true' ||
      !localStorage.getItem('isAdmin')
    ) {
      this.router.navigate(['/admin-login']);

      return;
    }

    this.fetchAdminName();
  }

  async fetchAdminName() {
    try {
      const admin = await fetch('https://esfam-market.onrender.com/api/admin-data');

      if (!admin.ok) {
        throw new Error(admin.status.toString());
      }

      const availableAdmins = await admin.json();

      this.adminName = availableAdmins.name;
      this.adminEmail = availableAdmins.email;
    } catch (error) {
      console.error('Error fetching Admin data', error);
    }
  }

  async fufilReq(adminReq: string) {
    try {
      const result = await fetch(`https://esfam-market.onrender.com/api/${adminReq}`);

      if (!result.ok) {
        throw new Error(result.status.toString());
      }

      const serverRes = await result.json();

      this.list = serverRes;
    } catch (error) {
      console.error('An error occured while trying to fetch users');
    }
  }
}
