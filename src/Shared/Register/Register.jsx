import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router"; 
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const Register = () => {
  const [profilePicture, setProfilePicture]= useState("")
  const { signUp, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosInstense= useAxios()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {data}= useQuery({
    queryKey: ['users'],
    queryFn: async ()=>{
      const res=await axiosInstense.get('/users/rat2@gmail.com')
      return res.data;
    }
  })
  console.log(data)

  
  const onSubmit = (data) => {
    console.log("Register Data:", data);

    // register
    signUp(data.email, data.password)
      .then(async(result) => {
        //console.log(result);


        const userInfo={
          email: data.email,
          address: data.address,
          role: 'user',
          contactNumber: data.contactNumber,
          create_at: new Date().toISOString(),
          last_at: new Date().toISOString()
        }

        const userRes= await axiosInstense.post('/users', userInfo)
        console.log(userRes.data)


        const profileInfo = {
          displayName: data.name,
          photoURL: profilePicture
        };

        updateUserProfile(profileInfo)
          .then(() => {
            //console.log("update profile");
          })
          .catch((error) => {
            //console.log(error);
          });

        navigate("/");
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const handleUploadImage =async(e) => {
    const image = e.target.files[0];
    //console.log(image)


    const formData= new FormData()
    formData.append('image', image)


    const imageUploadURL= `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

    const res=await axios.post(imageUploadURL, formData)

    setProfilePicture(res.data.data.display_url)
  



  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create an Account 📝
        </h2>
        <p className="text-center text-sm text-gray-500">
          Join the community today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input bg-black input-bordered w-full"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Contact number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              {...register("contactNumber", { required: "contactNumber is required" })}
              className="input bg-black input-bordered w-full"
              placeholder="Your Contact Number"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "address is required" })}
              className="input bg-black input-bordered w-full"
              placeholder="Your address"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input bg-black input-bordered w-full"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="file"
              onChange={handleUploadImage}
              className="w-full bg-black input-bordered rounded px-3 py-2"
            />
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
              className="input bg-black input-bordered w-full"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-full rounded-full">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
