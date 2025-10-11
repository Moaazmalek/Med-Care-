/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Calendar as CalendarIcon } from "lucide-react";
import uploadArea from "@/assets/upload_area.svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type{ AppDispatch,  RootState } from "@/redux/store";
import MyLoader from "@/components/Global/MyLoader";
import { updateDoctorProfile } from "@/redux/slices/doctorSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns";
import { PopoverTrigger } from "@/components/ui/popover";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"
const DoctorProfile = () => {
  const dispatch=useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(uploadArea);
  const { doctor, loading } = useSelector((state: RootState) => state.doctor);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profileImage, setProfileImage] = useState<File | null>(null);

  // Mocked doctor + user data
  const [profileData, setProfileData] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  gender: "",
  speciality: "",
  experience: "",
  fees: 0,
  degree: "",
  about: "",
});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  try {
    const formData = new FormData();
    if(profileImage) formData.append("image", profileImage);

    formData.append("name", profileData.name);
    formData.append("phone", profileData.phone);
    formData.append("address", profileData.address || "");
    formData.append("dob", profileData.dateOfBirth || "");
    formData.append("gender", profileData.gender || "not specified");
    formData.append("speciality", profileData.speciality);
    formData.append("experience", profileData.experience);
    formData.append("fees", String(profileData.fees));
    formData.append("degree", profileData.degree);
    formData.append("about", profileData.about);

  

    await dispatch(updateDoctorProfile(formData));
  } catch {
    toast.error("Unexpected error occurred");
  } finally {
    setIsEditing(false);
  }
};


 useEffect(() => {
  if (doctor && doctor.user) {
    setProfileData({
      name: doctor.user.name || "",
      email: doctor.user.email || "",
      phone: doctor.user.phone || "",
      address: doctor.user.address || "",
      dateOfBirth: doctor.user.dob ? doctor.user.dob.split("T")[0] : "",
      gender: doctor.user.gender || "not specified",
      speciality: doctor.speciality || "",
      experience: doctor.experience || "",
      fees: doctor.fees || 0,
      degree: doctor.degree || "",
      about: doctor.about || "",
    });
    setPreviewImage(doctor.user.image || uploadArea);
  }
}, [doctor]);

  if (loading) {
    return <MyLoader />;
  }
  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-3xl">
        <CardContent className="p-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 mb-4 relative">
              <img
                src={previewImage || uploadArea}
                alt="Doctor"
                className="w-full h-full object-cover rounded-full border border-gray-300"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute bottom-0 right-0 w-full h-full opacity-0 cursor-pointer"
                />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {profileData.name}
            </h2>
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
                    className={!isEditing ? "bg-gray-50" : ""}
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
                    className="bg-gray-50"
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
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>

             <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Date of Birth
  </label>

  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={`w-full justify-start text-left font-normal ${
          !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        }`}
        disabled={!isEditing}
      >
        <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
        {profileData.dateOfBirth ? (
          format(new Date(profileData.dateOfBirth), "dd/MM/yyyy")
        ) : (
          <span>Select date</span>
        )}
      </Button>
    </PopoverTrigger>

    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={profileData.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined}
        onSelect={(date) => {
          if (date) {
            handleChange({
              target: {
                name: "dateOfBirth",
                value: date.toISOString().split("T")[0],
              },
            })
          }
        }}
        disabled={!isEditing}
      />
    </PopoverContent>
  </Popover>
</div>

              <div>
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
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>

           <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Gender
  </label>

  <Select
    value={profileData.gender}
    onValueChange={(value) => handleChange({ target: { name: "gender", value } })}
    disabled={!isEditing}
  >
    <SelectTrigger
      className={`w-full px-3 py-2 border rounded-md ${
        !isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white text-gray-900"
      }`}
    >
      <SelectValue placeholder="Select gender" />
    </SelectTrigger>

    <SelectContent className="max-h-48">
      <SelectItem value="male">Male</SelectItem>
      <SelectItem value="female">Female</SelectItem>
      <SelectItem value="not specified">Not Specified</SelectItem>
    </SelectContent>
  </Select>
</div>

              {/* Doctor Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speciality
                </label>
                <Input
                  type="text"
                  name="speciality"
                  value={profileData.speciality}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <Input
                  type="text"
                  name="experience"
                  value={profileData.experience}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fees
                </label>
                <Input
                  type="text"
                  name="fees"
                  value={profileData.fees}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree
                </label>
                <Input
                  type="text"
                  name="degree"
                  value={profileData.degree}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About
                </label>
                <textarea
                  name="about"
                  value={profileData.about}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    !isEditing ? "bg-gray-50" : ""
                  }`}
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-chart-2 hover:bg-chart-2/90 text-white"
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-chart-2 hover:bg-chart-2/90 text-white"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;
