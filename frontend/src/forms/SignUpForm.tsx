import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export type SignUpProps = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUpForm = () => {
    const navigate = useNavigate();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpProps>();

    const mutation = useMutation(apiClient.signUpNewUser, {
        onSuccess: async () => {
            toast("Sign Up Successful", { type: "success" });
            navigate("/");
        },
        onError: (err: Error) => {
            toast("Sign Up Failed", { type: "error" });
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

    const changeConfirmPasswordVisibility = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const elem = document.getElementById(
            "confirmPassword"
        ) as HTMLInputElement | null;
        const type = elem!.type;
        if (type === "password") {
            elem!.type = "text";
        } else {
            elem!.type = "password";
        }
    };

    return (
        <form className="mt-10" onSubmit={onSubmit}>
            <label className="form-control mx-auto lg:w-1/2 gap-4">
                <section className="flex flex-col gap-2 md:flex-row">
                    <div className="w-full md:w-1/2">
                        <div className="label">
                            <span className="label-text text-xl">
                                First Name
                            </span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            autoFocus
                            {...register("firstName", {
                                required: "This field is required",
                            })}
                        />
                        {errors.firstName && (
                            <span className="text-sm text-red-200">
                                {errors.firstName.message}
                            </span>
                        )}
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="label">
                            <span className="label-text text-xl">
                                Last Name
                            </span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full "
                            {...register("lastName", {
                                required: "This field is required",
                            })}
                        />
                        {errors.lastName && (
                            <span className="text-sm text-red-200">
                                {errors.lastName.message}
                            </span>
                        )}
                    </div>
                </section>

                <section className="w-full">
                    <div className="label">
                        <span className="label-text text-xl">Email</span>
                    </div>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        {...register("email", {
                            required: "This field is required",
                            minLength: 3,
                        })}
                    />
                    {errors.email && (
                        <span className="text-sm text-red-200">
                            {errors.email.message}
                        </span>
                    )}
                </section>
                <section className="w-full">
                    <div className="label">
                        <span className="label-text text-xl">Password</span>
                    </div>
                    <div className="flex relative justify-end items-center">
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            id="password"
                            {...register("password", {
                                required: "This field is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Password must be more than 6 characters",
                                },
                            })}
                        />
                        <span className="absolute mr-2 flex">
                            <button
                                onClick={(e) => changePasswordVisibility(e)}
                            >
                                <FaEye size={20} />
                            </button>
                        </span>
                    </div>
                    {errors.password && (
                        <span className="text-sm text-red-200">
                            {errors.password.message}
                        </span>
                    )}
                </section>
                <section className="w-full">
                    <div className="label">
                        <span className="label-text text-xl">
                            Confirm Password
                        </span>
                    </div>
                    <div className="flex relative justify-end items-center">
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            id="confirmPassword"
                            {...register("confirmPassword", {
                                validate: (val) => {
                                    if (!val) {
                                        return "This field is required";
                                    } else if (watch("password") !== val) {
                                        return "The passwords do not match";
                                    }
                                },
                            })}
                        />
                        <span className="absolute mr-2 flex">
                            <button
                                onClick={(e) =>
                                    changeConfirmPasswordVisibility(e)
                                }
                            >
                                <FaEye size={20} />
                            </button>
                        </span>
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-sm text-red-200">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </section>
                <button className={`btn text-2xl px-2 border border-white`}>
                    Sign Up
                </button>
                <aside className="text-center text-md">Already have an Account? <Link to="/log-in" className="underline">Log In</Link></aside>
            </label>
        </form>
    );
};
export default SignUpForm;
