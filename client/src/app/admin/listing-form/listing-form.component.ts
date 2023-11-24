import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Listing } from 'src/app/listings/listing';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrl: './listing-form.component.css'
})

export class ListingFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Listing> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Listing>();

  @Output()
  formSubmitted = new EventEmitter<Listing>();

  listingForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get image() { return this.listingForm.get('image')!; }
  get title() { return this.listingForm.get('title')!; }
  get short_description() { return this.listingForm.get('short_description')!; }
  get price() { return this.listingForm.get('price')!; }
  get active() { return this.listingForm.get('active')!; }

  ngOnInit() {
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
}
