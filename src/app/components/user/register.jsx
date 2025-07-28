'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import GoogleBtn from '../googleBtn';
import apiClient from '@/app/lib/api-client';

const Register = () => {
  const [fullname, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await apiClient.post('/v1/user/signup', {
        fullName: fullname,
        username,
        email,
        password,
        confirmPassword: confirmpassword,
      });

      if (res.data) {
        router.push('/user/login');
      }
    } catch (err) {
      console.error(err);
      setErrors({
        general: err.response?.data?.message || 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white/10 rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                    <path
                      d="M8 11l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight">Luxus Real Estate</h1>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Step into Luxury Living – Sign Up with Luxus Real Estate Today!
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span className="text-blue-100">Premium Onboarding Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span className="text-blue-100">Verified User Community</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span className="text-blue-100">Secure Real Estate Platform</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Register Form */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join Luxus to access premium real estate listings.</p>
              </div>

              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label> */}
                  <input
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">Username</label> */}
                  <input
                    name="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label> */}
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">Password</label> */}
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  {/* <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label> */}
                  <input
                    name="confirmpassword"
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </button>

                  {/* Google Login */}
                <div className="flex justify-center">
                  <GoogleBtn />
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/user/login" className="text-blue-600 hover:text-blue-500 font-medium">
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
