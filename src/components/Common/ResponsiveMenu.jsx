import React, { useState } from "react";
import { Menu02Icon } from "hugeicons-react";
import { Menu, X } from "lucide-react";

const ResponsiveMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Button to open/close the menu */}
      {isMenuOpen ? <X size={24} onClick={toggleMenu} /> : <Menu size={24} onClick={toggleMenu} />}

      {/* Menu overlay */}
      <div
        className={`fixed top-[70px] z-40 inset-0 bg-gray-500/50 h-[100vh] flex justify-end transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`bg-white w-[100%] z-50 transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } h-[270px]`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="menu-content p-6 px-8">
            <ul className="space-y-5 font-medium">
              <li>
                <a href="/explore" className="text-lg">
                  Explore
                </a>
              </li>
              <li>
                <a href="/hire" className="text-lg">
                  Hire a Designer
                </a>
              </li>
              <li>
                <a href="/jobs" className="text-lg">
                  Find Jobs
                </a>
              </li>
              <li>
                <a href="/blog" className="text-lg">
                  Blog
                </a>
              </li>
              <li>
                <a href="/pro" className="text-lg text-pink-600">
                  Go Pro
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
