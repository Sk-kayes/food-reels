import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import VideoGrid from "../../components/VideoGrid";
import BottomNavBar from "../../components/BottomNavBar";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedTab, setSelectedTab] = useState("profile");

  const navigate = useNavigate();

  const handleSaveClick = async () => {
    try {
      navigate("/saved");
    } catch (err) {
      console.error("Failed to navigate:", err);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <main className="max-w-[1100px] mx-auto px-6 py-6 pb-20 flex flex-col gap-6 bg-gray-900 min-h-screen">
      <section className="bg-gray-800 border border-gray-700 rounded-md shadow-sm p-6 px-4 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-6">
          <img
            className="w-[120px] h-[120px] md:w-24 md:h-24 sm:w-[72px] sm:h-[72px] rounded-full object-cover bg-gray-700 border-2 border-gray-600"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />

          <div className="flex flex-col items-center gap-2">
            <h1 className="text-white text-2xl font-bold" title="Business name">
              {profile?.name}
            </h1>
            <p className="text-gray-300 text-base" title="Address">
              {profile?.address}
            </p>
          </div>
        </div>

        <div
          className="flex justify-between border-t border-dashed border-gray-600 pt-6 px-2"
          role="list"
          aria-label="Stats"
        >
          <div className="flex flex-col items-center gap-2" role="listitem">
            <span className="text-[1.15rem] sm:text-base text-gray-300">
              Total Meals
            </span>
            <span className="text-2xl sm:text-xl font-bold text-white">
              {videos.length}
            </span>
          </div>
          <div className="flex flex-col items-center" role="listitem">
            <span className="text-[1.13rem] sm:text-base text-gray-300">
              Customer Served
            </span>
            <span className="text-2xl sm:text-xl font-bold text-white">
              {(() => {
                const num = Math.floor(Math.random() * 90) + 10;
                return num % 10 === 0 ? `${num}k` : `${(num / 10).toFixed(1)}k`;
              })()}
            </span>
          </div>
        </div>
      </section>

      <hr className="h-px border-none bg-gray-600" />

      <VideoGrid videos={videos} />
      <BottomNavBar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        visitStoreLink={null}
        handleSaveClick={handleSaveClick}
      />
    </main>
  );
};

export default Profile;
