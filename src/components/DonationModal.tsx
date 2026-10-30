import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Copy, Check, ShieldCheck, CreditCard, Building } from 'lucide-react';

export const DonationModal: React.FC = () => {
  const { showDonationModal, setShowDonationModal, settings } = useApp();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!showDonationModal) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-6 relative">
          <button
            onClick={() => setShowDonationModal(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow">
              <Heart className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-xl font-bold">কল্যাণ তহবিলে অনুদান ও সহায়তা</h3>
              <p className="text-xs text-emerald-200">Nari Odhikar Foundation Welfare & Education Fund</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          <p className="text-sm text-slate-600 leading-relaxed">
            আপনার সদকাহ ও আন্তরিক অনুদানে পরিচালিত হয় মেধাবী ছাত্রীদের শিক্ষাবৃত্তি, বিধবা ও অসহায় পরিবারের খাদ্য সহায়তা, বন্যা-শীতকালীন জরুরি ত্রাণ এবং দেশব্যাপী নৈতিক তরুণী গঠনের কার্যক্রম।
          </p>

          {/* Bkash & Nagad Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">মোবাইল ব্যাংকিং</h4>

            {/* bKash */}
            <div className="p-3.5 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-600 text-white font-bold text-xs flex items-center justify-center">
                  বিকাশ
                </div>
                <div>
                  <p className="text-xs text-pink-700 font-semibold">বিকাশ মার্চেন্ট / পার্সোনাল নম্বর</p>
                  <p className="text-sm font-bold text-slate-900">{settings.bkashNumber || '01712-345678'}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(settings.bkashNumber?.split(' ')[0] || '01712-345678', 'bkash')}
                className="p-2 rounded-lg bg-white hover:bg-pink-100 text-pink-700 border border-pink-300 transition text-xs font-medium flex items-center gap-1 shadow-sm"
              >
                {copiedField === 'bkash' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>

            {/* Nagad */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                  নগদ
                </div>
                <div>
                  <p className="text-xs text-amber-800 font-semibold">নগদ মার্চেন্ট / পার্সোনাল নম্বর</p>
                  <p className="text-sm font-bold text-slate-900">{settings.nagadNumber || '01812-345678'}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(settings.nagadNumber?.split(' ')[0] || '01812-345678', 'nagad')}
                className="p-2 rounded-lg bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 transition text-xs font-medium flex items-center gap-1 shadow-sm"
              >
                {copiedField === 'nagad' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bank Transfer */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">ব্যাংক ট্রান্সফার</h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1 relative">
              <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                <Building className="w-4 h-4 text-emerald-700" />
                <span>সরাসরি ব্যাংক অ্যাকাউন্ট বিবরণী</span>
              </div>
              <p className="leading-relaxed font-sans">{settings.bankDetails}</p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => copyToClipboard(settings.bankDetails, 'bank')}
                  className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-100 transition flex items-center gap-1"
                >
                  {copiedField === 'bank' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>বিবরণ কপি করুন</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              অনুদান প্রেরণের পর আপনার নাম ও অনুদানের উদ্দেশ্য উল্লেখ করে এসএমএস করতে পারেন: <strong>{settings.contactPhone}</strong>। আপনার অর্থ শতভাগ বিশ্বস্ততার সাথে অসহায়দের সেবায় ব্যয় করা হবে।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setShowDonationModal(false)}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold transition"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
    </div>
  );
};
