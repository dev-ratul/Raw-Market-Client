import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data = {},
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["all-products-admin", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/products?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const products = data.products || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/products/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("✅ Approved!", "Product has been approved.", "success");
    }
  };

  const handleReject = async (id) => {
    const { value: reason } = await Swal.fire({
      title: "Reject Product",
      input: "text",
      inputLabel: "Reason for rejection",
      inputPlaceholder: "Enter reason here...",
      showCancelButton: true,
    });
    if (reason) {
      const res = await axiosSecure.patch(`/products/reject/${id}`, { reason });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("❌ Rejected!", "Product has been rejected.", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/products/${id}`);
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire("🗑️ Deleted!", "Product has been deleted.", "success");
      }
    }
  };

  if (isPending) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-purple-700">🛠️ Manage All Products</h2>

      <div className="overflow-x-auto bg-base-200 rounded-xl shadow-md border border-base-300">
        <table className="table table-zebra text-sm">
          <thead className="bg-purple-100 text-purple-800 uppercase text-xs font-bold">
            <tr>
              <th className="py-4 px-3">#</th>
              <th className="py-4 px-3">Product Name</th>
              <th className="py-4 px-3">Vendor Email</th>
              <th className="py-4 px-3">Status</th>
              <th className="py-4 px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="hover">
                <td className="py-3 px-3 font-medium">{(page - 1) * limit + index + 1}</td>
                <td className="py-3 px-3">{product.itemName}</td>
                <td className="py-3 px-3">{product.vendorEmail}</td>
                <td className="py-3 px-3 capitalize">
                  <span
                    className={`badge px-3 py-1 rounded-full ${
                      product.status === "pending"
                        ? "badge-warning"
                        : product.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-3 px-3 space-x-2 text-center">
                  <button
                    onClick={() => handleApprove(product._id)}
                    className="btn btn-xs btn-success"
                    disabled={product.status !== "pending"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(product._id)}
                    className="btn btn-xs btn-error"
                    disabled={product.status !== "pending"}
                  >
                    Reject
                  </button>
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="btn btn-xs btn-warning"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {[...Array(totalPages).keys()].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p + 1)}
            className={`btn btn-sm ${page === p + 1 ? "btn-primary" : "btn-outline"}`}
          >
            {p + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminAllProducts;
