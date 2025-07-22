import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import { motion } from "framer-motion";

const OnionTrends = () => {
  const axiosSecure = useAxiosSecure();

  const { data: onionTrend = [], isPending } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/products/onion"
      );
      return res.data;
    },
  });

  // all data
  const { data: onionTrendAll = [], isLoading } = useQuery({
    queryKey: ["/products/onion-full"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/products/onion-full?itemName=Potato"
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  if (isPending) return <Loading />;

  // Format date
  const formattedData = onionTrend.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  // Trend Calculation
  let trend = 0;
  if (formattedData.length >= 2) {
    const first = formattedData[0].price;
    const last = formattedData[formattedData.length - 1].price;
    trend = (((last - first) / first) * 100).toFixed(1);
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-[#f9fbff] to-[#e7f0ff] p-6 md:p-8 rounded-2xl shadow-2xl border border-blue-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
       <div className="flex justify-around text-2xl font-bold text-blue-800 mb-6 text-center tracking-wide">
        <p>🥔 {onionTrendAll.itemName} Price Trend</p>
       <div>
         <p>Item Name: {onionTrendAll.itemName}</p>
        <p>Market Name: {onionTrendAll.marketName}</p>
       </div>
      </div>

      <div className="w-full h-[250px] md:h-[350px] lg:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
            <XAxis
              dataKey="date"
              stroke="#4b5563"
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              domain={["auto", "auto"]}
              stroke="#4b5563"
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#111827", fontWeight: "bold" }}
              formatter={(value, name, props) => [`৳${value}`, "Price"]}
              labelFormatter={(label) => `📅 Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#3b82f6", strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-6 text-center text-lg font-medium">
        🔍 Trend over{" "}
        <span className="font-semibold text-gray-700">
          {formattedData.length} days
        </span>
        :{" "}
        <span
          className={`font-bold ${
            trend >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {trend >= 0 ? "+" : ""}
          {trend}% 📈
        </span>
      </p>
    </motion.div>
  );
};

export default OnionTrends;
