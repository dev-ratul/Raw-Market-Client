import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["all-products-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/products");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/products/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("Approved!", "Product has been approved.", "success");
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
        Swal.fire("Rejected!", "Product has been rejected.", "error");
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
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      }
    }
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.itemName}</td>
              <td>{product.vendorEmail}</td>
              <td>{product.status}</td>
              <td className="space-x-1">
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
                  className="btn btn-xs btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllProducts;
