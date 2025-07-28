'use client'
import { Link } from 'lucide-react'
import React, { useState } from 'react'

export default function ForgetPassword() {
    const [email,setEmail] = useState('');
    const [status,setStatus] = useState('idle')
    const [message,setMesage] = useState('')
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">

            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">

                <div className="flex flex-col lg:flex-row">
                     <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full"></div>
              <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white/10 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              {/* Logo/Icon */}
              <div className="mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight">
                  Luxus Real Estate
                </h1>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Step into Luxury Living – Your gateway to premium properties and exclusive real estate opportunities.
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span className="text-blue-100">Exclusive Property Listings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span className="text-blue-100">Professional Real Estate Services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                  <span className="text-blue-100">Luxury Market Insights</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 p-8 lg:p-12">
    <div className="bg-gray-50 min-h-full">
      <div className="min-h-[400px]  flex items-center justify-center p-4">
        <div className="max-w-[480px] w-full bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-primary mb-6">
            Forgot Your Password?
          </h2>
          <p variant="bodyRegular" className="text-center">
            No worries! Just provide your email, and we’ll help you set up a new password.
          </p>
          <form  className="space-y-6">
            <div>
              <div className="mt-1 relative mb-2">
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={'Email Address'}
                />
              </div>
            </div>

            {status !== 'idle' && (
              <div
                className={`rounded-md p-4 ${status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <p
                  className={`text-sm ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}
                >
                  {message}
                </p>
              </div>
            )}
            <Link href='/user/login' className=" mt-2 ">
              Back to Login?
            </Link>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                'Request Reset Link'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
                </div>
                </div>
            </div>
                  </div>
  )
}
