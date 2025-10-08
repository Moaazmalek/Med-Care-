/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleCheckBig, CircleX, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentDoctor } from '@/redux/slices/doctorSlice'
import { completeAppointment, fetchAppointmentsByDoctor } from "@/redux/slices/appointmentSlice";
import { CancelAppointmentModal } from "@/components/Global/CancelAppointmentModal";
import { toast } from "react-toastify";

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { doctor } = useSelector((state: RootState) => state.doctor);
  const { doctorAppointments } = useSelector(
    (state: RootState) => state.appointment
  );

  const getStatusColor = (status:string) => {
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
      if (doctor) {
        dispatch(fetchAppointmentsByDoctor(doctor._id));
        toast.success("Appointment marked as completed");
      } 
    });
  };

  useEffect(() => {
    if (doctor && !doctorAppointments.length) {
      dispatch(fetchAppointmentsByDoctor(doctor._id));
    }
  }, [dispatch, doctor, doctorAppointments]);
 

  return (
   <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Appointments</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patient</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fees</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorAppointments.map((appointment) => (
                      <tr key={appointment._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{appointment.user.name}</td>
                        <td className="py-3 px-4">{appointment.date}</td>
                        <td className="py-3 px-4">{appointment.time}</td>
                        <td className="py-3 px-4">${appointment.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            
                              <>
                               {appointment.status !=="completed" && appointment.status !=="cancelled" && (
                                 <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleCompleteAppointment(appointment._id)}
                                >
                                  Complete
                                </Button>
                               )}
                                {
                                  appointment.status !=="cancelled" && appointment.status !=="completed" && (
                                    <CancelAppointmentModal  
                                      appointmentId={appointment._id} 
                                      onCancelled={() => {
                                        dispatch(fetchAppointmentsByDoctor(doctor._id));
                                      toast.success("Appointment cancelled successfully");
                                      }}
                                      icon={<Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  
                                >
                                  Cancel
                                </Button>}/>
                                  )
                                }
                              </>
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
  );

  };

export default Appointments;
