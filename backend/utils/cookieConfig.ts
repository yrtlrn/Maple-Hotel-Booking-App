import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import { ObjectId } from "mongoose";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const generateCookie = (res: Response, userId: ObjectId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, {
        expiresIn: "1d",
    });

    res.cookie("authtoken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
    });
    
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["authtoken"];

    if (!token) {
        res.status(401);
        throw new Error("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN!);
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Unauthorized");
    }
};

export { generateCookie, verifyToken };
