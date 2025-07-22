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
    <div className="px-2 sm:px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-purple-700">
        📢 All Advertisements
      </h2>

      <div className="overflow-x-auto bg-base-200 rounded-xl border border-base-300">
        <table className="table w-full min-w-[800px] text-sm sm:text-base">
          <thead className="bg-purple-100 text-purple-800 uppercase text-xs font-bold">
            <tr>
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">Title</th>
              <th className="py-3 px-2">Vendor</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-center">Change Status</th>
              <th className="py-3 px-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, index) => (
              <tr key={ad._id} className="hover">
                <td className="py-2 px-2">{index + 1}</td>
                <td className="py-2 px-2 break-words">{ad.title}</td>
                <td className="py-2 px-2">{ad.vendorName || "Unknown"}</td>
                <td className="py-2 px-2 capitalize">
                  <span
                    className={`badge px-3 py-1 text-xs rounded-full ${
                      ad.status === "active"
                        ? "badge-success"
                        : ad.status === "pending"
                        ? "badge-warning"
                        : "badge-error"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="py-2 px-2">
                  <div className="flex flex-wrap justify-center gap-1">
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
                  </div>
                </td>
                <td className="py-2 px-2 text-center">
                  <button
                    className="btn btn-xs btn-outline btn-error"
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
