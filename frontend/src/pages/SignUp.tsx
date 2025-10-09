import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logo from '../assets/logo_option_2.png'
import { useDispatch } from 'react-redux'
import type{ AppDispatch } from '@/redux/store'
import { registerUser } from '@/redux/slices/authSlice'
import { toast } from 'react-toastify'

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    dispatch(registerUser({name:formData.fullName,email:formData.email,password:formData.password }))
    .then(() => {
      toast.success("Registration successful! Please log in.");
    })

    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="MedCare Logo" className="h-16 w-auto" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Create Account</h1>
          <p className="text-gray-600 text-center mb-8">Sign up to get started</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex items-start">
              <input type="checkbox" required className="mt-1 mr-2" />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
              onClick={() =>{ navigate('/login');scrollTo(0,0)}}
               className="text-primary hover:underline font-medium">
                Login
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-gray-600 hover:text-primary text-sm">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
