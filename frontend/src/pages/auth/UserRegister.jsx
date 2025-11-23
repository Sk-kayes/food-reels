import React, { useState } from "react";
import Input from "../../components/Input";
import RegisterSwitch from "../../components/RegisterSwitch";
import { API_BASE_URL } from "../../config/api";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/user/register`,
      formData,
      { withCredentials: true }
    );
    console.log(response.data);
    setFormData({
      fullname: "",
      email: "",
      password: "",
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-6 sm:py-8">
  <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-gray-800 rounded-2xl shadow-2xl ring-1 ring-gray-700 p-6 sm:p-8">
    <div className="text-center space-y-3 sm:space-y-4">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-100">
        Create Account as
      </h1>

      <RegisterSwitch />

      <p className="text-sm sm:text-base text-gray-400">
        Register as a user
      </p>
    </div>

    <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={submitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="fullname"
          label="Full Name"
          placeholder="John Doe"
          value={formData.fullname}
          onChange={onChangeHandler}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={onChangeHandler}
        />
      </div>

      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Choose a password"
        value={formData.password}
        onChange={onChangeHandler}
      />

      <button
        type="submit"
        className="w-full py-3 sm:py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
      >
        Register
      </button>

      <p className="text-center text-sm sm:text-base text-gray-400">
        Already have an account?{" "}
        <Link
          to="/user/login"
          className="text-indigo-400 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  </div>
</div>

  );
}
