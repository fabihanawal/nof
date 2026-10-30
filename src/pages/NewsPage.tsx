import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, User, Search, Tag, ArrowRight, Clock, MapPin } from 'lucide-react';
import { NewsItem } from '../types';

export const NewsPage: React.FC = () => {
  const { news, events, setSelectedNewsItem } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['সকল', 'সংবাদ', 'বিজ্ঞপ্তি', 'প্রেস রিলিজ', 'প্রতিবেদন', 'কার্যক্রম'];

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === 'সকল' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          তথ্য ও প্রচার
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          সংবাদ, বিজ্ঞপ্তি ও প্রেস রিলিজ
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          জিআইও বাংলাদেশের কেন্দ্রীয় ও বিভাগীয় পর্যায়ের সর্বশেষ খবর, প্রেস বিজ্ঞপ্তি ও গুরুত্বপূর্ণ দিকনির্দেশনা।
        </p>
      </div>

      {/* Search & Categories Filter */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="সংবাদের শিরোনাম বা বিষয়বস্তু খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main News List (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {filteredNews.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              কোনো সংবাদ বা বিজ্ঞপ্তি পাওয়া যায়নি।
            </div>
          ) : (
            filteredNews.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedNewsItem(item)}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-6 cursor-pointer group"
              >
                {item.imageUrl && (
                  <div className="sm:w-56 h-44 shrink-0 rounded-xl overflow-hidden bg-slate-100 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-700 text-white shadow">
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col flex-grow justify-between space-y-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        {item.date}
                      </span>
                      {item.author && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-emerald-600" />
                          {item.author}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {item.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
                      পূর্ণ বিবরণ পড়ুন <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Sidebar: Upcoming Events & Notices (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>আসন্ন কর্মসূচি ও ইভেন্ট</span>
            </h3>

            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-emerald-50/50 transition"
                >
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {ev.status}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{ev.title}</h4>
                  <div className="space-y-1 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {ev.date} ({ev.time})
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      {ev.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
