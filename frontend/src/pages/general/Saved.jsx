import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from "../../config/api";
import { fetchCurrentUser } from '../../store/userStore';
import VideoGrid from '../../components/VideoGrid';
import BottomNavBar from '../../components/BottomNavBar';

const Saved = () => {
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedTab, setSelectedTab] = useState('saved');

    const fetchSavedVideos = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/food/saved`, { withCredentials: true });
            setVideos(response.data.savedFood);
        } catch (error) {
            console.error('Failed to fetch saved videos:', error);
        }
    };

    const handleSaveClick = async () => {
    try {
        setSelectedTab('saved');
    } catch (err) {
        console.error('Failed to navigate:', err);
    }
};


    const loadCurrentUser = async () => {
        try {
            const userData = await fetchCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Failed to load user:', error);
        }
    };

    useEffect(() => {
        fetchSavedVideos();
        loadCurrentUser();
    }, []);

    return (
        <main className="max-w-[1100px] mx-auto px-6 py-6 pb-18 flex flex-col gap-6 bg-gray-900 min-h-screen">
            {user && (
                <section className="bg-gray-800 border border-gray-700 rounded-md shadow-sm p-6 flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-6">
                        <img
                            className="w-[120px] h-[120px] md:w-24 md:h-24 sm:w-[72px] sm:h-[72px] rounded-full object-cover bg-gray-700 border-2 border-gray-600"
                            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />

                        <div className="flex flex-col items-center">
                            <h1 className="text-white text-2xl font-bold" title="User name">
                                {user.fullname}
                            </h1>
                            <p className="text-gray-300 text-base" title="Email">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:gap-4 border-t border-dashed border-gray-600 pt-6" role="list" aria-label="Stats">
                        <div className="grid grid-rows-[auto_auto] justify-items-center gap-2" role="listitem">
                            <span className="text-[1.15rem] sm:text-base text-gray-400">saved videos</span>
                            <span className="text-2xl sm:text-xl font-extrabold text-white">{videos.length}</span>
                        </div>
                        <div className="grid grid-rows-[auto_auto] justify-items-center gap-2" role="listitem">
                            <span className="text-[1.15rem] sm:text-base text-gray-400">member since</span>
                            <span className="text-2xl sm:text-xl font-extrabold text-white">{new Date(user.createdAt).getFullYear()}</span>
                        </div>
                    </div>
                </section>
            )}

            <hr className="h-px border-none bg-gray-600" />
            <VideoGrid videos={videos} />
            <BottomNavBar 
    selectedTab={selectedTab}
    setSelectedTab={setSelectedTab}
    visitStoreLink={null}
    handleSaveClick={handleSaveClick}
/>

        </main>
    )
}

export default Saved