import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await API.post('/auth/register', formData);
      setSuccess("Registration successful! Redirecting to login...");
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Registration failed. Email might already exist."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f7f7] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-sm border border-teal-50">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#115e59] mb-2 tracking-tight">
            Join CoachPro
          </h2>
          <p className="text-gray-400">
            Start managing your customers today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-xs font-bold text-gray-400 ml-4 mb-1 block">
              FULL NAME
            </label>
            <input
              type="text"
              placeholder="e.g. Ann lia"
              className="w-full p-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 ml-4 mb-1 block">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="name@gmail.com"
              className="w-full p-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 ml-4 mb-1 block">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#115e59] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#0d4d49] hover:shadow-lg transition-all duration-300 mt-4 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p className="text-green-600 text-sm text-center mt-2">
              {success}
            </p>
          )}

        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#115e59] font-extrabold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;

