import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Users, Compass, Award, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          পরিচিতি ও ইতিহাস
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          নারী অধিকার ফাউন্ডেশন (Nari Odhikar Foundation)
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          অধিকার, মর্যাদা, নেতৃত্ব ও সেবার মহান ব্রতে একতাবদ্ধ বাংলাদেশের নারী ও তরুণীদের প্রতিনিধিত্বকারী একটি অগ্রগামী জাতীয় সমাজকল্যাণ ও মানবাধিকার প্ল্যাটফর্ম।
        </p>
      </div>

      {/* Main Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-emerald-950">
            আমাদের পটভূমি ও সূচনা
          </h2>
          <p>
            বাংলাদেশে নারীর সমঅধিকার নিশ্চিতকরণ, আইনি সুরক্ষা প্রদান, সামাজিক বৈষম্য ও সহিংসতা প্রতিরোধ এবং কন্যাশিশু ও তরুণীদের সুশিক্ষিত, আত্মপ্রত্যয়ী ও অর্থনৈতিকভাবে সাবলম্বী করে গড়ে তোলার প্রত্যয় নিয়ে প্রতিষ্ঠিত হয় নারী অধিকার ফাউন্ডেশন (Nari Odhikar Foundation)।
          </p>
          <p>
            ফাউন্ডেশন বিশ্বাস করে—নারী কেবল পরিবারের স্তম্ভ নয়, বরং একটি সুস্থ সমাজ ও আধুনিক জাতির অর্থনৈতিক ও মানবিক ভিত্তি। সংবিধান স্বীকৃত সমঅধিকারের বাস্তবায়ন, তথ্যপ্রযুক্তি শিক্ষা, উদ্যোক্তা সৃষ্টি এবং নেতৃত্ব বিকাশের মাধ্যমে প্রতিটি নারীকে মর্যাদা ও আত্মনির্ভরশীলতার শীর্ষস্থানে নিয়ে যাওয়াই আমাদের ব্রত।
          </p>
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium">
            "আমাদের লক্ষ্য—একটি বৈষম্যহীন, নিরাপদ ও সমৃদ্ধ সমাজ যেখানে প্রতিটি নারী সম্মান ও পূর্ণ অধিকার নিয়ে বিকশিত হবে।"
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-emerald-100 aspect-video relative">
            <img
              src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80"
              alt="GIO About"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">আমাদের মৌলিক চার স্তম্ভ</h2>
          <p className="text-sm text-slate-600">জ্ঞান • চরিত্র • নেতৃত্ব • সেবা</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">১. জ্ঞান (Knowledge)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ইসলামের খাঁটি বুনিয়াদী জ্ঞান অর্জনের পাশাপাশি বিজ্ঞান, প্রযুক্তি ও মানবিক বিদ্যায় পাণ্ডিত্য অর্জন করা যাতে প্রতিটি ছাত্রী বাস্তব ক্ষেত্রে আলো ছড়াতে পারে।
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">২. চরিত্র (Character)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                কুরআনিক অনুশাসন, আত্মশুদ্ধি, সত্যবাদিতা, বিনয়, পর্দা ও শালীনতার মাধ্যমে এক অতুলনীয় নৈতিক ব্যক্তিত্ব গড়ে তোলা।
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">৩. নেতৃত্ব (Leadership)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                সমাজে ন্যায়বিচার প্রতিষ্ঠা, অন্যায়ের প্রতিবাদ ও মানুষের কল্যাণে সাহসী, সংবেদনশীল ও দূরদর্শী নারী নেতৃত্ব তৈরি করা।
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">৪. সেবা (Service)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                মানবতার কল্যাণে নিঃস্বার্থভাবে ঝাঁপিয়ে পড়া—দরিদ্রদের সহায়তা, ত্রাণ বিতরণ, রক্তদান ও নারীদের চিকিৎসাসেবা নিশ্চিতে কাজ করা।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA to Join */}
      <div className="text-center bg-emerald-900 text-white p-8 sm:p-10 rounded-3xl space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold">আপনিও এই মহতী কাফেলার অংশীদার হোন</h3>
        <p className="text-emerald-200 text-sm max-w-xl mx-auto">
          আপনার শিক্ষাপ্রতিষ্ঠান, কর্মক্ষেত্র বা এলাকায় নারী অধিকার ফাউন্ডেশনের সাথে যুক্ত হয়ে মানবতার কল্যাণে ও অধিকার সুরক্ষায় অবদান রাখুন।
        </p>
        <button
          onClick={() => setCurrentPage('join')}
          className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm shadow-md transition inline-flex items-center gap-2"
        >
          <span>যোগদান ফরম পূরণ করুন</span>
        </button>
      </div>
    </div>
  );
};
