import { LogInProps } from "../pages/LogInPage";
import { SignUpProps } from "../forms/UserForm";

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

const authToken = async () => {
    const response = await fetch(`${API_URL}/users/auth-token`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Invalid Token");
    }
    
};

const logOut = async () => {
    const response = await fetch(`${API_URL}/users/log-out`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Could not log out")
    }
}

export { signUpNewUser, logInUser, authToken, logOut };
