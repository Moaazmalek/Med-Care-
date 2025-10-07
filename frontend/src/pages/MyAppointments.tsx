import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import { useEffect } from "react";
import {  fetchUserAppointments } from "@/redux/slices/appointmentSlice";
import { fetchCurrentUser } from "@/redux/slices/authSlice";
import { CancelAppointmentModal } from "@/components/Global/CancelAppointmentModal";

const MyAppointments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userAppointments } = useSelector(
    (state: RootState) => state.appointment
  );
  const { user } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserAppointments(user._id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600 mb-8">
            View and manage your upcoming and past appointments
          </p>

          {/* Upcoming Appointments */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {userAppointments
                .filter((apt) => apt.status === "pending")
                .map((appointment) => (
                  <Card
                    key={appointment._id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4 mb-4 md:mb-0 ">
                          <img
                            src={appointment.doctor.user.image}
                            alt={appointment.doctor.user.name}
                            className=" h-40 object-contain bg-gradient-to-r from-teal-400 to-teal-500 "
                          />
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {appointment.doctor.user.name}
                            </h3>
                            <p className="text-gray-600">
                              {appointment.doctor.speciality}
                            </p>
                            <div className="flex flex-col space-y-1 mt-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-2" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock size={16} className="mr-2" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin size={16} className="mr-2" />
                                <span>{appointment.doctor.user.address}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-3 ">
                         <CancelAppointmentModal  appointmentId={appointment._id}/>
                          {/* <Button className="bg-primary hover:bg-primary/90 text-white">
                            Reschedule
                          </Button> */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Past Appointments */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Past Appointments
            </h2>
            <div className="space-y-4">
              {userAppointments
                .filter((apt) => apt.status === "completed")
                .map((appointment) => (
                  <Card key={appointment._id} className="opacity-75">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {appointment.doctor.user.name}
                            </h3>
                            {/* <p className="text-gray-600">{appointment.specialty}</p> */}
                            <div className="flex flex-col space-y-1 mt-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-2" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock size={16} className="mr-2" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Completed
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
