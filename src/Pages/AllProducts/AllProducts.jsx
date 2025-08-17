import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Loading from "../../Shared/Loading/Loading";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [sort, setSort] = useState("");
  const [filterDates, setFilterDates] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data, isPending } = useQuery({
    queryKey: [
      "all-approved-products",
      filterDates.from,
      filterDates.to,
      sort,
      currentPage,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filterDates.from && filterDates.to) {
        params.append("from", filterDates.from);
        params.append("to", filterDates.to);
      }
      if (sort) {
        params.append("sort", sort);
      }

      params.append("page", currentPage);
      params.append("limit", itemsPerPage);

      const res = await axiosSecure.get(
        `/products/all-approved?${params.toString()}`
      );
      return res.data;
    },
  });

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1); // Reset page on sort
  };

  const onSubmit = (data) => {
    setFilterDates({ from: data.from, to: data.to });
    setCurrentPage(1); // Reset page on filter
  };

  const handleViewDetails = (id) => {
    navigate(`/all-products/${id}`);
  };

  const totalPages = Math.ceil((data?.total || 0) / itemsPerPage);

  return (
    <div className="">
      <div className="px-4 py-6 max-w-7xl mx-auto ">
        {/* 📆 Filter + Sort Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap gap-4 mb-6 items-end"
        >
          <div>
            <label className="block mb-1">📅 From</label>
            <input
              type="date"
              {...register("from", { required: true })}
              className="input input-bordered"
            />
          </div>
          <div>
            <label className="block mb-1">📅 To</label>
            <input
              type="date"
              {...register("to", { required: true })}
              className="input input-bordered"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Filter
          </button>
          <select
            onChange={handleSortChange}
            value={sort}
            className="select select-bordered"
          >
            <option value="">Sort by Price</option>
            <option value="asc">🔼 Low to High</option>
            <option value="desc">🔽 High to Low</option>
          </select>
        </form>

        {/* 🧾 Product Grid */}
        {isPending ? (
          <Loading />
        ) : (
          <div className="lg:max-w-7xl mx-auto p-8 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {data?.products?.length > 0 ? (
                data.products.map((p) => (
                  <div
                    key={p._id}
                    className="bg-opacity-10 backdrop-blur-md rounded-3xl border border-white border-opacity-20 shadow-lg shadow-blue-300
                  hover:shadow-blue-400 hover:scale-105 transition-transform duration-500 cursor-pointer flex flex-col"
                    onClick={() => handleViewDetails(p._id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleViewDetails(p._id);
                    }}
                  >
                    <div className="relative h-64 overflow-hidden rounded-t-3xl border-b border-white border-opacity-30">
                      <img
                        src={p.imageURL}
                        alt={p.itemName}
                        className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-primary font-bold px-4 py-1 rounded-full shadow-lg">
                        ৳{p.pricePerUnit}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-3xl font-extrabold text-white mb-3 drop-shadow-md">
                        {p.itemName}
                      </h2>

                      <div className="text-white/80 mb-5 space-y-2 text-lg font-semibold leading-snug">
                        <p>
                          📅{" "}
                          <span className="font-normal">
                            {new Date(p.date).toLocaleDateString()}
                          </span>
                        </p>
                        <p>
                          🏪 <span className="font-normal">{p.marketName}</span>
                        </p>
                        <p>
                          👨‍🌾 <span className="font-normal">{p.vendorName}</span>
                        </p>
                      </div>

                      <Link
                        to={`/all-products/${p._id}`}
                        className="flex justify-center items-center bg-primary hover:from-[#2563EB] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-blue-400
                         transition-colors duration-400"
                        aria-label={`View details of ${p.itemName}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-white text-2xl font-semibold py-20">
                  No products found for this filter.
                </p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2 flex-wrap">
                {[...Array(totalPages).keys()].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num + 1)}
                    className={`btn btn-sm ${
                      currentPage === num + 1 ? "btn-success" : "btn-outline"
                    }`}
                  >
                    {num + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
