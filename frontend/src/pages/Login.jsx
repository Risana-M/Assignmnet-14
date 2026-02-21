import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);

      console.log("Login Response:", response.data);

      //  Handle both possible backend structures
      const token = response.data.token;
      const user = response.data.user || response.data.result;

      if (!token) {
        throw new Error("Token not received from server");
      }

      // Save to localStorage
    localStorage.setItem("token", token);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7f7] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-sm border border-teal-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#115e59] mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-400">
            Enter your details to access your dashboard
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 ml-4 mb-1 block">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 ml-4 mb-1 block">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            />
          </div>
 
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#115e59] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#0d4d49] hover:shadow-lg transition-all duration-300 mt-4"
          > 
            {loading ? "Signing In..." : "Sign In"}
           
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#115e59] font-extrabold hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

