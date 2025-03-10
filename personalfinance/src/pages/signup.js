import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    setError("");
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-purple-900 to-black animate-gradient">
      <div className="bg-gradient-to-r from-purple-700 to-gray-900 p-10 rounded-lg shadow-lg w-96 border border-purple-500 relative">
        <h2 className="text-white text-3xl font-bold text-center mb-6">Sign Up</h2>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              onChange={handleChange}
            />
            <span className="absolute right-3 top-3 text-gray-400">👤</span>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              onChange={handleChange}
            />
            <span className="absolute right-3 top-3 text-gray-400">📧</span>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              onChange={handleChange}
            />
            <span className="absolute right-3 top-3 text-gray-400">🔒</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:opacity-90 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
