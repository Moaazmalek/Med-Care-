import MyLoader from "@/components/Global/MyLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAppointments, getDashboardData } from "@/redux/slices/adminSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { Users, Calendar,  } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function AdminDashboard() {
const {appointments,loading,dashboardData}=useSelector((state:RootState) => state.admin)
const dispatch = useDispatch<AppDispatch>();
  const [stats, setStats] = useState([]);


 
  useEffect(() => {
    if (!appointments.length) {
      dispatch(fetchAppointments());
    }
  }, [dispatch]);

 useEffect(() => {
    if (!dashboardData) {
      dispatch(getDashboardData());
    } else {
      setStats([
        {
          title: "Total Doctors",
          value: dashboardData.totalDoctors,
          icon: Users,
          color: "bg-blue-100 text-blue-600",
          border:"border-blue-400"
        },
        {
          title: "Total Appointments",
          value: dashboardData.totalAppointments,
          icon: Calendar,
          color: "bg-green-100 text-green-600",
          border:"border-chart-2"
        },
        {
          title: "Total Patients",
          value: dashboardData.totalUsers,
          icon: Users,
          color: "bg-purple-100 text-purple-600",
          border:"border-purple-400"
        },
        // { title: 'Active Today', value:54, icon: Activity, color: 'bg-orange-100 text-orange-600' },
      ]);
    }
  }, [dashboardData, dispatch]);

  if (loading) {
    return <MyLoader />;
  }


  return (
    <div className="mt-6 min-h-screen bg-gray-50">
      

      {/* Top Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
       {
        stats.map((stats,index:number) => {
          const Icon=stats.icon
          return (
             <Card 
             key={index}
             className={`shadow-md hover:shadow-lg transition-all duration-300 border-t-4 ${stats.border}`}>
          <CardHeader className="flex items-center gap-2">
             <div
                    className={`${stats.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                  >
                    <Icon size={24} />
                  </div>
            <CardTitle>{stats.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-gray-900">{stats.value}</p>
          </CardContent>
        </Card>
          
        )})
       }

       

        
      </div>

      {/* Section: Latest Appointments */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Appointments
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appt) => (
            <Card
              key={appt._id}
              className="p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">
                  {appt.user?.name || "Unknown Patient"}
                </p>
                <span className="text-sm text-gray-500">
                  {new Date(appt.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Doctor: {appt.doctor?.user.name || "N/A"}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Status:{" "}
                <span
                  className={`font-medium ${
                    appt.status === "completed"
                      ? "text-green-600"
                      : appt.status === "cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {appt.status}
                </span>
              </p>
            </Card>
          ))}
        </div>
      </div>

      
    </div>
  );
}
