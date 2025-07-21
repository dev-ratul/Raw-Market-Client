import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const AllAdvertisements = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: ads = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allAdvertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/advertisements/status/${id}`, {
        status: newStatus,
      });
      Swal.fire("Success!", `Status updated to ${newStatus}`, "success");
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

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
          await axiosSecure.delete(`/advertisements/${id}`);
          Swal.fire(
            "Deleted!",
            "The advertisement has been deleted.",
            "success"
          );
          refetch();
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete advertisement", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Vendor</th>
      <th>Status</th>
      <th>Change Status</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {ads.map((ad, index) => (
      <tr key={ad._id}>
        <td>{index + 1}</td>
        <td>{ad.title}</td>
        <td>{ad.vendorName || "Unknown"}</td>
        <td>{ad.status}</td>
        <td className="space-x-1">
          <button
            className="btn btn-xs btn-success"
            onClick={() => handleStatusChange(ad._id, "active")}
            disabled={ad.status === "active"}
          >
            Active
          </button>
          <button
            className="btn btn-xs btn-warning"
            onClick={() => handleStatusChange(ad._id, "pending")}
            disabled={ad.status === "pending"}
          >
            Pending
          </button>
          <button
            className="btn btn-xs btn-error"
            onClick={() => handleStatusChange(ad._id, "rejected")}
            disabled={ad.status === "rejected"}
          >
            Reject
          </button>
        </td>
        <td>
          <button
            className="btn btn-xs btn-danger"
            onClick={() => handleDelete(ad._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default AllAdvertisements;
