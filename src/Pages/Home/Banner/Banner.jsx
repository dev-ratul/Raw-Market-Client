import { motion } from "framer-motion";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative w-full  h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://i.ibb.co/Q36Gd6XL/9697946.jpg" // ✅ চাইলেই নিজের ইমেজ ইউজ করতে পারিস
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
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#7B4019] mb-4 leading-snug drop-shadow-lg">
            আপনার নিকটস্থ বাজারের দামে  
            <br className="hidden md:block" />
            থাকুন সর্বদা আপডেটেড
          </h1>
          
          <Link
            to="/all-products"
            className="inline-block px-6 py-3 text-lg font-semibold bg-lime-400 text-black rounded-full hover:bg-lime-500 transition duration-300 shadow-md"
          >
            আজকের দাম দেখুন
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
