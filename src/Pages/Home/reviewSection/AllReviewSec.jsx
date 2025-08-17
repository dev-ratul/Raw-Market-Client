import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";

const AllReviewSec = () => {
  const axiosSecure = useAxiosSecure();

  const { data: review = [] } = useQuery({
    queryKey: ["all-review"],
    queryFn: async () => {
      const res = await axiosSecure.get("all-review");
      return res.data;
    },
  });

  return (
    <div className="my-10 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        What Our Customers Say
      </h2>

      <div className="overflow-hidden">
        <div className="flex gap-6 animate-scroll">
          {[...review, ...review].map((rev, idx) => (
            <div
              key={rev._id + idx}
              className="min-w-[300px] max-w-xs bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 flex-shrink-0"
            >
              {/* Name & Email */}
              <div className="mb-2">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {rev.name}
                </h3>
                <p className="text-sm text-gray-500">{rev.email}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < rev.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 dark:text-gray-300 italic">
                “{rev.comment}”
              </p>

              {/* Date */}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(rev.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            animation: scroll 60s linear infinite; /* 60s = slow speed */
            width: max-content;
          }
        `}
      </style>
    </div>
  );
};

export default AllReviewSec;
