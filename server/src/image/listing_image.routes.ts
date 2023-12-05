import * as express from "express";
import * as mongodb from "mongodb";
import { image_collections } from "../database";

export const listingImageRouter = express.Router();
listingImageRouter.use(express.json());

listingImageRouter.get("/", async (_req, res) => {
    try {
        const listings_images = await image_collections.listings_images.find({}).toArray();
        res.status(200).send(listings_images);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

listingImageRouter.post("/", async (req, res) => {
    try {
        const image = req.body;
        const result = await image_collections.listings_images.insertOne(image);
  
        if (result.acknowledged) {
            res.status(201).send({ "status": 201, "success_message":`Created a new listing image: ID ${result.insertedId}.`});
        } else {
            res.status(500).send({ "status": 500, "fail_message":"Failed to create a new listing image."});
        }
    } catch (error) {
        console.error(error);
        res.status(400).send({ "status": 400, "error_message":error.message});
    }
 });