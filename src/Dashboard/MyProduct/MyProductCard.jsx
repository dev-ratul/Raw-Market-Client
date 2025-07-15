import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProductTable = ({ products }) => {
  const axiosSecure = useAxiosSecure();

 const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure
        .delete(`/update-product/${id}`)  // এখানে URL মিলবে
        .then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
            // এখানে তোমার UI থেকে ডিলিট হওয়া প্রোডাক্ট রিমুভ বা ডাটা রিফ্রেশ করো
            // যেমন: setProducts(products.filter(product => product._id !== id))
          } else {
            Swal.fire("Error!", "No product deleted.", "error");
          }
        })
        .catch((error) => {
          console.error("Delete error:", error);
          Swal.fire("Error!", "Failed to delete parcel.", "error");
        });
    }
  });
};


  return (
    <div className="overflow-x-auto px-4">
      <h2 className="text-2xl text-center font-bold mb-4">My Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <table className="table w-full ">
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
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      product.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : product.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {product.status.toUpperCase()}
                  </span>
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
    </div>
  );
};

export default MyProductTable;
