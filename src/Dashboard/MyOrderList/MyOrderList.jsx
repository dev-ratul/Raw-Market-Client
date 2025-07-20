import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const MyOrderList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: history = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`);
      return res.data;
    },
  });
  console.log(history);

  if (isLoading)
    return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="bg-base-300 min-h-screen px-4 md:px-10 py-12">
      <h2 className="text-white text-3xl md:text-4xl font-bold mb-10 text-center">
        🧾 My Order List
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse shadow-xl rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white text-sm md:text-base">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Market</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-gray-300">
            {history.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-800 transition duration-300 ease-in-out"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{item.productName}</td>
                <td className="px-4 py-3">{item.marketName}</td>
                <td className="px-4 py-3">$ {item.amount}</td>
                <td className="px-4 py-3">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/all-products/${item.productId}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    🔍 View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderList;
