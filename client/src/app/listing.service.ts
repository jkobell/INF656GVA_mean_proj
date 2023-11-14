import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Listing } from './listings/listing'; 

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private url = 'http://localhost:4200';
  private listings$: Subject<Listing[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshListings() {
    this.httpClient.get<Listing[]>(`${this.url}/listings`)
      .subscribe(listings => {
        this.listings$.next(listings);
      });
  }
  
  getListings(): Subject<Listing[]> {
    this.refreshListings();
    return this.listings$;
  }
  
  getListing(id: string): Observable<Listing> {
    return this.httpClient.get<Listing>(`${this.url}/listings/${id}`);
  }
  
  createListing(listing: Listing): Observable<string> {
    return this.httpClient.post(`${this.url}/listings`, listing, { responseType: 'text' });
  }
  
  updateListing(id: string, listing: Listing): Observable<string> {
    return this.httpClient.put(`${this.url}/listings/${id}`, listing, { responseType: 'text' });
  }
  
  deleteListing(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/listings/${id}`, { responseType: 'text' });
  }
}
