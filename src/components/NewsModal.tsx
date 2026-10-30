import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, User, Tag, Share2 } from 'lucide-react';

export const NewsModal: React.FC = () => {
  const { selectedNewsItem, setSelectedNewsItem } = useApp();

  if (!selectedNewsItem) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedNewsItem.title,
        text: selectedNewsItem.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('সংবাদের লিংক কপি করা হয়েছে!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <Tag className="w-3 h-3" />
            {selectedNewsItem.category}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition"
              title="শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedNewsItem(null)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {selectedNewsItem.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {selectedNewsItem.date}
            </span>
            {selectedNewsItem.author && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                {selectedNewsItem.author}
              </span>
            )}
          </div>

          {selectedNewsItem.imageUrl && (
            <div className="rounded-xl overflow-hidden shadow-sm aspect-video bg-slate-100">
              <img
                src={selectedNewsItem.imageUrl}
                alt={selectedNewsItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="prose prose-emerald max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-2">
            {selectedNewsItem.content}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={() => setSelectedNewsItem(null)}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
