import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/usersModel";
import { generateCookie } from "../utils/cookieConfig";

// DESC     Add a new user
// ROUTE    POST /api/v1/users/sign-up
// ACCESS   Public
const addNewUser = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

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
// ROUTE    POST /api/v1/users/log-in
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

// DESC     Verify user with jwt
// ROUTE    POST /api/v1/users/verify-user
// ACCESS   private
const verifyUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ userId: req.userId });
});

// DESC     Verify user with jwt
// ROUTE    POST /api/v1/users/log-out
// ACCESS   private
const logOutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie("authtoken", "", {
        expires: new Date(0)
    })
    res.status(200).json({message: 'User Logged Out Successful'})
})


export { addNewUser, logInUser, verifyUser, logOutUser };
