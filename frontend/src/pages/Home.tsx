import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'


import { 
  Stethoscope, 
  Heart, 
  Brain, 
  Baby, 
  Eye, 
  Bone,
  Activity,
  Pill,
  ArrowRight 
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

const Home = () => {
  const navigate = useNavigate()

  const specialties = [
    { name: 'General Physician', icon: Stethoscope, color: 'bg-teal-100 text-teal-600' },
    { name: 'Cardiologist', icon: Heart, color: 'bg-red-100 text-red-600' },
    { name: 'Neurologist', icon: Brain, color: 'bg-purple-100 text-purple-600' },
    { name: 'Pediatrician', icon: Baby, color: 'bg-pink-100 text-pink-600' },
    { name: 'Ophthalmologist', icon: Eye, color: 'bg-blue-100 text-blue-600' },
    { name: 'Orthopedic', icon: Bone, color: 'bg-orange-100 text-orange-600' },
    { name: 'Dermatologist', icon: Activity, color: 'bg-green-100 text-green-600' },
    { name: 'Gastroenterologist', icon: Pill, color: 'bg-yellow-100 text-yellow-600' },
  ]

  const topDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '15 years',
      available: true,
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      experience: '12 years',
      available: true,
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      specialty: 'Pediatrician',
      experience: '10 years',
      available: false,
    },
    {
      id: 4,
      name: 'Dr. James Brown',
      specialty: 'Orthopedic',
      experience: '18 years',
      available: true,
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatologist',
      experience: '8 years',
      available: true,
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialty: 'General Physician',
      experience: '20 years',
      available: true,
    },
  ]

  return <>
<section className="bg-gradient-to-br from-teal-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Book Appointment With Trusted Doctors
              </h1>
              <p className="text-lg text-gray-600">
                Connect with the best healthcare professionals in your area. Schedule appointments online and manage your health with ease.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => navigate('/doctors')}
              >
                Find Doctors <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://qeohchpepnnqridc.manus-preview.space/assets/hero-team-DwmdEqbh.jpg"
                alt="Medical Team" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find by Speciality</h2>
            <p className="text-gray-600">Browse through our wide range of medical specialties</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => {
              const Icon = specialty.icon
              return (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  onClick={() => navigate(`/doctors/${specialty.name.toLowerCase().replace(' ', '-')}`)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`${specialty.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="font-semibold text-gray-900">{specialty.name}</h3>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Doctors to Book</h2>
            <p className="text-gray-600">Meet our highly qualified and experienced doctors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topDoctors.map((doctor) => (
              <Card 
                key={doctor.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => {navigate(`/appointment/${doctor.id}`)}}
              >
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-lg text-gray-900 text-center">{doctor.name}</h3>
                  <p className="text-gray-600 text-center">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500 text-center mt-2">{doctor.experience} experience</p>
                  <div className="mt-4 flex justify-center">
                    {doctor.available ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Available
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Not Available
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Book Appointment With 100+ Trusted Doctors</h2>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-teal-600 hover:bg-gray-100"
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                </Button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://qeohchpepnnqridc.manus-preview.space/assets/doctors-team-B1u0nMvt.jpg"
                  alt="Doctors" 
                  className="rounded-xl shadow-xl w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
</>

  
}

export default Home
