import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DIVISIONS } from '../data/initialData';
import { Search, MapPin, Phone, Users, ShieldCheck, CheckCircle2, Building, Filter } from 'lucide-react';

export const DistrictsPage: React.FC = () => {
  const { districts, selectedDivisionId, setSelectedDivisionId, setCurrentPage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDivisionTab, setActiveDivisionTab] = useState<string>(selectedDivisionId || 'all');

  // Filter districts
  const filteredDistricts = districts.filter((d) => {
    const matchesDivision = activeDivisionTab === 'all' || d.divisionId === activeDivisionTab;
    const matchesSearch =
      d.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.presidentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.divisionNameBn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDivision && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'সক্রিয় পূর্ণাঙ্গ কমিটি':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'আহ্বায়ক কমিটি':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'প্রাথমিক ইউনিট':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'পুনর্গঠন চলছে':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          জেলা ডিরেক্টরি
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          বাংলাদেশের ৬৪ জেলা ও মহানগর ইউনিট
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          প্রতিটি জেলার সাংগঠনিক স্থিতি, সভাপতি ও সম্পাদিকার নাম এবং স্থানীয় যোগাযোগ নম্বর।
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Search Field */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="জেলার নাম বা দায়িত্বশীলার নাম দিয়ে খুঁজুন (যেমন: ঢাকা, সিলেট, খুলনা)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              মুছে ফেলুন
            </button>
          )}
        </div>

        {/* Division Tab Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            onClick={() => {
              setActiveDivisionTab('all');
              setSelectedDivisionId(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeDivisionTab === 'all'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            সকল বিভাগ ({districts.length})
          </button>
          {BANGLADESH_DIVISIONS.map((div) => {
            const count = districts.filter((d) => d.divisionId === div.id).length;
            const isActive = activeDivisionTab === div.id;
            return (
              <button
                key={div.id}
                onClick={() => {
                  setActiveDivisionTab(div.id);
                  setSelectedDivisionId(div.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {div.nameBn} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>মোট প্রদর্শিত জেলা: <strong>{filteredDistricts.length}</strong> টি</span>
        <span>সারাদেশে সক্রিয় কমিটি সমৃদ্ধ ৬৪ জেলা</span>
      </div>

      {/* Districts Grid */}
      {filteredDistricts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <p className="text-slate-500 text-sm">আপনার অনুসন্ধান অনুযায়ী কোনো জেলা পাওয়া যায়নি।</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveDivisionTab('all');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDistricts.map((dist) => (
            <div
              key={dist.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{dist.nameBn}</h3>
                  <p className="text-xs text-slate-500">{dist.nameEn} • {dist.divisionNameBn}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getStatusBadge(
                    dist.status
                  )} shrink-0`}
                >
                  {dist.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">জেলা সভানেত্রী:</span>
                  <span className="font-semibold text-slate-800">{dist.presidentName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">সেক্রেটারি:</span>
                  <span className="font-semibold text-slate-800">{dist.secretaryName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">যোগাযোগ নম্বর:</span>
                  <span className="font-bold text-emerald-700">{dist.contactPhone}</span>
                </div>
                {dist.officeAddress && (
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500">কার্যালয়:</span>
                    <span className="text-slate-700">{dist.officeAddress}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1 mt-auto text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  সদস্য: <strong>{dist.membersCount}</strong> জন
                </span>

                <button
                  onClick={() => setCurrentPage('join')}
                  className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                >
                  এই জেলায় যোগ দিন →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
