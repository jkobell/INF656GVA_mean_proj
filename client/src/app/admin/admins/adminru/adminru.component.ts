import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-adminru',
  templateUrl: './adminru.component.html',
  styleUrl: './adminru.component.css'
})
export class AdminruComponent implements OnInit {
  currentUser: Object = {};
  nav_wrapper_div!: HTMLElement;
  nav_select!: HTMLElement;
  nav_img!: HTMLElement;

  constructor(
    public adminService: AdminService,
  ) { }

  ngOnInit() {
    this.nav_wrapper_div = document.querySelector("div[class='rwd_nav_wrapper_div']") as HTMLElement;
    this.nav_select = this.nav_wrapper_div.querySelector("select[class='rwd_nav_select']") as HTMLElement;
    this.nav_img  = this.nav_wrapper_div.querySelector("img[class='rwd_nav_icon']") as HTMLElement;
    this.nav_select.style.cssText += 'display: none';
    this.nav_img.style.cssText += 'display: block';
  }

  logout() {
    this.adminService.logout()
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
