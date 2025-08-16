import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../Shared/Loading/Loading";

const OverView = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  // all approved products
  const { data: allProduct = [] } = useQuery({
    queryKey: ["allapprovedproduct"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/HomeProducts/all-approved-product`);
      return res.data;
    },
  });

  // special offers
  const { data: offers = [] } = useQuery({
    queryKey: ["specialOffers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/special-offer");
      return res.data;
    },
  });

  // payment history
  const { data: history = [] } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`);
      return res.data;
    },
  });

  // watchlist
  const { data: watchlist = [] } = useQuery({
    queryKey: ["my-watch-list"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-watch-list?email=${user.email}`);
      return res.data;
    },
  });

  const handleRemove = (id) => {
    // handle watchlist remove function
    console.log("Remove item", id);
  };

  //   vendor

  //   advertisement
  const { data: advertisement = [] } = useQuery({
    queryKey: ["my-advertisement", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-advertisement?email=${user.email}`
      );
      return res.data;
    },
  });

  //   my-product
  const { data: products = [] } = useQuery({
    queryKey: ["/my-product", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-product?email=${user.email}`);
      return res.data;
    },
  });

  // admin

  const { data , isPending } = useQuery({
    queryKey: ["all-payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-payment-history`);
      return res.data;
    },
  });
  //console.log(history);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Overview Dashboard
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-white">Total Products</h2>
          <p className="mt-2 text-2xl font-bold text-white">
            {allProduct.length}
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-white">Active Offers</h2>
          <p className="mt-2 text-2xl font-bold text-white">{offers.length}</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-white">Your Role</h2>
          <p className="mt-2 text-2xl font-bold text-white">{role || "N/A"}</p>
        </div>
      </div>

      {/* user-role */}
      {role == "user" && (
        <div>
          {/* Payment History Table */}
          <div className="bg-gray-900 rounded-xl shadow-sm p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold text-white mb-4">
              Payment History
            </h2>
            {history.length === 0 ? (
              <p className="text-gray-500 text-center">
                No payment history found.
              </p>
            ) : (
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Market</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[#1f2937] transition duration-200"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">
                        {item.productName}
                      </td>
                      <td className="px-4 py-3">{item.marketName}</td>
                      <td className="px-4 py-3">$ {item.amount}</td>
                      <td className="px-4 py-3">
                        {item.paid_at_string
                          ? new Date(item.paid_at_string).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Watchlist Table */}

          <div className="bg-gray-900 rounded-xl shadow-sm p-6 my-10 overflow-x-auto">
            <h2 className="text-xl font-semibold text-white mb-4">
              Your Watchlist
            </h2>
            {watchlist.length === 0 ? (
              <p className="text-gray-500 text-center">
                Your watchlist is empty.
              </p>
            ) : (
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Market</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((item, index) => (
                    <tr
                      key={item._id}
                      className="hover:bg-[#1f2937] transition duration-200"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-medium">{item.itemName}</td>
                      <td className="px-4 py-3">{item.marketName}</td>
                      <td className="px-4 py-3">
                        ${item.pricePerUnit || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* vendor */}
      {role === "vendor" && (
        <div className="space-y-8">
          {/* Advertisement Section */}
          <div className="p-5 rounded-2xl bg-base-300 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Advertisements
            </h2>

            {/* Table for medium and up screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {advertisement.map((ad) => (
                    <tr key={ad._id} className="hover:bg-base-100">
                      <td className="font-medium">{ad.title}</td>
                      <td>{ad.description.slice(0, 50)}...</td>
                      <td>
                        <span
                          className={`badge ${
                            ad.status === "approved"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {ad.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card view for mobile screens */}
            <div className="grid gap-4 md:hidden">
              {advertisement.map((ad) => (
                <div
                  key={ad._id}
                  className="bg-base-100 p-4 rounded-xl shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-2">{ad.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {ad.description.slice(0, 80)}...
                  </p>
                  <span
                    className={`badge ${
                      ad.status === "approved"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {ad.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div className="p-5 rounded-2xl bg-base-300 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Products
            </h2>

            {/* Table for medium and up screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200 text-base font-semibold">
                    <th>Item Name</th>
                    <th>Price/Unit</th>
                    <th>Market</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-base-100">
                      <td className="font-medium">{product.itemName}</td>
                      <td>৳{product.pricePerUnit}</td>
                      <td>{product.marketName}</td>
                      <td>{new Date(product.date).toLocaleDateString()}</td>
                      <td>
                        <div className="flex items-center gap-2 flex-col sm:flex-row">
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-semibold ${
                              product.status === "pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : product.status === "approved"
                                ? "bg-green-500 text-white"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {product.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card view for mobile screens */}
            <div className="grid gap-4 md:hidden">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-base-100 p-4 rounded-xl shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {product.itemName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Price: ৳{product.pricePerUnit}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Market: {product.marketName}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Date: {new Date(product.date).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        product.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : product.status === "approved"
                          ? "bg-green-500 text-white"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {product.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* admin */}

      {
        role == 'admin' && 
        <div>
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
        <table className="table table-zebra text-sm w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Buyer Email</th>
              <th>Price</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.email}</td>
                <td>${item.amount}</td>
                <td className="text-xs break-all">{item.transactionId}</td>
                <td>
                  {new Date(item.paid_at_string).toLocaleString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
      }
    </div>
  );
};

export default OverView;
