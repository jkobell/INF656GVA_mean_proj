import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { Observable, of, scheduled, asyncScheduler } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Listing } from 'src/app/listings/listing';
import { ListingImage } from 'src/app/listings/listings_image';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrl: './listing-form.component.css'
})

@Injectable()
export class ListingFormComponent implements OnInit {
  listing_form_message?: string;
  selectedImage?: ListingImage;

  images$: Observable<ListingImage[]> = new Observable();
  
  //images$?: ListingImage[];

  //images$: Observable<ListingsImage[]> = of([{image_id: 111, image_name:'testimagename', image_b64:'jgggjgkjghjgjgjkjhkhkj' }]);

  @Input()
  initialState: BehaviorSubject<Listing> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Listing>();

  @Output()
  formSubmitted = new EventEmitter<Listing>();

  listingForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder, private adminService: AdminService) { }

  /* get image_selector() { return this.listingForm.get('image_selector')!; } */
  get image() { return this.listingForm.get('image')!; } 
  get title() { return this.listingForm.get('title')!; }
  get short_description() { return this.listingForm.get('short_description')!; }
  get price() { return this.listingForm.get('price')!; }
  get active() { return this.listingForm.get('active')!; }

  ngOnInit() {
    this.fetchImages();

    this.initialState.subscribe(listing => {
      this.listingForm = this.fb.group({
        image: [listing.image, [Validators.required]],
        title: [ listing.title, [Validators.required, Validators.maxLength(25)] ],
        short_description: [ listing.short_description, [ Validators.required, Validators.maxLength(100) ] ],
        price: [ listing.price, [Validators.required] ],
        active: [listing.active, [Validators.required]]        
      });
    });
  
    this.listingForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.listingForm.value); 
  }

  private fetchImages(): void {
    this.adminService.getImages().subscribe({
      next: data => {
        this.images$ = of(data);
       },
      error: (error) => {
        this.listing_form_message = error;
      }      
    });
  }

  cancelAdd(e: Event) {
    e.preventDefault();
    this.listingForm.reset();
  }

  onSelect(image: ListingImage): void {
    this.selectedImage = image;    
  }
}
