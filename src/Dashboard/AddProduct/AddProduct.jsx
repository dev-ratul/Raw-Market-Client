import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure= useAxiosSecure()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    if (user?.email) setValue("vendorEmail", user.email);
    if (user?.displayName) setValue("vendorName", user.displayName);
    setValue("status", "pending");
  }, [user, setValue]);

  const onSubmit =async (data) => {
    const prices = [{ date: data.date, price: Number(data.pricePerUnit) }];

    const finalData = {
      ...data,
      prices,
    };

    // upload products
    const result=await axiosSecure.post('products', finalData)
    console.log(result)

    console.log("✅ Submitted Product:", finalData);
    reset({
      vendorEmail: user?.email || "",
      vendorName: user?.displayName || "",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      marketName: "",
      itemName: "",
      pricePerUnit: "",
      imageURL: "",
      marketDescription: "",
      itemDescription: "",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-base-100">
      <Helmet>
        <title>Add Product | Kachabazar</title>
      </Helmet>

      <div className="max-w-5xl mx-auto bg-base-200 shadow-2xl rounded-2xl px-10 py-12">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
          🛒 Add New Product
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Vendor Email */}
          <div>
            <label className="block mb-2 font-semibold">Vendor Email</label>
            <input
              type="email"
              readOnly
              className="input input-bordered w-full"
              {...register("vendorEmail", { required: true })}
            />
          </div>

          {/* Vendor Name */}
          <div>
            <label className="block mb-2 font-semibold">Vendor Name</label>
            <input
              type="text"
              readOnly
              className="input input-bordered w-full"
              {...register("vendorName", { required: true })}
            />
          </div>

          {/* Market Name */}
          <div>
            <label className="block mb-2 font-semibold">Market Name</label>
            <input
              type="text"
              placeholder="Ex: Bashail Bazar"
              className="input input-bordered w-full"
              {...register("marketName", { required: true })}
            />
            {errors.marketName && (
              <p className="text-red-500 text-sm">Market name is required</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-semibold">Date</label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className="input input-bordered w-full"
              {...register("date", { required: true })}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">Date is required</p>
            )}
          </div>

          {/* Item Name */}
          <div>
            <label className="block mb-2 font-semibold">Item Name</label>
            <input
              type="text"
              placeholder="Ex: Onion"
              className="input input-bordered w-full"
              {...register("itemName", { required: true })}
            />
            {errors.itemName && (
              <p className="text-red-500 text-sm">Item name is required</p>
            )}
          </div>

          {/* Price per Unit */}
          <div>
            <label className="block mb-2 font-semibold">
              Price per Unit (৳)
            </label>
            <input
              type="number"
              placeholder="Ex: 32"
              className="input input-bordered w-full"
              {...register("pricePerUnit", { required: true, min: 1 })}
            />
            {errors.pricePerUnit && (
              <p className="text-red-500 text-sm">Valid price is required</p>
            )}
          </div>

          {/* Product Image URL */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">
              Product Image URL
            </label>
            <input
              type="text"
              placeholder="Ex: https://i.ibb.co/image.png"
              className="input input-bordered w-full"
              {...register("imageURL", { required: true })}
            />
            {errors.imageURL && (
              <p className="text-red-500 text-sm">Image URL is required</p>
            )}
          </div>

          {/* Market Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">
              Market Description
            </label>
            <textarea
              placeholder="Describe the market condition..."
              className="textarea textarea-bordered w-full min-h-[100px]"
              {...register("marketDescription", { required: true })}
            />
            {errors.marketDescription && (
              <p className="text-red-500 text-sm">
                Market description is required
              </p>
            )}
          </div>

          {/* Item Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold">
              Item Description (Optional)
            </label>
            <textarea
              placeholder="Ex: Fresh local onions, great quality"
              className="textarea textarea-bordered w-full min-h-[80px]"
              {...register("itemDescription")}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center mt-6">
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded-full shadow"
            >
              ➕ Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
