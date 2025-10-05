import { Outlet } from "react-router"
import Navbar from "../Common/Navbar"
import Footer from "../Common/Footer"


const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1">
        <Outlet/>
      </main>

      <Footer/>
      
    </div>
  )
}

export default UserLayout