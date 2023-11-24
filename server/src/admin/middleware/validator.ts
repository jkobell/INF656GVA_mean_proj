import { body } from 'express-validator';
export { registerUserValidator, updateContactValidator, deleteContactValidator };

export { validateRegisterUser, validateLoginUser };

function validateRegisterUser(req: any, res: any, next: any) {
    try { 
        if (!registerUserValidator) {
            res.status(400).send({ message: "Failed! User registration validation." });
            return;
        }
    } catch (error) {
        res.status(500).send();
    }
    next();    
}

const registerUserValidator = [
    body('id', 'Id is not valid.').not().isEmpty().trim().isAlpha('en-US', {ignore: '\s'}).escape(),
    body('name', 'Name is not valid.').not().isEmpty().trim().isAlpha('en-US', {ignore: '\s'}).escape(),
    body('password', 'Password is not valid.').not().isEmpty().trim().isAlpha('en-US', {ignore: '\s'}).escape(),
    body('email', 'Email is not valid.').not().isEmpty().isEmail().normalizeEmail(),
    body('role', 'Role is not valid.').not().isEmpty().trim().isAlpha('en-US', {ignore: '\s'}).escape()
]

const updateContactValidator = [
    body('id', 'Id is not valid.').not().isEmpty().isNumeric().escape(),
    body('name', 'Name is not valid.').not().isEmpty().trim().isAlpha('en-US', {ignore: '\s'}).escape(),
    body('phone', 'Phone number is not valid.').not().isEmpty().isMobilePhone('en-US').escape(),
    body('email', 'Email is not valid.').not().isEmpty().isEmail().normalizeEmail(),
    body('region', 'Region is not valid.').not().isEmpty().trim().isAlpha('en-US', {ignore: '\s'}).escape()
]

const deleteContactValidator = [
    body('id', 'Id is not valid.').not().isEmpty().isNumeric().escape()
]

const loginUserValidator = [    
    body('password', 'Password is not valid.').not().isEmpty().trim().isAlpha('en-US', {ignore: '\s'}).escape(),
    body('email', 'Email is not valid.').not().isEmpty().isEmail().normalizeEmail()
]

function validateLoginUser(req: any, res: any, next: any) {
    try { 
        if (!loginUserValidator) {
            res.status(400).send({ message: "Failed! User login validation." });
            return;
        }
    } catch (error) {
        res.status(500).send();
    }
    next();    
}