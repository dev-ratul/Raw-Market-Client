import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("User signed out successfully");
        navigate("/");
        setIsMenuOpen(false); // মেনু ক্লোজ
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  // মেনু টগল ফাংশন
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // মেনু আইটেমস
  const menuItems = (
    <>
      <NavLink
        to="/all-products"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 text-lime-300 border-b-2 border-lime-300 pb-1"
            : "flex items-center gap-2 hover:text-lime-300 transition"
        }
      >
        <FaShoppingCart className="text-lg" />
        All Products
      </NavLink>

      <NavLink
        to="/dashboard"
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-1 hover:text-lime-300 transition"
      >
        <MdDashboard className="text-xl" />
        Dashboard
      </NavLink>

      {user ? (
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 border border-lime-300 text-lime-200 rounded-full hover:bg-lime-400 hover:text-black transition font-medium"
        >
          Logout
        </button>
      ) : (
        <>
          <NavLink
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-1.5 border border-lime-300 text-lime-200 rounded-full hover:bg-lime-400 hover:text-black transition font-medium"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-1.5 bg-lime-400 text-black rounded-full hover:bg-lime-500 transition font-medium"
          >
            Sign Up
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 shadow-xl text-white bg-cover bg-center backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-lime-300 font-extrabold text-3xl flex items-center gap-2 drop-shadow-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          🥬 <span>Raw Market</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm md:text-base font-semibold items-center">
          {menuItems}
          {/* Profile Picture */}
          <img
            src={
              user?.photoURL || "https://i.ibb.co/5W4fZ0w/default-avatar.jpg"
            }
            alt="User"
            className="w-9 h-9 rounded-full border-2 border-lime-300 shadow-md"
          />
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="w-72 h-full bg-[#1f2937] text-white p-6 shadow-xl relative z-50 flex flex-col justify-between"
            >
              {/* Top Close Button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-lime-300">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="text-2xl text-lime-300 hover:text-lime-400 transition"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Profile */}
              <div className="flex flex-col items-center gap-2 mb-6">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/5W4fZ0w/default-avatar.jpg"
                  }
                  alt="User"
                  className="w-20 h-20 rounded-full border-2 border-lime-400 shadow-md"
                />
                {user?.displayName && (
                  <p className="text-lg font-semibold bg-lime-400 text-black p-1 rounded-full">
                    {user?.email && (
                  <p className="text-sm text-black">{user.email}</p>
                )}
                  </p>
                )}
                
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col gap-4 text-center text-base font-semibold">
                <NavLink
                  to="/all-products"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-lime-300 text-black px-4 py-2 rounded-full shadow transition"
                      : "bg-lime-300 hover:bg-lime-400 text-black  px-4 py-2 rounded-full transition"
                  }
                >
                  🛒 All Products
                </NavLink>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-lime-300 hover:bg-lime-400 text-black px-4 py-2 rounded-full transition"
                >
                  📊 Dashboard
                </NavLink>

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-full transition"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className=" text-black px-4 py-2 rounded-full bg-lime-300 hover:bg-lime-400 transition"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-lime-400 text-black px-4 py-2 rounded-full hover:bg-lime-500 transition"
                    >
                      Sign Up
                    </NavLink>
                  </>
                )}
              </nav>

              {/* Footer or space filler */}
              <div className="text-center text-xs text-gray-500 mt-6">
                &copy; 2025 Raw Market
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
