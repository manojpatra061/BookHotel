import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  const queryClient = useQueryClient(); //to invalidate the query "verify-token" so it refetches
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate: registerUser } = useMutation({
    mutationFn: apiClient.registerUser,
    onSuccess: async (data: { message: string }) => {
      queryClient.invalidateQueries({ queryKey: ["verify-token"] });
      // showToast({ message: "your account has been created", type: "SUCCESS" }); // pass message and type -> show the toast for 5sec
      showToast({ message: data.message, type: "SUCCESS" }); // pass message and type -> show the toast for 5sec
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInput>();

  const onSubmit = (data: RegisterFormInput) => {
    registerUser(data);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Create an account</h2>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row md:*:flex-grow gap-4">
          <div className="flex flex-col">
            {/* <span>First name</span>  */}
            {errors.firstName && (
              <span className="text-red-600 font-thin">
                {errors.firstName.message}
              </span>
            )}
            <input
              className="border border-gray-500 rounded px-2"
              type="text"
              {...register("firstName", { required: "first name is required" })}
              placeholder="First name*"
            />
          </div>
          <div className="flex flex-col">
            {/* <span>Last name</span> */}
            {errors.lastName && (
              <span className="text-red-600 font-thin">
                {errors.lastName.message}
              </span>
            )}
            <input
              className="border border-gray-500  rounded px-2"
              type="text"
              {...register("lastName", { required: "last name is required" })}
              placeholder="Last name*"
            />
          </div>
        </div>
        <div className="flex flex-col">
          {/* <span>Email</span> */}
          {errors.email && (
            <span className="text-red-600 font-thin">
              {errors.email.message}
            </span>
          )}
          <input
            className="border border-gray-500  rounded px-2"
            type="text"
            {...register("email", { required: "email is required" })}
            placeholder="Email*"
          />
        </div>
        <div className="flex flex-col">
          {/* <span>Password</span> */}
          {errors.password && (
            <span className="text-red-600 font-thin">
              {errors.password.message}
            </span>
          )}
          <input
            className="border border-gray-500  rounded px-2"
            type="password"
            {...register("password", { required: "password is required" })}
            placeholder="Password*"
          />
        </div>
        <div className="flex flex-col">
          {/* <span>Re-enter password</span> */}
          {errors.confirmPassword && (
            <span className="text-red-600 font-thin">
              {errors.confirmPassword.message}
            </span>
          )}
          <input
            className="border border-gray-500  rounded px-2"
            type="password"
            {...register("confirmPassword", {
              validate: (value) => {
                if (value.length === 0) {
                  return "re-enter the password, it cannot be blank";
                }
                if (value !== watch("password")) {
                  return "password doesn't match";
                }
              },
            })}
            placeholder="Confirm password*"
          />
        </div>

        <button
          className="w-40 font-bold text-lg bg-blue-800 text-white"
          type="submit"
        >
          create account
        </button>
      </form>
    </div>
  );
};

export default Register;
