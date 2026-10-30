import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  HeartHandshake,
  Award,
  Sparkles,
  ArrowRight,
  Calendar,
  ChevronRight,
  ShieldCheck,
  UserPlus,
  Heart,
  Globe,
  Users,
  MapPin,
  CheckCircle2,
  GraduationCap,
  Tv,
  Laptop,
} from 'lucide-react';
import { ProjectItem } from '../types';
import { InteractiveSlider } from '../components/InteractiveSlider';

export const HomePage: React.FC = () => {
  const {
    settings,
    news,
    projects,
    gallery,
    setCurrentPage,
    setSelectedNewsItem,
    setSelectedProjectItem,
    setLightboxImage,
    setShowDonationModal,
  } = useApp();

  const getProjectIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-emerald-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
      case 'Tv':
        return <Tv className="w-6 h-6 text-emerald-600" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-emerald-600" />;
      case 'Award':
      default:
        return <Award className="w-6 h-6 text-emerald-600" />;
    }
  };

  const handleOpenProject = (proj: ProjectItem) => {
    setSelectedProjectItem(proj);
    setCurrentPage('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-emerald-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center islamic-pattern">
        {/* Decorative emerald gradient glows */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/90 to-emerald-950/70" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Slogan Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600 text-amber-300 font-bold text-xs sm:text-sm tracking-wider shadow-inner">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{settings.heroSlogan || 'অধিকার • মর্যাদা • নেতৃত্ব • সেবা'}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-snug text-white">
                {settings.heroTitle || 'নারী অধিকার ফাউন্ডেশন'}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
                {settings.heroSubtitle ||
                  'বাংলাদেশের নারীদের সুরক্ষা, আইনি সমঅধিকার, গুণগত শিক্ষা, অর্থনৈতিক স্বাবলম্বিতা এবং বলিষ্ঠ নেতৃত্ব বিকাশে নিবেদিত অগ্রণী জাতীয় প্ল্যাটফর্ম।'}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentPage('join')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition flex items-center gap-2.5"
                  id="hero-join-cta"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>সদস্য হতে আবেদন করুন</span>
                </button>

                <button
                  onClick={() => setCurrentPage('about')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-emerald-400/40 hover:border-emerald-300 transition flex items-center gap-2"
                  id="hero-about-cta"
                >
                  <span>আমাদের পরিচিতি</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowDonationModal(true)}
                  className="px-5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-base shadow-md transition flex items-center gap-2"
                  id="hero-donate-cta"
                >
                  <Heart className="w-4 h-4 fill-slate-950" />
                  <span>তহবিলে অনুদান</span>
                </button>
              </div>

              {/* Notice Bar */}
              {settings.heroNotice && (
                <div className="mt-6 p-3 rounded-xl bg-emerald-900/60 border border-emerald-700/60 text-xs sm:text-sm text-emerald-200 flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[11px] shrink-0">
                    জরুরি নোটিশ
                  </span>
                  <span className="truncate">{settings.heroNotice}</span>
                </div>
              )}
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-500/40 bg-emerald-900/40 p-2 group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <img
                    src={
                      settings.heroImageUrl ||
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt="নারী অধিকার ফাউন্ডেশন কার্যক্রম"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      নারী অধিকার ফাউন্ডেশন
                    </p>
                    <p className="text-sm font-semibold">
                      দেশজুড়ে নারীর আইনি সুরক্ষা, শিক্ষা, স্বাস্থ্য ও অর্থনৈতিক ক্ষমতায়নের অগ্রযাত্রা
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-2xl shadow-xl border border-emerald-100 hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                  <ShieldCheck className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">দেশব্যাপী সাংগঠনিক ভিত্তি</p>
                  <p className="text-sm font-bold text-emerald-900">৮ বিভাগ • ৬৪ জেলা ইউনিট</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE 5-IMAGE SLIDESHOW SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="space-y-4">
          <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>ইন্টারাক্টিভ ফিচার স্লাইডশো</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              নারী অধিকার ফাউন্ডেশন: ৫টি মূল স্তম্ভ ও কর্মপ্রয়াস
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              নিচের স্লাইডশোতে মাউস রেখে বা টাচ করে প্রতিটি উদ্যোগের বিস্তারিত দেখুন এবং সক্রিয় পদক্ষেপে অংশ নিন
            </p>
          </div>

          {/* Interactive Slideshow Component */}
          <InteractiveSlider />
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-900">৮ টি</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">প্রশাসনিক বিভাগ</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-900">৬৪ টি</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">জেলা ও মহানগর ইউনিট</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-900">১২,৫০০+</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">নিবন্ধিত ছাত্রী ও সদস্য</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-900">৬ টি</p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">জাতীয় স্থায়ী প্রকল্প</p>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS SECTION (জ্ঞান • চরিত্র • নেতৃত্ব • সেবা) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            আমাদের মূল ভিত্তি
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            চারটি মৌলিক স্তম্ভের সমন্বয়ে আত্মবিকাশ
          </h2>
          <p className="text-sm text-slate-600">
            জিআইও বাংলাদেশ প্রতিটি তরুণী ও ছাত্রীকে চারটি প্রধান গুণে গুণান্বিত করে গড়ে তুলতে বদ্ধপরিকর।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: জ্ঞান */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:text-white transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">জ্ঞান (Knowledge)</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              কুরআন-হাদিসের বিশুদ্ধ জ্ঞান, সমসাময়িক বিদ্যা ও বিজ্ঞানের সমন্বয়ে বুদ্ধিবৃত্তিক ও গবেষণাধর্মী মনন গঠন।
            </p>
          </div>

          {/* Pillar 2: চরিত্র */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:text-white transition">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">চরিত্র (Character)</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              তাকওয়া, সত্যবাদিতা, শালীনতা, পর্দা ও উত্তম আচরণের মাধ্যমে অনুপম আদর্শ ইসলামিক চরিত্র বিনির্মাণ।
            </p>
          </div>

          {/* Pillar 3: নেতৃত্ব */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:text-white transition">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">নেতৃত্ব (Leadership)</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              সামাজিক চ্যালেঞ্জ মোকাবেলা ও উম্মাহর পথপ্রদর্শনে সাহসী, দায়িত্বশীল ও দূরদর্শী নারী নেতৃত্ব তৈরি।
            </p>
          </div>

          {/* Pillar 4: সেবা */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm hover:shadow-md transition hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:text-white transition">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">সেবা (Service)</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              অসহায় ও আর্তপীড়িত মানুষের কল্যাণে নিঃস্বার্থভাবে খাদ্য, চিকিৎসা ও জরুরি মানবিক সহায়তা প্রদান।
            </p>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS (৬টি প্রকল্প) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              জাতীয় কার্যক্রম
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              আমাদের মূল প্রকল্পসমূহ
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              ইসলামিক আদর্শ ও সমাজ সংস্কারে পরিচালিত ৬টি দীর্ঘমেয়াদি উন্নয়ন উদ্যোগ
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('projects')}
            className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition self-start sm:self-auto"
          >
            <span>সকল প্রকল্প দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col group"
            >
              <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm text-emerald-700">
                  {getProjectIcon(proj.iconName)}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                <div className="pt-2 mt-auto">
                  <button
                    onClick={() => handleOpenProject(proj)}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
                  >
                    <span>বিস্তারিত জানুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LATEST NEWS */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                আপডেট ও বার্তা
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                সর্বশেষ সংবাদ ও বিজ্ঞপ্তি
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                সংগঠনের দেশব্যাপী কার্যক্রম, সম্মেলন ও দিকনির্দেশনামূলক ঘোষণা
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('news')}
              className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition self-start sm:self-auto"
            >
              <span>সকল সংবাদ আর্কাইভ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col cursor-pointer group"
                onClick={() => setSelectedNewsItem(item)}
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-700 text-white shadow">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="pt-3 mt-auto">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
                      পড়ুন <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              ফটোগ্রাফি অ্যালবাম
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              ছবি ও কার্যক্রমের ঝলক
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              বিভিন্ন জেলা ও শিক্ষাঙ্গনে ছাত্রীদের প্রাণবন্ত অংশগ্রহণ
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('gallery')}
            className="inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition self-start sm:self-auto"
          >
            <span>সম্পূর্ণ গ্যালারি দেখুন</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300">
                  {item.category}
                </span>
                <p className="text-xs font-semibold truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. VOLUNTEER & MEMBERSHIP CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-900 to-emerald-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-700">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>স্বেচ্ছাসেবক ও সদস্য আহ্বান</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold leading-snug">
              আপনিও হতে পারেন জাতির বিবেকবান ও চরিত্রবান প্রজন্মের অংশীদার
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              যদি আপনি স্কুল, কলেজ, মাদ্রাসা বা বিশ্ববিদ্যালয়ের ছাত্রী অথবা তরুণী হন এবং ইসলামের সুমহান আদর্শে নিজের জীবন সাজাতে চান, তবে আজই আমাদের সাথে যুক্ত হোন।
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentPage('join')}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md transition flex items-center gap-2"
                id="cta-join-btn"
              >
                <UserPlus className="w-4 h-4" />
                <span>সদস্য ফর্ম পূরণ করুন</span>
              </button>

              <button
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-emerald-400/40 transition"
              >
                যোগাযোগ ও পরামর্শ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DONATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-amber-50 border border-amber-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>কল্যাণ তহবিলে অনুদান (Sadaqah & Welfare)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              আপনার সামান্য সহযোগিতা এনে দিতে পারে একজন অসহায় ছাত্রীর উজ্জ্বল ভবিষ্যৎ
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              বিকাশ, নগদ কিংবা ব্যাংক একাউন্টের মাধ্যমে যে-কোনো পরিমাণ অনুদান পাঠাতে পারেন আমাদের শিক্ষা ও সমাজসেবা তহবিলে।
            </p>
          </div>

          <button
            onClick={() => setShowDonationModal(true)}
            className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md shrink-0 flex items-center gap-2 transition"
            id="footer-donate-cta"
          >
            <Heart className="w-4 h-4" />
            <span>অনুদান পাঠানোর বিবরণ</span>
          </button>
        </div>
      </section>
    </div>
  );
};
