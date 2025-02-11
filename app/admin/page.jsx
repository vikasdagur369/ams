"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaUserCircle,
  FaUsers,
  FaClipboardList,
  FaImage,
  FaBriefcase,
  FaBook,
  FaCog,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 space-y-6">
        <h1 className="text-2xl font-bold text-blue-400">
          HCST<span className="text-pink-500">sync</span> Admin
        </h1>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/admin/users"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaUsers /> <span>Manage Users</span>
          </Link>
          <Link
            href="/admin/posts"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaClipboardList /> <span>Manage Posts</span>
          </Link>
          <Link
            href="/admin/gallery"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaImage /> <span>Manage Gallery</span>
          </Link>
          <Link
            href="/admin/jobs"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaBriefcase /> <span>Manage Jobs</span>
          </Link>
          <Link
            href="/admin/yearbook"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaBook /> <span>Manage Yearbook</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <FaCog /> <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-black">Admin Dashboard</h2>
          {/* <div className="relative">
            <button
              className="flex items-center space-x-2 hover:text-blue-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaUserCircle className="text-2xl" />
              <IoMdArrowDropdown className="text-xl" />
            </button> */}
          {/* {isOpen && (
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
              </div> */}
          ){/* </div> */}
        </header>

        {/* Dashboard Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-black">Total Users</h3>
            <p className="text-2xl text-blue-500">1,250</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-black">Total Posts</h3>
            <p className="text-2xl text-green-500">3,452</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h3 className="text-xl font-semibold text-black">Jobs Posted</h3>
            <p className="text-2xl text-yellow-500">87</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
