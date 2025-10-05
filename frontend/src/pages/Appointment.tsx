/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router' // ✅ must be -dom
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, Award, DollarSign, MapPin } from 'lucide-react'
import { doctors } from '@/lib/constants'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const [doctorInfo, setDoctorInfo] = useState<any>(null)
  const [doctorSlot, setDoctorSlot] = useState<any[][]>([]) // slots grouped by day
  const [slotIndex, setSlotIndex] = useState<number>(0)
  const [selectedTime, setSelectedTime] = useState<string>('')

  const fetchDoctor = () => {
    if (!docId) return
    const doctor = doctors.find((doc) => doc.id === parseInt(docId))
    setDoctorInfo(doctor)
  }

  const getAvailableSlots = () => {
    const today = new Date()
    const allSlots: any[][] = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      // Today’s slots (round up to next half-hour)
      if (i === 0) {
        if (today >= endTime) continue
        const minutes = today.getMinutes()
        const nextHalfHour = minutes < 30 ? 30 : 0
        const nextHour = minutes < 30 ? today.getHours() : today.getHours() + 1
        currentDate.setHours(nextHour, nextHalfHour, 0, 0)
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      const timeSlots: any[] = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      if (timeSlots.length > 0) {
        allSlots.push(timeSlots)
      }
    }

    setDoctorSlot(allSlots)
  }

  const handleBooking = () => {
    if (!doctorInfo || !doctorSlot[slotIndex] || !selectedTime) {
      toast.error('Please select a date and time slot')
      return
    }
    // const selectedDate = doctorSlot[slotIndex][0].datetime.toDateString()
    toast.success(
      `Appointment booked with ${doctorInfo.name}`
    )
    console.log(`Booked ${doctorInfo.name} on ${doctorSlot[slotIndex][0].datetime.toDateString()} at ${selectedTime}`)
  }

  useEffect(() => {
    fetchDoctor()
  }, [docId])

  useEffect(() => {
    if (doctorInfo) getAvailableSlots()
  }, [doctorInfo])

  return (
    <div className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="w-full h-64 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg mb-4"></div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {doctorInfo?.name}
                </h2>
                <p className="text-gray-600 mb-1">{doctorInfo?.specialty}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {doctorInfo?.degree}
                </p>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center text-gray-700">
                    <Award className="mr-2 text-primary" size={20} />
                    <span>{doctorInfo?.experience} experience</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="mr-2 text-primary" size={20} />
                    <span>Consultation fee: {doctorInfo?.fees}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="mr-2 text-primary" size={20} />
                    <span className="text-sm">{doctorInfo?.address}</span>
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
