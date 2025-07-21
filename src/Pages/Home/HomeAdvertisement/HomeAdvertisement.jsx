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
    <section className="max-w-7xl mx-auto px-4 md:px-8 my-16">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-lime-600">
          Advertisement Highlights
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Explore all current promotions and vendor ads through this interactive carousel.
        </p>
      </div>

      {/* Carousel */}
      {approvedAds.length > 0 ? (
        <Slider {...settings}>
          {approvedAds.map((ad, index) => (
            <div
              key={ad._id || index}
              className="rounded-lg  overflow-hidden shadow-lg border border-gray-200 bg-white"
            >
              <img
                src={ad.image || "https://via.placeholder.com/800x400?text=No+Image"}
                alt={ad.title}
                className="w-full object-cover h-[350px]"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {ad.title}
                </h3>
                <p className="text-gray-600 mb-3">{ad.description}</p>
                <p className="text-sm text-gray-400 italic">
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
