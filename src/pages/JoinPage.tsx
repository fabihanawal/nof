import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DIVISIONS } from '../data/initialData';
import {
  UserPlus,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Sparkles,
  Search,
  ShieldCheck,
  Printer,
  Copy,
  Check,
} from 'lucide-react';
import { MemberApplication } from '../types';

export const JoinPage: React.FC = () => {
  const { districts, addMemberApplication, members } = useApp();

  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState(BANGLADESH_DIVISIONS[0].nameBn);
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [institution, setInstitution] = useState('');
  const [interestArea, setInterestArea] = useState('শিক্ষা উন্নয়ন ও পাঠাগার');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState<MemberApplication | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  // Status Search State
  const [searchTrackingOrMobile, setSearchTrackingOrMobile] = useState('');
  const [searchedMember, setSearchedMember] = useState<MemberApplication | null | 'not_found'>(null);

  // Find division object to filter districts
  const currentDivisionObj = BANGLADESH_DIVISIONS.find((d) => d.nameBn === division);
  const availableDistricts = districts.filter(
    (d) => d.divisionId === currentDivisionObj?.id || d.divisionNameBn === division
  );

  // Auto-set first district when division changes
  React.useEffect(() => {
    if (availableDistricts.length > 0 && (!district || !availableDistricts.some((d) => d.nameBn === district))) {
      setDistrict(availableDistricts[0].nameBn);
    }
  }, [division, availableDistricts]);

  const interestOptions = [
    'শিক্ষা উন্নয়ন ও পাঠাগার',
    'তারবিয়াহ, আত্মশুদ্ধি ও চরিত্র গঠন',
    'সমাজসেবা ও জরুরি মানবিক সহায়তা',
    'মিডিয়া, প্রকাশনা ও দাওয়াহ',
    'দক্ষতা উন্নয়ন ও ক্যারিয়ার কাউন্সেলিং',
    'নারী নেতৃত্ব বিকাশ ও সংগঠন পরিচালনা',
    'সাংস্কৃতিক কর্মকাণ্ড ও ক্যালিগ্রাফি',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !district || !institution.trim()) {
      alert('দয়া করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addMemberApplication({
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        division,
        district,
        upazila: upazila.trim() || 'সদর',
        institution: institution.trim(),
        interestArea,
        notes: notes.trim(),
      });

      setSubmittedApplication(result);
    } catch (err) {
      console.error(err);
      alert('আবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearchStatus = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTrackingOrMobile.trim().toLowerCase();
    if (!query) return;

    const found = members.find(
      (m) =>
        m.trackingNumber.toLowerCase() === query ||
        m.mobile.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, ''))
    );

    if (found) {
      setSearchedMember(found);
    } else {
      setSearchedMember('not_found');
    }
  };

  const handleCopyTracking = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          সদস্য অন্তর্ভুক্তি
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          নারী অধিকার ফাউন্ডেশনে সদস্য হওয়ার আবেদন ফরম
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          নারীর সাংবিধানিক অধিকার, আইনি সুরক্ষা, শিক্ষা, স্বাস্থ্য ও স্বাবলম্বিতা প্রতিষ্ঠায় আমাদের জাতীয় মঞ্চে আপনিও স্বাগতম।
        </p>

        {/* Tab Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 mt-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
              activeTab === 'form' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            নতুন সদস্য আবেদন
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
              activeTab === 'status' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            আবেদনের স্ট্যাটাস যাচাই
          </button>
        </div>
      </div>

      {activeTab === 'form' ? (
        submittedApplication ? (
          /* Success Receipt Card */
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-500 shadow-xl space-y-6 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                ধন্যবাদ! আপনার আবেদন সফলভাবে গৃহীত হয়েছে
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                আপনার আবেদনটি নারী অধিকার ফাউন্ডেশনের কেন্দ্রীয় ও জেলা সমন্বয়কদের কাছে সংরক্ষিত হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।
              </p>
            </div>

            {/* Tracking Voucher Box */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">আবেদন ট্র্যাকিং নম্বর:</span>
                <button
                  onClick={() => handleCopyTracking(submittedApplication.trackingNumber)}
                  className="text-xs text-emerald-800 font-bold flex items-center gap-1 hover:underline"
                >
                  {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedTracking ? 'কপি হয়েছে' : 'কপি করুন'}
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-emerald-300 font-mono font-bold text-lg text-emerald-950 text-center tracking-wider">
                {submittedApplication.trackingNumber}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-emerald-200">
                <div>
                  <span className="text-slate-500 block">আবেদনকারীর নাম:</span>
                  <span className="font-bold text-slate-800">{submittedApplication.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">জেলা ও বিভাগ:</span>
                  <span className="font-bold text-slate-800">
                    {submittedApplication.district}, {submittedApplication.division}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">মোবাইল:</span>
                  <span className="font-bold text-slate-800">{submittedApplication.mobile}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">বর্তমান স্ট্যাটাস:</span>
                  <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[11px]">
                    {submittedApplication.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>রসিদ প্রিন্ট বা সেভ করুন</span>
              </button>

              <button
                onClick={() => {
                  setSubmittedApplication(null);
                  setName('');
                  setMobile('');
                  setEmail('');
                  setUpazila('');
                  setInstitution('');
                  setNotes('');
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs transition"
              >
                নতুন আবেদন করুন
              </button>
            </div>
          </div>
        ) : (
          /* Actual Join Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6"
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <span>ব্যক্তিগত ও শিক্ষাগত তথ্যাবলী</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                সকল তথ্য ফায়ারবেস ডেটাবেসে বিশ্বস্ততার সাথে সংরক্ষিত থাকবে।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">
                  পূর্ণ নাম (বাংলায়) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ফাতিমা আক্তার নিহা"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="01712-XXXXXX"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">ইমেইল ঠিকানা (ঐচ্ছিক)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              {/* Division */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  বিভাগ <span className="text-red-500">*</span>
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  {BANGLADESH_DIVISIONS.map((d) => (
                    <option key={d.id} value={d.nameBn}>
                      {d.nameBn}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  জেলা <span className="text-red-500">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  {availableDistricts.map((d) => (
                    <option key={d.id} value={d.nameBn}>
                      {d.nameBn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  উপজেলা / থানা <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ধানমন্ডি / মিরপুর / সদর"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* Institution / Profession */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  শিক্ষা প্রতিষ্ঠান বা পেশা <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ঢাকা বিশ্ববিদ্যালয় / ইডেন মহিলা কলেজ"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
              </div>

              {/* Interest Area */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">
                  সংগঠনে আপনার আগ্রহের প্রধান ক্ষেত্র <span className="text-red-500">*</span>
                </label>
                <select
                  value={interestArea}
                  onChange={(e) => setInterestArea(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
                >
                  {interestOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional notes */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">
                  আপনার কোনো পূর্ব অভিজ্ঞতা বা প্রত্যাশা (ঐচ্ছিক)
                </label>
                <textarea
                  rows={3}
                  placeholder="সংগঠন সম্পর্কে আপনার কোনো মতামত বা অতিরিক্ত দক্ষতা থাকলে উল্লেখ করতে পারেন..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                তথ্যসমূহ গোপন রাখা হবে ও শুধুমাত্র সাংগঠনিক কাজে ব্যবহৃত হবে।
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isSubmitting ? 'সংরক্ষণ করা হচ্ছে...' : 'আবেদন জমা দিন'}</span>
              </button>
            </div>
          </form>
        )
      ) : (
        /* Status Lookup Tab */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
          <div className="space-y-2 text-center max-w-md mx-auto">
            <h2 className="text-xl font-bold text-slate-900">আপনার আবেদনের অবস্থা জানুন</h2>
            <p className="text-xs text-slate-500">
              ফরম পূরণের পর প্রাপ্ত ট্র্যাকিং নম্বর (যেমন: GIO-BD-260101) অথবা আপনার মোবাইল নম্বর প্রদান করুন।
            </p>
          </div>

          <form onSubmit={handleSearchStatus} className="flex gap-2 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="ট্র্যাকিং নম্বর বা মোবাইল নম্বর..."
              value={searchTrackingOrMobile}
              onChange={(e) => setSearchTrackingOrMobile(e.target.value)}
              className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition flex items-center gap-1.5 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>যাচাই</span>
            </button>
          </form>

          {searchedMember && searchedMember !== 'not_found' && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 max-w-lg mx-auto animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-mono font-bold text-emerald-900 text-sm">
                  {searchedMember.trackingNumber}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    searchedMember.status === 'অনুমোদিত'
                      ? 'bg-emerald-100 text-emerald-800'
                      : searchedMember.status === 'পেন্ডিং'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {searchedMember.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                <div>
                  <span className="text-slate-500 block">নাম:</span>
                  <span className="font-semibold">{searchedMember.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">জেলা:</span>
                  <span className="font-semibold">
                    {searchedMember.district} ({searchedMember.division})
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">প্রতিষ্ঠান:</span>
                  <span className="font-semibold">{searchedMember.institution}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">আগ্রহের ক্ষেত্র:</span>
                  <span className="font-semibold">{searchedMember.interestArea}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
                আবেদনের তারিখ: {new Date(searchedMember.appliedAt).toLocaleDateString('bn-BD')}
              </div>
            </div>
          )}

          {searchedMember === 'not_found' && (
            <div className="p-6 text-center text-xs text-red-600 bg-red-50 rounded-2xl border border-red-100 max-w-lg mx-auto">
              দুঃখিত, এই নম্বরে কোনো আবেদন পাওয়া যায়নি। সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।
            </div>
          )}
        </div>
      )}
    </div>
  );
};
