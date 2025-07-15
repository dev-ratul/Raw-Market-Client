import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddAdvertisement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Set default user values
  useEffect(() => {
    if (user?.email) setValue("vendorEmail", user.email);
    if (user?.displayName) setValue("vendorName", user.displayName);
  }, [user, setValue]);

  const onSubmit = async (data) => {
    // Manually set status before submit
    data.status = "pending";

    try {
      const result = await axiosSecure.post("/advertisement", data);
      console.log("✅ Response:", result);

      if (result?.data?.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Advertisement added successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#16a34a",
        });

        // Reset form but keep vendor data
        reset({
          vendorEmail: user?.email || "",
          vendorName: user?.displayName || "",
          status: "pending",
          title: "",
          description: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("❌ Failed to submit:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <Helmet>
        <title>Add Advertisement | Kachabazar</title>
      </Helmet>

      <div className="max-w-3xl mx-auto bg-base-200 p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
          📢 Add Advertisement
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Vendor Email */}
          <div>
            <label className="font-semibold">Vendor Email</label>
            <input
              type="email"
              readOnly
              className="input input-bordered w-full mt-1"
              {...register("vendorEmail", { required: true })}
            />
          </div>

          {/* Vendor Name */}
          <div>
            <label className="font-semibold">Vendor Name</label>
            <input
              type="text"
              readOnly
              className="input input-bordered w-full mt-1"
              {...register("vendorName", { required: true })}
            />
          </div>

          {/* Ad Title */}
          <div>
            <label className="font-semibold">Ad Title</label>
            <input
              type="text"
              placeholder="Ex: Big Tomato Offer!"
              className="input input-bordered w-full mt-1"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Short Description</label>
            <textarea
              placeholder="Write something about your offer..."
              className="textarea textarea-bordered w-full min-h-[100px] mt-1"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-semibold">Ad Banner Image</label>
            <input
              type="text"
              placeholder="Upload Banner Image"
              className="input input-bordered w-full mt-1"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">Image URL is required</p>
            )}
          </div>

          {/* Hidden Status (No value here, set in onSubmit) */}
          <input type="hidden" {...register("status")} />

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="btn bg-orange-500 hover:bg-orange-600 text-white px-10 rounded-full shadow-md"
            >
              ➕ Submit Ad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdvertisement;
