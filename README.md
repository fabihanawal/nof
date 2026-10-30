# নারী অধিকার ফাউন্ডেশন (Nari Odhikar Foundation)

**নারী অধিকার ফাউন্ডেশন (Nari Odhikar Foundation)** — বাংলাদেশের নারীদের সুরক্ষা, আইনি সমঅধিকার, গুণগত শিক্ষা, অর্থনৈতিক স্বাবলম্বিতা এবং বলিষ্ঠ নেতৃত্ব বিকাশে নিবেদিত অগ্রণী জাতীয় প্ল্যাটফর্ম।

এই রিপোজিটরিটি **Vite + React + TypeScript + Tailwind CSS** এবং **Firebase Firestore** দিয়ে নির্মিত। এটি **GitHub**-এর মাধ্যমে সরাসরি **Vercel**-এ এক ক্লিকে ডিপ্লয় (Deploy) করার জন্য সম্পূর্ণ প্রস্তুত।

---

## 🚀 গিটহাব (GitHub) এর মাধ্যমে ভার্সেল (Vercel)-এ প্রকাশের নির্দেশিকা

### ধাপ ১: গিটহাবে কোড পুশ করা (Push to GitHub)

১. আপনার কম্পিউটারে টার্মিনাল বা কমান্ড প্রম্পট খুলুন এবং প্রজেক্ট ডিরেক্টরিতে যান:
```bash
git init
git add .
git commit -m "Initial commit: Nari Odhikar Foundation Portal with Vercel configuration"
```

২. [GitHub.com](https://github.com)-এ গিয়ে **New Repository** তৈরি করুন (যেমন: `nari-odhikar-foundation`)।

৩. আপনার লোকাল রিপোজিটরির সাথে গিটহাব যুক্ত করে পুশ করুন:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/nari-odhikar-foundation.git
git push -u origin main
```

---

### ধাপ ২: ভার্সেল (Vercel)-এ ইমপোর্ট ও ডিপ্লয় করা

১. [Vercel.com](https://vercel.com)-এ লগইন করুন (আপনার GitHub অ্যাকাউন্ট দিয়ে সরাসরি লগইন করা সবচেয়ে সহজ)।
২. ড্যাশবোর্ডে গিয়ে **"Add New..."** বাটনে ক্লিক করে **"Project"** নির্বাচন করুন।
৩. আপনার GitHub রিপোজিটরি তালিকা থেকে `nari-odhikar-foundation` নির্বাচন করে **"Import"**-এ ক্লিক করুন।
৪. **Configure Project** স্ক্রিনে নিম্নলিখিত সেটিংস স্বয়ংক্রিয়ভাবে শনাক্ত হবে (না হলে নিশ্চিত করুন):
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
৫. **"Deploy"** বাটনে ক্লিক করুন।
৬. ১ থেকে ২ মিনিটের মধ্যে আপনার ওয়েবসাইটটি লাইভ হয়ে যাবে এবং একটি ফ্রি ডোমেইন পাবেন (যেমন: `https://nari-odhikar-foundation.vercel.app`)।

---

### ⚙️ Vercel কনফিগারেশন ফাইল (`vercel.json`)

এই প্রজেক্টে ইতিমধ্যে রুট ডিরেক্টরিতে `vercel.json` সংযুক্ত করা রয়েছে:
- **SPA Rewrites**: পেজ রিফ্রেশ বা অভ্যন্তরীণ লিংকে কোনো ৪MD বা 404 ত্রুটি হবে না।
- **Asset Caching**: ইমেজ ও জাভাস্ক্রিপ্ট এসেটের দ্রুতগতির জন্য ক্যাশিং পলিসি যুক্ত রয়েছে।

---

### 🌐 কাস্টম ডোমেইন যুক্ত করার নিয়ম (Custom Domain)

আপনার নিজস্ব ডোমেইন (যেমন: `nariodhikar.org` বা `nariodhikar.com`) থাকলে:
1. Vercel ড্যাশবোর্ডে গিয়ে প্রজেক্টের **Settings > Domains**-এ যান।
2. আপনার ডোমেইন নাম লিখুন এবং **Add** চাপুন।
3. Vercel প্রদত্ত DNS রেকর্ড (A Record বা CNAME) আপনার ডোমেইন প্রোভাইডারে (Namecheap, GoDaddy, ইত্যাদিতে) যুক্ত করুন।
4. Vercel স্বয়ংক্রিয়ভাবে বিনামূল্যে আজীবন **SSL (HTTPS)** সার্টিফিকেট সক্রিয় করবে।

---

### 🔄 স্বয়ংক্রিয় CI/CD (Continuous Deployment)

এখন থেকে আপনি GitHub-এ কোনো পরিবর্তন `git push` করলেই Vercel স্বয়ংক্রিয়ভাবে নতুন বিল্ড তৈরি করে মুহূর্তের মধ্যে লাইভ সাইট আপডেট করে দেবে।

---

### 🛠️ লোকাল ডেভেলপমেন্ট (Local Setup)

```bash
# ডিপেন্ডেন্সি ইন্সটল
npm install

# ডেভেলপমেন্ট সার্ভার চালু
npm run dev

# প্রোডাকশন বিল্ড পরীক্ষা
npm run build
npm run preview
```

---

### 🛡️ এডমিন প্যানেল (CMS)

- পোর্টালের টপবারে **"এডমিন CMS"** বাটনে ক্লিক করে সরাসরি এডমিন কন্ট্রোল প্যানেলে প্রবেশ করা যায়।
- হোমপেজের ৫-ছবির ইন্টারাক্টিভ স্লাইডশো, সংবাদ, গ্যালারি, নেতৃত্ব, সদস্য আবেদন ও সাইট সেটিংস সহজেই পরিবর্তন ও নিয়ন্ত্রণ করা সম্ভব।
