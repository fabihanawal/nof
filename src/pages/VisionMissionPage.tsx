import React from 'react';
import { useApp } from '../context/AppContext';
import { Target, Compass, CheckCircle2, Shield, Heart, Sparkles, BookOpen } from 'lucide-react';

export const VisionMissionPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          ভিশন ও মিশন
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          লক্ষ্য, উদ্দেশ্য ও কর্মপদ্ধতি
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          একটি ইনসাফপূর্ণ, আলোকিত ও নৈতিক সমাজ বিনির্মাণে আমাদের সুনির্দিষ্ট রূপরেখা।
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
            <Target className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
            আমাদের রূপকল্প (VISION)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-white">
            "আল্লাহভীরু, সুশিক্ষিত ও দায়িত্বশীল নারী নেতৃত্বাধীন একটি কল্যাণমুখী সমাজ"
          </h2>
          <p className="text-sm text-emerald-100 leading-relaxed">
            আমরা এমন একটি বাংলাদেশের স্বপ্ন দেখি যেখানে প্রতিটি কন্যা ও তরুণী ইসলামী মূল্যবোধ ও সম্মানের সাথে নিরাপদ পরিবেশে বেড়ে উঠবে, উচ্চশিক্ষায় মেধার স্বাক্ষর রাখবে এবং আর্তমানবতার সেবায় কার্যকর ভূমিকা পালন করবে।
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white border-2 border-emerald-700/30 rounded-3xl p-8 sm:p-10 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-sm">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">
            আমাদের লক্ষ্য (MISSION)
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-slate-900">
            তরুণীদের সম্ভাবনা বিকাশ ও চারিত্রিক পরিশুদ্ধির জাতীয় মঞ্চ
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            কুরআন ও সুন্নাহর সঠিক জ্ঞান প্রচার, আত্মিক পরিশুদ্ধি (তাযকিয়া), যুগোপযোগী দক্ষতা বৃদ্ধি এবং সমাজকল্যাণমূলক প্রকল্পের মাধ্যমে তরুণীদের ব্যক্তিত্ব ও নেতৃত্বের সার্বিক বিকাশ সাধন করা।
          </p>
        </div>
      </div>

      {/* Strategic Objectives (মূল লক্ষ্যসমূহ) */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 space-y-8">
        <h3 className="text-2xl font-bold text-slate-900 text-center">
          আমাদের সুনির্দিষ্ট কর্ম-উদ্দেশ্যসমূহ
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-slate-900">নৈতিক ও আধ্যাত্মিক জাগরণ</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              নিয়মিত কুরআন স্টাডি, হাদিস পাঠ এবং আত্মশুদ্ধি কর্মসূচির মাধ্যমে অন্তরকে আল্লাহর আনুগত্যে পূর্ণ করা।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-slate-900">শিক্ষা বিস্তার ও সহায়তা</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              সুবিধাবঞ্চিত ও মেধাবী ছাত্রীদের শিক্ষাবৃত্তি প্রদান এবং উন্মুক্ত পাঠাগার ও গবেষণা ফোরাম পরিচালনা।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-slate-900">আধুনিক দক্ষতা অর্জন</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              আইটি, যোগাযোগ, গবেষণা ও নেতৃত্বের আধুনিক কলাকৌশলে ছাত্রীদের দক্ষ করে তোলা।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-slate-900">মানবিক ও সামাজিক সেবা</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              দুর্যোগকালীন সহায়তা, ফ্রি মেডিকেল ক্যাম্প এবং বিধবা ও অসহায় নারীদের স্বাবলম্বীকরণে পাশে থাকা।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-slate-900">সুস্থ সংস্কৃতির বিকাশ</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              অপসংস্কৃতি ও অশ্লীলতার বিপরীতে নির্মল সাহিত্য, সংগীত, ক্যালিগ্রাফি ও সাংস্কৃতিক প্রতিযোগিতা আয়োজন।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-slate-900">ইসলামি দাওয়াহর প্রসার</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              যুক্তি ও ভালোবাসা দিয়ে আধুনিক মিডিয়ার মাধ্যমে ইসলামের সঠিক জীবনদর্শন সাধারণ নারীদের মাঝে তুলে ধরা।
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentPage('join')}
          className="px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition"
        >
          এই ভিশনের সাথে যুক্ত হতে ক্লিক করুন
        </button>
      </div>
    </div>
  );
};
