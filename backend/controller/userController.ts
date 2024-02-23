import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/usersModel";
import { generateCookie } from "../utils/cookieConfig";

type UpdateUserProps = {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
};

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

// DESC     Log in user
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
        expires: new Date(0),
    });
    res.status(200).json({ message: "User Logged Out Successful" });
});

// DESC     Edit user profile
// ROUTE    PUT /api/v1/users/edit-profile
// ACCESS   private
const editUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;
    const {
        firstName,
        lastName,
        email,
        currentPassword,
        newPassword: password,
    } = req.body;

    if (!firstName || !lastName || !email || !currentPassword) {
        res.status(422).json({
            message: "Please enter all the required fields",
        });
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }
    if ((await user.checkPassword(currentPassword)) === false) {
        res.status(402);
        res.json({ message: "Password Incorrect" });
        return;
    }

    const emailDuplicate = await User.countDocuments({
        _id: { $ne: userId },
        email,
    });

    if (emailDuplicate > 0) {
        res.status(422).json({ message: "Please choose a different email" });
        return;
    }

    let updateValues: UpdateUserProps = { firstName, lastName, email };

    if (password) {
        updateValues = {
            firstName,
            lastName,
            email,
            password,
        };
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        updateValues,
        {
            new: true,
            function(error: Error) {
                if (error) {
                    console.log(error);
                }
            },
        }
    );
    if (updatedUser) {
        res.status(200).json({ message: "User update successful" });
        return;
    }
    res.status(500).json({ message: "Something went wrong" });
});

// DESC     Get User Data
// ROUTE    Get /api/v1/users/
// ACCESS   private
const getUserData = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password -_id -__v");
    if (!user) {
        res.status(400);
        throw new Error("User does not exist");
    }
    res.status(200).json(user);
});

export { addNewUser, logInUser, verifyUser, logOutUser, editUser, getUserData };
