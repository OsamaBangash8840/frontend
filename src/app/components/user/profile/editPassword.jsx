'use client'
import React, { useState } from 'react';
import apiClient from '@/app/lib/api-client';

// You'll need to implement these toast functions or replace with your preferred notification system
const showErrorToast = (message) => {
    console.error(message);
    // Replace with your toast implementation
};

const showSuccessToast = (message) => {
    console.log(message);
    // Replace with your toast implementation
};

export default function EditPassword() {
    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword } = form;

        if (!oldPassword || !newPassword) {
            showErrorToast("All fields are required");
            return;
        }

        try {
            setLoading(true);
            await apiClient.patch('/v1/user/change-password', { oldPassword, newPassword });
            showSuccessToast("Password changed successfully");
            setForm({ oldPassword: '', newPassword: '' });
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            showErrorToast(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Old Password</label>
                <input
                    type="password"
                    name="oldPassword"
                    value={form.oldPassword}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Changing...' : 'Change Password'}
            </button>
        </form>
    );
}
