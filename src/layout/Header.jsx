import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/context";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();               // clear context + localStorage
    navigate("/auth");     // redirect
  };

  return (
    <div className="bg-white border-b border-neutral-200 h-16 flex items-center px-4">
      <div className="flex items-center justify-between w-full">

        {/* Left section */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded hover:bg-neutral-100 transition-colors text-neutral-700"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-semibold text-neutral-900">
            Dashboard
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">

          {/* Notifications */}
          <button className="p-2 rounded hover:bg-neutral-100 transition-colors text-neutral-700 relative">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 bg-error-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User profile */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="flex items-center space-x-2 p-1.5 rounded hover:bg-neutral-100 transition-colors text-neutral-700"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-primary-600" />
              </div>
              <ChevronDown size={14} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-md py-1 z-50 border border-neutral-200">
                
                {/* User Info */}
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-sm font-medium text-neutral-900">
                    {user?.role}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {user?.email}
                  </p>
                </div>

                <button
                  className="block w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>

                <button
                  className="block w-full text-left px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </button>

                <div className="border-t border-neutral-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-error-600 hover:bg-neutral-50"
                  >
                    Sign out
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
