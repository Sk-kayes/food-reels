import React, { useState } from "react";
import Input from "../../components/Input";
import RegisterSwitch from "../../components/RegisterSwitch";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

export default function FoodPartnerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contactName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/food-partner/register`,
      formData,
      { withCredentials: true }
    );
    console.log(response.data);
    setFormData({
      name: "",
      contactName: "",
      phone: "",
      address: "",
      email: "",
      password: "",
    });
    navigate("/create-food");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-6 sm:py-8">
  <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-gray-800 rounded-2xl shadow-2xl ring-1 ring-gray-700 p-6 sm:p-8">
    <div className="text-center space-y-3 sm:space-y-4">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-100">
        Create Account as
      </h1>

      <RegisterSwitch />

      <p className="text-sm sm:text-base text-gray-400">
        Tell us about your kitchen
      </p>
    </div>

    <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={submitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="name"
          label="Business Name"
          placeholder="My Kitchen"
          value={formData.name}
          onChange={onChangeHandler}
        />
        <Input
          id="contactName"
          label="Contact Person"
          placeholder="Contact full name"
          value={formData.contactName}
          onChange={onChangeHandler}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="address"
          label="Address"
          placeholder="Street, City, State"
          value={formData.address}
          onChange={onChangeHandler}
        />
        <Input
          id="phone"
          label="Phone"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={onChangeHandler}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="partner@example.com"
          value={formData.email}
          onChange={onChangeHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={onChangeHandler}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 sm:py-3.5 rounded-lg bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
      >
        Create account
      </button>

      <p className="text-center text-sm sm:text-base text-gray-400">
        Already have an account?{" "}
        <Link
          to="/food-partner/login"
          className="text-green-500 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  </div>
</div>

  );
}