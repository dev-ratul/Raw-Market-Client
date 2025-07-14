import { Link, NavLink } from "react-router";
import { MdDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { button } from "framer-motion/client";

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log(user);

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("User signed out successfully");
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
      className="bg-base-200 text-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <Link
          to="/"
          className="text-lime-400 font-extrabold text-2xl flex items-center gap-2"
        >
          🥬 <span>Raw Market</span>
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6 text-sm md:text-base font-medium">
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              isActive
                ? "text-lime-400 border-b-2 border-lime-400 pb-1"
                : "hover:text-lime-400 transition"
            }
          >
            All Products
          </NavLink>

          <NavLink
            to="/offers"
            className={({ isActive }) =>
              isActive
                ? "text-lime-400 border-b-2 border-lime-400 pb-1"
                : "hover:text-lime-400 transition"
            }
          >
            Offers
          </NavLink>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/dashboard"
            className="hidden md:flex items-center gap-1 hover:text-lime-400 transition"
          >
            <MdDashboard className="text-xl" />
            Dashboard
          </NavLink>

          {user ? (
            <img
              src={user.photoURL}
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-lime-400 shadow"
            />
          ) : (
            <img
              src="https://i.ibb.co/5W4fZ0w/default-avatar.jpg"
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-lime-400 shadow"
            />
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 btn py-1.5 border border-lime-400 text-lime-300 rounded-full hover:bg-lime-400 hover:text-black transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-1.5 border border-lime-400 text-lime-300 rounded-full hover:bg-lime-400 hover:text-black transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-1.5 bg-lime-400 text-black rounded-full hover:bg-lime-500 transition"
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
