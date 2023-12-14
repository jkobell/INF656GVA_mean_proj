import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
import { ListingImage } from 'src/app/listings/listings_image';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent implements OnInit {
  image_upload_message?: string;
  filename?: string;
  public uploadImage = {} as ListingImage;

  nav_wrapper_div!: HTMLElement;
  nav_select!: HTMLElement;
  nav_img!: HTMLElement;

  constructor(
    public adminService: AdminService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.nav_wrapper_div = document.querySelector("div[class='rwd_nav_wrapper_div']") as HTMLElement;
    this.nav_select = this.nav_wrapper_div.querySelector("select[class='rwd_nav_select']") as HTMLElement;
    this.nav_img  = this.nav_wrapper_div.querySelector("img[class='rwd_nav_icon']") as HTMLElement;
    this.nav_select.style.cssText += 'display: none';
    this.nav_img.style.cssText += 'display: block';
  }

  cancel_register() {
    this.router.navigate(['admin/admins/admincrud']);
  }

  async onFileSelected(event: any) {
    this.image_upload_message = '';
    const file:File = event.target.files[0];
    if (file) {
      this.filename = file.name;
      this.uploadImage.name = file.name;
      this.uploadImage.size = file.size.toFixed();
      
      const b64string = await this.convertToBase64(file);
      if (b64string) {
        const b64string_split = b64string.split(',');
        if (b64string_split && b64string_split.length > 1) {
          this.uploadImage.description = b64string_split[0];
          this.uploadImage.image = b64string_split[1];
        }
      }
       

      this.createImage();
      
    }
  }

  convertToBase64(file: Blob): Promise<string> {
    let reader = new FileReader();
    let result_promise = new Promise<string>((resolve) => {
      reader.readAsDataURL(file);    
      reader.onload = (event: any) => { 
        resolve(event.target.result);     
      }; 
      reader.onerror = (error) => {
        this.image_upload_message = `File read error: ${error}`;
      };
    })
    return result_promise;
  }
  
  createImage() {
    this.adminService.createImage(this.uploadImage).subscribe({
      next: response_data => {
        if (response_data.status === 201) {
          this.image_upload_message = response_data.success_message;
        }
        if (response_data.status === 400) {
          this.image_upload_message = response_data.error_message;
        }
        if (response_data.status === 500) {
          this.image_upload_message = response_data.fail_message;
        }
      },
      error: (error) => {
        this.image_upload_message = error;
      }      
    });
  }

  onSelectOption(selection: string): void {
    switch (selection) {
      case 'add_listing':
        this.adminService.adminNavAddListing();
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
