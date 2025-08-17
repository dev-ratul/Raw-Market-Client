import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const HomeSpecialOffers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], isLoading, isError } = useQuery({
    queryKey: ['home-special-offers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/home-special-offer');
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-20 text-lg font-medium">
        Loading special offers...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-600 mt-20 text-lg font-semibold">
        Failed to load offers. Please try again later.
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12  rounded-lg ">
      <h2 className="text-4xl font-extrabold text-center text-primary mb-12 tracking-wide drop-shadow-md">
        📢 Today's Special Offers
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <article
            key={offer._id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-transform duration-300  overflow-hidden"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-56 object-cover rounded-3xl"
              loading="lazy"
            />
            <div className="p-6 flex flex-col justify-between h-56">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-3 leading-tight">
                  {offer.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-3">
                  {offer.description}
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-500 tracking-wide">
                Valid Until: {new Date(offer.validTill).toLocaleDateString()}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomeSpecialOffers;
