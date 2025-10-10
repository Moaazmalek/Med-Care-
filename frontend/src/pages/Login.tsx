import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import logo from "../assets/logo_option_2.png"
import type { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { loginUser } from "@/redux/slices/authSlice"

// ✅ Backend-like Zod schema
const emailValidator = z
  .string()
  .email({ message: "Please enter a valid email address" })

const loginSchema = z.object({
  email: emailValidator,
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" })
    .max(100),
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // ✅ React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // ✅ Submit handler
  const onSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="MedCare Logo" className="h-16 w-auto" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
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
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-chart-2/90 hover:bg-chart-2 cursor-pointer text-white"
            >
              Login
            </Button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  navigate("/signup")
                  scrollTo(0, 0)
                }}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Back to Home */}
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

export default Login
