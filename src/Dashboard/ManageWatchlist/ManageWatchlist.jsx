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

  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ['my-watch-list'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-watch-list?email=${user.email}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (productId) => {
      return await axiosSecure.delete(`/watchlist/remove?email=${user.email}&productId=${productId}`);
    },
    onSuccess: () => {
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

  if (isLoading) return <p className="text-center py-10 text-gray-300">Loading...</p>;

  return (
    <div className="p-4 md:p-10 bg-base-300 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        📋 Manage Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <p className="text-center text-gray-400">Your watchlist is empty.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full text-left text-sm text-gray-300 bg-[#0f172a]">
            <thead className="bg-[#1e293b] text-white text-base">
              <tr>
                <th className="px-6 py-4 font-semibold">#</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Market</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item, index) => (
                <tr key={item._id} className="hover:bg-[#1f2937] transition duration-200">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-white">{item.itemName}</td>
                  <td className="px-6 py-4">{item.marketName}</td>
                  <td className="px-6 py-4">${item.price || 'N/A'}</td>
                  <td className="px-6 py-4">
                    {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => navigate('/all-products')}
                        className="px-4 py-1.5 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-sm transition"
                      >
                        🔍 View
                      </button>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition"
                      >
                        ❌ Remove
                      </button>
                    </div>
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
