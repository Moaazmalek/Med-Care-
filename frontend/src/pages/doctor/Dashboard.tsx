import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  CircleDollarSign,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { completeAppointment, fetchTodaysAppointments } from "@/redux/slices/appointmentSlice";
import {
  fetchCurrentDoctor,
  fetchDoctorDashboardData,
} from "@/redux/slices/doctorSlice";
import { toast } from "react-toastify";
import { CancelAppointmentModal } from "@/components/Global/CancelAppointmentModal";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todaysAppointments } = useSelector(
    (state: RootState) => state.appointment
  );
  const { doctor, dashboardData } = useSelector(
    (state: RootState) => state.doctor
  );
  const [stats, setstats] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-blue-100 text-blue-700";
      case "upcoming":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCompleteAppointment = (id:string) => {
    dispatch(completeAppointment(id)).then(() => {
      dispatch(fetchTodaysAppointments(doctor._id));
      dispatch(fetchDoctorDashboardData());
      toast.success("Appointment marked as completed");
    })
  };


  useEffect(() => {
    if (doctor) {
      dispatch(fetchTodaysAppointments(doctor._id));
    } else {
      dispatch(fetchCurrentDoctor());
      dispatch(fetchTodaysAppointments(doctor._id));
    }
  }, [doctor, dispatch]);

  useEffect(() => {
    if(!dashboardData){
      dispatch(fetchDoctorDashboardData())
    }else {
      setstats([
    { title: 'Total Appointments', value: dashboardData.appointmentsCount, icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { title: 'Today\'s Appointments', value: todaysAppointments.length, icon: Clock, color: 'bg-green-100 text-green-600' },
    { title: 'Total Patients', value: dashboardData.patientsCount, icon: User, color: 'bg-purple-100 text-purple-600' },
    { title: 'Earnings', value: dashboardData.earnings, icon: CircleDollarSign, color: 'bg-orange-100 text-orange-600' },
  ])
    }

  },[dispatch,dashboardData])

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                  >
                    <Icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {appointment.user.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {appointment.reason}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {appointment.time}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  {appointment.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() =>
                          handleCompleteAppointment(appointment._id)
                        }
                      >
                        <CheckCircle size={16} />
                      </Button>
                      <CancelAppointmentModal 
                      appointmentId={appointment._id}
                      icon={<Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        
                      >
                        <XCircle size={16} />
                      </Button>}
                      onCancelled={() => dispatch(fetchTodaysAppointments(doctor._id))}

                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
