import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import User from "../../models/usersModel";

const newUserValidator = [
    check("firstName", "Please enter a Fisrt Name with 3 or more character")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    check("lastName", "Please enter a Last Name with 3 or more character")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    check("email", "You must enter an Email")
        .isEmail()
        .normalizeEmail()
        .escape(),
    check("password", "Password must be more than 6 character")
        .isLength({ min: 6 })
        .trim()
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res
                .status(422)
                .json({ errors: errors.array(), message: "Validation Error" });
        }
        next();
    },
];

const logInValidator = [
    check("email", "Please enter a proper email").isEmail().trim().escape(),
    check("password", "Please enter a password with more than 6 character")
        .trim()
        .isLength({ min: 6 })
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ errors: errors.array(), message: "Validation Error" });
        }
        next();
    },
];

const editUserValidator = [
    check("firstName", "Fisrt Name must be 3 or more character")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    check("lastName", "Last Name must be with 3 or more character")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    check("email", "Please enter a valid email address")
        .isEmail()
        .normalizeEmail()
        .escape(),
    check("currentPassword", "Password must be more than 6 character")
        .isLength({
            min: 6,
        })
        .escape(),
    check("newPassword", "Password must be more than 6 character")
        .optional({ checkFalsy: true })
        .isLength({
            min: 6,
        })
        .escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(422)
                .json({ errors: errors.array(), message: "Validation Error" });
        }
        next();
    },
];

export { newUserValidator, logInValidator, editUserValidator };
