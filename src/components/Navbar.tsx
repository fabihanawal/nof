import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageView } from '../types';
import {
  Menu,
  X,
  UserPlus,
  ShieldAlert,
  Phone,
  Mail,
  Heart,
  BookOpen,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, settings, setShowDonationModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const navLinks: { label: string; page: PageView }[] = [
    { label: 'মূলপাতা', page: 'home' },
    { label: 'পরিচিতি', page: 'about' },
    { label: 'লক্ষ্য ও উদ্দেশ্য', page: 'vision-mission' },
    { label: 'জাতীয় নেতৃত্ব', page: 'leadership' },
    { label: '৮ বিভাগ', page: 'divisions' },
    { label: '৬৪ জেলা', page: 'districts' },
    { label: 'প্রকল্পসমূহ', page: 'projects' },
    { label: 'সংবাদ', page: 'news' },
    { label: 'গ্যালারি', page: 'gallery' },
    { label: 'যোগাযোগ', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100">
      {/* Top Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Slogan ticker */}
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 text-xs font-semibold">
              স্লোগান
            </span>
            <span className="font-medium tracking-wide text-emerald-50">
              {settings.heroSlogan || 'জ্ঞান • চরিত্র • নেতৃত্ব • সেবা'}
            </span>
          </div>

          {/* Quick Contact & CMS Entry */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 text-emerald-200 text-xs">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {settings.contactPhone}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                {settings.contactEmail}
              </span>
            </div>

            <button
              onClick={() => setShowDonationModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition shadow-sm"
              id="topbar-donate-btn"
            >
              <Heart className="w-3 h-3 fill-slate-950" />
              অনুদান
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold transition ${
                currentPage === 'admin'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200'
              }`}
              id="topbar-admin-btn"
            >
              <ShieldAlert className="w-3 h-3" />
              এডমিন CMS
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            id="brand-logo-btn"
          >
            {/* Brand Emblem */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-950 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform duration-200 border border-emerald-500">
              <div className="relative flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-300" />
                <span className="absolute -top-1.5 -right-1.5 text-[10px] text-emerald-300 font-serif">✦</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-emerald-950 leading-none">
                  নারী অধিকার
                </span>
                <span className="text-lg sm:text-2xl font-bold text-emerald-600 leading-none">
                  ফাউন্ডেশন
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                Nari Odhikar Foundation (NOF)
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'
                  }`}
                  id={`nav-link-${item.page}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button (Join GIO) & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('join')}
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all duration-200 ${
                currentPage === 'join'
                  ? 'bg-emerald-900 text-white shadow-emerald-900/30 ring-2 ring-emerald-500'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 hover:shadow-lg'
              }`}
              id="header-join-btn"
            >
              <UserPlus className="w-4 h-4" />
              <span>যোগ দিন</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              id="mobile-nav-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-800" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => handleNavClick('join')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm"
              id="mobile-join-button"
            >
              <UserPlus className="w-4 h-4" />
              যোগ দিন (Join)
            </button>
            <button
              onClick={() => setShowDonationModal(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-sm"
              id="mobile-donate-button"
            >
              <Heart className="w-4 h-4" />
              তহবিলে অনুদান
            </button>
          </div>

          <div className="space-y-1 py-1">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  id={`mobile-link-${item.page}`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>হটলাইন: {settings.contactPhone}</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-emerald-700 font-bold flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              এডমিন CMS প্রবেশ
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
