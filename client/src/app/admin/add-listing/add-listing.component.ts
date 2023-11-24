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
  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  addListing(listing: Listing) {
    this.adminService.createListing(listing)
      .subscribe({
        next: () => {
          //this.router.navigate(['/employees']);
        },
        error: (error) => {
          alert("Failed to create employee");
          console.error(error);
        }
      });
  }
}
