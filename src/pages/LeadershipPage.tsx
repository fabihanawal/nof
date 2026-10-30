import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, GraduationCap, MapPin, Calendar, Mail, ShieldCheck } from 'lucide-react';

export const LeadershipPage: React.FC = () => {
  const { leaders } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          সাংগঠনিক কাঠামো
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          জাতীয় নির্বাহী নেতৃত্ব
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          জিআইও বাংলাদেশের কেন্দ্রীয় কমিটি ও বিভাগীয় সমন্বয়কদের পরিচিতি।
        </p>
      </div>

      {/* Leadership Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader) => (
          <div
            key={leader.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col group"
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
              <img
                src={leader.imageUrl}
                alt={leader.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-emerald-700 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                {leader.term}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow space-y-3">
              <div>
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                  {leader.designation}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {leader.name}
                </h3>
              </div>

              {leader.division && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{leader.division}</span>
                </div>
              )}

              {leader.education && (
                <div className="flex items-start gap-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{leader.education}</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {leader.bio}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Leadership Values Note */}
      <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-200 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-emerald-950">দায়িত্ব এক আমানত</h3>
          <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
            জিআইও বাংলাদেশের প্রতিটি দায়িত্বশীল পদ কোনো ক্ষমতার প্রতীক নয়, বরং আল্লাহর দরবারে জবাবদিহিতার এক মহান আমানত। আমাদের নেতৃবৃন্দ বোনেরা নিজেদের মেধা, সময় ও প্রচেষ্টাকে সম্পূর্ণ স্বেচ্ছাশ্রমের ভিত্তিতে সংগঠনের লক্ষ্য অর্জনে নিয়োজিত রাখেন।
          </p>
        </div>
      </div>
    </div>
  );
};
