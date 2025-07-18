import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";

const PotataTrends = () => {
  const axiosSecure = useAxiosSecure();

  const { data: potataTrend = [], isPending } = useQuery({
    queryKey: ["potato-trend"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/most-recent-highest-prices?itemName=Potato");
      return res.data;
    },
  });
  console.log(potataTrend)

  if (isPending) {
    return <Loading />;
  }

  // date format short (e.g. "Jul 18")
  const formattedData = potataTrend.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  // calculate trend percentage
  let trend = 0;
  if (formattedData.length >= 2) {
    const first = formattedData[0].price;
    const last = formattedData[formattedData.length - 1].price;
    trend = (((last - first) / first) * 100).toFixed(1);
  }

  return (
      <div className="mt-5 bg-white p-4 shadow rounded-md">
        <h2 className="text-xl text-blue font-semibold mb-4">Potato Price Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip formatter={(value) => [`৳${value}`, "Price"]} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2d71f7"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-2 text-sm font-medium">
        Trend:{" "}
        <span className={`${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
          {trend >= 0 ? "+" : ""}
          {trend}% last {formattedData.length} days
        </span>
      </p>
    </div>
  );
};

export default PotataTrends;
