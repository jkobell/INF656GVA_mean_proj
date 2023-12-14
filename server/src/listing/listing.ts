import * as mongodb from "mongodb";

export interface Listing {
  _id?: mongodb.ObjectId;
  image: string;
  title: string;
  short_description: string;
  price: string;
  active: string; 
}