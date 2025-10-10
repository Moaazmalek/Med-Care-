import { NavLink, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "../../assets/med-care-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import UserMenu from "./UserMenu";
import MyLoader from "../Global/MyLoader";
import { logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const dispatch=useDispatch<AppDispatch>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (loading) {
    return <MyLoader />;
  }

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
                className={({ isActive }) =>
                  `text-gray-700 hover:text-primary transition-colors font-medium ${
                    isActive ? "border-b-2 border-[var(--chart-2)] " : ""
                  }`
                }
              >
                {link.name}
                <hr className="border-none outline-none h-0.5 bg-[var(--chart-2)] w-3/5 m-auto hidden" />
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}

          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <>
                <div className="w-20 h-10 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-20 h-10 bg-gray-300 rounded animate-pulse"></div>
              </>
            ) : user ? (
              <UserMenu name={user.name} role={user.role} />
            ) : (
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
                </Button>
              </>
            )}
          </div>
          {/**Mobile profile Icon */}
          <div className="md:hidden  flex items-center gap-3">
          
            {loading ? (
              <MyLoader />
            ) : user ? (
              <UserMenu role={user.role} />
            ) : null}
        

          {/* Mobile Menu Button */}

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <ul className="flex flex-col items-center gap-2  font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded inline-block hover:scale-105 ${
                      isActive ? "bg-chart-2 text-white  " : ""
                    }`
                  }
                  onClick={() => {
                    setIsMenuOpen(false);
                    scrollTo(0, 0);
                  }}
                >
                  {link.name}
                </NavLink>
              ))}
              {/* Extra Links based on role */}
              {user?.role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded inline-block hover:scale-105 ${
                      isActive ? "bg-chart-2 text-white  " : ""
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </NavLink>
              )}
              {user?.role === "doctor" && (
                <NavLink
                  to="/doctor/dashboard"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded inline-block hover:scale-105 ${
                      isActive ? "bg-chart-2 text-white  " : ""
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Doctor Dashboard
                </NavLink>
              )}
            </ul>
            <div className="flex flex-col space-y-2 pt-4">
              {loading ? (
                <MyLoader />
              ) : user ? (
                <Button
                onClick={() => dispatch(logout())}
                className="cursor-pointer"
                >Logout</Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full hover:bg-chart-2 hover:text-white cursor-pointer transition-all duration-200"
                  >
                    Login
                  </Button>

                  <Button
                    onClick={() => {
                      navigate("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-chart-2/90 hover:bg-chart-2 cursor-pointer text-white"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
