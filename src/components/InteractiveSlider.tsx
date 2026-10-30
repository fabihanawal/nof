import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { SlideItem, PageView } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  Sparkles,
  Maximize2,
  ShieldCheck,
  Award,
  BookOpen,
} from 'lucide-react';

export const InteractiveSlider: React.FC = () => {
  const { slides, setCurrentPage, setSelectedProjectItem, setLightboxImage } = useApp();
  
  // Filter only active slides or fallback to all if none active
  const activeSlides = slides.filter((s) => s.isActive);
  const displaySlides: SlideItem[] = activeSlides.length > 0 ? activeSlides : slides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5500; // 5.5 seconds per slide
  const PROGRESS_INTERVAL = 50;

  // Bengali numerals helper
  const toBengaliNumber = (num: number) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
      .toString()
      .split('')
      .map((d) => bnDigits[parseInt(d, 10)] || d)
      .join('');
  };

  // Next Slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
    setProgress(0);
  };

  // Previous Slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
    setProgress(0);
  };

  // Jump to specific slide
  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Auto-play interval and progress bar
  useEffect(() => {
    if (!isPlaying || displaySlides.length <= 1) return;

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(progressTimer);
  }, [isPlaying, currentIndex, displaySlides.length]);

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      // Swiped left
      nextSlide();
    } else if (distance < -50) {
      // Swiped right
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const currentSlide = displaySlides[currentIndex] || displaySlides[0];

  const handleSlideAction = (slide: SlideItem) => {
    if (slide.buttonLinkPage) {
      setCurrentPage(slide.buttonLinkPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('projects');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!displaySlides || displaySlides.length === 0) {
    return null;
  }

  return (
    <div
      className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 bg-emerald-950 group select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      id="homepage-interactive-slider"
    >
      {/* Aspect Ratio Container */}
      <div className="relative aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/9] lg:aspect-[2.4/1] min-h-[420px] sm:min-h-[460px] md:min-h-[500px] w-full overflow-hidden">
        {/* All slides stacked for smooth crossfade */}
        {displaySlides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 pointer-events-none scale-105'
              } transition-transform duration-1000 ease-out`}
            >
              {/* Background Slide Image with subtle Ken-Burns effect */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-7000 ease-linear scale-105"
                referrerPolicy="no-referrer"
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  // Fallback high quality community image
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80';
                }}
              />

              {/* Multi-layer aesthetic gradients for impeccable legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-transparent" />
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />

              {/* Slide Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-12 lg:p-14 text-white">
                <div className="max-w-3xl space-y-3 sm:space-y-4">
                  {/* Category Badge & Live Indicator */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {slide.categoryBadge && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-amber-200 border border-emerald-400/50 font-bold text-xs sm:text-sm tracking-wide shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        {slide.categoryBadge}
                      </span>
                    )}

                    <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-emerald-200 text-xs font-medium border border-white/10">
                      স্লাইড {toBengaliNumber(index + 1)} / {toBengaliNumber(displaySlides.length)}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-white leading-tight drop-shadow-md">
                    {slide.title}
                  </h2>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-base md:text-lg text-emerald-100/90 font-medium line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl drop-shadow">
                    {slide.subtitle}
                  </p>

                  {/* Action Button */}
                  <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleSlideAction(slide)}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                      id={`slide-action-btn-${index}`}
                    >
                      <span>{slide.buttonText || 'বিস্তারিত জানুন'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Progress Bar Line at bottom of the frame */}
        <div className="absolute bottom-0 inset-x-0 h-1.5 bg-black/40 z-30 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Prev / Next Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg group-hover:opacity-100 opacity-80 sm:opacity-90"
          aria-label="Previous Slide"
          id="slider-prev-btn"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg group-hover:opacity-100 opacity-80 sm:opacity-90"
          aria-label="Next Slide"
          id="slider-next-btn"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Top-Right Play/Pause & Fullscreen Controls */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-black/50 hover:bg-black/70 text-emerald-200 backdrop-blur-md border border-white/20 transition hover:text-white"
            title={isPlaying ? 'স্লাইডশো বিরতি দিন' : 'স্লাইডশো শুরু করুন'}
            aria-label="Toggle play/pause"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Bottom Thumbnail Bar & Interactive Indicator Tabs */}
      <div className="bg-emerald-950/95 border-t border-emerald-800/80 p-3 sm:p-4 z-20">
        <div className="flex items-center justify-between gap-4">
          {/* Slogan / Organization watermark */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-emerald-300/80 font-medium shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>নারী অধিকার ফাউন্ডেশন • ফটো ফিচার</span>
          </div>

          {/* Interactive Slide Thumbnail Strip */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 scrollbar-none mx-auto lg:mx-0 w-full lg:w-auto justify-center">
            {displaySlides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id || idx}
                  onClick={() => goToSlide(idx)}
                  className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl transition-all duration-200 shrink-0 text-left ${
                    isActive
                      ? 'bg-emerald-800 text-white ring-2 ring-amber-400 shadow-md'
                      : 'bg-emerald-900/60 hover:bg-emerald-800/60 text-emerald-300/70 hover:text-white'
                  }`}
                  id={`thumbnail-slide-btn-${idx}`}
                >
                  {/* Thumbnail micro preview */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden shrink-0 border border-emerald-700/60 relative">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-emerald-600/30 ring-1 ring-amber-400" />
                    )}
                  </div>

                  {/* Text Title for larger screens */}
                  <div className="hidden sm:block max-w-[120px] md:max-w-[160px] truncate">
                    <p className="text-[11px] font-bold text-amber-300 leading-none mb-0.5">
                      {slide.categoryBadge || `ছবি ${toBengaliNumber(idx + 1)}`}
                    </p>
                    <p className="text-xs text-white truncate font-medium">
                      {slide.title}
                    </p>
                  </div>

                  {/* Number pill for mobile */}
                  <span className="sm:hidden text-xs font-bold text-amber-300">
                    ০{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* District & Units quick reminder */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-emerald-200 shrink-0">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-900 border border-emerald-700 text-amber-300 font-semibold">
              ৬৪ জেলায় সক্রিয়
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
