import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../src/hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Shared/Loading/Loading";
import { FaCalendarAlt, FaShoppingBasket } from "react-icons/fa";
import { toast } from "react-toastify";

const HomeProductSec = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["homeProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/HomeProducts/all-approved?limit=6");
      return res.data;
    },
  });

  const isRecentDate = (dateString) => {
    const productDate = new Date(dateString);
    const today = new Date();
    const diff = Math.abs(today - productDate);
    return diff <= 2 * 24 * 60 * 60 * 1000;
  };

  if (isLoading) return <Loading />;

  return (
    <section className="max-w-7xl mx-auto px-4 mb-10">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-emerald-600">
        🛍️ Stay Updated with Local Market Prices
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products
          //   .filter((product) => isRecentDate(product.date))
          .map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-lime-500 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative group">
                <img
                  src={
                    product.imageURL ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={product.marketName}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-gradient-to-r from-lime-500 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  ✅ Approved
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 leading-snug mb-1">
                  🛒 {product.marketName}
                </h3>

                <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                  <FaCalendarAlt className="text-lime-500" />
                  {new Date(product.date).toLocaleDateString("en-US")}
                </p>

                {/* Price List */}
                <ul className="text-gray-700 text-sm mb-4 flex-grow space-y-2">
                  {product.priceList?.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FaShoppingBasket className="text-lime-600" />
                      <span>
                        {item.item} —{" "}
                        <span className="font-medium">৳{item.price}</span>/
                        {item.unit || "kg"}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  onClick={() => {
                    if (!user) {
                      toast.info("Please login to view details 🔐");
                      navigate("/login");
                    } else {
                      navigate(`/all-products/${product._id}`);
                    }
                  }}
                  className="mt-auto w-full px-4 py-2 bg-gradient-to-r from-lime-500 to-green-600 hover:from-green-600 hover:to-lime-500 text-white font-semibold rounded-full shadow-sm transition duration-300"
                >
                  🔍 View Details
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default HomeProductSec;
