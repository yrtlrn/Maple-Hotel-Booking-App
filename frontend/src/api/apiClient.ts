import { toast } from "react-toastify";
import { LogInProps } from "../forms/LogInForm";
import { SignUpProps } from "../forms/SignUpForm";

const API_URL = "http://localhost:3000/api/v1";

const signUpNewUser = async (formData: SignUpProps) => {
    const response = await fetch(`${API_URL}/users/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

const logInUser = async (formData: LogInProps) => {
    const response = await fetch(`${API_URL}/users/log-in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};


export { signUpNewUser, logInUser };
