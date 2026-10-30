import React from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DIVISIONS } from '../data/initialData';
import { MapPin, Phone, Users, ChevronRight, Building, CheckCircle2 } from 'lucide-react';

export const DivisionsPage: React.FC = () => {
  const { setCurrentPage, setSelectedDivisionId } = useApp();

  const handleSelectDivision = (divId: string) => {
    setSelectedDivisionId(divId);
    setCurrentPage('districts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          সাংগঠনিক বিস্তার
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          বাংলাদেশের ৮টি বিভাগীয় সাংগঠনিক বলয়
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          সারাদেশের প্রতিটি প্রান্তরে পৌঁছাতে ৮টি প্রশাসনিক বিভাগে আমাদের আঞ্চলিক সমন্বয় কমিটি নিরবচ্ছিন্নভাবে কার্যক্রম পরিচালনা করছে।
        </p>
      </div>

      {/* Divisions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BANGLADESH_DIVISIONS.map((div) => (
          <div
            key={div.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col group"
          >
            <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
              <img
                src={div.imageUrl}
                alt={div.nameBn}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                {div.districtsCount} টি জেলা
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow space-y-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {div.nameBn}
                </h3>
                <p className="text-xs text-slate-500">{div.nameEn} Division</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {div.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">বিভাগীয় সমন্বয়ক:</span>
                  <span className="font-semibold text-slate-800">{div.presidentName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">সক্রিয় ইউনিট:</span>
                  <span className="font-bold text-emerald-700">{div.unitsCount} টি</span>
                </div>
              </div>

              <div className="pt-2 mt-auto">
                <button
                  onClick={() => handleSelectDivision(div.id)}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white font-semibold text-xs transition flex items-center justify-center gap-1"
                >
                  <span>জেলার তালিকা ও ইউনিট</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 text-center space-y-3">
        <h3 className="text-lg font-bold text-slate-900">
          আপনার বিভাগে জিআইও-র নতুন শাখা বা ক্যাম্পাস ইউনিট শুরু করতে চান?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          আপনার শিক্ষা প্রতিষ্ঠান অথবা উপজেলায় নতুন পাঠচক্র শুরু করতে কেন্দ্রীয় দপ্তরের সাথে যোগাযোগ করুন।
        </p>
        <div className="pt-2">
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
          >
            বিভাগীয় প্রতিনিধির সাথে যোগাযোগ
          </button>
        </div>
      </div>
    </div>
  );
};
