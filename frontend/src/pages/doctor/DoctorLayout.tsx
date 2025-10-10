import { Activity, Calendar, Home, LogOut,  UserPen, Users,} from "lucide-react"
import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import logo from "@/assets/logo_option_2.png"
import type{ AppDispatch,  RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentDoctor } from "@/redux/slices/doctorSlice"
import MyLoader from "@/components/Global/MyLoader"
import { logout } from "@/redux/slices/authSlice"
const DoctorLayout = () => {
      const dispatch=useDispatch<AppDispatch>();
      const {doctor,loading}=useSelector((state:RootState) => state.doctor)
      const navigate=useNavigate();
      const location=useLocation();
      const isActive = (path: string) => location.pathname === path


      useEffect(() => {
       if(!doctor){
        dispatch(fetchCurrentDoctor());
       }
      }, [dispatch, doctor])

      if(loading || !doctor){
        return <MyLoader/>
      }
  return (
        <div className="min-h-screen bg-gray-50">
        
      {/* Sidebar panel */}
      <div className="hidden md:block w-64 bg-white shadow-lg fixed h-full">
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
              onClick={() => { navigate('/doctor/dashboard') }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                isActive('/doctor/dashboard') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Activity size={20} />
              <span className="hidden md:block">Dashboard</span>
            </button>

            <button
              onClick={() => { navigate('/doctor/appointments'); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                isActive('/doctor/appointments') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar size={20} />
              <span className="hidden md:block">Appointments</span>
            </button>

            <button
              onClick={() => { navigate('/doctor/patients'); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                isActive('/doctor/patients') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              <span className="hidden md:block">Patients</span>
            </button>
            <button
              onClick={() => { navigate('/doctor/profile'); }}
              className={`w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                isActive('/doctor/profile') ? 'bg-chart-2 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <UserPen size={20} />
              <span className="hidden md:block">My Profile</span>
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
       {/* Main content */}
      <div className="p-8 flex-1 md:ml-64  mb-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Panel</h1>
          <p className="text-gray-600">Welcome back, {doctor.user.name}</p>
          
        </div>
        <Outlet/>
      </div>
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
          Home
        </span>
        {isActive("/") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>
      <button
        onClick={() => navigate("/doctor/dashboard")}
        className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
          isActive("/doctor/dashboard")
            ? "text-teal-500"
            : "text-gray-400 hover:text-chart-2"
        }`}
      >
        <Activity size={22} />
        <span
          className={`text-[11px] mt-1 font-medium ${
            isActive("/doctor/dashboard") ? "text-chart-2" : "text-gray-500"
          }`}
        >
          Dashboard
        </span>
        {isActive("/doctor/dashboard") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>

      <button
        onClick={() => navigate("/doctor/appointments")}
        className={`flex flex-col items-center transition-all duration-300  cursor-pointer ${
          isActive("/doctor/appointments")
            ? "text-teal-500"
            : "text-gray-400 hover:text-chart-2"
        }`}
      >
        <Calendar size={22} />
        <span
          className={`text-[11px] mt-1 font-medium ${
            isActive("/doctor/appointments") ? "text-chart-2" : "text-gray-500"
          }`}
        >
          Appointments
        </span>
        {isActive("/doctor/appointments") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>

      <button
        onClick={() => navigate("/doctor/patients")}
        className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
          isActive("/doctor/patients")
            ? "text-chart-2"
            : "text-gray-400 hover:text-chart-2"
        }`}
      >
        <Users size={22} />
        <span
          className={`text-[11px] mt-1 font-medium ${
            isActive("/doctor/patients") ? "text-chart-2" : "text-gray-500"
          }`}
        >
          Patients
        </span>
        {isActive("/doctor/patients") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>

      <button
        onClick={() => navigate("/doctor/profile")}
        className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
          isActive("/doctor/profile")
            ? "text-chart-2"
            : "text-gray-400 hover:text-chart-2"
        }`}
      >
        <UserPen size={22} />
        <span
          className={`text-[11px] mt-1 font-medium ${
            isActive("/doctor/profile") ? "text-chart-2" : "text-gray-500"
          }`}
        >
          My Profile
        </span>
        {isActive("/doctor/profile") && (
          <div className="mt-1 w-5 h-[2px] bg-chart-2 rounded-full"></div>
        )}
      </button>
    </div>
    </div>
  )
}

export default DoctorLayout