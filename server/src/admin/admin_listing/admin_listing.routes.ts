import * as express from "express";
import * as mongodb from "mongodb";
import { listing_collections } from "../../../src/database";

export const admin_listingRouter = express.Router();
admin_listingRouter.use(express.json());

admin_listingRouter.get("/", async (_req, res) => {
    try {        
        const listings = await listing_collections.listings.find({}).toArray();
        res.status(200).send(listings);
    } catch (error) {
        res.status(500).send(error.message);
    }
 });

 admin_listingRouter.get("/:id", async (req, res) => {
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
            res.status(201).send({ "status": 201, "success_message":`Created a new listing: ID ${result.insertedId}.`});
        } else {
            res.status(500).send({ "status": 500, "fail_message":"Failed to create a new listing."});
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({ "status": 400, "error_message":error.message});
    }
 });
 
 admin_listingRouter.put("/", async (req, res) => {
    try {
        const listing = req.body;
        const query = { _id: new mongodb.ObjectId(listing.id) };
        const result = await listing_collections.listings.updateOne(query, { $set: listing });
  
        if (result && result.matchedCount) {
            res.status(200).send({ "status": 200, "success_message":`Listing ID ${listing.id} was updated.`});
        } else if (!result.matchedCount) {
            res.status(404).send({ "status": 404, "fail_message":`Failed to locate ID ${listing.id}.`});
        } else {
            res.status(304).send({ "status": 304, "fail_message":`ID ${listing.id} was not updated.`});
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ "status": 400, "error_message":error.message});
    }
 });

 admin_listingRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await listing_collections.listings.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(200).send({ "status": 200, "success_message":`Listing ID ${id} was deleted.`});
        } else if (!result) {
            res.status(400).send({ "status": 400, "fail_message":`Failed to delete ID ${id}.`});
        } else if (!result.deletedCount) {
            res.status(404).send({ "status": 404, "fail_message":`Failed to locate ID ${id}.`});
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ "status": 400, "error_message":error.message});
    }
 });