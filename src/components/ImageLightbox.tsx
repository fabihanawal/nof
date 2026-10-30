import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Tag } from 'lucide-react';

export const ImageLightbox: React.FC = () => {
  const { lightboxImage, setLightboxImage } = useApp();

  if (!lightboxImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setLightboxImage(null)}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setLightboxImage(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-video sm:aspect-auto sm:max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={lightboxImage.url}
            alt={lightboxImage.title}
            className="w-full h-full object-contain max-h-[70vh]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-4 sm:p-6 bg-slate-900 text-white space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-700 text-white">
              {lightboxImage.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {lightboxImage.date}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-100">{lightboxImage.title}</h3>
          {lightboxImage.caption && (
            <p className="text-sm text-slate-300 leading-relaxed">{lightboxImage.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
};
