import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnrLogin";
import Home from "../pages/general/Home";
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";
import Saved from "../pages/general/Saved";
import Common from "../pages/general/Common";
import VideoPlayer from "../pages/general/VideoPlayer";
import FoodPartners from "../pages/general/FoodPartners";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Common />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/food-partners" element={<FoodPartners />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;