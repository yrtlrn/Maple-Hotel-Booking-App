import { useMutation, useQuery, useQueryClient } from "react-query";
import UserForm from "../forms/ManageUserForms/UserForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api/apiClient";
import { UserProps } from "../../../backend/shared/types";

const EditProfilePage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: user } = useQuery("getUserData", apiClient.getUserData, {
        onError: (err: Error) => {
            toast(err.message, { type: "error" });
        },
        enabled: true,
    });

    const { mutate } = useMutation(apiClient.updateUser, {
        onSuccess: async () => {
            toast("Profile Edit Successful", { type: "success" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (err: Error) => {
            toast("Failed To Edit Profile", { type: "error" });
            toast(err.message, { type: "error" });
        },
    });

    const handleSave = (userData: UserProps) => {
        mutate(userData);
    };

    return (
        <>
            <UserForm type="Edit" onSave={handleSave} user={user} />
        </>
    );
};
export default EditProfilePage;
