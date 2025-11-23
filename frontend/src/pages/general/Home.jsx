import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";
import BottomNavBar from '../../components/BottomNavBar';

const Home = () => {

    const [foodVideos, setFoodVideos] = useState([]);
    const [selectedTab, setSelectedTab] = useState('home');
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const containerRef = useRef(null);

    const navigate = useNavigate();

    const handleSaveClick = async () => {
        try {
            await axios.get(`${API_BASE_URL}/api/food/saved`, { withCredentials: true });
            setSelectedTab('saved');
            navigate('/saved');
        } catch (err) {
            console.error('Failed to save:', err);
        }
    };

    async function saveVideo(item) {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/food/save`, { foodId: item._id }, { withCredentials: true });

            setFoodVideos((prev) => prev.map((v) =>
                v._id === item._id
                    ? { ...v, saveCount: response.data.savesCount, isSaved: response.data.save }
                    : v
            ));
        } catch (err) {
            console.error('Failed to save video:', err);
        } finally {
            setIsLoading(false);
        }
    }

    async function likeVideo(item) {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/food/like`, { foodId: item._id }, { withCredentials: true });

            setFoodVideos((prev) => prev.map((v) =>
                v._id === item._id
                    ? { ...v, likeCount: response.data.like ? v.likeCount + 1 : v.likeCount - 1, isLiked: response.data.like }
                    : v
            ));
        } catch (err) {
            console.error('Failed to like video:', err);
        } finally {
            setIsLoading(false);
        }
    }

    const truncateText = (text, maxLength = 100) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${API_BASE_URL}/api/food?page=${page}&limit=2`, { withCredentials: true })
            .then(res => {
                const newVideos = res.data.food || res.data;
                setFoodVideos(prev => page === 1 ? newVideos : [...prev, ...newVideos]);
                setHasMore(res.data.hasMore);
            })
            .catch(err => {
                console.error('Failed to fetch videos:', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const scrollTop = containerRef.current.scrollTop;
                const videoHeight = window.innerHeight;
                const index = Math.round(scrollTop / videoHeight);
                setCurrentVideoIndex(index);

                // Load 2 more videos when user reaches near the end of loaded videos
                if (index >= foodVideos.length - 2 && hasMore && !isLoading) {
                    setPage(prev => prev + 1);
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [foodVideos.length, hasMore, isLoading]);

    return (
        <div ref={containerRef} className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black relative">
            {foodVideos.map((item) => (
                <div
                    key={item._id}
                    className="h-screen w-full flex items-center justify-center snap-start relative"
                >
                    <video
                        src={item.video}
                        className="h-full w-full object-cover sm:h-full sm:w-auto sm:max-w-sm md:max-w-md lg:max-w-lg sm:rounded-lg shadow-lg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />

                    <div className="absolute right-4 bottom-[300px] flex flex-col items-center gap-5 text-white text-2xl">
                        <div className="flex flex-col items-center gap-1">
                            <i
                                className={`cursor-pointer ${item.isLiked ? 'ri-heart-fill text-red-500' : 'ri-heart-line'}`}
                                onClick={() => likeVideo(item)}
                            ></i>
                            <span className="text-xs">{item.likeCount || 0}</span>
                        </div>
                        <i
                            className={`${item.isSaved ? 'ri-bookmark-fill text-indigo-400' : 'ri-bookmark-line'}`}
                            onClick={() => saveVideo(item)}
                        ></i>
                    </div>

                    <div className="absolute bottom-[140px] left-4 flex flex-col gap-3 text-white w-[90%]">
                        <p
                            className="text-white drop-shadow-lg text-sm sm:text-base leading-tight line-clamp-3 font-medium"
                            title={item.description}
                        >
                            {truncateText(`${item.description}`)}
                        </p>
                    </div>

                </div>
            ))}

            <BottomNavBar
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                visitStoreLink={"/food-partner/" + foodVideos[currentVideoIndex]?.foodPartner}
                handleSaveClick={handleSaveClick}
            />

        </div>

    );
};

export default Home;