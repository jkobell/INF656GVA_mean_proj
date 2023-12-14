import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})

class AdminCrudPermissionsService {
  constructor(private router: Router, private adminService: AdminService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
    if (this.adminService.isCrudLoggedIn !== true) {    
      window.alert("Access not allowed!");
      this.router.navigate(['admin/login']);
    }
    return true;
  }
}

export const AdminCrudAuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AdminCrudPermissionsService).canActivate(next, state);
}
