import React, { useState } from "react";
import { register } from "@/service";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "RECRUITER",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Create Account
        </h1>
        <p className="text-slate-500 mt-1">
          Join us and start your 14-day free trial.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Username */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder="issach123"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+91XXXXXXXXXX"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <p className="mt-2 text-xs text-slate-400 font-medium">
            Must be at least 8 characters.
          </p>
        </div>

        {/* Terms */}
        <div className="flex items-start">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-3 text-sm text-slate-600">
            I agree to the Terms and Privacy Policy.
          </label>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-slate-100">
        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <span className="text-blue-600 font-bold cursor-pointer">Log in</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
