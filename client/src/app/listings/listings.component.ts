import { Component, OnInit } from '@angular/core';
import { Listing } from './listing';
import { LISTINGS } from './mock_listings';
import { LISTINGS_IMAGES } from './mock_listings_images';
//import { setContentContainerSize } from 'set_content_container_size';
//import { runThis } from 'set_content_container_size';

@Component({
    selector: 'app_listings',
    templateUrl: './listings.component.html',
    styleUrls: ['./listings.component.css']
  })

  /* export class ListingsComponent implements OnInit { */
  export class ListingsComponent {
    
    listings = LISTINGS;
    selectedListing?: Listing;
    
    listings_images = LISTINGS_IMAGES;
    //image = this.listings_images[0].image_b64;
    
    /* ngOnInit(): void {
      setContentContainerSize();
    } */
   
    onSelect(listing: Listing): void {
        this.selectedListing = listing;    
    }
  }
