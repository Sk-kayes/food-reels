import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import BottomNavBar from '../../components/BottomNavBar';
import { useNavigate } from 'react-router-dom';

const FoodPartners = () => {
    const [foodPartners, setFoodPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('food-partners');

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

    const changeTab = (partnerId) => {
    navigate(`/food-partner/${partnerId}`);
}

    useEffect(() => {
        const fetchFoodPartners = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/food-partner`, { withCredentials: true });
                setFoodPartners(response.data.foodPartners);
            } catch (error) {
                console.error('Failed to fetch food partners:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoodPartners();
    }, []);

    if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;

    return (
        <main className="max-w-[1100px] mx-auto px-6 py-6 pb-20 flex flex-col gap-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-white text-center mb-6">Food Partners</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodPartners.map((partner) => (
                    <div key={partner._id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4 cursor-pointer hover:bg-gray-750 transition-colors" onClick={() => changeTab(partner._id)}>

                        <div className="flex flex-col items-center space-y-3">
                            <img
                                className="w-20 h-20 rounded-full object-cover bg-gray-700 border-2 border-gray-600"
                                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&auto=format&fit=crop&q=60"
                                alt={partner.name}
                            />
                            <h2 className="text-xl font-bold text-white text-center">{partner.name}</h2>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-300">
                                <i className="ri-user-line text-indigo-400"></i>
                                <span className="text-sm">{partner.contactName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <i className="ri-phone-line text-indigo-400"></i>
                                <span className="text-sm">{partner.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <i className="ri-mail-line text-indigo-400"></i>
                                <span className="text-sm">{partner.email}</span>
                            </div>
                            <div className="flex items-start gap-2 text-gray-300">
                                <i className="ri-map-pin-line text-indigo-400 mt-1"></i>
                                <span className="text-sm">{partner.address}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <BottomNavBar
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                visitStoreLink={null}
                handleSaveClick={handleSaveClick}
            />
        </main>
    );
};

export default FoodPartners;