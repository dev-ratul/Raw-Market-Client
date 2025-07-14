import React, {  } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"; // React Router
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const Login = () => {

  const {login, user}= useAuth()
  const navigate= useNavigate()
  console.log(user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    

    // login
    login(data.email, data.password)
      .then((result)=>{
        console.log(result)
        navigate('/')
      })
      .catch(error=>{
        console.log(error)
      })
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-sm text-gray-500">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="input input-bordered w-full"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full rounded-full">
            Login
          </button>
        </form>

        <div className="divider text-sm text-gray-500 before:bg-gray-300 after:bg-gray-300">
          OR
        </div>

        {/* Google Login */}
        <button className="btn w-full rounded-full bg-white text-black border border-gray-300 hover:shadow-md">
          <FcGoogle size={20} className="mr-2" />
          Login with Google
        </button>

        {/* Bottom link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
