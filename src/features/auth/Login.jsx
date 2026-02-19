import React, { useState } from "react";
import { login } from "@/service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context";

const Login = () => {
  const navigate = useNavigate();
  const { login: saveUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const response = await login(formData);

    if (response.success) {   // ✅ FIXED
      const { email, role, expiresIn } = response.data;

      saveUser({
        email,
        role,
        expiryTime: Date.now() + expiresIn * 1000,
      });

      navigate("/dashboard");
    } else {
      setError(response.message || "Login failed");
    }
  } catch (err) {
    setError(
      err.response?.data?.message || "Invalid credentials"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl p-8 space-y-6 shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Please enter your details</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
