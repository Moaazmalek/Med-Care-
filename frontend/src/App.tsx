import  { Route,Routes } from "react-router"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import Doctors from "./pages/Doctors"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Appointment from "./pages/Appointment"


const App = () => {
  return <div className="">
    <Routes>
      <Route path="/" element={<UserLayout/>} >
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="doctors" element={<Doctors/>} />
        <Route path="doctors/:specialty" element={<Doctors/>} />
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="/appointment/:docId" element={<Appointment/>} />
        </Route>
     
     
      </Routes>
  </div>
}

export default App