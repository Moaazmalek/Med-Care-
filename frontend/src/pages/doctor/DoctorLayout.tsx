/* eslint-disable @typescript-eslint/no-unused-vars */
import { Activity, Calendar, LogOut, Menu, User, Users, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import logo from "@/assets/logo_option_2.png"
import UserMenu from "@/components/Common/UserMenu"
import type{ AppDispatch,  RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentDoctor } from "@/redux/slices/doctorSlice"
import MyLoader from "@/components/Global/MyLoader"
import { logout } from "@/redux/slices/authSlice"
const DoctorLayout = () => {
      const [sidebarOpen, setSidebarOpen] = useState(false)
      const dispatch=useDispatch<AppDispatch>();
      const {doctor,loading}=useSelector((state:RootState) => state.doctor)
      const navigate=useNavigate();
      const location=useLocation();
      const isActive = (path: string) => location.pathname === path


      useEffect(() => {
       if(!doctor){
        dispatch(fetchCurrentDoctor());
       }
      }, [dispatch])

      if(loading || !doctor){
        return <MyLoader/>
      }
  return (
        <div className="min-h-screen bg-gray-50">
        
      {/* Sidebar panel */}
      <div className="md:w-64 bg-white shadow-lg fixed h-full">
        <div className=" flex  md:justify-start justify-center ">
          <img src={logo} alt="med care logo"
        className="w-20 cursor-pointer" 
        onClick={() => navigate("/")}/>
        </div>
        <div className="p-6  ">
             {/* Doctor Info */}
          <div className="mb-8 pb-6 border-b md:block hidden">
            {/* <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-3"></div> */}
            <img src={doctor.user.image} alt={doctor.user.name} className="w-16 h-16 rounded-full mx-auto mb-3" />
            <h3 className="text-center font-semibold text-gray-900">{doctor.user.name}</h3>
            <p className="text-center text-sm text-gray-600">{doctor.speciality}</p>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => { navigate('/doctor/dashboard'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/doctor/dashboard') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Activity size={20} />
              <span className="hidden md:block">Dashboard</span>
            </button>

            <button
              onClick={() => { navigate('/doctor/appointments'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/doctor/appointments') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar size={20} />
              <span className="hidden md:block">Appointments</span>
            </button>

            <button
              onClick={() => { navigate('/doctor/patients'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/doctor/patients') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              <span className="hidden md:block">Patients</span>
            </button>
            <button
              onClick={() => { navigate('/doctor/profile'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/doctor/profile') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User size={20} />
              <span className="hidden md:block">Profile</span>
            </button>
          </nav>

          <div className="absolute bottom-0 w-full p-6 border-t">
            <button
            onClick={() => dispatch(logout())}
                          
                          className="w-full h-full flex items-center justify-center md:justify-start gap-3 
                          px-4 py-3 rounded-lg  transition-all duration-300 cursor-pointer
                          hover:bg-primary/10"
                        >
              <LogOut size={20} />
              <span className="hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
       {/* Main content */}
      <div className="p-8 flex-1 md:ml-64 ml-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Panel</h1>
          <p className="text-gray-600">Welcome back, Doctor</p>
          
        </div>
        <Outlet/>
      </div>
    </div>
  )
}

export default DoctorLayout