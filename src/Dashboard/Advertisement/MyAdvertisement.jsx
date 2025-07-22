import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAdvertisement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingAd, setEditingAd] = useState(null);

  const {
    data: advertisement = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["my-advertisement", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-advertisement?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/advertisement/${id}`);
          if (res.data.deletedCount > 0) {
            toast.success("Ad deleted successfully!");
            refetch();
          }
        } catch (err) {
          toast.error("Failed to delete ad");
        }
      }
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedAd = {
      title: form.title.value,
      description: form.description.value,
      image: form.image.value,
    };

    try {
      const res = await axiosSecure.patch(`/advertisement/${editingAd._id}`, updatedAd);
      if (res.data.modifiedCount > 0) {
        toast.success("Ad updated successfully!");
        refetch();
        setEditingAd(null);
      }
    } catch (err) {
      toast.error("Failed to update ad");
    }
  };

  if (isPending) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">📢 My Advertisements</h2>

      {/* Responsive card layout for small screens */}
      <div className="grid gap-4 md:hidden">
        {advertisement.map((ad) => (
          <div key={ad._id} className="bg-base-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{ad.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{ad.description.slice(0, 60)}...</p>
            <div className="mt-2">
              <span className={`badge ${ad.status === "approved" ? "badge-success" : "badge-warning"}`}>
                {ad.status}
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => setEditingAd(ad)} className="btn btn-xs btn-info">Update</button>
              <button onClick={() => handleDelete(ad._id)} className="btn btn-xs btn-error">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Table for medium and up screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {advertisement.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.title}</td>
                <td>{ad.description.slice(0, 50)}...</td>
                <td>
                  <span className={`badge ${ad.status === "approved" ? "badge-success" : "badge-warning"}`}>
                    {ad.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button onClick={() => setEditingAd(ad)} className="btn btn-xs btn-info">Update</button>
                  <button onClick={() => handleDelete(ad._id)} className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingAd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-base-300 p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4">Update Advertisement</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                defaultValue={editingAd.title}
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="description"
                defaultValue={editingAd.description}
                className="textarea textarea-bordered w-full"
                required
              />
              <input
                type="text"
                name="image"
                defaultValue={editingAd.image}
                className="input input-bordered w-full"
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="btn btn-sm btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvertisement;
