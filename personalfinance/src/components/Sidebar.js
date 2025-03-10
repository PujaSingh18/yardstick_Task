import { useState } from "react";
import { FaRegFolder, FaRegTrashAlt, FaRegShareSquare, FaBars, FaTimes } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { HiOutlineFolder } from "react-icons/hi2";
import Image from "next/image";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-5 left-5 z-50 bg-indigo-600 text-white p-2 rounded-full shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed lg:static top-0 left-0 w-64 h-screen bg-white shadow-lg p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 z-40`}
      >
        {/* Logo */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text">
            Personal Finance
          </h1>
          <button className="lg:hidden text-gray-600" onClick={() => setIsOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 mt-6">
          <a href="#" className="flex items-center gap-3 text-indigo-600 font-medium">
            <span className="text-lg">📁</span> Dashboard
          </a>

          <h2 className="text-gray-400 text-sm mt-4">MANAGE</h2>
          <NavItem icon={<FaRegFolder />} text="Accounts" />
          <NavItem icon={<FaRegShareSquare />} text="Investments" />
          <NavItem icon={<FiFileText />} text="Reports" />
          <NavItem icon={<FaRegTrashAlt />} text="Expenses" />

          <h2 className="text-gray-400 text-sm mt-4">CATEGORIES</h2>
          <NavItem icon={<HiOutlineFolder />} text="Savings" />
          <NavItem icon={<HiOutlineFolder />} text="Loans" />
          <NavItem icon={<HiOutlineFolder />} text="Budget Planner" />
        </nav>

        {/* Profile */}
        <div className="flex items-center gap-3 border-t pt-4 mt-4">
          <Image src="/profile.jpg" width={40} height={40} className="rounded-full" alt="User" />
          <div>
            <h3 className="font-semibold">Staromyński</h3>
            <p className="text-gray-500 text-sm">PREMIUM USER</p>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu - Transparent White */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-md z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Reusable Nav Item Component
const NavItem = ({ icon, text }) => (
  <a
    href="#"
    className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
  >
    <span className="text-lg">{icon}</span> {text}
  </a>
);
