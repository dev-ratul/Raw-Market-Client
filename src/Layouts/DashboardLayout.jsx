// src/Layouts/DashboardLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../Shared/Navbar/Navbar"; // তোমার Header Component
import Footer from "../Shared/Footer/Footer"; // তোমার Footer Component

const DashboardLayout = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 text-white bg-blue-600 px-4 py-2 rounded"
      : "flex items-center gap-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div>
        <Navbar />
      </div>

      {/* Main Dashboard Layout */}
      <div className="drawer lg:drawer-open flex-1">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* Page Content */}
        <div className="drawer-content p-4">
          {/* Mobile drawer toggle button */}
          <div className="lg:hidden mb-4">
            <label htmlFor="dashboard-drawer" className="btn btn-neutral">
              Open Sidebar
            </label>
          </div>

          {/* Render nested routes */}
          <Outlet />
        </div>

        {/* Sidebar */}
        <div className="drawer-side mt-36 lg:mt-0">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 space-y-2 text-base-content">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/show-price-trend-layout"
                className={navLinkClass}
              >
                View price trends
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/add-product" className={navLinkClass}>
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-product" className={navLinkClass}>
                My Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-advertisement"
                className={navLinkClass}
              >
                Add Advertisement
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-advertisement"
                className={navLinkClass}
              >
                My Advertisement
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/all-users" className={navLinkClass}>
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/all-products" className={navLinkClass}>
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/all-advertisements"
                className={navLinkClass}
              >
                All Advertisements
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
