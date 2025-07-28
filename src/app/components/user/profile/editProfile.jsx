'use client'
import apiClient from '@/app/lib/api-client';
import React, { useState, useEffect } from 'react';

export default function EditProfile({ profile }) {
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        username: '',
        gender: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Update profileData when profile prop changes
    useEffect(() => {
        if (profile) {
            setProfileData({
                fullName: profile.fullName || '',
                email: profile.email || '',
                username: profile.username || '',
                gender: profile.gender || ''
            });
        }
    }, [profile]);

    if (!profile) {
        return <p>Loading...</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        setMessage('');
        try {
            const { data: response } = await apiClient.patch('/v1/user/update-account', profileData);
            setMessage('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            setMessage('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border mb-2 rounded"
            />

            <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border mb-2 rounded"
            />

            <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 border mb-2 rounded"
            />

            <input
                type="text"
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                placeholder="Gender"
                className="w-full p-2 border mb-2 rounded"
            />

            <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Saving...' : 'Save Changes'}
            </button>

            {message && (
                <p className={`mt-3 text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}