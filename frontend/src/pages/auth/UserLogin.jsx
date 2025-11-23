import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { API_BASE_URL } from "../../config/api";

export default function UserLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/user/login`,
      formData,
      { withCredentials: true }
    );
    console.log(response.data);
    setFormData({
      email: "",
      password: "",
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
  <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-6 ring-1 ring-gray-700">
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-gray-100">Welcome back</h2>
      <p className="text-sm text-gray-400">Sign in to your account</p>
    </div>

    <form className="space-y-5" onSubmit={submitHandler}>
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={onChangeHandler}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={onChangeHandler}
      />

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-indigo-600 text-base text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors active:bg-indigo-800"
      >
        Sign in
      </button>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          className="text-indigo-400 hover:underline font-medium"
          to="/user/register"
        >
          Sign up
        </Link>
      </p>
    </form>
  </div>
</div>
  );
}