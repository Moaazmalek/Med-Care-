import { useNavigate } from "react-router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, Calendar, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import type{ AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";

interface UserMenuProps {
  name: string;
}
const UserMenu = ({ name }: UserMenuProps) => {
    const dispatch=useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
          <span>{name}</span>
          <User size={20} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User size={16} className="mr-2" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/appointments")}>
          <Calendar size={16} className="mr-2" /> Appointments
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut size={16} className="mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
