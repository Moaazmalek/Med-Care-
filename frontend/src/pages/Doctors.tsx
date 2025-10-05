/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { doctors } from '@/lib/constants'

const Doctors = () => {
  const navigate = useNavigate()
  const { specialty } = useParams()
  
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([])


  useEffect(() => {
  if (specialty) {
    setFilteredDoctors(
      doctors.filter(
        (doc) =>
          doc.specialty.toLowerCase() ===
          specialty.replace('-', ' ').toLowerCase()
      )
    )
  } else {
    setFilteredDoctors(doctors)
  }
}, [specialty])

 

  return (
    <div>
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {specialty ? `${specialty.replace('-', ' ')} Specialists` : 'Browse Doctors'}
          </h1>
          <p className="text-gray-600 mb-8">
            Find and book appointments with qualified healthcare professionals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card 
                key={doctor.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/appointment/${doctor.id}`)}
              >
                <CardContent className="p-6">
                  <div className="w-full h-48 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg mb-4"></div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                      {doctor.available && (
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                    
                    <p className="text-gray-600">{doctor.specialty}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{doctor.experience} experience</span>
                      <span className="font-semibold text-gray-900">{doctor.fees}</span>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-primary hover:bg-primary/90 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/appointment/${doctor.id}`)
                      }}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Doctors
