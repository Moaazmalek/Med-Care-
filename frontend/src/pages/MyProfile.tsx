import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import uploadArea from '@/assets/upload_area.svg'
import { fetchCurrentUser } from '@/redux/slices/authSlice'
import MyLoader from '@/components/Global/MyLoader'
import { updateUserProfile } from '@/redux/slices/authSlice'

const Profile = () => {
  const { user ,loading} = useSelector((state:RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const [isEditing, setIsEditing] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileData, setProfileData] = useState({
    name: "",
    email:"",
    phone: "",
    address: "",
    dateOfBirth:"",
    gender:""
  })
  useEffect(() => {
    if(!user) {
      dispatch(fetchCurrentUser())
    }
  },[user,dispatch])
    useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
         dateOfBirth: user.dob ? user.dob.split('T')[0] : '',
        gender: user.gender || '',
      })
      setPreviewImage(user.image || '')
    }
  }, [user])



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      const file=e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));// to show immediate preview
    }
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
   try {
  const formData=new FormData();
  formData.append("name",profileData.name);
  formData.append("email",profileData.email);
  formData.append("phone",profileData.phone);
  formData.append("address",profileData.address || "");
  formData.append("dob",profileData.dateOfBirth || "");
  formData.append("gender",profileData.gender || "");
  if(profileImage){
    formData.append("image",profileImage);
  }
  dispatch(updateUserProfile(formData));
toast.success("Profile updated successfully!");
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error:any) {
    console.error("Error updating profile:", error);
    toast.error("Failed to update profile. Please try again.");
   }
  }
useEffect(() => {
  return () => {
    if (previewImage) URL.revokeObjectURL(previewImage);
  };
}, [previewImage]);

if(loading){
  return <MyLoader/>
}
  return (
    <div >
      
      <div className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1> */}

          <Card>
            <CardContent className="p-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32  mb-4 relative">
                  <img 
                    src={previewImage || uploadArea}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border border-gray-300"
                  />
                  {isEditing && (
                    <input 
                    type="file"
                    accept='image/*'
                    onChange={handleImageChange}
                    className='absolute bottom-0 right-0 w-full h-full opacity-0 cursor-pointer'
                    />
                  )}
          
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.email}</p>
              </div>

              {/* Profile Information */}
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="flex items-center">
                      <User className="mr-2 text-gray-400" size={20} />
                      <Input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="flex items-center">
                      <Mail className="mr-2 text-gray-400" size={20} />
                      <Input
                        type="email"
                        name="email"

                        value={profileData.email}
                        onChange={handleChange}
                        disabled={true}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <div className="flex items-center">
                      <Phone className="mr-2 text-gray-400" size={20} />
                      <Input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <div className="flex items-center">
                      <Calendar className="mr-2 text-gray-400" size={20} />
                      <Input
                        type="date"
                        name="dateOfBirth"
                        value={profileData.dateOfBirth}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <div className="flex items-center">
                      <MapPin className="mr-2 text-gray-400" size={20} />
                      <Input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${
                        !isEditing ? 'bg-gray-100' : 'bg-white text-gray-900 '
                      }`}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="not specified">Not Specified</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className='cursor-pointer'
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-chart-2 hover:bg-chart-2/90 cursor-pointer text-white"
                      >
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-chart-2 hover:bg-chart-2/90 cursor-pointer text-white"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  )
}

export default Profile
