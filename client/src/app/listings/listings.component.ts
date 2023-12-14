import { Component, OnInit } from '@angular/core';
import { Listing } from './listing';
import { Observable } from 'rxjs';
import { ListingService } from '../listing.service';

@Component({
    selector: 'app_listings',
    templateUrl: './listings.component.html',
    styleUrls: ['./listings.component.css']
  })
  
  export class ListingsComponent implements OnInit {    
    selectedListing?: Listing;
    listings$: Observable<Listing[]> = new Observable();
 
  constructor(private listingService: ListingService) { }
  
  ngOnInit(): void {
    this.fetchListings();
  } 
  
  private fetchListings(): void {
    this.listings$ = this.listingService.getListings();
  }

  onSelect(listing: Listing): void {
    this.selectedListing = listing;    
  }
}
   
    

