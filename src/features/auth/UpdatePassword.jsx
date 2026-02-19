import React from 'react';

const UpdatePassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Update Password</h2>
          <p className="text-sm text-gray-500 mt-1">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        <form className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Current Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
            />
          </div>

          <hr className="border-gray-100" />

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button 
              type="submit" 
              className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-colors shadow-lg active:scale-[0.98]"
            >
              Update Password
            </button>
            <button 
              type="button" 
              className="w-full py-3 bg-transparent text-gray-500 font-medium rounded-lg hover:text-gray-700 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;