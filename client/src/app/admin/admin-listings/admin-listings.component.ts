import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from 'src/app/listings/listing';
import { ListingImage } from 'src/app/listings/listings_image';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ListingService } from '../../listing.service';
import { AdminService } from 'src/app/admin.service';
//import { UpdateListingComponent } from '../update-listing/update-listing.component';
//import { ListingFormComponent } from '../listing-form/listing-form.component';

@Component({
  selector: 'app-admin-listings',
  templateUrl: './admin-listings.component.html',
  styleUrl: './admin-listings.component.css'
  //providers: [ListingFormComponent]
})
export class AdminListingsComponent implements OnInit {
  listing_id!: string;
  adminlisting_form_message?: string;
  $formListing: BehaviorSubject<Listing> = new BehaviorSubject({});
  selectedListing?: Listing;
  //update_listing_message?: string;
  /* listings = LISTINGS;
  selectedListing?: Listing;    
  listings_images = LISTINGS_IMAGES; */
  listings$: Observable<Listing[]> = new Observable();
  //listingFormComponent: ListingFormComponent;
  //updateListing!: UpdateListingComponent
  images$: Observable<ListingImage[]> = new Observable();

  @Input()
  initialState: BehaviorSubject<Listing> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Listing>();

  @Output()
  formSubmitted = new EventEmitter<Listing>();

  listingForm: FormGroup = new FormGroup({});
 

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private adminService: AdminService,
    public router: Router
    //private updateListing: UpdateListingComponent
    //private listingFormComponent: ListingFormComponent
  ) { }

  get id() { return this.listingForm.get('id')!; } 
  get image() { return this.listingForm.get('image')!; } 
  get title() { return this.listingForm.get('title')!; }
  get short_description() { return this.listingForm.get('short_description')!; }
  get price() { return this.listingForm.get('price')!; }
  get active() { return this.listingForm.get('active')!; }
  
  ngOnInit(): void {
    this.fetchListings();
    this.fetchImages();

    this.initialState.subscribe(listing => {
      this.listingForm = this.fb.group({
        id: [listing._id],
        image: [listing.image, [Validators.required]],
        title: [ listing.title, [Validators.required, Validators.maxLength(50)] ],
        short_description: [ listing.short_description, [ Validators.required, Validators.maxLength(100) ] ],
        price: [ listing.price, [Validators.required] ],
        active: [listing.active, [Validators.required]]        
      });
    });
  }

  submitUpdateForm(form: FormGroup<any>) {
    const update_form = form;
    const form_values = form.value;
    //this.formSubmitted.emit(this.listingForm.value);
    this.adminUpdateListing(form.value);
  }

  private fetchListings(): void {
    //this.listings$ = this.adminService.getListings();
    this.listings$ = this.adminService.getListings();
  }

  private fetchImages(): void {
    this.adminService.getImages().subscribe({
      next: data => {
        //let image_response = new Observable<ListingImage[]>();
        //image_response = data;

        this.images$ = of(data);
        
        
        
        //this.images$ = data;
        
        //this.listingForm.controls['image_selector'].setValue(this.images$);
       },
      error: (error) => {
        this.adminlisting_form_message = error;
      }      
    });
  }

  /* onSelect(listing: Listing): void {
    this.selectedListing = listing;    
  } */

  updateListingForm(selectedListing: Listing) {
    /* this.updateListing.hydrateForm(selectedListing); */
    this.hydrateForm(selectedListing);
    this.adminlisting_form_message = '';
  }

  deleteFormListing(id: string) {
    this.adminlisting_form_message = '';
    if (confirm('Confirm DELETE operation or CANCEL')) {
      this.adminDeleteListing(id);
    }
  }  

  hydrateForm(updateListing: Listing) {
    this.listingForm.setValue(
    //this.listingFormComponent.listingForm.patchValue(
      {
        id: updateListing._id,
        image: updateListing.image, 
        title: updateListing.title,
        short_description: updateListing.short_description,
        price: updateListing.price,
        active: updateListing.active
      });
  }

  adminUpdateListing(listing: Listing) {
    this.adminService.updateListing(listing)
      .subscribe({
        next:  response_data => {
          if (response_data.status === 200) {
            //this.registerForm.reset()
            //this.router.navigate(['admin/login']);
            this.adminlisting_form_message = response_data.success_message;
          }
          else if (response_data.status === 400) {
            this.adminlisting_form_message = response_data.error_message;
          }
          else if (response_data.status === 304 || response_data.status === 404) {
            this.adminlisting_form_message = response_data.fail_message;
          }
          this.listingForm.reset();
          this.fetchListings();
        }, 
        error: (error) => {
          this.adminlisting_form_message = error;
        }      
      });
  }

  adminDeleteListing(id: string) {
    this.adminService.deleteListing(id).subscribe({
      next:  response_data => {
        if (response_data.status === 200) {
          //this.registerForm.reset()
          //this.router.navigate(['admin/login']);
          this.adminlisting_form_message = response_data.success_message;
        }
        else if (response_data.status === 400) {
          this.adminlisting_form_message = response_data.error_message;
        }
        else if (response_data.status === 400 || response_data.status === 404) {
          this.adminlisting_form_message = response_data.fail_message;
        }
        this.listingForm.reset();
        this.fetchListings();
      }, 
      error: (error) => {
        this.adminlisting_form_message = error;
      }      
    });
  }
  adminNavAddListing() {
    this.router.navigate(['admin/add-listing']);    
  }
  adminNavUploadImage() {
    this.router.navigate(['admin/image-upload']);
  }
  adminLogout() {
    this.adminService.logout();
  }
  clientMenu() {
    this.router.navigate(['menu']);
  }
  cancelUpdate(e: Event) {
    e.preventDefault();
    this.listingForm.reset();
    this.adminlisting_form_message = 'Update cancelled.';    
  }
}
