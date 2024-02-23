import { LogInProps } from "../pages/LogInPage";
import { UserProps } from "../../../backend/shared/types";

const API_URL = "http://localhost:3000/api/v1";

const signUpNewUser = async (formData: UserProps) => {
    const response = await fetch(`${API_URL}/users/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
    });

    const resBody = await response.json();

    if (!response.ok) {
        throw new Error(resBody.message);
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

    const resBody = await response.json();

    if (!response.ok) {
        throw new Error(resBody.message);
    }
};

const authToken = async () => {
    const response = await fetch(`${API_URL}/users/auth-token`, {
        method: "POST",
        credentials: "include",
    });
    const resBody = await response.json();

    if (!response.ok) {
        throw new Error(resBody.message);
    }
};

const logOut = async () => {
    const response = await fetch(`${API_URL}/users/log-out`, {
        method: "POST",
        credentials: "include",
    });
    const resBody = await response.json();

    if (!response.ok) {
        throw new Error(resBody.message);
    }
};

const updateUser = async (formData: UserProps) => {
    const editedFormData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        currentPassword: formData.password,
        newPassword: formData.confirmPassword,
    };

    const response = await fetch(`${API_URL}/users/edit-profile`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedFormData),
    });
    const resBody = await response.json();
    if (!response.ok) {
        throw new Error(resBody.message);
    }
};

const getUserData = async () => {
    const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        credentials: "include",
    });

    const resBody = await response.json();
    if (!response.ok) {
        throw new Error(resBody.message);
    }

    return resBody;
};

export { signUpNewUser, logInUser, authToken, logOut, updateUser, getUserData };
