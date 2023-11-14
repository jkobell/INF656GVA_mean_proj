import * as mongodb from "mongodb";

export interface ListingImage {
    _id?: mongodb.ObjectId;
    name: string;
    description: string;
    size: string;
    image: string; 
  }