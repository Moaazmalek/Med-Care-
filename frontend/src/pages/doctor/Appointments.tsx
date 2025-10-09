/* eslint-disable @typescript-eslint/no-explicit-any */


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock,  User,DollarSign,  CircleCheckBig, CircleX } from "lucide-react";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAppointment,
  completeAppointment,
  fetchAppointmentsByDoctor,
} from "@/redux/slices/appointmentSlice";


import MyLoader from "@/components/Global/MyLoader";
import uploadArea from '@/assets/upload_area.svg'
import { toast } from "react-toastify";

const Appointments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctor , loading } = useSelector((state: RootState) => state.doctor);
  const { doctorAppointments } = useSelector(
    (state: RootState) => state.appointment
  );

  const getStatusColor = (status: string) => {
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

  const handleCompleteAppointment = (id: string) => {
    dispatch(completeAppointment(id)).then(() => {
      
        dispatch(fetchAppointmentsByDoctor(doctor._id));
        toast.success("Appointment marked as completed");
      
    });
  };

useEffect(() => {
  console.log("Doctor:", doctor);
  console.log("Appointments before fetch:", doctorAppointments);

  if (doctor && !doctorAppointments.length) {
    console.log("Fetching appointments for doctor:", doctor._id);
    dispatch(fetchAppointmentsByDoctor(doctor._id));
  }
}, [dispatch, doctor, doctorAppointments]);

  if(loading){
    return <MyLoader/>
  }
if(!doctorAppointments){
  return <p className="text-center mt-10 text-gray-500">No appointments found.</p>
}
  return (
   <div className="space-y-6 mt-8">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
          <CardTitle className="text-xl font-semibold">All Appointments</CardTitle>
         
        </CardHeader>
      </Card>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctorAppointments.map((appointment, index) => (
          <Card
            key={appointment._id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500">#{index + 1}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={appointment?.user?.image ? appointment.user.image : uploadArea}
                  alt="Patient"
                  className="w-12 h-12 rounded-full object-cover border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = uploadArea;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.user.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <User size={14} /> Patient
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={appointment?.doctor?.user?.image ? appointment.doctor.user.image : uploadArea}
                  alt="Doctor"
                  className="w-12 h-12 rounded-full object-cover border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = uploadArea;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.doctor.user.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <User size={14} /> Doctor
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> {appointment.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} /> {appointment.time}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center  text-gray-700 font-medium">
                  <DollarSign size={16} />{appointment.amount}
                </div>

               
              </div>
               {appointment.status === 'cancelled' ? (
                  <span className="text-red-500 text-sm font-semibold">Cancelled</span>

                ) : appointment.status === "completed" ? (
                  <span className="text-green-500 text-sm font-semibold">Completed</span>
                ) : (
                  <div className="flex gap-2 items-center">
                    <Button

                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      dispatch(cancelAppointment(appointment._id)).then(() =>
                        dispatch(fetchAppointmentsByDoctor(doctor._id))
                      )
                    }
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <CircleX  size={17} /> Cancel
                  </Button><Button

                    size="sm"
                    onClick={() => handleCompleteAppointment(appointment._id)}
                    className="flex items-center gap-1 cursor-pointer bg-chart-2/90 hover:bg-chart-2 "
                  >
                    <CircleCheckBig size={16} /> Complete
                  </Button>
                  </div>
                )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

  );
};

export default Appointments;
