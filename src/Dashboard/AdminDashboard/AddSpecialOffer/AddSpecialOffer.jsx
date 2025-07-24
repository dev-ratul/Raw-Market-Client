import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

const AddSpecialOffer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.email) setValue("adminEmail", user.email);
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      data.status = "active"; // default status

      const response = await axiosSecure.post("/admin-offers", data);
      if (response?.data?.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Special offer posted successfully!",
          icon: "success",
          confirmButtonColor: "#22c55e",
        });

        reset({
          adminEmail: user?.email || "",
          title: "",
          description: "",
          image: "",
          validTill: "",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <Helmet>
        <title>Add Special Offer | Admin | Kachabazar</title>
      </Helmet>

      <div className="max-w-3xl mx-auto bg-base-200 p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-lime-600 mb-8">
          🎁 Post Special Market Offer
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Admin Email */}
          <div>
            <label className="font-semibold">Admin Email</label>
            <input
              type="email"
              readOnly
              className="input input-bordered w-full mt-1"
              {...register("adminEmail", { required: true })}
            />
          </div>

          {/* Offer Title */}
          <div>
            <label className="font-semibold">Offer Title</label>
            <input
              type="text"
              placeholder="Ex: Buy 2kg Tomato, Get 500g Free!"
              className="input input-bordered w-full mt-1"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              placeholder="Describe the offer in short..."
              className="textarea textarea-bordered w-full min-h-[100px] mt-1"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="font-semibold">Banner Image URL</label>
            <input
              type="text"
              placeholder="Upload or paste banner image URL"
              className="input input-bordered w-full mt-1"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}
          </div>

          {/* Valid Till Date */}
          <div>
            <label className="font-semibold">Valid Till (Optional)</label>
            <input
              type="date"
              className="input input-bordered w-full mt-1"
              {...register("validTill")}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="btn bg-lime-500 hover:bg-lime-600 text-white px-10 rounded-full shadow-md"
            >
              ➕ Post Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpecialOffer;
