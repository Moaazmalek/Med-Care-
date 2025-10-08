import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { fetchDoctorPatients } from '@/redux/slices/doctorSlice'
import type { AppDispatch,  RootState } from '@/redux/store'
import { Search } from 'lucide-react'
import  { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Patients = () => {
  const dispatch = useDispatch<AppDispatch>();
const { patients } = useSelector((state: RootState) => state.doctor);
  const [searchTerm, setSearchTerm] = useState('');
  //     const patients = [
  //   { id: 1, name: 'John Doe', age: 45, lastVisit: '2025-10-15', totalVisits: 12, phone: '+1 555-1001' },
  //   { id: 2, name: 'Jane Smith', age: 38, lastVisit: '2025-10-15', totalVisits: 8, phone: '+1 555-1002' },
  //   { id: 3, name: 'Bob Wilson', age: 52, lastVisit: '2025-10-15', totalVisits: 15, phone: '+1 555-1003' },
  //   { id: 4, name: 'Alice Brown', age: 29, lastVisit: '2025-10-10', totalVisits: 3, phone: '+1 555-1004' },
  //   { id: 5, name: 'Charlie Davis', age: 61, lastVisit: '2025-10-08', totalVisits: 20, phone: '+1 555-1005' },
  // ]

  useEffect(() => {
    if(!patients.length){
      dispatch(fetchDoctorPatients());
    }
   
  }, [dispatch])

  // if(patients){
  //   return <div>{JSON.stringify(patients)}</div>
  // }
  
  
  return (       <Card>
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
                      <tr key={patient.patient._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full"></div>
                            <span className="font-medium">{patient.patient.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{patient.patient.age}</td>
                        <td className="py-3 px-4">{patient.patient.phone}</td>
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
  )
}
