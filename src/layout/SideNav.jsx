import React from "react";
import {
  Home,
  FileText,
  Settings,
  HelpCircle,
  ChevronRight,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // adjust path if needed

const SideNav = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const userRole = user?.role?.toUpperCase();

  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      path: "/dashboard",
      allowedRoles: ["SUPERADMIN", "ADMIN", "MANAGER", "EMPLOYEE"],
    },
    {
      icon: <FileText size={20} />,
      label: "Form Example",
      path: "/form-example",
      allowedRoles: ["SUPERADMIN", "ADMIN", "MANAGER", "EMPLOYEE"],
    },
    {
      icon: <Settings size={20} />,
      label: "Clients",
      path: "/clients",
      allowedRoles: ["SUPERADMIN", "ADMIN", "MANAGER", "EMPLOYEE"],
    },
    {
      icon: <HelpCircle size={20} />,
      label: "Help",
      path: "/help",
      allowedRoles: ["SUPERADMIN", "ADMIN", "MANAGER", "EMPLOYEE"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.allowedRoles.includes(userRole),
  );

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`
        ${isOpen ? "w-64" : "w-16"}
        transition-all duration-300 ease-in-out
        bg-white border-r border-neutral-200
        flex flex-col h-screen fixed left-0 top-16
      `}
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          <ul className="space-y-1">
            {filteredNavItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded-lg
                    ${
                      isActive(item.path)
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-neutral-100 text-neutral-700"
                    }
                    transition-colors
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={
                        isActive(item.path)
                          ? "text-blue-600"
                          : "text-neutral-500"
                      }
                    >
                      {item.icon}
                    </span>

                    {isOpen && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </div>

                  {isOpen && (
                    <ChevronRight size={14} className="text-neutral-400" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom User Section */}
      <div className="p-3 border-t border-neutral-200">
        {isOpen ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-neutral-500">{userRole || "Role"}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
