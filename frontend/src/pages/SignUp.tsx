/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, Link } from 'react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logo from '../assets/logo_option_2.png'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { registerUser } from '@/redux/slices/authSlice'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ✅ Validation schema
const signUpSchema = z
  .object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      message: 'You must accept the Terms and Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SignUpFormData = z.infer<typeof signUpSchema>

const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // ✅ Hook form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await dispatch(
        registerUser({
          name: data.fullName,
          email: data.email,
          password: data.password,
        })
      ).unwrap()

      toast.success('Registration successful! Please log in.')
      reset()
      navigate('/login')
    } catch (error: any) {
      toast.error(error.message || 'Registration failed!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-lg rounded-2xl border border-gray-100">
        <CardContent className="p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="MedCare Logo" className="h-14 sm:h-16 w-auto" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 text-center mb-8 text-sm">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Create a password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                {...register('terms')}
                className="mt-1 mr-2 accent-teal-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-teal-600 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-teal-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-lg shadow-sm transition-all duration-200"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => {
                  navigate('/login')
                  scrollTo(0, 0)
                }}
                className="text-teal-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-gray-500 hover:text-teal-600 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
