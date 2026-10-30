import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DIVISIONS } from '../data/initialData';
import { MapPin, Phone, Mail, Send, Clock, CheckCircle2, MessageSquare, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setName('');
    setPhone('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSentSuccess(false), 6000);
  };

  const faqs = [
    {
      q: 'জিআইও বাংলাদেশ-এ কারা সদস্য হতে পারেন?',
      a: 'বাংলাদেশের যেকোনো মুসলিম ছাত্রী (স্কুল, কলেজ, মাদ্রাসা, বিশ্ববিদ্যালয়) এবং তরুণী যারা সংগঠনের লক্ষ্য ও উদ্দেশ্যের সাথে একমত পোষণ করেন, তারা সদস্য হতে পারেন।',
    },
    {
      q: 'সংগঠনে যুক্ত হওয়ার জন্য কি কোনো ফি দিতে হয়?',
      a: 'না, সদস্য ফরম পূরণ এবং প্রাথমিক নিবন্ধনে কোনো ফি প্রযোজ্য নয়। এটি সম্পূর্ণ নিঃস্বার্থ নৈতিক ও সামাজিক প্ল্যাটফর্ম।',
    },
    {
      q: 'আমি কি শুধু নির্দিষ্ট কোনো প্রকল্পে স্বেচ্ছাসেবক হিসেবে কাজ করতে পারি?',
      a: 'হ্যাঁ, আপনি চাইলে শুধুমাত্র সমাজসেবা, ব্লাড ডোনেশন, শিক্ষা সহায়তা বা মিডিয়া টিমে আপনার পছন্দের ক্ষেত্রে স্বেচ্ছাসেবক হিসেবে অবদান রাখতে পারেন।',
    },
    {
      q: 'আমার জেলায় নতুন ইউনিট শুরু করতে কী করতে হবে?',
      a: 'যোগাযোগ ফর্মের মাধ্যমে অথবা সরাসরি বিভাগীয় সমন্বয়কের সাথে ফোনে কথা বলে আপনি আপনার ক্যাম্পাসে বা উপজেলায় স্টাডি সার্কেল শুরু করার দিকনির্দেশনা নিতে পারেন।',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          যোগাযোগ ও অনুসন্ধান
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          আমাদের সাথে যোগাযোগ করুন
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          যেকোনো প্রশ্ন, পরামর্শ, আমন্ত্রণ অথবা সাংগঠনিক তথ্যের জন্য কেন্দ্রীয় দপ্তর বা বিভাগীয় প্রতিনিধির সাথে যোগাযোগ করতে পারেন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information & Offices (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg border border-emerald-800">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
                হেডকোয়ার্টার্স
              </span>
              <h3 className="text-xl font-bold mt-1">কেন্দ্রীয় প্রধান কার্যালয়</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-emerald-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-300 shrink-0" />
                <span>{settings.contactPhone} (হটলাইন)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-300 shrink-0" />
                <span>{settings.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-300 shrink-0" />
                <span>শনিবার থেকে বৃহস্পতিবার: সকাল ১০:০০ - বিকাল ৫:০০</span>
              </div>
            </div>
          </div>

          {/* Division Helplines */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              বিভাগীয় হেল্পলাইন নম্বরসমূহ
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {BANGLADESH_DIVISIONS.map((div) => (
                <div key={div.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-800">{div.nameBn}</p>
                  <p className="text-emerald-700 font-mono text-[11px]">{div.contactNumber}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">সরাসরি বার্তা পাঠান</h3>
              <p className="text-xs text-slate-500 mt-1">
                আপনার বার্তাটি সংশ্লিষ্ট বিভাগের দায়িত্বশীলার কাছে সরাসরি পৌঁছে যাবে।
              </p>
            </div>

            {sentSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950 text-base">ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে</h4>
                <p className="text-xs text-emerald-800">
                  আমাদের দায়িত্বশীলা টিম দ্রুততম সময়ে আপনার দেওয়া ফোন নম্বরে বা ইমেইলে যোগাযোগ করবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="আপনার নাম লিখুন"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      required
                      placeholder="01712-XXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">বিষয়ের শিরোনাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: স্টাডি সার্কেল শুরু সংক্রান্ত / অনুদান তথ্য"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">আপনার বার্তা বা পরামর্শ *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>বার্তা পাঠিয়ে দিন</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h3 className="text-xl font-bold text-slate-900">সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)</h3>
          <p className="text-xs text-slate-500">সংগঠন ও কার্যক্রম সম্পর্কে কিছু সাধারণ তথ্যাবলী</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : index)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-800 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isExpanded ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
