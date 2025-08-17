import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../Shared/Loading/Loading";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  console.log(watchlist);

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

  // শুধু admin হলে query চালাও
  const { data, isLoading } = useQuery({
    queryKey: ["all-payment-history"],
    queryFn: async () => {
      if (role == "admin") {
        const res = await axiosSecure.get("/all-payment-history");
        return res.data;
      } else {
        return []; // admin না হলে খালি array return করো
      }
    },
    enabled: role == "admin", // এটা query শুধু admin হলে চালাবে
  });

  if (isLoading) {
    return <Loading />;
  }

  // user chart

  // Market-wise amount calculate করা
  const marketData = history.reduce((acc, item) => {
    if (acc[item.marketName]) {
      acc[item.marketName] += item.amount;
    } else {
      acc[item.marketName] = item.amount;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(marketData),
    datasets: [
      {
        label: "Amount Spent",
        data: Object.values(marketData),
        backgroundColor: [
          "#4ade80", // green
          "#60a5fa", // blue
          "#facc15", // yellow
          "#f87171", // red
          "#a78bfa", // purple
        ],
        borderColor: "#1f2937",
        borderWidth: 1,
      },
    ],
  };

  const WatchlistChart = ({ watchlist }) => {
    if (!watchlist || watchlist.length === 0) {
      return (
        <div className="bg-gray-900 rounded-xl shadow-sm p-6 text-center text-white">
          <h2 className="text-xl font-semibold mb-4">My Watchlist</h2>
          <p className="text-gray-400">Your watchlist is empty.</p>
        </div>
      );
    }

    // Market-wise product count calculate
    const marketCount = watchlist.reduce((acc, item) => {
      acc[item.marketName] = (acc[item.marketName] || 0) + 1;
      return acc;
    }, {});

    const chartData = {
      labels: Object.keys(marketCount),
      datasets: [
        {
          label: "Products Count",
          data: Object.values(marketCount),
          backgroundColor: [
            "#4ade80",
            "#60a5fa",
            "#facc15",
            "#f87171",
            "#a78bfa",
          ],
          borderColor: "#1f2937",
          borderWidth: 1,
        },
      ],
    };
  };

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
        <div className="flex justify-center items-center gap-10">
          {/* Payment History Table */}

          <div className="bg-gray-900 w-full h-full rounded-xl shadow-sm p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">Payment Distribution</h2>
            {history.length === 0 ? (
              <p className="text-gray-500 text-center">
                No payment history found.
              </p>
            ) : (
              <Pie data={chartData} />
            )}
          </div>

          {/* Watchlist Table */}

          <div className="bg-gray-900 w-full h-full  rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              My Watchlist
            </h2>
            {watchlist.length === 0 ? (
              <p className="text-gray-500 text-center">
                Your watchlist is empty.
              </p>
            ) : (
              (() => {
                // Market-wise product count calculate
                const marketCount = watchlist.reduce((acc, item) => {
                  acc[item.pricePerUnit] = (acc[item.pricePerUnit] || 0) + 1;
                  return acc;
                }, {});

                const chartData = {
                  labels: Object.keys(marketCount),
                  datasets: [
                    {
                      label: "Products Count",
                      data: Object.values(marketCount),
                      backgroundColor: [
                        "#4ade80",
                        "#60a5fa",
                        "#facc15",
                        "#f87171",
                        "#a78bfa",
                      ],
                      borderColor: "#1f2937",
                      borderWidth: 1,
                    },
                  ],
                };

                return <Pie data={chartData} />;
              })()
            )}
          </div>
        </div>
      )}

      {/* vendor */}
      {role === "vendor" && (
        <div className="space-y-8 flex flex-col md:flex-row md:gap-10">
          <div className="p-5 h-full w-full rounded-2xl bg-base-300 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Advertisements
            </h2>

            {advertisement.length === 0 ? (
              <p className="text-gray-500 text-center">
                No advertisements found.
              </p>
            ) : (
              (() => {
                // Status-wise count calculate
                const statusCount = advertisement.reduce((acc, ad) => {
                  acc[ad.status] = (acc[ad.status] || 0) + 1;
                  return acc;
                }, {});

                const chartData = {
                  labels: Object.keys(statusCount),
                  datasets: [
                    {
                      label: "Advertisement Status",
                      data: Object.values(statusCount),
                      backgroundColor: ["#4ade80", "#facc15", "#f87171"],
                      borderColor: "#1f2937",
                      borderWidth: 1,
                    },
                  ],
                };

                return <Pie data={chartData} />;
              })()
            )}
          </div>

          {/* Products Section */}
          <div className="p-5 rounded-2xl h-full w-full bg-base-300 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Products
            </h2>

            {products.length === 0 ? (
              <p className="text-gray-500 text-center">No products found.</p>
            ) : (
              (() => {
                // Status-wise product count calculate
                const statusCount = products.reduce((acc, product) => {
                  acc[product.status] = (acc[product.status] || 0) + 1;
                  return acc;
                }, {});

                const chartData = {
                  labels: Object.keys(statusCount),
                  datasets: [
                    {
                      label: "Product Status",
                      data: Object.values(statusCount),
                      backgroundColor: ["#4ade80", "#facc15", "#f87171"], // approved, pending, rejected
                      borderColor: "#1f2937",
                      borderWidth: 1,
                    },
                  ],
                };

                return <Pie data={chartData} />;
              })()
            )}
          </div>
        </div>
      )}

      {/* admin */}

      {role == "admin" && (
        // Payment history chart section
        <div className="p-5 rounded-2xl h-[8] w-full bg-gray-900 shadow-md">
          <h2 className="text-xl font-semibold text-white mb-4">
            Product-wise Sales Distribution
          </h2>

          {data.length === 0 ? (
            <p className="text-gray-400 text-center">No sales data found.</p>
          ) : (
            (() => {
              // Product-wise total amount calculate
              const productAmount = data.reduce((acc, item) => {
                acc[item.productName] =
                  (acc[item.productName] || 0) + item.amount;
                return acc;
              }, {});

              const chartData = {
                labels: Object.keys(productAmount),
                datasets: [
                  {
                    label: "Total Amount",
                    data: Object.values(productAmount),
                    backgroundColor: [
                      "#4ade80", // green
                      "#60a5fa", // blue
                      "#facc15", // yellow
                      "#f87171", // red
                      "#a78bfa", // purple
                      "#f472b6", // pink
                    ],
                    borderColor: "#1f2937",
                    borderWidth: 1,
                  },
                ],
              };

              return <Pie className="h-[70vh]" data={chartData} />;
            })()
          )}
        </div>
      )}
    </div>
  );
};

export default OverView;
