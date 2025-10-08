
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type{ AppDispatch,  RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchCurrentDoctor } from '@/redux/slices/doctorSlice'
import { fetchAppointmentsByDoctor } from '@/redux/slices/appointmentSlice'

const Appointments = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch<AppDispatch>();
    const {doctor}=useSelector((state:RootState) => state.doctor)
    const {doctorAppointments}=useSelector((state:RootState) => state.appointment)
//    const allAppointments = [
//     { id: 1, patient: 'John Doe', date: '2025-10-15', time: '09:00 AM', reason: 'Regular Checkup', status: 'Completed' },
//     { id: 2, patient: 'Jane Smith', date: '2025-10-15', time: '10:00 AM', reason: 'Follow-up', status: 'Completed' },
//     { id: 3, patient: 'Bob Wilson', date: '2025-10-15', time: '11:30 AM', reason: 'Consultation', status: 'Confirmed' },
//     { id: 4, patient: 'Alice Brown', date: '2025-10-16', time: '09:00 AM', reason: 'New Patient', status: 'Confirmed' },
//     { id: 5, patient: 'Charlie Davis', date: '2025-10-16', time: '10:30 AM', reason: 'Regular Checkup', status: 'Confirmed' },
//     { id: 6, patient: 'Eva Martinez', date: '2025-10-17', time: '02:00 PM', reason: 'Follow-up', status: 'Confirmed' },
//     { id: 7, patient: 'Frank Lee', date: '2025-10-17', time: '03:30 PM', reason: 'Consultation', status: 'Confirmed' },
//     { id: 8, patient: 'Grace Kim', date: '2025-10-18', time: '11:00 AM', reason: 'Regular Checkup', status: 'Pending' },
//   ]
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700'
      case 'In Progress': return 'bg-blue-100 text-blue-700'
      case 'Upcoming': return 'bg-yellow-100 text-yellow-700'
      case 'Confirmed': return 'bg-green-100 text-green-700'
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleCompleteAppointment = (id) => {
    alert(`Appointment ${id} marked as completed`)
  }

  const handleCancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      alert(`Appointment ${id} cancelled`)
    }
  }

  useEffect(() => {
    
    if(doctor && !doctorAppointments.length){
        dispatch(fetchAppointmentsByDoctor(doctor._id))

    }
    
  }, [dispatch,doctor])
  

  return (<Card>
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
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reason</th>
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
                        <td className="py-3 px-4">{appointment.reason}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {appointment.status !== 'completed' && (
                              <>
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleCompleteAppointment(appointment._id)}
                                >
                                  Complete
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => handleCancelAppointment(appointment._id)}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
   
  )
}

export default Appointments