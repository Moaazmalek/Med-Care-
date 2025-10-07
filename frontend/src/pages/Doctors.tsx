/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch,  RootState } from '@/redux/store'
import { fetchDoctor } from '@/redux/slices/doctorSlice'
import MyLoader from '@/components/Global/MyLoader'

const Doctors = () => {
  const navigate = useNavigate()
  const { speciality } = useParams();
  const dispatch=useDispatch<AppDispatch>()
  const { doctors,loading } = useSelector((state:RootState)=>state.doctor)

  
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([])
useEffect(() => {
  if (!doctors.length) {
    dispatch(fetchDoctor());
  } else {
    // Populate filteredDoctors after doctors are loaded
    if (speciality) {
      const filtered = doctors.filter(
        (doc) =>
          doc.speciality.toLowerCase() === speciality.replace('-', ' ').toLowerCase()
      );
      setFilteredDoctors(filtered.length > 0 ? filtered : doctors);
    } else {
      setFilteredDoctors(doctors);
    }
  }
}, [dispatch, doctors, speciality])

  


if(loading) {
  return <MyLoader/>
}
  return (
    <div>
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {speciality ? `${speciality.replace('-', ' ')} Specialists` : 'Browse Doctors'}
          </h1>
          <p className="text-gray-600 mb-8">
            Find and book appointments with qualified healthcare professionals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card 
                key={doctor._id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/appointment/${doctor._id}`)}
              >
                <CardContent className="p-6">
                  <img
            src={doctor.user.image }
            alt={doctor.user.name}
            className="w-full h-40 object-contain bg-gradient-to-r from-teal-400/20 to-teal-500/70 hover:from-teal-400 hover:to-teal-500 transition-all duration-300"
          />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                      {doctor.available ? (
                        <div className='flex gap-2 items-center'>
                          <span className=" text-sm text-green-600 ">Available</span>
                          <span className="w-3 h-3 bg-green-500 rounded-full "></span>
                          </div>
                      ):(
                         <div className='flex items-center  gap-3'>
                          <span className=" text-sm text-green-600 ">Available</span>
                          <span className="w-3 h-3 bg-red-500 rounded-full "></span>
                          </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600">{doctor.speciality}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{doctor.experience} experience</span>
                      <span className="font-semibold text-gray-900">{doctor.fees}</span>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-primary hover:bg-primary/90 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/appointment/${doctor._id}`)
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
