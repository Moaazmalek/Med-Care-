import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, MoreVertical } from 'lucide-react'

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', date: '2025-10-15', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', date: '2025-10-15', time: '11:30 AM', status: 'Pending' },
    { id: 3, patient: 'Bob Wilson', doctor: 'Dr. Emily Williams', date: '2025-10-15', time: '02:00 PM', status: 'Confirmed' },
    { id: 4, patient: 'Alice Brown', doctor: 'Dr. James Brown', date: '2025-10-16', time: '09:00 AM', status: 'Confirmed' },
    { id: 5, patient: 'Charlie Davis', doctor: 'Dr. Lisa Anderson', date: '2025-10-16', time: '03:30 PM', status: 'Cancelled' },
    { id: 6, patient: 'David Miller', doctor: 'Dr. Sarah Johnson', date: '2025-10-17', time: '10:00 AM', status: 'Confirmed' },
    { id: 7, patient: 'Emma Wilson', doctor: 'Dr. Michael Chen', date: '2025-10-17', time: '02:30 PM', status: 'Pending' },
    { id: 8, patient: 'Frank Thomas', doctor: 'Dr. Emily Williams', date: '2025-10-18', time: '11:00 AM', status: 'Confirmed' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700'
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>All Appointments</CardTitle>
          <div className="flex items-center space-x-4">
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Doctor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">#{appointment.id}</td>
                  <td className="py-3 px-4">{appointment.patient}</td>
                  <td className="py-3 px-4">{appointment.doctor}</td>
                  <td className="py-3 px-4">{appointment.date}</td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreVertical size={20} />
                    </button>
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
