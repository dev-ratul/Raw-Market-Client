import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../Shared/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const ViewDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  

  const [chartData, setChartData] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const {
    data: product,
    isLoading: loadingProduct,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const {
    data: reviews = [],
    isLoading: loadingReviews,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const watchlistMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.post("/watchlist", {
        productId: id,
        email: user.email,
      });
    },
    onSuccess: (res) => {
      if (res.data.insertedId) toast.success("Added to watchlist!");
    },
    onError: () => toast.error("Already in watchlist"),
  });

  const paymentMutation = (product)=>{
    console.log(product)
    navigate(`/dashboard/payment/${product._id}`)
  }

  const reviewMutation = useMutation({
    mutationFn: async (newReview) => {
      return await axiosSecure.post("/reviews", newReview);
    },
    onSuccess: (res, newReview) => {
      if (res.data.insertedId) {
        toast.success("Review added");
        queryClient.setQueryData(["reviews", id], (old) => [...old, newReview]);
        setRating(0);
        setComment("");
      }
    },
  });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      productId: id,
      email: user.email,
      name: user.displayName,
      rating,
      comment,
      date: new Date(),
    };
    reviewMutation.mutate(newReview);
  };

  const handleCompare = async () => {
    const res = await axiosSecure.get(
      `/price-trend/${id}?date=${selectedDate}`
    );
    setChartData(res.data);
  };

  if (loadingProduct || !product) return <Loading />;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex justify-center items-start">
      <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-5xl space-y-8">
        {/* 🖼️ Image */}
        <img
          src={product.imageURL}
          alt={product.itemName}
          className="w-full h-72 object-cover rounded-lg shadow-lg"
        />

        {/* 🛍️ Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-4xl font-bold">{product.itemName}</h1>
            <p className="text-green-400 text-2xl">৳{product.pricePerUnit}/kg</p>
            <p className="text-sm text-gray-400">
              📅 {new Date(product.date).toLocaleDateString()}
            </p>
            <p className="mt-3">
              🏪 <strong>Market:</strong> {product.marketName}
            </p>
            <p>
              👨‍🌾 <strong>Vendor:</strong> {product.vendorName}
            </p>
            <p className="text-sm italic text-gray-400">
              📧 {product.vendorEmail}
            </p>
            <p className="mt-1 text-sm">
              ✅ Status:
              <span
                className={`ml-2 px-2 py-1 rounded ${
                  product.status === "approved" ? "bg-green-600" : "bg-yellow-600"
                }`}
              >
                {product.status}
              </span>
            </p>
          </div>

          {/* 📃 Description */}
          <div>
            <h2 className="text-xl font-bold mb-2">📝 Product Description</h2>
            <p className="text-gray-300 text-sm">
              {product.itemDescription || "N/A"}
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">📍 Market Description</h2>
            <p className="text-gray-300 text-sm">
              {product.marketDescription || "N/A"}
            </p>
          </div>
        </div>

        {/* ⭐ Watchlist / 🛒 Buy */}
        <div className="flex gap-4">
          {role !== "admin" && role !== "vendor" && (
            <button
              onClick={() => watchlistMutation.mutate()}
              className="btn bg-blue-600 hover:bg-blue-700 text-white"
            >
              ⭐ Add to Watchlist
            </button>
          )}
          <button
            onClick={() => paymentMutation(product)}
            className="btn bg-green-600 hover:bg-green-700 text-white"
          >
            🛒 Buy Product
          </button>
        </div>

        {/* 📊 Price Chart */}
        <div>
          <h2 className="text-2xl font-bold mb-2">📊 Price Comparison</h2>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="date"
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input input-bordered"
            />
            <button
              onClick={handleCompare}
              className="btn bg-cyan-600 text-white"
            >
              Compare
            </button>
          </div>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#00BFFF"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 p-10 text-xl">📉 No data to compare yet.</p>
          )}
        </div>

        {/* 💬 Reviews */}
        <div>
          <h2 className="text-2xl font-bold mb-2">💬 User Reviews</h2>

          {/* Add Review */}
          {user && (
            <form onSubmit={handleReviewSubmit} className="space-y-2 mt-4">
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min={1}
                max={5}
                className="input input-bordered w-full"
                placeholder="Rating (1-5)"
                required
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="textarea textarea-bordered w-full"
                placeholder="Write your comment..."
                required
              />
              <button type="submit" className="btn bg-purple-600 text-white">
                Submit Review
              </button>
            </form>
          )}

          {reviews.map((r, idx) => (
            <div key={idx} className="bg-gray-800 rounded p-3 my-2">
              <p className="font-medium">
                {r.name} ({r.email})
              </p>
              <p>
                ⭐ {r.rating} — {r.comment}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(r.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;