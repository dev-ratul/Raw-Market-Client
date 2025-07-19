import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const ManageWatchlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetching watchlist items
  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ['my-watch-list'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-watch-list?email=${user.email}`);
      return res.data;
    },
  });

  // Remove from watchlist
  const mutation = useMutation({
    mutationFn: async (productId) => {
      return await axiosSecure.delete(`/watchlist/remove?email=${user.email}&productId=${productId}`);
    },
    onSuccess: (res) => {
      toast.success("Removed from watchlist!");
      queryClient.invalidateQueries(['my-watch-list']);
    },
    onError: () => {
      toast.error("Failed to remove from watchlist!");
    },
  });

  const handleRemove = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from your watchlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(productId);
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-center text-gray-500">Your watchlist is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Market Name</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.marketName}</td>
                  <td>{item.date}</td>
                  <td className="flex flex-col md:flex-row gap-2 justify-center">
                    <button
                      onClick={() => navigate('/all-products')}
                      className="btn btn-sm btn-success"
                    >
                      ➕ Add More
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="btn btn-sm btn-error"
                    >
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageWatchlist;
