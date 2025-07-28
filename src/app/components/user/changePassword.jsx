'use client'
import React, { useState } from 'react'

export default function changePassword() {
    const [newPassword,setNewPassword] = useState('')
    const [oldPassword,setOldPassword] = useState('')
    const [error,setError] = useState('')
  return (
    <div>
         <div className="bg-gray-50">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-[24px] semi-bold text-center text-blue-700 mb-4">
          Set a New Password for Your Account
        </h2>
        <p variant="bodyRegular" className="text-center mb-6">
          Create a new password to secure your account.
        </p>
        <form  className="space-y-6">
          <div>
            <div className="mt-1">
              <input
                type="password"
                required
                className="block w-full shadow-sm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                />
                 <input
                type="password"
                required
                className="block w-full shadow-sm"
                value={oldPasswordPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter new password"
                />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}
