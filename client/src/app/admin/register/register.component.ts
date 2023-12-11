import { Component, OnInit } from '@angular/core';
/* import { CommonModule } from '@angular/common'; */
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin.service';

/* @Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
}) */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  register_error_message?: string;

  nav_wrapper_div!: HTMLElement;
  nav_select!: HTMLElement;
  nav_img!: HTMLElement;

  constructor(
    public formBuilder: FormBuilder,
    public adminService: AdminService,
    public router: Router
  ) {
    this.registerForm= this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    })
  }

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

  cancel_register() {
    this.router.navigate(['admin/admins/admincrud']);
  }

  /* registerUser() {
    this.adminService.register(this.registerForm.value).subscribe((res) => {
      if (res.result) {
        this.registerForm.reset()
        this.router.navigate(['login']);
      }
    })
  } */
  registerUser() {
    this.adminService.register(this.registerForm.value).subscribe({
      next: response_data => {
        if (response_data.status === 201) {
          this.registerForm.reset()
          this.router.navigate(['admin/login']);
        }
      },
      error: (error) => {
        this.register_error_message = error;
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
