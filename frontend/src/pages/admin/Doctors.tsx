import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, UserPlus, Edit, Trash2 } from 'lucide-react'
import uploadArea from '@/assets/upload_area.svg'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { addDoctor, changeAvailability, fetchDoctor } from '@/redux/slices/doctorSlice'
import { toast } from 'react-toastify'
import MyLoader from '@/components/Global/MyLoader'
import { updateDoctorAvailability } from '@/redux/slices/adminSlice'

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
  const {loading,doctors}=useSelector((state:RootState) => state.admin)


   const handleImageChange=(e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     setNewDoctor({
       ...newDoctor,
       image: file
     });
   }
  const handleAddDoctor = async(e) => {
    e.preventDefault()
    
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
  try {
    await dispatch(addDoctor(formData)).unwrap();
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
    });
    setShowAddDoctor(false)
    
  } catch (error) {
    toast.error(error || "Failed to add doctor ")
  }
  }

  const handleInputChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      [e.target.name]: e.target.value,
    })
  }

 const filteredDoctors = (doctors || []).filter((doctor) =>
  (doctor.user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
  (doctor.speciality?.toLowerCase() || "").includes(searchTerm.toLowerCase())
);
useEffect(() => {
  dispatch(fetchDoctor());
 
}, [dispatch])


if (loading) {
  return <MyLoader />
}


  return (
    <>
      <div className="my-6 flex flex-col sm:flex-row  gap-4 sm:items-center ">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search doctors..."
            className="pl-10 w-full sm:w-64"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">speciality</label>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredDoctors.map((doctor) => (
        <div key={doctor._id} className="bg-white shadow rounded-lg overflow-hidden cursor-pointer">
          {/* Doctor image */}
          <img
            src={doctor.user.image || uploadArea}
            alt={doctor.user.name}
            className="w-full h-40 object-contain hover:scale-110 transition-all duration-300"
          />

          {/* Doctor info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold">{doctor.user.name}</h3>
            <p className="text-gray-500">{doctor.speciality}</p>
            <p className="text-sm text-gray-400">Experience: {doctor.experience}</p>
          {/*Availability */}
           <div className="mt-2 flex items-center space-x-2">
          <input
            type="checkbox"
            id={`available-${doctor._id}`}
            checked={doctor.available} // should come from your doctor state
            onChange={async(e) => {
              const isAvailable=e.target.checked;
              dispatch(updateDoctorAvailability({id:doctor._id,available:isAvailable}));
              try {
                await dispatch(changeAvailability({id:doctor._id,available:isAvailable})).unwrap();
                toast.success(`Doctor is now ${isAvailable ? "available" : "unavailable"}`);
              } catch (error) {
                toast.error(error || "Failed to change availability");
              }
            }}
            className="w-4 h-4 rounded border-gray-300"
          />
          <label htmlFor={`available-${doctor._id}`} className="text-gray-700 text-sm">
            Available
          </label>
        </div>
            {/* Actions */}
            <div className="mt-3 flex space-x-2">
              <button className="flex-1 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 flex items-center justify-center gap-1">
                <Edit size={16} /> Edit
              </button>
              <button className="flex-1 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 flex items-center justify-center gap-1">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

    </>
  )
}

export default Doctors
