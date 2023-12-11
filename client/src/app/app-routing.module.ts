import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListingsComponent } from './listings/listings.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
/* import { AdminsComponent } from './admin/admins/admins.component'; */
import { AdminruComponent } from './admin/admins/adminru/adminru.component';
import { AdmincrudComponent } from './admin/admins/admincrud/admincrud.component';
import { AdminAuthGuard } from './admin.guard';
import { AdminCrudAuthGuard } from './admincrud.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddListingComponent } from './admin/add-listing/add-listing.component';
import { ImageUploadComponent } from './admin/image-upload/image-upload.component';
import { UpdateListingComponent } from './admin/update-listing/update-listing.component';
import { AdminListingsComponent } from './admin/admin-listings/admin-listings.component';

/* const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/:id', component: AdminsComponent }
]; */
const routes: Routes = [
  { path: 'menu', component: ListingsComponent},
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/register', component: RegisterComponent, canActivate: [AdminCrudAuthGuard] },
  { path: 'admin/image-upload', component: ImageUploadComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/admins/adminru', component: AdminruComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/admins/admincrud', component: AdmincrudComponent, canActivate: [AdminCrudAuthGuard] },
  { path: 'admin/add-listing', component: AddListingComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/update-listing', component: UpdateListingComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/admin-listings', component: AdminListingsComponent, canActivate: [AdminAuthGuard] },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
