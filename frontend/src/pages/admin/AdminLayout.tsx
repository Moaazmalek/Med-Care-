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
    <div className="min-h-screen bg-gray-50">
      
      {/* Top bar */}
      <div className="flex items-center justify-between bg-white shadow px-4 py-3">
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
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar panel */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <nav className="space-y-2">
            <button
              onClick={() => { navigate('/admin/dashboard'); setSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/dashboard') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Activity size={20} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => { navigate('/admin/appointments'); setSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/appointments') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar size={20} />
              <span>Appointments</span>
            </button>

            <button
              onClick={() => { navigate('/admin/doctors'); setSidebarOpen(false); }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/doctors') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              <span>Doctors</span>
            </button>
          </nav>

          <div className="absolute bottom-0 w-full p-6 border-t">
            <button
              onClick={() => dispatch(logout())}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin</p>
        </div>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout
