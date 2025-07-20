import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";

const AllOrder = () => {
  const axiosSecure = useAxiosSecure();

  const { data: history = [], isPending } = useQuery({
    queryKey: ["all-payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-payment-history`);
      return res.data;
    },
  });
  console.log(history);

  if (isPending) {
    return <Loading />;
  }
  

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        All Orders ({history.length})
      </h2>

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
            {history.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.productName}</td>
                <td>{item.email}</td>
                <td>${item.amount}</td>
                <td className="text-xs break-all">{item.transactionId}</td>
                <td>
                  {new Date(
                    Number(item.paid_at?.$date?.$numberLong)
                  ).toLocaleDateString()}
                </td>
            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrder;
