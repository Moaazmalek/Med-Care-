import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, UserPlus, Edit, Trash2 } from 'lucide-react'
import uploadArea from '@/assets/upload_area.svg'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { addDoctor } from '@/redux/slices/adminSlice'
import { toast } from 'react-toastify'

const Doctors = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddDoctor, setShowAddDoctor] = useState(false)
  
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    speciality: '',
    email: '',
    password: '',
    phone: '',
    experience: '',
    fees: '',
    address: '',
    degree: '',
    about: '',
    image:null as File | null
  })
  const previewUrl=newDoctor.image ? URL.createObjectURL(newDoctor.image) :  uploadArea

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', experience: '15 years', email: 'sarah.j@medcare.com', phone: '+1 555-0101' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurologist', experience: '12 years', email: 'michael.c@medcare.com', phone: '+1 555-0102' },
    { id: 3, name: 'Dr. Emily Williams', specialty: 'Pediatrician', experience: '10 years', email: 'emily.w@medcare.com', phone: '+1 555-0103' },
    { id: 4, name: 'Dr. James Brown', specialty: 'Orthopedic', experience: '18 years', email: 'james.b@medcare.com', phone: '+1 555-0104' },
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Dermatologist', experience: '8 years', email: 'lisa.a@medcare.com', phone: '+1 555-0105' },
  ]
   const handleImageChange=(e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     setNewDoctor({
       ...newDoctor,
       image: file
     });
   }
  const handleAddDoctor = (e) => {
    e.preventDefault()
    alert('Doctor added successfully!')
    setShowAddDoctor(false)
    const formData = new FormData()
  formData.append("name", newDoctor.name)
  formData.append("speciality", newDoctor.speciality)
  formData.append("email", newDoctor.email)
  formData.append("password", newDoctor.password)
  formData.append("phone", newDoctor.phone)
  formData.append("experience", newDoctor.experience)
  formData.append("fees", newDoctor.fees)
  formData.append("address", newDoctor.address)
  formData.append("degree", newDoctor.degree)
  formData.append("about", newDoctor.about)
  formData.append("image", newDoctor.image)
  dispatch(addDoctor(formData))
  toast.success("Doctor added successfully")
    setNewDoctor({
      name: '',
      speciality: '',
      email: '',
      password: '',
      phone: '',
      experience: '',
      fees: '',
      address: '',
      degree: '',
      about: '',
      image:null
    })
  }

  const handleInputChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      [e.target.name]: e.target.value,
    })
  }

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search doctors..."
            className="pl-10 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => setShowAddDoctor(true)}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <UserPlus size={20} className="mr-2" />
          Add Doctor
        </Button>
      </div>

      {showAddDoctor && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div
          className="flex items-center gap-4 mb-8 text-gray-500"
          >
            <label htmlFor="doc-img">
              <img 
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={previewUrl || uploadArea} alt="Upload Area" />
              <input type="file" id="doc-img" hidden
              accept="image/*"
              onChange={handleImageChange}
              name='image'
               />
              <p>Upload doctor picture</p>
            </label>
          </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    name="name"
                    value={newDoctor.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <Input
                    name="speciality"
                    value={newDoctor.speciality}
                    onChange={handleInputChange}
                    required
                    placeholder="Cardiologist"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={newDoctor.email}
                    onChange={handleInputChange}
                    required
                    placeholder="doctor@medcare.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={newDoctor.password}
                    onChange={handleInputChange}
                    required
                    placeholder="********"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input
                    name="phone"
                    value={newDoctor.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 555-0100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <Input
                    name="experience"
                    value={newDoctor.experience}
                    onChange={handleInputChange}
                    required
                    placeholder="10 years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee</label>
                  <Input
                    name="fees"
                    value={newDoctor.fees}
                    onChange={handleInputChange}
                    required
                    placeholder="$150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                  <Input
                    name="degree"
                    value={newDoctor.degree}
                    onChange={handleInputChange}
                    required
                    placeholder="MBBS, MD"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <Input
                    name="address"
                    value={newDoctor.address}
                    onChange={handleInputChange}
                    required
                    placeholder="123 Medical Center"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                  <textarea
                    name="about"
                    value={newDoctor.about}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description about the doctor..."
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                  Add Doctor
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddDoctor(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Specialty</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Experience</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{doctor.name}</td>
                    <td className="py-3 px-4">{doctor.specialty}</td>
                    <td className="py-3 px-4">{doctor.experience}</td>
                    <td className="py-3 px-4">{doctor.email}</td>
                    <td className="py-3 px-4">{doctor.phone}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </div>
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

export default Doctors
