import { Component, OnInit } from '@angular/core';
import { Listing } from './listing';
import { Observable } from 'rxjs';
import { ListingService } from '../listing.service'; 

//import { LISTINGS } from './mock_listings';
//import { LISTINGS_IMAGES } from './mock_listings_images';
//import { setContentContainerSize } from 'set_content_container_size';
//import { runThis } from 'set_content_container_size';

@Component({
    selector: 'app_listings',
    templateUrl: './listings.component.html',
    styleUrls: ['./listings.component.css']
  })

  /* export class ListingsComponent implements OnInit { */
  export class ListingsComponent implements OnInit {
    
    selectedListing?: Listing;
    /* listings = LISTINGS;
    selectedListing?: Listing;    
    listings_images = LISTINGS_IMAGES; */
    listings$: Observable<Listing[]> = new Observable();
 
  constructor(private listingService: ListingService) { }
  
  ngOnInit(): void {
    this.fetchListings();
  }
  
  /* deleteListing(id: string): void {
    this.listingService.deleteListing(id).subscribe({
      next: () => this.fetchListings()
    });
  } */
  
  private fetchListings(): void {
    this.listings$ = this.listingService.getListings();
  }

  onSelect(listing: Listing): void {
    this.selectedListing = listing;    
  }
}
   
    

