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

  ngOnInit() { }

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
}
