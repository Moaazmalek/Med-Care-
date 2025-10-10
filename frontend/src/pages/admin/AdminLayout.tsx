/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useLocation, Outlet } from "react-router";
import { Activity, Calendar, Users, LogOut, UserPen, Home } from "lucide-react";
import logo from "@/assets/logo_option_2.png";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";

const AdminLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar panel */}
      <div className="hidden   md:block md:w-64   bg-white shadow-lg fixed h-full">
        <div className=" flex  md:justify-start justify-center ">
          <img
            src={logo}
            alt="med care logo"
            className="w-20 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="p-6">
          <nav className="space-y-2">
            <button
              onClick={() => {
                navigate("/admin/dashboard");
              }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/dashboard")
                  ? "bg-chart-2 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Activity size={20} />
              <span className="">Dashboard</span>
            </button>

            <button
              onClick={() => {
                navigate("/admin/appointments");
              }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/appointments")
                  ? "bg-chart-2 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Calendar size={20} />
              <span className="">Appointments</span>
            </button>

            <button
              onClick={() => {
                navigate("/admin/doctors");
              }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/doctors")
                  ? "bg-chart-2 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Users size={20} />
              <span className="">Doctors</span>
            </button>
            <button
              onClick={() => {
                navigate("/admin/profile");
              }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/profile")
                  ? "bg-chart-2 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <UserPen size={20} />
              <span className="">My Profile</span>
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 w-full p-6 border-t ">
            <button
              onClick={() => dispatch(logout())}
              className="w-full h-full flex items-center justify-center md:justify-start gap-3 
              px-4 py-3 rounded-lg  transition-all duration-300 cursor-pointer
              hover:bg-primary/10"
            >
              <LogOut size={20} />
              <span className="">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 flex-1 md:ml-64 mb-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard </h1>
        </div>
        <Outlet />
      </div >
       <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-gray-50 border border-gray-200  shadow-lg py-2 px-4 flex justify-around items-center z-50 md:hidden">
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
          isActive("/")
            ? "text-teal-500"
            : "text-gray-400 hover:text-chart-2"
        }`}
      >
        <Home size={22} />
        <span
          className={`text-[11px] mt-1 font-medium ${
            isActive("/") ? "text-chart-2" : "text-gray-500"
          }`}
        >
          Dashboard
        </span>
        {isActive("/") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>
      <button
        onClick={() => navigate("/admin/dashboard")}
        className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
          isActive("/admin/dashboard")
            ? "text-teal-500"
            : "text-gray-400 hover:text-chart-2"
        }`}
      >
        <Activity size={22} />
        <span
          className={`text-[11px] mt-1 font-medium ${
            isActive("/admin/dashboard") ? "text-chart-2" : "text-gray-500"
          }`}
        >
          Dashboard
        </span>
        {isActive("/admin/dashboard") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>

      <button
        onClick={() => navigate("/admin/appointments")}
        className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
          isActive("/admin/appointments")
            ? "text-teal-500"
            : "text-gray-400 hover:text-chart-2"
        }`}
      >
        <Calendar size={22} />
        <span
          className={`text-[11px] mt-1 font-medium ${
            isActive("/admin/appointments") ? "text-chart-2" : "text-gray-500"
          }`}
        >
          Appointments
        </span>
        {isActive("/admin/appointments") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>

      <button
        onClick={() => navigate("/admin/doctors")}
        className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
          isActive("/admin/doctors")
            ? "text-chart-2"
            : "text-gray-400 hover:text-chart-2"
        }`}
      >
        <Users size={22} />
        <span
          className={`text-[11px] mt-1 font-medium ${
            isActive("/admin/doctors") ? "text-chart-2" : "text-gray-500"
          }`}
        >
          Doctors
        </span>
        {isActive("/admin/doctors") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>

      <button
        onClick={() => navigate("/admin/profile")}
        className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
          isActive("/admin/profile")
            ? "text-chart-2"
            : "text-gray-400 hover:text-chart-2"
        }`}
      >
        <UserPen size={22} />
        <span
          className={`text-[11px] mt-1 font-medium ${
            isActive("/admin/profile") ? "text-chart-2" : "text-gray-500"
          }`}
        >
          Profile
        </span>
        {isActive("/admin/profile") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>
    </div>
    </div>
  );
};

export default AdminLayout;
