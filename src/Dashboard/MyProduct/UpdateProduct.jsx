import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch existing product data
  const { data: product, isPending } = useQuery({
    queryKey: ["my-product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-product/${id}`);
      return res.data;
    },
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Pre-fill form values when product data is loaded
  useEffect(() => {
    if (product) {
      setValue("marketName", product.marketName);
      setValue("itemName", product.itemName);
      setValue("pricePerUnit", product.pricePerUnit);
      setValue("imageURL", product.imageURL);
      setValue("marketDescription", product.marketDescription);
      setValue("itemDescription", product.itemDescription);
      setValue("date", product.date);
    }
  }, [product, setValue]);

  // Handle update form submission
  const onSubmit = async (data) => {
    try {
      const prices = [
        {
          date: data.date,
          price: Number(data.pricePerUnit),
        },
      ];

      const updatedData = {
        ...data,
        prices,
      };

      const res = await axiosSecure.patch(`/update-product/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        toast.success("✅ Product updated successfully!", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/dashboard/my-product");
        }, 1200);
      } else {
        toast.warn("⚠️ No changes were made.", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update product!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  if (isPending) return <Loading />;

  return (
    <div className="min-h-screen  text-white py-10 px-4">
      <div className="max-w-4xl mx-auto p-8 bg-base-200 rounded-2xl shadow-xl border border-[#334155]">
        <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
          Update Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Read-Only Vendor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={product.vendorName}
              readOnly
              className="input input-bordered w-full bg-[#334155] text-white border-none cursor-not-allowed"
            />
            <input
              type="email"
              value={product.vendorEmail}
              readOnly
              className="input input-bordered w-full bg-[#334155] text-white border-none cursor-not-allowed"
            />
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("marketName", { required: true })}
              placeholder="Market Name"
              className="input input-bordered w-full bg-[#1e293b] border border-[#475569] text-white"
            />
            <input
              {...register("itemName", { required: true })}
              placeholder="Item Name"
              className="input input-bordered w-full bg-[#1e293b] border border-[#475569] text-white"
            />
            <input
              type="number"
              {...register("pricePerUnit", { required: true })}
              placeholder="Price per unit"
              className="input input-bordered w-full bg-[#1e293b] border border-[#475569] text-white"
            />
            <input
              type="date"
              {...register("date", { required: true })}
              className="input input-bordered w-full bg-[#1e293b] border border-[#475569] text-white"
            />
          </div>

          <input
            {...register("imageURL", { required: true })}
            placeholder="Image URL"
            className="input input-bordered w-full bg-[#1e293b] border border-[#475569] text-white"
          />

          <textarea
            {...register("marketDescription", { required: true })}
            placeholder="Market Description"
            className="textarea textarea-bordered w-full bg-[#1e293b] border border-[#475569] text-white resize-y"
            rows={6}
          />

          <textarea
            {...register("itemDescription", { required: true })}
            placeholder="Item Description"
            className="textarea textarea-bordered w-full bg-[#1e293b] border border-[#475569] text-white resize-y"
            rows={6}
          />

          <div className="text-center">
            <button
              className="btn bg-cyan-500 text-white hover:bg-cyan-600 w-full md:w-1/2"
              type="submit"
            >
              ✅ Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
