import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/apiClient";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type LogInProps = {
    email: string;
    password: string;
};

const LogInPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LogInProps>();

    const mutation = useMutation(apiClient.logInUser, {
        onSuccess: async () => {
            toast("Log In Successful", { type: "success" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (err: Error) => {
            toast("Log In Failed!!!", { type: "error" });
            toast(err.message, { type: "error" });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    const changePasswordVisibility = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const elem = document.getElementById(
            "password"
        ) as HTMLInputElement | null;
        const type = elem!.type;
        if (type === "password") {
            elem!.type = "text";
        } else {
            elem!.type = "password";
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <label className="form-control w-1/2 mx-auto mt-20 gap-10 ">
                <section>
                    <div className="label">Email</div>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        {...register("email", {
                            required: "This field is required",
                        })}
                    />
                    {errors.email && (
                        <span className="text-sm text-red-300">
                            {errors.email.message}
                        </span>
                    )}
                </section>
                <section>
                    <div className="label">Password</div>
                    <div className="flex relative items-center justify-end">
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            id="password"
                            {...register("password", {
                                required: "This field is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />
                        <span className="absolute mr-2">
                            <button
                                onClick={(e) => changePasswordVisibility(e)}
                            >
                                <FaEye />
                            </button>
                        </span>
                    </div>
                    {errors.password && (
                        <span className="text-sm text-red-300">
                            {errors.password.message}
                        </span>
                    )}
                </section>
                <button className="btn border hover:border-white text-2xl">
                    Log In
                </button>
                <aside className="text-center text-md">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="underline">
                        Sign Up
                    </Link>
                </aside>
            </label>
        </form>
    );
};
export default LogInPage;
