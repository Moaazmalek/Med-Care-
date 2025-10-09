import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X, Calendar, Clock, User, DollarSign, CircleCheckBig } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { cancelAppointment, fetchAppointments } from '@/redux/slices/adminSlice'
import MyLoader from '@/components/Global/MyLoader'

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { appointments, loading } = useSelector((state: RootState) => state.admin)
  const dispatch = useDispatch<AppDispatch>()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  useEffect(() => {
    if (!appointments.length) {
      dispatch(fetchAppointments())
    }
  }, [dispatch, appointments.length])

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <MyLoader />

  return (
    <div className="space-y-6 mt-8">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ">
          <CardTitle className="text-xl font-semibold">All Appointments</CardTitle>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search appointments..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAppointments.map((appointment, index) => (
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
                  src={appointment.user.image}
                  alt="Patient"
                  className="w-12 h-12 rounded-full object-cover border"
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
                  src={appointment.doctor.user.image}
                  alt="Doctor"
                  className="w-12 h-12 rounded-full object-cover border"
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

                {appointment.status === 'cancelled' ? (
                   <span className="text-red-500 text-sm font-semibold">Cancelled</span>
                  
                ) :appointment.status ==="completed" ?  (
                  
                                    <span className="text-green-500 text-sm font-semibold">Completed</span>

                ):(
                  <div className="flex gap-2 items-center">
                    <Button
                    
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      dispatch(cancelAppointment(appointment._id)).then(() =>
                        dispatch(fetchAppointments())
                      )
                    }
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <X size={16} /> Cancel
                  </Button>
                    <Button
                    
                    size="sm"
                    onClick={() =>
                      dispatch(cancelAppointment(appointment._id)).then(() =>
                        dispatch(fetchAppointments())
                      )
                    }
                    className="flex items-center gap-1 cursor-pointer bg-chart-2/90 hover:bg-chart-2 hover:text-white"
                  >
                    <CircleCheckBig size={16} /> Complete
                  </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Appointments
