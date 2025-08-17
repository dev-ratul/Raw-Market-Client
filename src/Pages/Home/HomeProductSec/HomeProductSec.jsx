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
  console.log(products);

  const isRecentDate = (dateString) => {
    const productDate = new Date(dateString);
    const today = new Date();
    const diff = Math.abs(today - productDate);
    return diff <= 2 * 24 * 60 * 60 * 1000;
  };

  if (isLoading) return <Loading />;

  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
  <h2 className="md:text-4xl font-extrabold text-center mb-10 py-5 text-primary ">
    🛍️ Stay Updated with Local Market Prices
  </h2>

  <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-10">
    {products.map((product, index) => (
      <motion.div
        key={product._id}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="flex flex-col  bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      >
        {/* Image */}
        <div className="relative group overflow-hidden">
          <img
            src={product.imageURL || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={product.marketName}
            className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
          />
         
          <span className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            ✅ Approved
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.marketName}</h3>

          <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
            <FaCalendarAlt className="text-lime-500" />
            {new Date(product.date).toLocaleDateString("en-US")}
          </p>

          <p className="text-gray-600 flex-grow">{product.marketDescription}</p>

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
            className="mt-4 w-full px-5 py-2 bg-primary hover:bg-[#2563EB]  cursor-pointer text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
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
