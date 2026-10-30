import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Heart,
  ChevronRight,
  ShieldCheck,
  Facebook,
  Youtube,
  Send,
  Sparkles,
} from 'lucide-react';
import { PageView } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentPage, settings, setShowDonationModal } = useApp();

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 relative overflow-hidden border-t-4 border-emerald-600">
      {/* Subtle geometric pattern top accent */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-white border border-emerald-600 shadow-md">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  নারী অধিকার ফাউন্ডেশন
                </h3>
                <p className="text-xs text-emerald-300">
                  Nari Odhikar Foundation (NOF)
                </p>
              </div>
            </div>

            <p className="text-sm text-emerald-200/90 leading-relaxed">
              বাংলাদেশের প্রতিটি নারী ও তরুণীর মাঝে আত্মপ্রত্যয়, মানবাধিকার ও আইনি সুরক্ষা, গুণগত শিক্ষা এবং নেতৃত্ব বিকাশের মাধ্যমে ন্যায়ভিত্তিক ও মানবিক সমাজ গঠনে নিবেদিত অগ্রণী প্রতিষ্ঠান।
            </p>

            {/* 4 Pillars Pill */}
            <div className="p-3 rounded-xl bg-emerald-900/80 border border-emerald-800">
              <p className="text-xs font-semibold text-emerald-300 mb-1">আমাদের মূলমন্ত্র:</p>
              <p className="text-sm font-bold text-amber-300">
                {settings.heroSlogan || 'অধিকার • মর্যাদা • নেতৃত্ব • সেবা'}
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white border-b border-emerald-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              গুরুত্বপূর্ণ লিংকসমূহ
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> পরিচিতি ও ইতিহাস
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('vision-mission')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> লক্ষ্য, উদ্দেশ্য ও কর্মপদ্ধতি
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('leadership')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> জাতীয় নির্বাহী পরিষদ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('divisions')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> আট (৮) বিভাগীয় সমন্বয়
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('districts')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> ৬৪ জেলা ইউনিট ডিরেক্টরি
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('projects')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" /> আমাদের ৬টি স্থায়ী প্রকল্প
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('join')}
                  className="text-amber-300 font-semibold hover:underline flex items-center gap-1.5 transition"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-300" /> জিআইও-তে যোগদানের ফরম
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Projects & Activities */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white border-b border-emerald-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              প্রধান কর্মক্ষেত্র
            </h4>
            <ul className="space-y-2 text-sm text-emerald-200">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>শিক্ষা উন্নয়ন ও পাঠাগার স্থাপন</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>তারবিয়াহ, আত্মশুদ্ধি ও চরিত্র গঠন</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>সমাজসেবা, ত্রাণ ও খাদ্য বিতরণ</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>মিডিয়া, প্রকাশনা ও অনলাইন দাওয়াহ</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>দক্ষতা উন্নয়ন ও ক্যারিয়ার কাউন্সেলিং</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>মুসলিম নারী নেতৃত্ব বিকাশ ফোরাম</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setShowDonationModal(true)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 fill-slate-950" />
                কল্যাণ তহবিলে অনুদান দিন
              </button>
            </div>
          </div>

          {/* Col 4: Contact & Headquarters */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white border-b border-emerald-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              কেন্দ্রীয় কার্যালয়
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm text-emerald-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-1" />
                <span>{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{settings.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{settings.contactEmail}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={settings.facebookUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-700 flex items-center justify-center text-emerald-200 hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.youtubeUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-700 flex items-center justify-center text-emerald-200 hover:text-white transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <button
                onClick={() => navigateTo('contact')}
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-emerald-700 flex items-center justify-center text-emerald-200 hover:text-white transition"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quranic Ayah Quote Banner */}
        <div className="mt-12 pt-8 border-t border-emerald-800/80 text-center">
          <p className="text-emerald-300/90 text-sm italic font-serif max-w-2xl mx-auto">
            "ঈমানদার পুরুষ ও ঈমানদার নারী একে অপরের সহযোগী ও বন্ধু; তারা সৎকাজের আদেশ দেয় এবং অসৎকাজ থেকে বিরত রাখে..."
            <span className="block text-xs text-amber-300 not-italic mt-1">
              — সূরা আত-তাওবাহ: ৭১
            </span>
          </p>
        </div>

        {/* Bottom copyright & Admin portal link */}
        <div className="mt-8 pt-6 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400">
          <p>
            © {new Date().getFullYear()} নারী অধিকার ফাউন্ডেশন (Nari Odhikar Foundation)। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('admin')}
              className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white hover:underline transition"
              id="footer-admin-link"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              এডমিন সিএমএস পোর্টাল
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('contact')}
              className="text-emerald-300 hover:text-white hover:underline transition"
            >
              যোগাযোগ ও মতামত
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
