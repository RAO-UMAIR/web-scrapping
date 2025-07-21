import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-amber-50 h-screen">
      <div className="grid xl:grid-cols-5">
        {/* Sidebar */}
        <div className="xl:col-span-1 bg-[#3D74B6] px-8 pt-16 shadow-2xl h-screen">
          <div className="flex flex-col gap-12">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `link-hover-effect text-[16px] text-center rounded-sm font-bold py-2 bg-[#EAC8A6] ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `link-hover-effect text-[16px] text-center rounded-sm font-bold py-2 bg-[#EAC8A6] ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>Login</span>
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `link-hover-effect text-[16px] text-center rounded-sm font-bold py-2 bg-[#EAC8A6] ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>Signup</span>
            </NavLink>

            <button
              onClick={logout}
              className="link-hover-effect text-[16px] text-center rounded-sm font-bold py-2 bg-[#EAC8A6]"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content rendered here */}
        <div className="xl:col-span-4 bg-[#FBF5DE] h-screen overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
