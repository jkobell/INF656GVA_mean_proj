import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from 'src/app/listings/listing';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent implements OnInit{
  add_listing_message?: string;

  
  nav_wrapper_div!: HTMLElement;
  nav_select!: HTMLElement;
  nav_img!: HTMLElement;

  constructor(
    private router: Router,
    public adminService: AdminService
  ) { }

  ngOnInit() {
    this.nav_wrapper_div = document.querySelector("div[class='rwd_nav_wrapper_div']") as HTMLElement;
    this.nav_select = this.nav_wrapper_div.querySelector("select[class='rwd_nav_select']") as HTMLElement;
    this.nav_img  = this.nav_wrapper_div.querySelector("img[class='rwd_nav_icon']") as HTMLElement;
    this.nav_select.style.cssText += 'display: none';
    this.nav_img.style.cssText += 'display: block';
  }

  addListing(listing: Listing) { 
    this.adminService.createListing(listing)
      .subscribe({
        next:  response_data => {
          if (response_data.status === 201) {
            this.add_listing_message = response_data.success_message;
          }
          if (response_data.status === 400) {
            this.add_listing_message = response_data.error_message;
          }
          if (response_data.status === 500) {
            this.add_listing_message = response_data.fail_message;
          }
        },
        error: (error) => {
          this.add_listing_message = error;
        }      
      });
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
      case 'admin_home':
        this.adminService.adminHome();
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
