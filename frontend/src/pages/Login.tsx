import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export type LoginFormInput = {
  email: string;
  password: string;
};

const Login = () => {
  const queryClient = useQueryClient(); //to invalidate the query "verify-token" so it refetches
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate: logIn } = useMutation({
    mutationFn: apiClient.logIn,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["verify-token"] });
      showToast({ message: "login successful", type: "SUCCESS" });
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const onSubmit = (loginData: LoginFormInput) => {
    logIn(loginData);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Login to your account</h2>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <button
          className="w-40 font-bold text-lg bg-blue-800 text-white"
          type="submit"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
