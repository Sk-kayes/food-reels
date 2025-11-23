import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const BottomNavBar = ({ selectedTab, setSelectedTab, visitStoreLink, handleSaveClick }) => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        setSelectedTab('home');
        navigate('/home');
    };

    const handleFoodPartnersClick = () => {
        setSelectedTab('food-partners');
        navigate('/food-partners');
    };

    const handleProfileClick = () => {
        setSelectedTab('profile');
        handleSaveClick();
    };

    const handleLogout = async () => {
        try {
            await axios.get(`${API_BASE_URL}/api/auth/user/logout`, {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            navigate('/');
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center text-white text-xl rounded-t-2xl z-10 bg-white/10 backdrop-blur-md border-t border-white/20 px-4 py-3">
            <i
                className={`cursor-pointer transition-colors ${selectedTab === 'home' ? 'ri-home-fill text-indigo-400' : 'ri-home-line text-white'}`}
                onClick={handleHomeClick}
            ></i>

            <i
                className={`cursor-pointer transition-colors ${selectedTab === 'food-partners' ? 'ri-restaurant-fill text-indigo-400' : 'ri-restaurant-line text-white'}`}
                onClick={handleFoodPartnersClick}
            ></i>

            {visitStoreLink && (
                <Link
                    className="text-white rounded-full font-bold text-sm py-2 px-4 bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    to={visitStoreLink}
                >
                    Visit Store
                </Link>
            )}

            <i
                className={`cursor-pointer transition-colors ${selectedTab === 'saved' ? 'ri-shield-user-fill text-indigo-400' : 'ri-shield-user-line text-white'}`}
                onClick={handleProfileClick}
            ></i>

            <i
                className={`cursor-pointer transition-colors text-red-400 hover:text-red-300`}
                onClick={handleLogout}
            >
                <i className="ri-logout-box-line"></i>
            </i>
        </div>
    );
};

export default BottomNavBar;