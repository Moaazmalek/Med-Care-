
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { 
  Calendar, 
  Clock,
  User,
  Activity,
  CheckCircle,
  XCircle,

} from 'lucide-react'


const Dashboard = () => {
      const stats = [
    { title: 'Total Appointments', value: '234', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { title: 'Today\'s Appointments', value: '8', icon: Clock, color: 'bg-green-100 text-green-600' },
    { title: 'Total Patients', value: '156', icon: User, color: 'bg-purple-100 text-purple-600' },
    { title: 'Completed Today', value: '5', icon: Activity, color: 'bg-orange-100 text-orange-600' },
  ]

  const todayAppointments = [
    { id: 1, patient: 'John Doe', time: '09:00 AM', reason: 'Regular Checkup', status: 'Completed' },
    { id: 2, patient: 'Jane Smith', time: '10:00 AM', reason: 'Follow-up', status: 'Completed' },
    { id: 3, patient: 'Bob Wilson', time: '11:30 AM', reason: 'Consultation', status: 'In Progress' },
    { id: 4, patient: 'Alice Brown', time: '02:00 PM', reason: 'New Patient', status: 'Upcoming' },
    { id: 5, patient: 'Charlie Davis', time: '03:30 PM', reason: 'Regular Checkup', status: 'Upcoming' },
    { id: 6, patient: 'Eva Martinez', time: '04:00 PM', reason: 'Follow-up', status: 'Upcoming' },
  ]
  
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

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{appointment.patient}</h4>
                          <p className="text-sm text-gray-600">{appointment.reason}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{appointment.time}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        {appointment.status === 'Upcoming' && (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleCompleteAppointment(appointment.id)}
                            >
                              <CheckCircle size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-50"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              <XCircle size={16} />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
  )
}

export default Dashboard