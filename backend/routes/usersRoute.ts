import express from "express";
import { addNewUser, logInUser, logOutUser, verifyUser } from "../controller/userController";
import {
    newUserValidator,
    logInValidator,
} from "../middleware/validators/userValidators";
import { verifyToken } from "../utils/cookieConfig";

const router = express.Router();

router.post("/sign-up", newUserValidator, addNewUser);
router.post("/log-in", logInValidator, logInUser);
router.post("/auth-token", verifyToken, verifyUser)
router.post("/log-out", verifyToken, logOutUser )

export default router;
