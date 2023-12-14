import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admincrud',
  templateUrl: './admincrud.component.html',
  styleUrl: './admincrud.component.css'
})
export class AdmincrudComponent implements OnInit {
  currentUser: Object = {};
  nav_wrapper_div!: HTMLElement;
  nav_select!: HTMLElement;
  nav_img!: HTMLElement;

  constructor(
    public adminService: AdminService,
    public router: Router
  ) { }

  ngOnInit() { 
    this.nav_wrapper_div = document.querySelector("div[class='rwd_nav_wrapper_div']") as HTMLElement;
    this.nav_select = this.nav_wrapper_div.querySelector("select[class='rwd_nav_select']") as HTMLElement;
    this.nav_img  = this.nav_wrapper_div.querySelector("img[class='rwd_nav_icon']") as HTMLElement;
    this.nav_select.style.cssText += 'display: none';
    this.nav_img.style.cssText += 'display: block';
  }

  onSelectOption(selection: string): void {
    switch (selection) {
      case 'upload_image':
        this.adminService.adminNavUploadImage();
        break;
      case 'update_listing':
        this.adminService.adminNavUpdateListing();
        break;
      case 'client_menu':
        this.adminService.clientMenu();
        break;
      case 'add_listing':
        this.adminService.adminNavAddListing();
        break;
      case 'logout':
        this.adminService.adminLogout();
        break;
      case 'register_admin':
        this.adminService.registerAdmin();
        break;
    }
  }

  menuOpen(event: Event): void {
    this.nav_img.style.cssText += 'display: none';
    this.nav_select.style.cssText += 'display: block';
    this.nav_select.focus();
  }

  onBlur(): void {
    this.nav_img.style.cssText += 'display: block';
    this.nav_select.style.cssText += 'display: none';
  }
}
