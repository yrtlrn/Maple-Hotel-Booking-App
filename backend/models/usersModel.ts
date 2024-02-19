import mongoose, { Model, ObjectId } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

interface UserMethods {
    checkPassword(password: string): boolean
}

type UserModel = Model<UserType,{},UserMethods>

const userSchema = new mongoose.Schema<UserType,UserModel,UserMethods>({
    firstName: {
        type: String,
        minlength: 3,
        required: true,
    },
    lastName: {
        type: String,
        minlength: 3,
        required: true,
    },
    email: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.method(
    "checkPassword",
    async function checkPassword(password: string) {
        const check:boolean = await bcrypt.compare(password,this.password)
        if (check) {
            return check
        }
    }
);

const User = mongoose.model<UserType, UserModel>("user", userSchema);
export default User;
