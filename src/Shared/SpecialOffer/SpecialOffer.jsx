import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTag } from 'react-icons/fa';

const SpecialOffers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], isLoading, isError } = useQuery({
    queryKey: ['specialOffers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/special-offer');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <span className="loading loading-dots loading-lg text-green-600"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-medium py-10">
        Failed to load special offers. Please try again later.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-emerald-600 mb-10 flex items-center justify-center gap-3">
        <FaTag className="text-emerald-500" /> Today's Market Specials
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{offer.title}</h2>
              <p className="text-gray-600 mb-3">{offer.description}</p>
              <p className="text-sm text-gray-500 font-medium">
                Valid till:{" "}
                <span className="text-green-600">
                  {new Date(offer.validTill).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
