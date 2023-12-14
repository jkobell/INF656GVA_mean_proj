import * as express from "express";
import * as mongodb from "mongodb";
import { listing_collections } from "../database";
import { Listing } from "./listing";

export const listingRouter = express.Router();
listingRouter.use(express.json());

listingRouter.get("/", async (_req, res) => {
    try {        
        const listings = await listing_collections.listings.find({active: "true"}).toArray();
        res.status(200).send(listings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});