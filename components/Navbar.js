"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-400 cursor-pointer">
            HCST<span className="text-pink-500">sync</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="/yearbook" className="hover:text-blue-400 transition">
            YearBook
          </Link>
          <Link href="/gallery" className="hover:text-blue-400 transition">
            Gallery
          </Link>
          <Link href="/jobs" className="hover:text-blue-400 transition">
            Jobs
          </Link>
          <Link href="/directory" className="hover:text-blue-400 transition">
            Directory
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition">
            About
          </Link>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 hover:text-blue-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaUserCircle className="text-2xl" />
            <IoMdArrowDropdown className="text-xl" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                My Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-red-600"
                onClick={() => alert("Logging out...")}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
