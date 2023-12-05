import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './admin.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingsComponent } from './listings/listings.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminruComponent } from './admin/admins/adminru/adminru.component';
import { AdmincrudComponent } from './admin/admins/admincrud/admincrud.component';
import { ListingFormComponent } from './admin/listing-form/listing-form.component';
import { AddListingComponent } from './admin/add-listing/add-listing.component';
import { ImageUploadComponent } from './admin/image-upload/image-upload.component';
import { UpdateListingComponent } from './admin/update-listing/update-listing.component';
import { AdminListingsComponent } from './admin/admin-listings/admin-listings.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingsComponent,
    RegisterComponent,
    LoginComponent,
    AdminruComponent,
    AdmincrudComponent,
    ListingFormComponent,
    AddListingComponent,
    ImageUploadComponent,
    UpdateListingComponent,
    AdminListingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
