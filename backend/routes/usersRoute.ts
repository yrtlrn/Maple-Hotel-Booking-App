import express from "express";
import { addNewUser, logInUser } from "../controller/userController";
import {
    newUserValidator,
    logInValidator,
} from "../middleware/validators/userValidators";
import { verifyToken } from "../utils/cookieConfig";

const router = express.Router();

router.post("/sign-up", newUserValidator, addNewUser);
router.post("/log-in", logInValidator, logInUser);
router.post("/private", verifyToken, logInUser);

export default router;
