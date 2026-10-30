import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Tag, Image as ImageIcon, Video, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const { gallery, setLightboxImage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');

  const categories = ['সকল', 'সম্মেলন', 'শিক্ষা ও তারবিয়াহ', 'সমাজসেবা', 'কর্মশালা', 'দাওয়াহ'];

  const filteredGallery = gallery.filter((item) => {
    return selectedCategory === 'সকল' || item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          স্থিরচিত্র ও মিডিয়া
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          ছবি ও কার্যক্রমের গ্যালারি
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          সারাদেশে আয়োজিত যুবতী সম্মেলন, শিক্ষাবৃত্তি পরীক্ষা, আত্মশুদ্ধি ক্যাম্প ও মানবিক সহায়তার মুহূর্তসমূহ।
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImage(item)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col group"
          >
            <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                <div className="p-3 rounded-full bg-black/60 backdrop-blur-sm">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                {item.category}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between space-y-2">
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1 text-base">
                {item.title}
              </h3>
              {item.caption && (
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              )}
              <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-1">
                <Calendar className="w-3 h-3 text-emerald-600" />
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
