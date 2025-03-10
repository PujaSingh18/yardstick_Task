'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear errors when user types
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { username: '', password: '' };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Logging in:', formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="bg-gradient-to-r from-black to-purple-700 p-8 rounded-xl shadow-xl w-96 border border-purple-500 relative transform transition duration-300 hover:scale-105"
        style={{ boxShadow: '0px 0px 25px rgba(128,0,128,0.6)' }}
      >
        <h2 className="text-white text-3xl font-bold text-center mb-6 animate-pulse">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-2">Username</label>
            <div className="relative">
              <input 
                type="text"
                name="username"
                className={`w-full p-2 pl-10 bg-gray-900 text-white rounded-lg border ${
                  errors.username ? 'border-red-500' : 'border-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                value={formData.username}
                onChange={handleChange}
              />
              <span className="absolute left-3 top-2 text-gray-400">👤</span>
            </div>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="text-white block mb-2">Password</label>
            <div className="relative">
              <input 
                type="password"
                name="password"
                className={`w-full p-2 pl-10 bg-gray-900 text-white rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-purple-400`}
                value={formData.password}
                onChange={handleChange}
              />
              <span className="absolute left-3 top-2 text-gray-400">🔒</span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:opacity-90 transition transform hover:scale-105"
          >
            Login
          </button>
        </form>
        
        <p className="text-gray-400 text-center mt-4">
          Don't have an account? <Link href="/signup" className="text-purple-400 hover:underline">Sign Up</Link>
        </p>
        
      </div>
    </div>
  );
}
