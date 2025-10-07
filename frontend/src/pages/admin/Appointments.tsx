import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { cancelAppointment, fetchAppointments } from '@/redux/slices/adminSlice'
import MyLoader from '@/components/Global/MyLoader'

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const {appointments,loading}=useSelector((state:RootState) => state.admin)
  const dispatch=useDispatch<AppDispatch>()

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
  
}, [dispatch,appointments.length])


  const filteredAppointments = appointments.filter(appointment =>
    appointment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

if (loading) {
  return <MyLoader />;
}

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
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fees</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment,index) => (
                <tr key={appointment._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">#{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-3 items-center">
                      <img 
                      className="w-8 h-8 rounded-full "
                      src={appointment.user.image} alt="" />
                       {appointment.user.name}
                    </div>
                   </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-3 items-center">
                      <img 
                      className="w-8 h-8 rounded-full object-cover "
                      src={appointment.doctor.user.image} alt="Doctor" />
                       {appointment.doctor.user.name}
                    </div>
                  </td>
                  <td className="py-3 px-4">{appointment.date}</td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">${appointment.amount}</td>
                  <td className="py-3 px-4">
                    <button className="text-gray-600 hover:text-gray-900">
                      {appointment.status !== 'cancelled' ? (
                        <X className='w-6 h-6 cursor-pointer bg-red-300 rounded-full text-white'
                      onClick={() => dispatch(cancelAppointment(appointment._id)).then(() => {
                        dispatch(fetchAppointments());
                      })}/>
                      ):(
                        <p className='text-red-500'>cancelled</p>
                        
                      )}
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
