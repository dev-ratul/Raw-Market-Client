import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";
import Loading from "../../Shared/Loading/Loading";

// StarRating Component
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-3xl cursor-pointer select-none ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const ViewDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [chartData, setChartData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: product, isLoading: loadingProduct } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
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
    onSuccess: () => {
      toast.success("Added to watchlist!");
    },
    onError: () => {
      toast.error("Already in watchlist");
    },
  });

  const paymentMutation = (product) => {
    navigate(`/dashboard/payment/${product._id}`);
  };

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

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }
    reviewMutation.mutate({
      productId: id,
      email: user.email,
      name: user.displayName,
      rating,
      comment,
      date: new Date(),
    });
  };

  const handleCompare = async () => {
    if (!selectedDate) {
      toast.warn("Please select a date first!");
      return;
    }
    try {
      const res = await axiosSecure.get(`/price-trend/${id}`, {
        params: { date: selectedDate },
      });
      if (res.data.length > 0) {
        setChartData(res.data);
        //console.log(res.data);
      } else {
        Swal.fire({
          icon: "info",
          title: "কোনো প্রোডাক্ট পাওয়া যায়নি",
          text: "এই তারিখে কোনো প্রোডাক্টের ডেটা নেই। অন্য কোনো তারিখ দিয়ে চেষ্টা করুন।",
          confirmButtonText: "ঠিক আছে",
        });
        setChartData([]);
      }
    } catch (error) {
      console.error("Compare error:", error);
      toast.error("Failed to fetch price comparison.");
      setChartData([]);
    }
  };

  if (loadingProduct) return <Loading />;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 flex justify-center items-start">
      <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-5xl space-y-8">
        {/* Image */}
        <img
          src={product.imageURL}
          alt={product.itemName}
          className="w-full h-72 object-cover rounded-lg shadow-lg"
        />

        {/* Product Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-4xl font-bold">{product.itemName}</h1>
            <p className="text-green-400 text-2xl">
              ৳{product.pricePerUnit}/kg
            </p>
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
                  product.status === "approved"
                    ? "bg-green-600"
                    : "bg-yellow-600"
                }`}
              >
                {product.status}
              </span>
            </p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold mb-2">📝 Product Description</h2>
            <p className="text-gray-300 text-sm">
              {product.itemDescription || "N/A"}
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">
              📍 Market Description
            </h2>
            <p className="text-gray-300 text-sm">
              {product.marketDescription || "N/A"}
            </p>
          </div>
        </div>

        {/* Buttons */}
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

        {/* Price Chart */}
        <div>
          <h2 className="text-2xl font-bold mb-2">📊 Price Comparison</h2>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input input-bordered"
              max={new Date().toISOString().split("T")[0]}
            />
            <button
              onClick={handleCompare}
              className="btn bg-cyan-600 text-white"
            >
              Compare
            </button>
          </div>

          {chartData.length > 0 ? (
            <div className="bg-[#0f172a] p-4 rounded-xl shadow-lg">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart
                  data={[...chartData].sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                  )}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#0ea5e9"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #38bdf8",
                      borderRadius: "10px",
                      color: "#f1f5f9",
                    }}
                    labelStyle={{ color: "#f1f5f9" }}
                    itemStyle={{ color: "#38bdf8" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      stroke: "#38bdf8",
                      strokeWidth: 2,
                      fill: "#0f172a",
                    }}
                    activeDot={{
                      r: 6,
                      stroke: "#38bdf8",
                      strokeWidth: 3,
                      fill: "#0f172a",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="none"
                    fill="url(#colorPrice)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : selectedDate ? (
            <p className="text-gray-400 mt-4">
              🕵️‍♂️ কোনো ডেটা পাওয়া যায়নি! অনুগ্রহ করে অন্য তারিখ দিয়ে চেষ্টা
              করুন।
            </p>
          ) : (
            <p className="text-gray-500 mt-4">
              📅 প্রাইস ট্রেন্ড দেখতে একটি তারিখ নির্বাচন করুন।
            </p>
          )}
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-2xl font-bold mb-2">💬 User Reviews</h2>

          {user && (
            <form onSubmit={handleReviewSubmit} className="space-y-4 mt-4">
              <StarRating rating={rating} setRating={setRating} />
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
