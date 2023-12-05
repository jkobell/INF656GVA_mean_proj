import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from 'src/app/listings/listing';
import { AdminService } from 'src/app/admin.service';
import { BehaviorSubject, of } from 'rxjs';
//import { ListingFormComponent } from '../listing-form/listing-form.component';

@Component({
  selector: 'app-update-listing',
  templateUrl: './update-listing.component.html',
  styleUrl: './update-listing.component.css',
  //providers: [ListingFormComponent]
})

@Injectable()
export class UpdateListingComponent implements OnInit {
  $adminlistingform: BehaviorSubject<Listing> = new BehaviorSubject({});
  update_listing_message?: string;
  //listingFormComponent!: ListingFormComponent

  constructor(
    private router: Router,
    private adminService: AdminService,
    //private listingFormComponent: ListingFormComponent
  ) { }

  ngOnInit() {

  }

  hydrateForm(updateListing: Listing) {
    let jj = updateListing;
    /* this.listingFormComponent.listingForm.setValue(
      {
        image: updateListing.image, 
        title: updateListing.title,
        short_description: updateListing.short_description,
        price: updateListing.price,
        active: updateListing.active
      }); */
  }

  updateListing(listing: Listing) {
    this.adminService.updateListing(listing)
      .subscribe({
        next:  response_data => {
          if (response_data.status === 201) {
            //this.registerForm.reset()
            //this.router.navigate(['admin/login']);
            this.update_listing_message = response_data.success_message;
          }
          if (response_data.status === 400) {
            this.update_listing_message = response_data.error_message;
          }
          if (response_data.status === 500) {
            this.update_listing_message = response_data.fail_message;
          }
        },
        error: (error) => {
          this.update_listing_message = error;
        }      
      });
  }

  deleteListing(id: string): void {
    this.adminService.deleteListing(id).subscribe({
      //next: () => this.fetchListings() nav to admin-listingshyyy-
    });
  }
}
