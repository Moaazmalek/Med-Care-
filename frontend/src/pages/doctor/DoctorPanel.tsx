import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  Clock,
  User,
  Activity,
  Search,
  CheckCircle,
  XCircle,
  LogOut,
  LayoutDashboard
} from 'lucide-react'
import logo from '@/assets/logo_option_2.png'
import { useNavigate } from 'react-router'

const DoctorPanel = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  
  const doctorInfo = {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    email: 'sarah.j@medcare.com',
    phone: '+1 555-0101',
    experience: '15 years',
  }

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

  const allAppointments = [
    { id: 1, patient: 'John Doe', date: '2025-10-15', time: '09:00 AM', reason: 'Regular Checkup', status: 'Completed' },
    { id: 2, patient: 'Jane Smith', date: '2025-10-15', time: '10:00 AM', reason: 'Follow-up', status: 'Completed' },
    { id: 3, patient: 'Bob Wilson', date: '2025-10-15', time: '11:30 AM', reason: 'Consultation', status: 'Confirmed' },
    { id: 4, patient: 'Alice Brown', date: '2025-10-16', time: '09:00 AM', reason: 'New Patient', status: 'Confirmed' },
    { id: 5, patient: 'Charlie Davis', date: '2025-10-16', time: '10:30 AM', reason: 'Regular Checkup', status: 'Confirmed' },
    { id: 6, patient: 'Eva Martinez', date: '2025-10-17', time: '02:00 PM', reason: 'Follow-up', status: 'Confirmed' },
    { id: 7, patient: 'Frank Lee', date: '2025-10-17', time: '03:30 PM', reason: 'Consultation', status: 'Confirmed' },
    { id: 8, patient: 'Grace Kim', date: '2025-10-18', time: '11:00 AM', reason: 'Regular Checkup', status: 'Pending' },
  ]

  const patients = [
    { id: 1, name: 'John Doe', age: 45, lastVisit: '2025-10-15', totalVisits: 12, phone: '+1 555-1001' },
    { id: 2, name: 'Jane Smith', age: 38, lastVisit: '2025-10-15', totalVisits: 8, phone: '+1 555-1002' },
    { id: 3, name: 'Bob Wilson', age: 52, lastVisit: '2025-10-15', totalVisits: 15, phone: '+1 555-1003' },
    { id: 4, name: 'Alice Brown', age: 29, lastVisit: '2025-10-10', totalVisits: 3, phone: '+1 555-1004' },
    { id: 5, name: 'Charlie Davis', age: 61, lastVisit: '2025-10-08', totalVisits: 20, phone: '+1 555-1005' },
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6">
          <img src={logo} alt="MedCare Logo" className="h-12 w-auto mb-8" />
          
          {/* Doctor Info */}
          <div className="mb-8 pb-6 border-b">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-3"></div>
            <h3 className="text-center font-semibold text-gray-900">{doctorInfo.name}</h3>
            <p className="text-center text-sm text-gray-600">{doctorInfo.specialty}</p>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'appointments' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar size={20} />
              <span>Appointments</span>
            </button>
            
            <button
              onClick={() => setActiveTab('patients')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'patients' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User size={20} />
              <span>Patients</span>
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-64 p-6 border-t">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Panel</h1>
          <p className="text-gray-600">Welcome back, {doctorInfo.name}</p>
        </div>

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
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
        )}

        {/* Appointments View */}
        {activeTab === 'appointments' && (
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
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reason</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{appointment.patient}</td>
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
                            {appointment.status !== 'Completed' && (
                              <>
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleCompleteAppointment(appointment.id)}
                                >
                                  Complete
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => handleCancelAppointment(appointment.id)}
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
        )}

        {/* Patients View */}
        {activeTab === 'patients' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Patients</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search patients..."
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
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Age</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Visit</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Visits</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full"></div>
                            <span className="font-medium">{patient.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{patient.age}</td>
                        <td className="py-3 px-4">{patient.phone}</td>
                        <td className="py-3 px-4">{patient.lastVisit}</td>
                        <td className="py-3 px-4">{patient.totalVisits}</td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default DoctorPanel
