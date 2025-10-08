/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router'
import { Activity, Calendar, Users, LogOut, Menu, X } from 'lucide-react'
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
      
      {/* Top bar */}
      {/* <div className="flex items-center justify-between bg-white shadow px-4 py-3">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <img 
            src={logo} 
            alt="MedCare Logo" 
            className="h-10 w-auto cursor-pointer" 
            onClick={() => navigate('/admin/dashboard')}
          />
        </div>
        <div>
          <span className="text-gray-700">
            <UserMenu name="Admin" />
          </span>
        </div>
      </div> */}

      {/* Sidebar overlay */}
      {/* {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSidebarOpen(false)}></div>
      )} */}

      {/* Sidebar panel */}
      <div className="md:w-64  bg-white shadow-lg fixed h-full">
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
      <div className="md:ml-64 ml-20 flex-1 p-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Panel</h1>
          <p className="text-gray-600"><Outlet/></p>
        </div>
        </div>
    </div>
  )
}

export default AdminLayout
