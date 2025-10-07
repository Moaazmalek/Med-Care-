import { NavLink, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "../../assets/med-care-logo.svg";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {user,loading}=useSelector((state:RootState) => state.auth);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="MedCare Logo" className="h-16 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({isActive}) =>`text-gray-700 hover:text-primary transition-colors font-medium ${isActive ? "border-b-2 border-[var(--chart-2)] " : ""}`}
              >

                  {link.name}
                  <hr className="border-none outline-none h-0.5 bg-[var(--chart-2)] w-3/5 m-auto hidden" />
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
        
            <div className="hidden md:flex items-center space-x-4">
              {loading ? (<>
              <div className="w-20 h-10 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-20 h-10 bg-gray-300 rounded animate-pulse"></div>
              </>): user ? (
                <UserMenu name={user.name}/>
              ):(
                <>
              <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="text-white bg-chart-2 hover:bg-chart-2/90 hover:text-white transition-all duration-200 cursor-pointer" 
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              Sign Up
            </Button></>
              )}
             
            
          </div>
          

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <ul className="flex flex-col items-center gap-2  font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({isActive}) => `px-4 py-2 rounded inline-block hover:scale-105 ${isActive ? "bg-chart-2 text-white  " : ""}`}
                  onClick={() => {setIsMenuOpen(false);scrollTo(0,0);}}
                >
                  {link.name}
                </NavLink>
              ))}
            </ul>
            <div className="flex flex-col space-y-2 pt-4">
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full hover:bg-chart-2 hover:text-white transition-all duration-200"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
