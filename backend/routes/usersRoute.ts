import express from "express";
import {
    addNewUser,
    editUser,
    getUserData,
    logInUser,
    logOutUser,
    verifyUser,
} from "../controller/userController";
import {
    newUserValidator,
    logInValidator,
    editUserValidator,
} from "../middleware/validators/userValidators";
import { verifyToken } from "../utils/cookieConfig";

const router = express.Router();

router.get("/", verifyToken, getUserData)
router.post("/sign-up", newUserValidator, addNewUser);
router.post("/log-in", logInValidator, logInUser);
router.post("/log-out", verifyToken, logOutUser);
router.put("/edit-profile", verifyToken,editUserValidator, editUser);

router.post("/auth-token", verifyToken, verifyUser);

export default router;
