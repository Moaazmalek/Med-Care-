import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, Activity } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { title: 'Total Doctors', value: '100', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Appointments', value: '1,234', icon: Calendar, color: 'bg-green-100 text-green-600' },
    { title: 'Total Patients', value: '10,000', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { title: 'Active Today', value: '45', icon: Activity, color: 'bg-orange-100 text-orange-600' },
  ]

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', date: '2025-10-15', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', date: '2025-10-15', time: '11:30 AM', status: 'Pending' },
    { id: 3, patient: 'Bob Wilson', doctor: 'Dr. Emily Williams', date: '2025-10-15', time: '02:00 PM', status: 'Confirmed' },
    { id: 4, patient: 'Alice Brown', doctor: 'Dr. James Brown', date: '2025-10-16', time: '09:00 AM', status: 'Confirmed' },
    { id: 5, patient: 'Charlie Davis', doctor: 'Dr. Lisa Anderson', date: '2025-10-16', time: '03:30 PM', status: 'Cancelled' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700'
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Doctor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((appointment) => (
                  <tr key={appointment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{appointment.patient}</td>
                    <td className="py-3 px-4">{appointment.doctor}</td>
                    <td className="py-3 px-4">{appointment.date}</td>
                    <td className="py-3 px-4">{appointment.time}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default Dashboard