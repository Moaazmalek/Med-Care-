import  { Navigate, Route,Routes } from "react-router"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Doctors from "./pages/Doctors"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Appointment from "./pages/Appointment"
import MyAppointments from "./pages/MyAppointments"
import MyProfile from "./pages/MyProfile"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./redux/store"
import { useEffect } from "react"
import { fetchCurrentUser } from "./redux/slices/authSlice"
import AdminLayout from "./pages/admin/AdminLayout"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminDoctors from "./pages/admin/Doctors"
import AdminAppointments from "./pages/admin/Appointments"


const App = () => {
  const dispatch=useDispatch<AppDispatch>()
  const {user,token}=useSelector((state:RootState) => state.auth)

  useEffect(() => {
    if(token && !user){
      dispatch(fetchCurrentUser());
    }
  }, [user,dispatch,token])

 
  return <div className="">
    <Routes>
      <Route path="/" element={<UserLayout/>} >
        <Route index element={<Home/>}/>
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="signup" element={user ? <Navigate to="/" /> : <SignUp />} />
        <Route path="doctors" element={<Doctors/>} />
        <Route path="doctors/:specialty" element={<Doctors/>} />
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="/appointment/:docId" element={<Appointment/>} />
        <Route  path="/my-appointments" element={<MyAppointments/>} />
        <Route  path="/my-appointments/:id" element={<MyAppointments/>} />
        <Route path="my-profile" element={<MyProfile />} />
        </Route>
        <Route 
        path="/admin"
        element={
          token && !user ? (
            <div>Loading...</div>
          ):user?.role==="admin" ? (
            <AdminLayout/>
          ):(
            <Navigate to="/" />
          )
        }
        >
          <Route index element={<Navigate to="dashboard"/>}/>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="doctors" element={<AdminDoctors />} />
          </Route>
          <Route 
        path="/doctor"
        element={
          token && !user ? (
            <div>Loading...</div>
          ):user?.role==="doctor" ? (
            <div>Doctor panel</div>
          ):(
            <Navigate to="/" />
          )
        }
        ></Route>
       
     
     
      </Routes>
  </div>
}

export default App