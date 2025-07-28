'use client'

import apiClient from '@/app/lib/api-client'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { showErrorToast, showSuccessToast } from '../common/toaster'

export default function VerifyEmail() {
  const searchParams = useSearchParams()
  const token = searchParams.get('code')
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error')
        setError('Invalid or expired verification link.')
        return
      }
      setStatus('verifying')
      try {
        await apiClient.post('/v1/user/verify-email', { code:token })
        setStatus('success')
        showSuccessToast("Success! Your Email is Verified")
      } catch (error) {
        console.error('Error Verifying Email', error)
        setStatus('error')
        setError('Verification failed. Please try again later.')
        showErrorToast('Error! Verifying Email')
      }
    }
    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
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
                    <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight">
                  Luxus Real Estate
                </h1>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Step into Luxury Living – Your gateway to premium properties and exclusive real estate opportunities.
                </p>
              </div>
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

          {/* Right Section */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
              {status === 'verifying' && (
                <div>
                  <Loader2 className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
                  <h2 className="mt-4 text-xl font-semibold">Verifying your email...</h2>
                  <p className="mt-2 text-gray-600">This will only take a moment.</p>
                </div>
              )}

              {status === 'success' && (
                <div>
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                  <h2 className="mt-4 text-xl font-semibold text-green-900">
                    Email verified successfully!
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Your email has been verified. You can now log in to your account.
                  </p>
                  <Link
                    href="/user/login"
                    className="mt-6 inline-block px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Continue to Login
                  </Link>
                </div>
              )}

              {status === 'error' && (
                <div>
                  <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                  <h2 className="mt-4 text-xl font-semibold text-red-900">Verification failed</h2>
                  <p className="mt-2 text-red-600">{error}</p>
                  <Link
                    href="/resend-email"
                    className="mt-6 inline-block px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Resend Verification Email
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
