'use client'
import React, { useEffect, useState } from 'react'
import EditProfile from './editProfile';
import EditPassword from './editPassword';
import apiClient from '@/app/lib/api-client';

export default function ProfileComponent() {
    const [selectedTabs, setSelectedTabs] = useState('Edit Profile');
    const [data, setData] = useState(null);

    const tabs = ['Edit Profile', 'Edit Password'];

    // Move components inside the component to access current data
    const components = {
        'Edit Profile': <EditProfile profile={data} />,
        'Edit Password': <EditPassword />
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get('/v1/user/user-profile');
                setData(response.data.data.user);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <div>
                <div className="tabs">
                    {tabs.map(tab => (
                        <button 
                            key={tab} 
                            onClick={() => setSelectedTabs(tab)} 
                            className={`${selectedTabs === tab ? 'border-primary bg-primary text-white' : 'text-black bg-card'} w-full h-[45px] px-4 rounded-xl border text-sm`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="content">
                    {components[selectedTabs]}
                </div>
            </div>
        </div>
    )
}
