import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { db_connect } from "./database";
import { listingRouter } from "./listing/listing.routes";
import { admin_listingRouter } from "./admin/admin_listing/admin_listing.routes";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("Connection string error.");
    process.exit(1);
}

db_connect(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use("/listings", listingRouter);
        app.use("/admin/listings", admin_listingRouter);

        app.listen(4242, () => {
            console.log('Express server is listening at http://localhost:4242...');
        });
    }).catch(error => console.error(error));
