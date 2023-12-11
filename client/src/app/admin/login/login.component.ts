import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AdminService } from 'src/app/admin.service';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login_error_message?: string;

  nav_wrapper_div!: HTMLElement;
  nav_select!: HTMLElement;
  nav_img!: HTMLElement;

  constructor(
    public formBuilder: FormBuilder,
    public adminService: AdminService,
    public router: Router
  ) {
    this.loginForm = this.formBuilder.group({
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

  /* loginUser() {    
    this.adminService.login(this.loginForm.value)
    .subscribe((error: any, res: any) => {
      localStorage.setItem('access_token', res.access_token);
      //this.currentUser = res;
      if (res.user.role) {
        this.router.navigate(['admin/admins/admin'+ res.user.role]);
      }               
      this.login_error_message = error;
    });
  } */
  loginUser() {    
    this.adminService.login(this.loginForm.value)
    .subscribe(
      {
        next: (data) => {
          localStorage.setItem('access_token', data.access_token);
          this.adminService.initIsCrudLoggedIn();
          if (data.user.role) {
            this.router.navigate(['admin/admins/admin'+ data.user.role]);
          }
        },
        error: (error) => {
          this.login_error_message = `Login attempt ${error}. Contact your administrator.`;
          this.loginForm.reset(); 
        }
    });
  }

  onSelectOption(selection: string): void {
    switch (selection) {
      /* case 'upload_image':
        this.adminService.adminNavUploadImage();
        break;
      case 'update_listing':
        this.adminService.adminNavUpdateListing();
        break; */
      case 'client_menu':
        this.adminService.clientMenu();
        break;
      /* case 'admin_home':
        this.adminService.adminHome();
        break;
      case 'logout':
        this.adminService.adminLogout();
        break; */
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
