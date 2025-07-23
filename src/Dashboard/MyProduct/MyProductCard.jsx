import React, { useState } from "react";
import { Link } from "react-router"; // react-router থেকে নয়, react-router-dom থেকে নিতে হবে
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

const MyProductTable = ({ products, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Modal control state
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/delete-product/${id}`);
          if (res?.data?.deletedCount > 0) {
            Swal.fire("Deleted!", "Your product has been deleted.", "success");

            // React Query দিয়ে invalidate করে refetch করো
            queryClient.invalidateQueries(["my-products"]);
            // অথবা তুমি refetch() direct call করতেও পারো:
            // refetch();
          } else {
            Swal.fire("Error!", "No product was deleted.", "error");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error!", "Failed to delete the product.", "error");
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto px-4">
      <h2 className="text-2xl text-center font-bold mb-4">My Products</h2>

      {!products || products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-base font-semibold">
              <th>Item Name</th>
              <th>Price/Unit</th>
              <th>Market</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.itemName}</td>
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

                    {/* View Reason Button for rejected products */}
                    {product.status === "rejected" && (
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="btn btn-xs btn-warning rounded-full"
                      >
                        View Reason
                      </button>
                    )}
                  </div>
                </td>

                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="btn btn-sm btn-info"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Rejection Reason Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-base-300   bg-opacity-50 flex items-center justify-center z-50">
          <div className=" p-6 bg-base-200 rounded-lg shadow-md max-w-md w-full relative">
            <h2 className="text-xl font-semibold mb-3 text-red-600">
              🚫 Rejected Product
            </h2>
            <p className="mb-2">
              <strong>Item:</strong> {selectedProduct.itemName}
            </p>
            <p className="mb-2">
              <strong>Reason:</strong>{" "}
              {selectedProduct.rejectionReason || "Not specified"}
            </p>
            <p className="mb-4">
              <strong>Feedback:</strong>{" "}
              {selectedProduct.rejectionFeedback || "No additional feedback."}
            </p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="btn btn-sm btn-neutral"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProductTable;
