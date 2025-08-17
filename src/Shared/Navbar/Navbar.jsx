import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { BiSolidOffer } from "react-icons/bi";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();
  const axiosInstense = useAxios();

  // users data
  const { data: usersData = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstense.get(`/users/${user.email}`);
      return res.data;
    },
  });
  console.log(usersData);

  // Logout function
  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/");
        setIsMenuOpen(false);
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };
  console.log(user);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navbar Menu Items
  const menuItems = (
    <>
      <NavLink
        to="/all-products"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 border-b-2 border-white pb-1"
            : "flex items-center gap-2 hover:border-b-2 border-white transition"
        }
      >
        <FaShoppingCart className="text-lg" />
        All Products
      </NavLink>

      <NavLink
        to="/special-offer"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 border-b-2 border-white pb-1"
            : "flex items-center gap-2 hover:border-b-2 border-white transition"
        }
      >
        <BiSolidOffer className="text-lg" />
        Offer
      </NavLink>

      <NavLink
        to="/dashboard"
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 border-b-2 border-white pb-1"
            : "flex items-center gap-2 hover:border-b-2 border-white transition"
        }
      >
        <MdDashboard className="text-xl" />
        Dashboard
      </NavLink>

      {user ? (
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 border border-white text-white rounded-full hover:bg-white hover:text-black transition font-medium"
        >
          Logout
        </button>
      ) : (
        <>
          <NavLink
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-1.5 border border-white text-white rounded-full hover:bg-[#2563EB] hover:text-black transition font-medium"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-1.5 bg-white text-gray-600 hover:text-gray-900 rounded-full  transition font-medium"
          >
            Sign Up
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky absolute top-0 z-50 w-full shadow-xl text-white bg-primary bg-center backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="font-extrabold text-3xl flex items-center gap-2 drop-shadow-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src="https://i.ibb.co/3ydHMbsx/Adobe-Express-file.png"
            className="h-10"
            alt="Logo"
          />
          <span>Raw Market</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm md:text-base font-semibold items-center">
          {menuItems}

          {/* Profile Picture */}
          {user && (
            <img
              onClick={() => setOpenProfile(true)}
              src={user && user.photoURL}
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-white shadow-md cursor-pointer"
            />
          )}
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
              <div
                className="flex flex-col items-center gap-2 mb-6 cursor-pointer"
                onClick={() => {
                  setOpenProfile(true);
                  setIsMenuOpen(false);
                }}
              >
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/5W4fZ0w/default-avatar.jpg"
                  }
                  alt="User"
                  className="w-20 h-20 rounded-full border-2 border-lime-400 shadow-md"
                />
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col gap-4 text-center text-base font-semibold">
                <NavLink
                  to="/all-products"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-lime-300 text-black px-4 py-2 rounded-full shadow transition"
                      : "bg-lime-300 hover:bg-lime-400 text-black px-4 py-2 rounded-full transition"
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
                      className="text-black px-4 py-2 rounded-full bg-lime-300 hover:bg-lime-400 transition"
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

              {/* Footer */}
              <div className="text-center text-xs text-gray-500 mt-6">
                &copy; 2025 Raw Market
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     {/* Profile Sidebar (Top Drawer) */}
<AnimatePresence>
  {openProfile && (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0  bg-opacity-40 z-50 flex justify-end items-start"
    >
      <div className="bg-white w-full md:w-1/2 lg:w-1/3 rounded-b-2xl shadow-2xl p-6 relative mt-16">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">Profile</h2>
          <button
            onClick={() => setOpenProfile(false)}
            className="text-gray-500 cursor-pointer hover:text-black transition"
          >
            ✖
          </button>
        </div>

        {/* Profile Image & Basic Info */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/5W4fZ0w/default-avatar.jpg"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-lime-400 shadow-md object-cover"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-gray-900">
            {user?.displayName || "User Name"}
          </h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
            <span className="font-medium text-gray-700">Role</span>
            <span className="text-gray-600">
              {usersData?.role || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
            <span className="font-medium text-gray-700">Phone</span>
            <span className="text-gray-600">
              {usersData?.contactNumber || "Not Provided"}
            </span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
            <span className="font-medium text-gray-700">Address</span>
            <span className="text-gray-600 text-right">
              {usersData?.address || "Not Provided"}
            </span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex gap-3">
          {/* <button className="w-1/2 py-2 rounded-xl bg-lime-500 text-white font-medium hover:bg-lime-600 transition">
            Edit Profile
          </button> */}
          <button
            onClick={() => setOpenProfile(false)}
            className="w-1/2 py-2 cursor-pointer rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </nav>
  );
};

export default Navbar;
