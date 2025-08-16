import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative w-full absolute h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://i.ibb.co/gMVrXBjC/supermarket-banner-concept-with-ingredients.jpg" // ✅ চাইলেই নিজের ইমেজ ইউজ করতে পারিস
        alt="Fresh Market"
        className="w-full  object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-opacity-60 flex items-center justify-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center px-1  "
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-snug drop-shadow-lg">
            Prices from your local market,
            <br className="hidden md:block" />
            always stay updated
          </h1>

          <Link
            to="/all-products"
            className="inline-block px-6 py-3 text-lg text-white font-semibold bg-primary   rounded-full hover:bg-[#2563EB] transition duration-300 shadow-md"
          >
            View Today’s Prices
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
