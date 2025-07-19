import React from "react";
import { NavLink, Outlet } from "react-router"; // ✅ use react-router-dom instead of react-router


const DashboardLayout = () => {
    

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 text-white bg-blue-600 px-4 py-2 rounded"
      : "flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="bg-base-200 p-4 shadow-md">
        <div className="flex flex-wrap gap-2 bg-white rounded-xl justify-center">
          {/* Static Link */}
          <NavLink to="show-price-trend-layout/potata" className={navLinkClass}>
            Potata Trends
          </NavLink>
          <NavLink to="show-price-trend-layout/onion" className={navLinkClass}>
            Onion Trends
          </NavLink>
          <NavLink to="show-price-trend-layout/orka" className={navLinkClass}>
            Orka Trends
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
