"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar on Sign In and Sign Up pages
  const hideNavbar = pathname === "/signin" || pathname === "/signup";
  if (hideNavbar) return null;

  return (
    <header className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold flex items-center">🚀 Task Tracker</h1>

        {/* Right Section: Sign In, Sign Up, and Hamburger Menu */}
        <div className="flex items-center space-x-6">
          {/* Sign In & Sign Up as simple links (not buttons) */}
          <Link href="/signin" className="hover:underline">Sign In</Link>
          <Link href="/signup" className="hover:underline">Sign Up</Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Sidebar Menu */}
      <nav
        className={`fixed left-0 top-0 w-64 h-full bg-gray-900 text-white transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex flex-col p-4">
          <NavLinks onClick={() => setMenuOpen(false)} />
        </div>
      </nav>
    </header>
  );
}

// ✅ Navigation Links inside the menu
const NavLinks = ({ onClick }: { onClick?: () => void }) => (
  <>
    <Link href="/" className="hover:underline block p-2" onClick={onClick}>Home</Link>
    <Link href="/dashboard" className="hover:underline block p-2" onClick={onClick}>Dashboard</Link>
    <Link href="/profile" className="hover:underline block p-2" onClick={onClick}>Profile</Link>
    <Link href="/settings" className="hover:underline block p-2" onClick={onClick}>Settings</Link>
  </>
);
