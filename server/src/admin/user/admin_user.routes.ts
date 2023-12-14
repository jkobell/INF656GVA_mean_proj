import * as express from "express";
import * as bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../../../src/configuration/config";
import { validationResult } from 'express-validator';
import { user_collections } from "../../../src/database";
import { checkUserExists } from "../middleware/can_register";
import { User } from "./user";
import { validateRegisterUser, validateLoginUser } from "../middleware/validator";

export const admin_userRouter = express.Router();
admin_userRouter.use(express.json());

admin_userRouter.get("/", async (_req, res) => {
    try {
        const users = await user_collections.users.find({}).toArray();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
 }); 

 admin_userRouter.post("/register", [checkUserExists, validateRegisterUser], async (req: any, res: any, next: any) => {
    const result_errors = validationResult(req).array();
    if (result_errors && result_errors.length > 0) {
      return res.status(400).json(result_errors);
    }
    try {
        let { name, email, password, role } = req.body;
        let user = {} as User;
        user.name = name;
        user.email = email;
        user.password = bcryptjs.hashSync(password, 8);
        user.role = !role ? 'ru' : role;
        const result = await user_collections.users.insertOne(user);
  
        if (result.acknowledged) {
            res.status(201).send({ "status": 201});
        } else {
            res.status(500).send();
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
    next();
 });

 admin_userRouter.post("/login", validateLoginUser, async (req: any, res: any, next: any) => {
    const result_errors = validationResult(req).array();
    if (result_errors && result_errors.length > 0) {
      return res.status(400).json(result_errors);
    }
    try {
        let { email, password } = req.body;
        let user = {} as User;
        user.email = email;
        user.password = bcryptjs.hashSync(password, 8);
        const result_user = await user_collections.users.findOne({email: user.email});
        
        if (!result_user || !bcryptjs.compareSync(password, result_user.password)) {
            res.status(401).send();
            return;
        }
        
        const  expiresIn  =  1  *  60  *  60;
        const accessToken = jwt.sign(
            { _id: result_user._id, role: result_user.role },
            config.jwtSecret, { expiresIn: expiresIn }
        );                
       
       res.status(200).send({ "user": result_user, "access_token": accessToken, "expires_in":  expiresIn});       
            
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
    next();
 });