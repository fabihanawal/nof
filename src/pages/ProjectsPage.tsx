import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  HeartHandshake,
  Sparkles,
  Tv,
  Laptop,
  Award,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { ProjectItem } from '../types';

export const ProjectsPage: React.FC = () => {
  const { projects, selectedProjectItem, setSelectedProjectItem, setCurrentPage, setShowDonationModal } =
    useApp();

  const getProjectIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-8 h-8 text-emerald-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-8 h-8 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-emerald-600" />;
      case 'Tv':
        return <Tv className="w-8 h-8 text-emerald-600" />;
      case 'Laptop':
        return <Laptop className="w-8 h-8 text-emerald-600" />;
      case 'Award':
      default:
        return <Award className="w-8 h-8 text-emerald-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          স্থায়ী কর্মউদ্যোগ
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          জিআইও বাংলাদেশের ৬টি মূল প্রকল্প
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          ছাত্রীদের সুপ্ত প্রতিভা বিকাশ, দ্বীনি চরিত্র গঠন এবং সমাজে ইতিবাচক ভূমিকা রাখতে বাস্তবায়িত হচ্ছে আমাদের ৬টি স্থায়ী জাতীয় প্রকল্প।
        </p>
      </div>

      {/* Selected Project Detailed Feature (if any selected) */}
      {selectedProjectItem && (
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-700 relative overflow-hidden space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-md bg-amber-400 text-slate-950 font-bold text-xs">
              নির্বাচিত প্রকল্প পর্যালোচনা
            </span>
            <button
              onClick={() => setSelectedProjectItem(null)}
              className="text-xs text-emerald-200 hover:text-white underline"
            >
              বন্ধ করুন
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {selectedProjectItem.title}
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed">
                {selectedProjectItem.details || selectedProjectItem.description}
              </p>

              {selectedProjectItem.objectives && selectedProjectItem.objectives.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-sm font-bold text-amber-300">প্রকল্পের মূল লক্ষ্যসমূহ:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-emerald-100">
                    {selectedProjectItem.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentPage('join')}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition shadow-sm"
                >
                  এই প্রকল্পে স্বেচ্ছাসেবক হিসেবে যোগ দিন
                </button>
                <button
                  onClick={() => setShowDonationModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-emerald-400/40 transition"
                >
                  প্রকল্প তহবিলে অর্থায়ন করুন
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-600">
                <img
                  src={selectedProjectItem.imageUrl}
                  alt={selectedProjectItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-12">
        {projects.map((proj, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={proj.id}
              className={`bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                selectedProjectItem?.id === proj.id ? 'ring-2 ring-emerald-600' : ''
              }`}
            >
              {/* Image side */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm relative group bg-slate-100">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-md">
                    {getProjectIcon(proj.iconName)}
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    প্রকল্প #{index + 1}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {proj.title}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {proj.details || proj.description}
                </p>

                {/* Key activities pill list */}
                {proj.keyActivities && proj.keyActivities.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      নিয়মিত কার্যক্রমসমূহ:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {proj.keyActivities.map((act, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedProjectItem(proj)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>উদ্দেশ্য ও বিস্তারিত</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setShowDonationModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs sm:text-sm border border-amber-200 transition flex items-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 text-amber-600" />
                    <span>প্রকল্পে সাদাকাহ</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
