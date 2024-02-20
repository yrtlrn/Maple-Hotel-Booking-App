import express from "express";
import { addNewUser, logInUser, verifyUser } from "../controller/userController";
import {
    newUserValidator,
    logInValidator,
} from "../middleware/validators/userValidators";
import { verifyToken } from "../utils/cookieConfig";

const router = express.Router();

router.post("/sign-up", newUserValidator, addNewUser);
router.post("/log-in", logInValidator, logInUser);
router.post("/auth-token", verifyToken, verifyUser)

export default router;
