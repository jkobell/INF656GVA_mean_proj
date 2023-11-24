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
  login_error_message?: string;

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

  ngOnInit() { }

  
  logout() {
    this.adminService.logout()
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
        this.login_error_message = error;
      }      
    });
  }
  /* registerUser() {
    const user_registration = new Promise<void>((resolve) => {
      this.adminService.register(this.registerForm.value)
      resolve();
    });
    user_registration.then(() => {
      this.registerForm.reset()
      this.router.navigate(['login']);
    })    
  } */
    /* .next()
      if (res.status === 201) {
        let hh = 'kkk';
      }
      if (res.result) {
        this.registerForm.reset()
        this.router.navigate(['login']);
      }
    })
  } */
}
