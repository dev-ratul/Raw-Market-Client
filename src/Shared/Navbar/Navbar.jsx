import { Link, NavLink, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("User signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 shadow-xl text-white bg-cover bg-center backdrop-blur-md"
      
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <Link
          to="/"
          className="text-lime-300 font-extrabold text-3xl flex items-center gap-2 drop-shadow-lg"
        >
          🥬 <span>Raw Market</span>
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6 text-sm md:text-base font-semibold items-center">
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-2 text-lime-300 border-b-2 border-lime-300 pb-1"
                : "flex items-center gap-2 hover:text-lime-300 transition"
            }
          >
            <FaShoppingCart className="text-lg" />
            All Products
          </NavLink>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/dashboard"
            className="hidden md:flex items-center gap-1 hover:text-lime-300 transition"
          >
            <MdDashboard className="text-xl" />
            Dashboard
          </NavLink>

          {/* Profile Picture */}
          <img
            src={
              user?.photoURL || "https://i.ibb.co/5W4fZ0w/default-avatar.jpg"
            }
            alt="User"
            className="w-9 h-9 rounded-full border-2 border-lime-300 shadow-md"
          />

          {/* Auth Buttons */}
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
                className="px-4 py-1.5 border border-lime-300 text-lime-200 rounded-full hover:bg-lime-400 hover:text-black transition font-medium"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-1.5 bg-lime-400 text-black rounded-full hover:bg-lime-500 transition font-medium"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
