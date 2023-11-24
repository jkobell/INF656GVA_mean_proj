import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { db_connect } from "./database";
import { listingRouter } from "./listing/listing.routes";
import { admin_listingRouter } from "./admin/admin_listing/admin_listing.routes";
import { admin_userRouter } from "./admin/user/admin_user.routes";
import { checkUserExists } from "./admin/middleware/can_register";

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
        app.use("/admin/listing", admin_listingRouter);
        app.use("/admin/user", admin_userRouter);
        app.use(checkUserExists);

        app.listen(4242, () => {
            console.log('Express server is listening at http://localhost:4242...');
        });
    }).catch(error => console.error(error));
