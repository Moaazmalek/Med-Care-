import { useNavigate, useLocation, Outlet } from 'react-router'
import { Activity, Calendar, Users, LogOut } from 'lucide-react'
import logo from "@/assets/logo_option_2.png"

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6">
          <img 
            src={logo} 
            alt="MedCare Logo" 
            className="h-12 w-auto mb-8 cursor-pointer" 
            onClick={() => navigate('/admin/dashboard')}
          />
          
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/dashboard') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Activity size={20} />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => navigate('/admin/appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/appointments') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar size={20} />
              <span>Appointments</span>
            </button>
            
            <button
              onClick={() => navigate('/admin/doctors')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive('/admin/doctors') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              <span>Doctors</span>
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
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