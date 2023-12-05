import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from 'src/app/listings/listing';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent {
  add_listing_message?: string;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  addListing(listing: Listing) {
    //const json_listing = JSON.stringify(listing);
    //const json_parse = JSON.parse(json_listing);
    //let active: Boolean = false;
    //let price: Number;
    //if (listing.active! == true) {
      //active = true
    //} 
    /* const add_listing = {
      _id: json_parse._id, 
      image: json_parse.image, 
      title: json_parse.title, 
      short_description: json_parse.short_description,
      price: parseFloat(json_parse.price),
      active: JSON.parse(json_parse.active)
    } */
    this.adminService.createListing(listing)
      .subscribe({
        next:  response_data => {
          if (response_data.status === 201) {
            //this.registerForm.reset()
            //this.router.navigate(['admin/login']);
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
}
