import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './admin/user';
import { Listing } from './listings/listing';
import { ListingImage } from './listings/listings_image';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit {
  isAdminCrud!: boolean;
  /* isAdminCrud: boolean = this.isCrudLoggedIn; */
  /* isAdminCrud: Promise<boolean> = this.isCrudLoggedIn; */
  API_URL: string = 'http://localhost:4242';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  private images$: Subject<ListingImage[]> = new Subject();
  private listings$: Subject<Listing[]> = new Subject();

  constructor(private httpClient: HttpClient, public router: Router){}

  ngOnInit(): void {
    this.initIsCrudLoggedIn(); 
  }

  async initIsCrudLoggedIn(): Promise<boolean> {
    /* const isAdminCrudLoggedIn = await this.isCrudLoggedIn();
    this.isAdminCrud = isAdminCrudLoggedIn; */
    //const isAdminCrudLoggedIn = 
    return this.isAdminCrud = await this.isCrudLoggedInAsync();
    //return isAdminCrudLoggedIn;
  }

  private refreshListings() {
    this.httpClient.get<Listing[]>(`${this.API_URL}/admin/listing`)
      .subscribe(listings => {
        this.listings$.next(listings);
      });
  }
  
  getListings(): Subject<Listing[]> {
    this.refreshListings();
    return this.listings$;
  }

  private refreshImages() {
    this.httpClient.get<ListingImage[]>(`${this.API_URL}/images`)
      .subscribe(images => {
        this.images$.next(images);
      });
  }
  
  getImages(): Subject<ListingImage[]> {
    this.refreshImages();
    return this.images$;
  }

  createImage(image: ListingImage): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/images`, image, { headers: this.headers });
  } 

  getListing(id: string): Observable<Listing> {
    return this.httpClient.get<Listing>(`${this.API_URL}/listings${id}`);
  }
  
  /* createListing(listing: Listing): Observable<any> { */
  createListing(listing: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/admin/listing`, listing, { headers: this.headers });
  }
  
  updateListing(listing: Listing): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/admin/listing`, listing, { headers: this.headers });
  }
  
  deleteListing(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/admin/listing/${id}`, { headers: this.headers });
  }

  /* register(user: User): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/admin/user/register`, user)
    .pipe(
      map(res => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  } */
  /* register(user: User) {
    return this.httpClient.post(`${this.API_URL}/admin/user/register`, user).pipe

    })
  } */
  /* register(user: User) {
    return this.httpClient.post(`${this.API_URL}/admin/user/register`, user)
    .subscribe((res: any) => {
      if (res.status === 201) {
        //this.router.navigate(['admin/login']);
        return;
      }
      catchError(this.handleError)
    })
  } */
  register(user: User): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/admin/user/register`, user)
    .pipe(catchError(this.handleError));          
  }

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/admin/user/login`, user)
      .pipe(catchError(this.handleError));
     /*  .subscribe((res: any) => {
        localStorage.setItem('access_token', res.access_token);
        this.currentUser = res;
        if (res.user.role) {
          this.router.navigate(['admin/admins/admin'+ res.user.role]);
        }                
      }); */
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  get isCrudLoggedIn(): boolean {
  let authToken = localStorage.getItem('access_token');
    if (authToken) {
        try {
          let jwt_payload = JSON.parse(atob(authToken.split('.')[1]));
          return jwt_payload.role === 'crud' ? true : false;
        } catch (e) {
          return false;
        }
    }
    else {
      return false;
    }
  }
  
  isCrudLoggedInAsync(): Promise<boolean> {
    let crud_login = new Promise<boolean>((resolve) => {
      let authToken = localStorage.getItem('access_token');
      if (authToken) {
        try {
          let jwt_payload = JSON.parse(atob(authToken.split('.')[1]));
          resolve(jwt_payload.role === 'crud' ? true : false);
        } catch (e) {
         resolve(false);
        }
      }
      else {
        resolve(false);
      }
    });
    return crud_login;    
  }
  

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['admin/login']);
    }
  }

  getUserProfile(id: any): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers }).pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  registerAdmin() {
    this.router.navigate(['admin/register']);
  }

  adminNavAddListing() {
    this.router.navigate(['admin/add-listing']);    
  }
  adminNavUploadImage() {
    this.router.navigate(['admin/image-upload']);
  }
  adminNavUpdateListing() {
    this.router.navigate(['admin/admin-listings']);
  }
  adminLogout() {
    this.logout();
  }
  clientMenu() {
    this.router.navigate(['menu']);
  }
  adminHome() {
    this.isCrudLoggedIn ? this.router.navigate(['admin/admins/admincrud']) : this.router.navigate(['admin/admins/adminru'])    
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      if (error.statusText === 'Unauthorized') {
        msg = error.statusText;
      }
      else {
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }      
    }
    /* return throwError(msg); */
    return throwError(() => new Error(msg));
  }
}
