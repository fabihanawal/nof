import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, User, Eye, EyeOff, X, KeyRound, AlertCircle } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    showAdminLoginModal,
    setShowAdminLoginModal,
    loginAdmin,
    setCurrentPage,
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showAdminLoginModal) {
      setUsername('');
      setPassword('');
      setErrorMessage(null);
      setIsSubmitting(false);
      // Auto focus username after modal mount
      setTimeout(() => {
        usernameInputRef.current?.focus();
      }, 100);
    }
  }, [showAdminLoginModal]);

  if (!showAdminLoginModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password) {
      setErrorMessage('অনুগ্রহ করে ইউজারনেম ও পাসওয়ার্ড উভয়ই প্রদান করুন।');
      return;
    }

    setIsSubmitting(true);

    // Verify credentials
    const success = loginAdmin(username, password);

    if (success) {
      setIsSubmitting(false);
      setShowAdminLoginModal(false);
      setCurrentPage('admin');
    } else {
      setIsSubmitting(false);
      setErrorMessage('ভুল ইউজারনেম বা পাসওয়ার্ড! সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।');
      setPassword('');
    }
  };

  const handleClose = () => {
    setShowAdminLoginModal(false);
    setErrorMessage(null);
    setUsername('');
    setPassword('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 px-6 py-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 flex items-center justify-center transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-emerald-400/30 flex items-center justify-center shadow-inner text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-950 mb-1">
                সুরক্ষিত এক্সেস
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white font-bengali">
                অ্যাডমিন পোর্টাল লগইন
              </h3>
              <p className="text-xs text-emerald-200">
                নারী অধিকার ফাউন্ডেশন (Nari Odhikar Foundation)
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Username Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-bengali">
              ইউজারনেম (Username)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                ref={usernameInputRef}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400 font-sans"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-bengali">
              পাসওয়ার্ড (Password)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-slate-900 placeholder:text-slate-400 font-sans"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
            <KeyRound className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>সঠিক ইউজারনেম ও পাসওয়ার্ড ইনপুট দিলে তবেই এডমিন প্যানেল ওপেন হবে।</span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs shadow-md shadow-emerald-900/20 transition flex items-center gap-2 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'যাচাই করা হচ্ছে...' : 'লগইন করুন'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
