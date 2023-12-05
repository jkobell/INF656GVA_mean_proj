import * as express from "express";
import * as mongodb from "mongodb";
import { listing_collections } from "../database";
import { Listing } from "./listing";

export const listingRouter = express.Router();
listingRouter.use(express.json());

listingRouter.get("/", async (_req, res) => {
    try {
        /* const query = { active: true }; */
        
        /* const listings = await listing_collections.listings.find({}).toArray(); */

        //const listings = await listing_collections.listings.find({}).toArray();

        /* const json_listings_stringified = JSON.stringify(listings);
        const json_listings = JSON.parse(json_listings_stringified);
        const filtered_listings = json_listings.toArray(); */
        //const filtered_listings = JSON.parse(listings);
        /* const listings = await listing_collections.listings.find({title: "Skillet Salmon and Potato Plate"}).toArray(); */
        const listings = await listing_collections.listings.find({active: "true"}).toArray();
        res.status(200).send(listings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});