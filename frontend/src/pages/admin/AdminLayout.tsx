/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router'
import { Activity, Calendar, Users, LogOut, Menu, X, UserPen } from 'lucide-react'
import logo from "@/assets/logo_option_2.png"
import UserMenu from '@/components/Common/UserMenu'
import { useDispatch } from 'react-redux'
import type{ AppDispatch } from '@/redux/store'
import { logout } from '@/redux/slices/authSlice'

const AdminLayout = () => {
  const dispatch=useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      

      {/* Sidebar panel */}
      <div className="md:w-64  bg-white shadow-lg fixed h-full">
        <div className=" flex  md:justify-start justify-center ">
          <img src={logo} alt="med care logo"
        className="w-20 cursor-pointer" 
        onClick={() => navigate("/")}/>
        </div>
        <div className="p-6">
          <nav className="space-y-2">
            <button
              onClick={() => { navigate('/admin/dashboard'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/dashboard') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Activity size={20} />
              <span className='hidden md:block'>Dashboard</span>
            </button>

            <button
              onClick={() => { navigate('/admin/appointments'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/appointments') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar size={20} />
              <span className='hidden md:block'>Appointments</span>
            </button>

            <button
              onClick={() => { navigate('/admin/doctors'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/doctors') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              <span className='hidden md:block'>Doctors</span>
            </button>
            <button
              onClick={() => { navigate('/profile'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/profile') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <UserPen size={20} />
              <span className='hidden md:block'>My Profile</span>
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
              <span className='hidden md:block'>Logout</span>
            </button>
          </div>
        </div>
      </div>

       {/* Main Content */}
      <div className="p-8 flex-1 md:ml-64 ml-20">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard </h1>
        </div>
          <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout
