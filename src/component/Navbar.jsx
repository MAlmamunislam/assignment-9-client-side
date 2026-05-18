'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation';
import {
  Home, Lightbulb, PlusCircle, Lock, Users,
  Sun, Moon, ChevronDown, Menu, X, User, LogOut
} from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Ideas', icon: Lightbulb, href: '/ideas' },
    { label: 'Add Idea', icon: PlusCircle, href: '/add-idea' },
    { label: 'My Ideas', icon: Lock, href: '/my-ideas' },
    { label: 'My Interactions', icon: Users, href: '/interactions' },
  ];

  return (
    <nav className="relative flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm sm:px-6 lg:px-8 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center space-x-3">
        {/* Menu Button */}
        <div className="relative lg:hidden">
          <button
            onClick={() => { setIsMenuOpen(!isMenuOpen); setIsProfileOpen(false); }}
            className="flex items-center space-x-1 p-2 bg-gray-50 text-purple-600 rounded-lg text-sm border border-gray-100"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="font-medium hidden sm:inline">Menu</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMenuOpen && (
            <ul className="absolute left-0 top-11 w-52 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 list-none">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={idx} onClick={() => setIsMenuOpen(false)}>
                    <Link href={item.href} className={`flex items-center space-x-3 px-4 py-2.5 text-sm font-medium ${isActive ? 'text-purple-600 bg-purple-50/50' : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'}`}>
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="hidden sm:flex items-center md:hidden lg:flex cursor-pointer">
          <Image src='/image/logo.png' alt="Logo" width={80} height={80} />
          <div>
            <span className="text-xl font-bold text-indigo-950 dark:text-white block leading-none">IdeaVault</span>
            <span className="text-xs text-gray-400 hidden lg:inline mt-0.5">Share. Explore. Innovate.</span>
          </div>
        </div>
      </div>

      <ul className="hidden lg:flex items-center space-x-4 list-none">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={idx}>
              <Link href={item.href} className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium relative transition-all ${isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'}`}>
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {isActive && <div className="absolute -bottom-3.5 left-0 right-0 h-[2px] bg-purple-600 rounded-full" />}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 flex items-center space-x-1 transition"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full hidden sm:block"></div>
        </button>

        <div className="relative">
          <button
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsMenuOpen(false); }}
            className="flex items-center space-x-1 border-l pl-2 md:pl-3 border-gray-200 focus:outline-none"
          >
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80" alt="Profile" className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent hover:ring-purple-200 transition-all" />
            <span className="text-sm font-semibold text-gray-700 hidden lg:inline dark:text-gray-300">John Doe</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-11 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-1.5 border-b border-gray-50 lg:hidden">
                <p className="text-xs font-bold text-gray-800">John Doe</p>
              </div>
              <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors">
                <User className="w-4 h-4" /> <span>Profile</span>
              </Link>
              <hr className="border-gray-100 my-1" />
              <button onClick={() => { setIsProfileOpen(false); alert('Logging out...'); }} className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                <LogOut className="w-4 h-4" /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}