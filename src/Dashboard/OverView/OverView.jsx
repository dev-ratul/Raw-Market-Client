import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import useUserRole from "../../hooks/useUserRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const OverView = () => {
  const useAxios = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole();

  // all-products
  const { data: allProduct = [] } = useQuery({
    queryKey: ["allapprovedproduct"],
    queryFn: async () => {
      const res = await useAxios.get(`/HomeProducts/all-approved-product`);
      return res.data;
    },
  });

  const { data: offers = [] } = useQuery({
    queryKey: ["specialOffers"],
    queryFn: async () => {
      const res = await useAxios.get("/special-offer");
      return res.data;
    },
  });


//   payment-history
  const { data: history = [] } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await useAxios.get(
        `/payment-history?email=${user.email}`
      );
      return res.data;
    },
  });

//   watch list
  const { data: watchlist = [], isLoading } = useQuery({
      queryKey: ["my-watch-list"],
      queryFn: async () => {
        const res = await useAxios.get(`/my-watch-list?email=${user.email}`);
        return res.data;
      },
    });

  return (
    <div>
      <p>all product: {allProduct.length}</p>
      <p>Overall offer availavail: {offers.length}</p>

      {
        role === 'user' && <div className="overflow-x-auto rounded-lg shadow-xl">
        <table className="w-full text-sm md:text-base text-left text-gray-300 border-collapse min-w-[600px]">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Market</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900">
            {history.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-800 transition duration-300 ease-in-out"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{item.productName}</td>
                <td className="px-4 py-3">{item.marketName}</td>
                <td className="px-4 py-3">$ {item.amount}</td>
                <td className="px-6 py-4">
                  {item.paid_at_string
                    ? new Date(item.paid_at_string).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="px-4 py-3">
                  <Link
                    to={`/all-products/${item.productId}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-md shadow-md text-xs md:text-sm transition hover:scale-105"
                  >
                    🔍 View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </div>
  );
};

export default OverView;
