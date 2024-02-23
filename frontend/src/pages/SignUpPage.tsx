import { useMutation, useQueryClient } from "react-query";
import UserForm, { UserProps } from "../forms/ManageUserForms/UserForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api/apiClient";

const SignUpPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation(apiClient.signUpNewUser, {
        onSuccess: async () => {
            toast("Sign Up Successful", { type: "success" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (err: Error) => {
            toast("Sign Up Failed", { type: "error" });
            toast(err.message, { type: "error" });
        },
    });

    const handleSave = (userData: UserProps) => {
        mutate(userData);
    };

    return (
        <>
            <UserForm type="Sign Up" onSave={handleSave} />
        </>
    );
};
export default SignUpPage;
