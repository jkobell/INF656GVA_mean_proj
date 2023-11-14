import * as express from "express";
import * as mongodb from "mongodb";
import { listing_collections } from "../../../src/database";
import { InsertOneListing, UpdateOneListing, InsertOneListingImage } from "../../../src/utility";

export const admin_listingRouter = express.Router();
admin_listingRouter.use(express.json());

admin_listingRouter.get("/", async (_req, res) => {
    try {
        //InsertOneListing();
        //UpdateOneListing();
        //InsertOneListingImage();
        const listings = await listing_collections.listings.find({}).toArray();
        res.status(200).send(listings);
        //res.status(200).send('HELLO ADMIN listings');
    } catch (error) {
        res.status(500).send(error.message);
    }
 });

 admin_listingRouter.get("/:id", async (req, res) => { //url example, query by objectId; http://localhost:4242/admin/listings/654f792269d021d8e9209172
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const listing = await listing_collections.listings.findOne(query);
  
        if (listing) {
            res.status(200).send(listing);
        } else {
            res.status(404).send(`Failed to find a listing: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find a listing: ID ${req?.params?.id}`);
    }
 });

 admin_listingRouter.post("/", async (req, res) => {
    try {
        const listing = req.body;
        const result = await listing_collections.listings.insertOne(listing);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new listing: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new listing.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 admin_listingRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const listing = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await listing_collections.listings.updateOne(query, { $set: listing });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated a listing: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find a listing: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a listing: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 admin_listingRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await listing_collections.listings.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed a listing: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a listing: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a listing: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });