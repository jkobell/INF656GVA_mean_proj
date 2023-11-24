import * as mongodb from "mongodb";
import { Listing } from "./listing/listing";
import { ListingImage } from "./image/listing_image";
import { User } from "./admin/user/user";

export const listing_collections: {
    listings?: mongodb.Collection<Listing>;
} = {};

export const image_collections: {
    listings_images?: mongodb.Collection<ListingImage>;
} = {};

export const user_collections: {
    users?: mongodb.Collection<User>;
} = {};

export async function db_connect(uri: string) {
    const db_client = new mongodb.MongoClient(uri);
    await db_client.connect();
    const db = db_client.db("menuappdb0");

    await schema_validate_listing(db);
    const listings_collection = db.collection<Listing>("listings");
    listing_collections.listings = listings_collection;

    await schema_validate_image(db);
    const images_collection = db.collection<ListingImage>("listings_images");
    image_collections.listings_images = images_collection;

    await schema_validate_user(db);
    const users_collection = db.collection<User>("users");
    user_collections.users = users_collection;
}

async function schema_validate_listing(db: mongodb.Db) {
    const listingJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "short_description", "price", "image", "active"],
            additionalProperties: false,
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "title of listing is required and is a string",
                },
                short_description: {
                    bsonType: "string",
                    description: "short_description of listing is required and is a string",
                },
                price: {
                    bsonType: "decimal128",
                    description: "price of listing is required and is a decimal128",
                },
                image: {
                    bsonType: "string",
                    description: "image of listing is required and is a base64 string",
                },
                active: {
                    bsonType: "bool",
                    description: "active status of listing is required and is a boolean",
                },
            } 
        }
    }

    await db.command({
        collMod: "listings",
        validator: listingJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("listings", {validator: listingJsonSchema});
        }
    });
}

async function schema_validate_image(db: mongodb.Db) {
    const imageJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "description", "size", "image"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "name of image is required and is a string",
                },
                description: {
                    bsonType: "string",
                    description: "description of image is required and is a string",
                },
                size: {
                    bsonType: "string",
                    description: "size of image is required and is a string",
                },
                image: {
                    bsonType: "string",
                    description: "image of listing is required and is a base64 string",
                },                    
            } 
        }
    }
    await db.command({
        collMod: "listings_images",
        validator: imageJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("images", {validator: imageJsonSchema});
        }
    });
}

async function schema_validate_user(db: mongodb.Db) {
    const userJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "password", "role"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "name of user is required and is a string",
                },
                email: {
                    bsonType: "string",
                    description: "email of user is required and is a string",
                },
                password: {
                    bsonType: "string",
                    description: "password of user is required and is a hash string",
                },
                role: {
                    bsonType: "string",
                    description: "role of user is required and is a string",
                },                                    
            } 
        }
    }
    await db.command({
        collMod: "users",
        validator: userJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("users", {validator: userJsonSchema});
        }
    });
}
