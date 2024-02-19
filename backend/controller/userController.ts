import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/usersModel";
import { generateCookie } from "../utils/cookieConfig";

// DESC     Add a new user
// ROUTE    POST /api/v1/users
// ACCESS   Public
const addNewUser = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const duplicate = await User.findOne({ email });
    if (duplicate) {
        res.status(400).json({
            message: "A user with that email already exists.",
        });
        return;
    }

    const user = await User.create(req.body);

    if (!user) {
        res.status(400).json({ message: "Something went wrong" });
    }
    generateCookie(res, user._id);

    res.status(201).json(user);
});

// DESC     Add a new user
// ROUTE    POST /api/v1/users
// ACCESS   Public
const logInUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }


    if (await user.checkPassword(password)) {
        generateCookie(res, user._id);
        res.status(200).json({ message: "Login in successful" });
    } else {
        res.status(400);
        throw new Error("Email or Password doesn't match");
    }
});

export { addNewUser, logInUser };
