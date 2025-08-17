import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const HomeAdvertisement = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch advertisements
  const { data: ads = [], isLoading, isError } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisement");
      return res.data;
    },
  });

  // Filter only approved ads
  const approvedAds = ads.filter(ad => ad.status === "active");

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold text-lg">
        Failed to load advertisements. Please try again later.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-16">
      {/* Section Title */}
      <div className="text-center mb-10 px-2 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">
          Advertisement Highlights
        </h2>
      
      </div>

      {/* Carousel */}
      {approvedAds.length > 0 ? (
        <Slider {...settings}>
          {approvedAds.map((ad, index) => (
            <div
              key={ad._id || index}
              className="rounded-lg  overflow-hidden shadow-lg border border-gray-200 bg-white mx-2 "
            >
              <img
                src={ad.image || "https://via.placeholder.com/800x400?text=No+Image"}
                alt={ad.title}
                className="w-full object-cover h-56 sm:h-72 md:h-80 lg:h-[350px]"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                  {ad.title}
                </h3>
                <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
                  {ad.description}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 italic">
                  Vendor: {ad.vendorName}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-400 py-20">No approved advertisements found.</p>
      )}
    </section>
  );
};

export default HomeAdvertisement;
