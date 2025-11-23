import React from 'react';
import { Link } from 'react-router-dom';

const Common = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col">
            {/* Hero Section */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Logo/Brand */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-6">
                            <i className="ri-restaurant-line text-3xl text-white"></i>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Taste<span className="text-indigo-400">Tube</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Discover amazing food through short videos. Save your favorites, explore local restaurants, and get inspired by delicious content.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-6 my-12">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-3">
                            <i className="ri-video-line text-3xl text-indigo-400"></i>
                            <h3 className="text-lg font-semibold text-white">Food Videos</h3>
                            <p className="text-gray-400 text-sm">Watch short, engaging videos of delicious food from local restaurants</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-3">
                            <i className="ri-bookmark-line text-3xl text-indigo-400"></i>
                            <h3 className="text-lg font-semibold text-white">Save Favorites</h3>
                            <p className="text-gray-400 text-sm">Bookmark your favorite food videos and restaurants for later</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-3">
                            <i className="ri-store-line text-3xl text-indigo-400"></i>
                            <h3 className="text-lg font-semibold text-white">Visit Stores</h3>
                            <p className="text-gray-400 text-sm">Discover and visit amazing food partners in your area</p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/user/login"
                                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Sign In as User
                            </Link>
                            <Link
                                to="/user/register"
                                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-200 backdrop-blur-sm"
                            >
                                Create Account
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-500 text-sm border-t border-white/10">
                <p>&copy; 2025 FoodReels. Discover food through videos.</p>
            </footer>
        </div>
    );
};

export default Common;
