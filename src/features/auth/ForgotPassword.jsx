import React from "react";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
          <p className="text-sm text-slate-500 mt-2">
            Follow the steps to regain access to your account.
          </p>
        </div>

        <form className="space-y-5">
          {/* Step 1: Identify User */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Username or Email
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Step 2: OTP Verification */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-slate-700">
                Verification OTP
              </label>
              <button
                type="button"
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Resend Code
              </button>
            </div>
            <input
              type="text"
              maxLength="6"
              placeholder="0 0 0 0 0 0"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 text-center tracking-[1em] font-mono outline-none transition-all"
            />
          </div>

          <hr className="my-6 border-slate-100" />

          {/* Step 3: New Password */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all transform active:scale-[0.98] mt-4"
          >
            Reset My Password
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="/login"
            className="text-sm font-semibold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
