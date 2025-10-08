import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AppDispatch, RootState } from '@/redux/store'
import { Users, Calendar } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchAppointments, getDashboardData } from '@/redux/slices/adminSlice'
import MyLoader from '@/components/Global/MyLoader'
const Dashboard = () => {
  const { appointments,loading ,dashboardData} = useSelector((state: RootState) => state.admin)
  const dispatch = useDispatch<AppDispatch>()
  const [stats, setStats] = useState([])

 

  const getStatusColor = (status:string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  useEffect(() => {
    if(!appointments.length) {
      dispatch(fetchAppointments());
    }
    
  }, [dispatch])
  useEffect(() => {
  if(!dashboardData){
      dispatch(getDashboardData())
    }else {
      setStats([
    { title: 'Total Doctors', value: dashboardData.totalDoctors, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Appointments', value: dashboardData.totalAppointments, icon: Calendar, color: 'bg-green-100 text-green-600' },
    { title: 'Total Patients', value: dashboardData.totalUsers, icon: Users, color: 'bg-purple-100 text-purple-600' },
    // { title: 'Active Today', value:54, icon: Activity, color: 'bg-orange-100 text-orange-600' },
  ])
    }
  }, [dashboardData, dispatch])
  

  if(loading){
    return <MyLoader/>
  }
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8  ">
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
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fees</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((appointment) => (
                  <tr key={appointment._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{appointment.user.name}</td>
                    <td className="py-3 px-4">{appointment.doctor.user.name}</td>
                    <td className="py-3 px-4">{appointment.date}</td>
                    <td className="py-3 px-4">{appointment.time}</td>
                    <td className="py-3 px-4">${appointment.amount}</td>
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