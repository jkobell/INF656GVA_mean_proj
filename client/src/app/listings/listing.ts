/* export interface Listing {
    listing_id: number;
    image_id: number;
    title: string;
    short_description: string;
    price: number; 
  } */
  export interface Listing {
    _id?: string;
    image?: string;
    title?: string;
    short_description?: string;
    price?: number;
    active?: boolean; 
  }