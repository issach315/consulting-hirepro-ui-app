import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";

const Layout = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header onMenuClick={() => setIsSideNavOpen((v) => !v)} />
      </div>

      <div className="flex flex-1 pt-16">
        <SideNav isOpen={isSideNavOpen} />

        <div
          className={`flex-1 flex flex-col transition-all ${
            isSideNavOpen ? "ml-64" : "ml-16"
          }`}
        >
          <main className="flex-1 overflow-y-auto p-1">
            <div className="bg-white rounded-lg p-4">
              <Outlet /> {/* ✅ REQUIRED */}
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
