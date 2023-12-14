import * as express from "express";
import * as mongodb from "mongodb";
import { User } from "../user/user";
import { user_collections } from "../../../src/database";

export { checkUserExists };

async function checkUserExists(req: any, res: any, next: any) {
    try {
        const name = req?.body?.name;
        const email = req?.body?.email;
        const query = { name: name, email: email };
        const user = await user_collections.users.findOne(query);

        if (user) {
            res.status(400).send({ message: "Failed! Username or Email is already in use." });
            return;
        }
    } catch (error) {
        res.status(500).send();
    }
    next();    
}

