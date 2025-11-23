import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const VideoPlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchVideo = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/food/${id}`, { withCredentials: true });
            setVideo(response.data.foodItem);
        } catch (error) {
            console.error('Failed to fetch video:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchVideo();
}, [id]);

    if (loading) return <div className="h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    if (!video) return <div className="h-screen bg-black flex items-center justify-center text-white">Video not found</div>;

    return (
        <div className="h-screen w-screen bg-black relative">
            <button 
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 z-10 text-white text-2xl bg-black/50 rounded-full p-2"
            >
                <i className="ri-arrow-left-line"></i>
            </button>
            
            <video
                src={video.video}
                className="h-full w-full object-contain"
                controls
                autoPlay
                playsInline
            />
            
            <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-medium">{video.description}</p>
            </div>
        </div>
    );
};

export default VideoPlayer;