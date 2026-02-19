import React, { useState } from "react";
import { Login, SignUp } from "@/features";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Tabs */}
        <div className="flex bg-slate-200 rounded-xl p-1 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isLogin
                ? "bg-white shadow text-blue-600"
                : "text-slate-600"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
              !isLogin
                ? "bg-white shadow text-blue-600"
                : "text-slate-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Content */}
        <div className="transition-all duration-300">
          {isLogin ? <Login /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
