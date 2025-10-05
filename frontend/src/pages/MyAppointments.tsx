
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin, X } from 'lucide-react'

const MyAppointments = () => {
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Monday, Oct 15, 2025',
      time: '10:00 AM',
      location: '123 Medical Center, Healthcare District',
      status: 'Upcoming',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      date: 'Wednesday, Oct 17, 2025',
      time: '02:30 PM',
      location: '456 Health Plaza, Medical City',
      status: 'Upcoming',
    },
    {
      id: 3,
      doctor: 'Dr. Emily Williams',
      specialty: 'Pediatrician',
      date: 'Monday, Oct 8, 2025',
      time: '11:00 AM',
      location: '789 Care Center, Wellness Town',
      status: 'Completed',
    },
    {
      id: 4,
      doctor: 'Dr. James Brown',
      specialty: 'Orthopedic',
      date: 'Friday, Oct 5, 2025',
      time: '09:30 AM',
      location: '321 Bone Clinic, Health District',
      status: 'Completed',
    },
  ]

  const handleCancel = (id: number) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      alert(`Appointment ${id} has been cancelled`)
    }
  }

  return (
    <div >
      
      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600 mb-8">View and manage your upcoming and past appointments</p>

          {/* Upcoming Appointments */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Appointments</h2>
            <div className="space-y-4">
              {appointments
                .filter((apt) => apt.status === 'Upcoming')
                .map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4 mb-4 md:mb-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex-shrink-0"></div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{appointment.doctor}</h3>
                            <p className="text-gray-600">{appointment.specialty}</p>
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
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() => handleCancel(appointment.id)}
                          >
                            <X size={16} className="mr-2" />
                            Cancel
                          </Button>
                          <Button className="bg-primary hover:bg-primary/90 text-white">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Past Appointments */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Appointments</h2>
            <div className="space-y-4">
              {appointments
                .filter((apt) => apt.status === 'Completed')
                .map((appointment) => (
                  <Card key={appointment.id} className="opacity-75">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{appointment.doctor}</h3>
                            <p className="text-gray-600">{appointment.specialty}</p>
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
  )
}

export default MyAppointments
