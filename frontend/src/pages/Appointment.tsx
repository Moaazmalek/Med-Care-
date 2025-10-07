/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router' // ✅ must be -dom
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, Award, DollarSign, MapPin } from 'lucide-react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import MyLoader from '@/components/Global/MyLoader'
import { fetchDoctorById } from '@/redux/slices/doctorSlice'
import type { Doctor } from '@/utils/schema'
import { bookAppointment, fetchAppointmentsByDoctor } from '@/redux/slices/appointmentSlice'

const Appointment = () => {
  const { docId } = useParams()
  const [doctorInfo, setDoctorInfo] = useState<Doctor | null>(null)
  const [doctorSlot, setDoctorSlot] = useState<any[][]>([]) // slots grouped by day
  const [slotIndex, setSlotIndex] = useState<number>(0)
  const [selectedTime, setSelectedTime] = useState<string>('')  
  const {doctors,loading,error}=useSelector((state:RootState) => state.doctor)
  const {user}=useSelector((state:RootState) => state.auth)
  // const {appointments}=useSelector((state:RootState) => state.appointment)
  const dispatch=useDispatch<AppDispatch>();

  const getAvailableSlots = () => {
    const today = new Date()
    const allSlots: any[][] = []

    for (let i = 0; i < 7; i++) {
  const currentDate = new Date(today)
  currentDate.setDate(today.getDate() + i)

  const startTime = new Date(currentDate)
  startTime.setHours(10, 0, 0, 0) // ✅ Start every day at 10:00 AM

  const endTime = new Date(currentDate)
  endTime.setHours(21, 0, 0, 0) // 9:00 PM

  const timeSlots: any[] = []
  const dateKey=currentDate.toISOString().split('T')[0];
  while (startTime < endTime) {
    const dateTime=new Date(startTime)
    const formattedTime = dateTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    const isBooked=doctorInfo?.slots_booked?.[dateKey]?.includes(formattedTime) || false;
    if(!isBooked)
    timeSlots.push({
      datetime: dateTime,
      time: formattedTime,
    })
    startTime.setMinutes(startTime.getMinutes() + 30)
  }

  if (timeSlots.length > 0) {
    allSlots.push(timeSlots)
  }
}


    setDoctorSlot(allSlots)
  }

  const handleBooking = async () => {
    if (!doctorInfo || !doctorSlot[slotIndex] || !selectedTime) {
      toast.error('Please select a date and time slot')
      return
    }

    const bookingDate=doctorSlot[slotIndex][0].datetime.toISOString().split('T')[0];
   await dispatch(bookAppointment({
    userId:user._id,
    doctorId:doctorInfo._id,
    date:bookingDate,
    time:selectedTime
   }))
   .unwrap()
 // 1️⃣ Update doctorInfo.slots_booked locally
    const updatedSlotsBooked = { ...doctorInfo.slots_booked }
    if (!updatedSlotsBooked[bookingDate]) updatedSlotsBooked[bookingDate] = []
    updatedSlotsBooked[bookingDate].push(selectedTime)

    setDoctorInfo({
      ...doctorInfo,
      slots_booked: updatedSlotsBooked
    })

    // 2️⃣ Clear selection
    setSelectedTime('')
    setSlotIndex(0)
  }

  useEffect(() => {
    if(!docId) return ;
    const existingDoctor=doctors.find(doc=>doc._id===docId);
    if(existingDoctor){
      setDoctorInfo(existingDoctor);
    }else {
      dispatch(fetchDoctorById(docId)).unwrap()
      .then(res => setDoctorInfo(res.doctor))
      .catch(() => toast.error('Failed to fetch doctor details'));
    }
    
  }, [docId,dispatch,doctors])

  useEffect(() => {
    if (doctorInfo) getAvailableSlots()
  }, [doctorInfo])
useEffect(() => {
  if (doctorInfo?._id) {
    dispatch(fetchAppointmentsByDoctor(doctorInfo._id))
  }
}, [doctorInfo, dispatch])

  if(loading ){
    return <MyLoader/>
  }
  if(error){
    return <div className='flex justify-center items-center h-[80vh]'>{JSON.stringify(error)}</div>
  }
  if(!doctorInfo){
    return <div className='flex justify-center items-center h-[80vh]'>Doctor not found</div>
  }
  return (
    <div className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                 <img
            src={doctorInfo.user.image }
            alt={doctorInfo.user.name}
            className="w-full h-40 object-contain bg-gradient-to-r from-teal-400/20 to-teal-500/70 hover:from-teal-400 hover:to-teal-500 transition-all duration-300"
          />

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {doctorInfo.user.name}
                </h2>
                <p className="text-gray-600 mb-1">{doctorInfo.speciality}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {doctorInfo.degree}
                </p>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center text-gray-700">
                    <Award className="mr-2 text-primary" size={20} />
                    <span>{doctorInfo.experience} experience</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="mr-2 text-primary" size={20} />
                    <span>Consultation fee: {doctorInfo.fees}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="mr-2 text-primary" size={20} />
                    <span className="text-sm">{doctorInfo.user.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Section */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="mr-2 text-primary" size={24} />
                  Select Date
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
                  {doctorSlot.map((slots, index) => {
                    const dateLabel = slots[0].datetime.toDateString().slice(0, 10)
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setSlotIndex(index)
                          setSelectedTime('')
                        }}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          slotIndex === index
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-200 hover:border-primary'
                        }`}
                      >
                        <div className="text-sm font-semibold">{dateLabel}</div>
                      </button>
                    )
                  })}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="mr-2 text-primary" size={24} />
                  Select Time
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                  {doctorSlot[slotIndex]?.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTime === slot.time
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-primary'
                      }`}
                    >
                      <div className="text-sm font-semibold">{slot.time}</div>
                    </button>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={handleBooking}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment
