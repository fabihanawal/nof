import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DIVISIONS } from '../data/initialData';
import {
  LayoutDashboard,
  Users,
  Settings,
  Newspaper,
  Image as ImageIcon,
  Award,
  MapPin,
  Calendar,
  Layers,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Save,
  Eye,
  LogOut,
  Phone,
  Mail,
  ShieldCheck,
  Search,
  Sliders,
  Upload,
  ArrowUp,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import {
  NewsItem,
  GalleryItem,
  LeaderItem,
  DistrictUnit,
  EventItem,
  MemberApplication,
  SlideItem,
  PageView,
} from '../types';

export const AdminCMS: React.FC = () => {
  const {
    settings,
    updateSettings,
    news,
    addNews,
    updateNews,
    deleteNews,
    leaders,
    addLeader,
    updateLeader,
    deleteLeader,
    districts,
    addDistrict,
    updateDistrict,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    events,
    addEvent,
    deleteEvent,
    projects,
    updateProject,
    members,
    updateMemberStatus,
    deleteMember,
    slides,
    addSlide,
    updateSlide,
    deleteSlide,
    reorderSlides,
    setCurrentPage,
    isLoading,
    refreshFromFirebase,
  } = useApp();

  type AdminTab =
    | 'dashboard'
    | 'slideshow'
    | 'members'
    | 'banner-settings'
    | 'news'
    | 'gallery'
    | 'leadership'
    | 'districts'
    | 'events'
    | 'projects';

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Slide Manager Form State
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideCategory, setSlideCategory] = useState('আইনি সুরক্ষা ও মানবাধিকার');
  const [slideImageUrl, setSlideImageUrl] = useState('');
  const [slideButtonText, setSlideButtonText] = useState('বিস্তারিত জানুন');
  const [slideButtonLinkPage, setSlideButtonLinkPage] = useState<PageView>('projects');
  const [slideOrder, setSlideOrder] = useState(1);
  const [slideIsActive, setSlideIsActive] = useState(true);
  const [slideModalOpen, setSlideModalOpen] = useState(false);
  const [slideImageUploadLoading, setSlideImageUploadLoading] = useState(false);

  // Banner / Settings Form State
  const [heroSlogan, setHeroSlogan] = useState(settings.heroSlogan || '');
  const [heroTitle, setHeroTitle] = useState(settings.heroTitle || '');
  const [heroSubtitle, setHeroSubtitle] = useState(settings.heroSubtitle || '');
  const [heroNotice, setHeroNotice] = useState(settings.heroNotice || '');
  const [heroImageUrl, setHeroImageUrl] = useState(settings.heroImageUrl || '');
  const [contactPhone, setContactPhone] = useState(settings.contactPhone || '');
  const [contactEmail, setContactEmail] = useState(settings.contactEmail || '');
  const [officeAddress, setOfficeAddress] = useState(settings.officeAddress || '');
  const [bkashNumber, setBkashNumber] = useState(settings.bkashNumber || '');
  const [nagadNumber, setNagadNumber] = useState(settings.nagadNumber || '');
  const [bankDetails, setBankDetails] = useState(settings.bankDetails || '');
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  // News Manager Form State
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<NewsItem['category']>('সংবাদ');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsDate, setNewsDate] = useState(new Date().toISOString().split('T')[0]);
  const [newsImageUrl, setNewsImageUrl] = useState('');
  const [newsAuthor, setNewsAuthor] = useState('কেন্দ্রীয় দপ্তর');
  const [newsModalOpen, setNewsModalOpen] = useState(false);

  // Gallery Manager Form State
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState<GalleryItem['category']>('সম্মেলন');
  const [galUrl, setGalUrl] = useState('');
  const [galCaption, setGalCaption] = useState('');
  const [galDate, setGalDate] = useState(new Date().toISOString().split('T')[0]);
  const [galModalOpen, setGalModalOpen] = useState(false);

  // Leader Manager Form State
  const [editingLeaderId, setEditingLeaderId] = useState<string | null>(null);
  const [leaderName, setLeaderName] = useState('');
  const [leaderDesignation, setLeaderDesignation] = useState('');
  const [leaderDivision, setLeaderDivision] = useState('ঢাকা বিভাগ');
  const [leaderEducation, setLeaderEducation] = useState('');
  const [leaderTerm, setLeaderTerm] = useState('২০২৪-২০২৬ সেশন');
  const [leaderBio, setLeaderBio] = useState('');
  const [leaderImageUrl, setLeaderImageUrl] = useState('');
  const [leaderModalOpen, setLeaderModalOpen] = useState(false);

  // District Manager Form State
  const [editingDistId, setEditingDistId] = useState<string | null>(null);
  const [distNameBn, setDistNameBn] = useState('');
  const [distNameEn, setDistNameEn] = useState('');
  const [distDivisionId, setDistDivisionId] = useState('dhaka');
  const [distStatus, setDistStatus] = useState<DistrictUnit['status']>('সক্রিয় পূর্ণাঙ্গ কমিটি');
  const [distPresident, setDistPresident] = useState('');
  const [distSecretary, setDistSecretary] = useState('');
  const [distPhone, setDistPhone] = useState('');
  const [distMembers, setDistMembers] = useState(250);
  const [distModalOpen, setDistModalOpen] = useState(false);

  // Event Manager Form State
  const [evTitle, setEvTitle] = useState('');
  const [evDate, setEvDate] = useState('');
  const [evTime, setEvTime] = useState('');
  const [evLocation, setEvLocation] = useState('');
  const [evDescription, setEvDescription] = useState('');
  const [evModalOpen, setEvModalOpen] = useState(false);

  // Slide Form Handlers
  const resetSlideForm = () => {
    setEditingSlideId(null);
    setSlideTitle('');
    setSlideSubtitle('');
    setSlideCategory('আইনি সুরক্ষা ও মানবাধিকার');
    setSlideImageUrl('');
    setSlideButtonText('বিস্তারিত জানুন');
    setSlideButtonLinkPage('projects');
    setSlideOrder(slides.length + 1);
    setSlideIsActive(true);
  };

  const startEditSlide = (slide: SlideItem) => {
    setEditingSlideId(slide.id);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle);
    setSlideCategory(slide.categoryBadge || 'আইনি সুরক্ষা ও মানবাধিকার');
    setSlideImageUrl(slide.imageUrl);
    setSlideButtonText(slide.buttonText || 'বিস্তারিত জানুন');
    setSlideButtonLinkPage(slide.buttonLinkPage || 'projects');
    setSlideOrder(slide.order);
    setSlideIsActive(slide.isActive);
    setSlideModalOpen(true);
  };

  const handleSlideImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSlideImageUploadLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSlideImageUrl(reader.result);
      }
      setSlideImageUploadLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideImageUrl) {
      alert('অনুগ্রহ করে একটি ছবি নির্বাচন করুন বা আপলোড করুন');
      return;
    }

    if (editingSlideId) {
      await updateSlide(editingSlideId, {
        title: slideTitle,
        subtitle: slideSubtitle,
        categoryBadge: slideCategory,
        imageUrl: slideImageUrl,
        buttonText: slideButtonText,
        buttonLinkPage: slideButtonLinkPage,
        order: Number(slideOrder),
        isActive: slideIsActive,
      });
    } else {
      await addSlide({
        title: slideTitle,
        subtitle: slideSubtitle,
        categoryBadge: slideCategory,
        imageUrl: slideImageUrl,
        buttonText: slideButtonText,
        buttonLinkPage: slideButtonLinkPage,
        order: Number(slideOrder) || slides.length + 1,
        isActive: slideIsActive,
      });
    }
    setSlideModalOpen(false);
    resetSlideForm();
  };

  const handleMoveSlide = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;
    const newSlides = [...slides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;
    await reorderSlides(newSlides);
  };

  // Member filter state
  const [memberSearch, setMemberSearch] = useState('');
  const [memberStatusFilter, setMemberStatusFilter] = useState<string>('all');

  // Handle Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      heroSlogan,
      heroTitle,
      heroSubtitle,
      heroNotice,
      heroImageUrl,
      contactPhone,
      contactEmail,
      officeAddress,
      bkashNumber,
      nagadNumber,
      bankDetails,
    });
    setSaveSettingsSuccess(true);
    setTimeout(() => setSaveSettingsSuccess(false), 3000);
  };

  // Handle Save / Update News
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNewsId) {
      await updateNews(editingNewsId, {
        title: newsTitle,
        category: newsCategory,
        summary: newsSummary,
        content: newsContent,
        date: newsDate,
        imageUrl: newsImageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        author: newsAuthor,
      });
    } else {
      await addNews({
        title: newsTitle,
        category: newsCategory,
        summary: newsSummary,
        content: newsContent,
        date: newsDate,
        imageUrl: newsImageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        author: newsAuthor,
      });
    }
    setNewsModalOpen(false);
    resetNewsForm();
  };

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsImageUrl('');
    setNewsDate(new Date().toISOString().split('T')[0]);
  };

  const startEditNews = (item: NewsItem) => {
    setEditingNewsId(item.id);
    setNewsTitle(item.title);
    setNewsCategory(item.category);
    setNewsSummary(item.summary);
    setNewsContent(item.content);
    setNewsDate(item.date);
    setNewsImageUrl(item.imageUrl);
    setNewsAuthor(item.author || 'কেন্দ্রীয় দপ্তর');
    setNewsModalOpen(true);
  };

  // Handle Save Gallery
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    await addGalleryItem({
      title: galTitle,
      category: galCategory,
      type: 'image',
      url: galUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      caption: galCaption,
      date: galDate,
    });
    setGalModalOpen(false);
    setGalTitle('');
    setGalUrl('');
    setGalCaption('');
  };

  // Handle Save Leader
  const handleSaveLeader = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLeaderId) {
      await updateLeader(editingLeaderId, {
        name: leaderName,
        designation: leaderDesignation,
        division: leaderDivision,
        education: leaderEducation,
        term: leaderTerm,
        bio: leaderBio,
        imageUrl: leaderImageUrl || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      });
    } else {
      await addLeader({
        name: leaderName,
        designation: leaderDesignation,
        division: leaderDivision,
        education: leaderEducation,
        term: leaderTerm,
        bio: leaderBio,
        imageUrl: leaderImageUrl || 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
        order: leaders.length + 1,
      });
    }
    setLeaderModalOpen(false);
    resetLeaderForm();
  };

  const resetLeaderForm = () => {
    setEditingLeaderId(null);
    setLeaderName('');
    setLeaderDesignation('');
    setLeaderEducation('');
    setLeaderBio('');
    setLeaderImageUrl('');
  };

  const startEditLeader = (item: LeaderItem) => {
    setEditingLeaderId(item.id);
    setLeaderName(item.name);
    setLeaderDesignation(item.designation);
    setLeaderDivision(item.division || 'ঢাকা বিভাগ');
    setLeaderEducation(item.education || '');
    setLeaderTerm(item.term);
    setLeaderBio(item.bio);
    setLeaderImageUrl(item.imageUrl);
    setLeaderModalOpen(true);
  };

  // Handle Save District
  const handleSaveDistrict = async (e: React.FormEvent) => {
    e.preventDefault();
    const divObj = BANGLADESH_DIVISIONS.find((d) => d.id === distDivisionId);
    if (editingDistId) {
      await updateDistrict(editingDistId, {
        nameBn: distNameBn,
        nameEn: distNameEn,
        divisionId: distDivisionId,
        divisionNameBn: divObj ? divObj.nameBn : 'ঢাকা বিভাগ',
        status: distStatus,
        presidentName: distPresident,
        secretaryName: distSecretary,
        contactPhone: distPhone,
        membersCount: Number(distMembers),
      });
    } else {
      await addDistrict({
        nameBn: distNameBn,
        nameEn: distNameEn,
        divisionId: distDivisionId,
        divisionNameBn: divObj ? divObj.nameBn : 'ঢাকা বিভাগ',
        status: distStatus,
        presidentName: distPresident,
        secretaryName: distSecretary,
        contactPhone: distPhone,
        membersCount: Number(distMembers),
      });
    }
    setDistModalOpen(false);
    setEditingDistId(null);
    setDistNameBn('');
    setDistNameEn('');
    setDistPresident('');
    setDistSecretary('');
    setDistPhone('');
  };

  // Handle Save Event
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEvent({
      title: evTitle,
      date: evDate,
      time: evTime,
      location: evLocation,
      description: evDescription,
      status: 'আসন্ন',
      organizer: 'কেন্দ্রীয় দপ্তর',
    });
    setEvModalOpen(false);
    setEvTitle('');
    setEvDate('');
    setEvTime('');
    setEvLocation('');
    setEvDescription('');
  };

  // Filtered members for table
  const filteredMembers = members.filter((m) => {
    const matchesStatus = memberStatusFilter === 'all' || m.status === memberStatusFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.mobile.includes(memberSearch) ||
      m.district.includes(memberSearch) ||
      m.trackingNumber.toLowerCase().includes(memberSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-xl shadow">
              CMS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  নারী অধিকার ফাউন্ডেশন — অ্যাডমিন কন্ট্রোল প্যানেল
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  লাইভ সিঙ্ক
                </span>
              </div>
              <p className="text-xs text-slate-500">
                ফায়ারবেস ফায়ারস্টোর ক্লাউড ডেটাবেস ও সকল কন্টেন্ট ব্যবস্থাপনা
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refreshFromFirebase()}
              disabled={isLoading}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              title="রিফ্রেশ করুন"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-600 ${isLoading ? 'animate-spin' : ''}`} />
              <span>রিফ্রেশ</span>
            </button>

            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-2 transition"
            >
              <Eye className="w-4 h-4" />
              <span>ওয়েবসাইট দেখুন</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'dashboard'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>ড্যাশবোর্ড</span>
          </button>

          <button
            onClick={() => setActiveTab('slideshow')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'slideshow'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
            id="admin-tab-slideshow"
          >
            <Sliders className="w-4 h-4 text-amber-500" />
            <span>স্লাইডশো (৫ ছবি) ({slides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'members'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>সদস্য অনুমোদন ({members.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banner-settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'banner-settings'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>হোম ব্যানার ও সেটিংস</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'news'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>সংবাদ ব্যবস্থাপনা ({news.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'gallery'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>গ্যালারি ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leadership')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'leadership'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>জাতীয় নেতৃত্ব ({leaders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('districts')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'districts'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>জেলা ও ইউনিটসমূহ ({districts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'events'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>কর্মসূচি ও ইভেন্ট ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition ${
              activeTab === 'projects'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>প্রকল্পসমূহ ({projects.length})</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Dashboard Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Stat 1: Total Members */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">মোট সদস্য</span>
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-emerald-950">{members.length}</p>
                <p className="text-[11px] text-emerald-700 font-semibold">
                  অনুমোদিত: {members.filter((m) => m.status === 'অনুমোদিত').length} জন
                </p>
              </div>

              {/* Stat 2: Total Districts */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">মোট জেলা</span>
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900">{districts.length}</p>
                <p className="text-[11px] text-slate-500">৮ বিভাগ অন্তর্ভুক্ত</p>
              </div>

              {/* Stat 3: Upcoming Events */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">আসন্ন কর্মসূচি</span>
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900">{events.length}</p>
                <p className="text-[11px] text-amber-700 font-semibold">সক্রিয় ইভেন্ট</p>
              </div>

              {/* Stat 4: Recent News */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">সংবাদ ও বিজ্ঞপ্তি</span>
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
                    <Newspaper className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900">{news.length}</p>
                <p className="text-[11px] text-slate-500">প্রকাশিত প্রবন্ধ</p>
              </div>

              {/* Stat 5: Gallery Count */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1 col-span-2 md:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">গ্যালারি মিডিয়া</span>
                  <div className="p-2 rounded-lg bg-pink-50 text-pink-700">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-slate-900">{gallery.length}</p>
                <p className="text-[11px] text-slate-500">স্থিরচিত্র ও অ্যালবাম</p>
              </div>
            </div>

            {/* Quick Actions & Recent Members */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Member Registrations (7 Cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-900">সাম্প্রতিক সদস্য আবেদনসমূহ</h3>
                    <p className="text-xs text-slate-500">অনুমোদনের জন্য অপেক্ষমাণ ও সাম্প্রতিক এন্ট্রি</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('members')}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    সকল আবেদন দেখুন →
                  </button>
                </div>

                <div className="space-y-3">
                  {members.slice(0, 4).map((m) => (
                    <div
                      key={m.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{m.name}</p>
                        <p className="text-slate-500">
                          {m.district} • {m.institution} • {m.mobile}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            m.status === 'অনুমোদিত'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'পেন্ডিং'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {m.status}
                        </span>

                        {m.status !== 'অনুমোদিত' && (
                          <button
                            onClick={() => updateMemberStatus(m.id, 'অনুমোদিত')}
                            className="p-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white"
                            title="অনুমোদন করুন"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Launchpad & Settings (5 Cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">
                  দ্রুত সম্পাদনা শর্টকাট
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      resetNewsForm();
                      setNewsModalOpen(true);
                      setActiveTab('news');
                    }}
                    className="p-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex flex-col items-center gap-2 text-center transition"
                  >
                    <Plus className="w-5 h-5 text-emerald-700" />
                    <span>নতুন সংবাদ প্রকাশ</span>
                  </button>

                  <button
                    onClick={() => {
                      setGalModalOpen(true);
                      setActiveTab('gallery');
                    }}
                    className="p-3.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-900 font-bold text-xs flex flex-col items-center gap-2 text-center transition"
                  >
                    <Plus className="w-5 h-5 text-pink-700" />
                    <span>নতুন ছবি আপলোড</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('banner-settings')}
                    className="p-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex flex-col items-center gap-2 text-center transition"
                  >
                    <Settings className="w-5 h-5 text-amber-700" />
                    <span>স্লোগান ও ব্যানার পরিবর্তন</span>
                  </button>

                  <button
                    onClick={() => {
                      setEvModalOpen(true);
                      setActiveTab('events');
                    }}
                    className="p-3.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs flex flex-col items-center gap-2 text-center transition"
                  >
                    <Plus className="w-5 h-5 text-blue-700" />
                    <span>নতুন কর্মসূচি যুক্ত</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-900 text-white text-xs space-y-1">
                  <p className="font-bold text-amber-300">বর্তমান স্লোগান:</p>
                  <p className="text-emerald-100">{settings.heroSlogan}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: INTERACTIVE SLIDESHOW MANAGEMENT (৫ ছবি স্লাইডশো) */}
        {activeTab === 'slideshow' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    হোমপেজ ৫-ছবি ইন্টারাক্টিভ স্লাইডশো ব্যবস্থাপনা
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    {slides.length} টি স্লাইড
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  হোমপেজের মূল আকর্ষণ ইন্টারাক্টিভ স্লাইডশোতে ছবি সংযোজন, বিয়োজন, সরাসরি ডিভাইস থেকে ছবি আপলোড, শিরোনাম এবং লিঙ্ক সম্পাদনা করুন।
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    resetSlideForm();
                    setSlideModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
                  id="admin-add-slide-btn"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন স্লাইড সংযোজন</span>
                </button>
              </div>
            </div>

            {/* Curated Theme Quick Selector */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>নারী অধিকার ফাউন্ডেশনের ৫টি মূল স্তম্ভের ছবি নির্দেশিকা:</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                হোমপেজে সেরা অভিজ্ঞতার জন্য ৫টি সক্রিয় স্লাইড রাখা আদর্শ (যেমন: ১. আইনি সুরক্ষা ও মানবাধিকার, ২. শিক্ষা ও আধুনিক প্রযুক্তি, ৩. নারী উদ্যোক্তা ও অর্থনৈতিক ক্ষমতায়ন, ৪. মাতৃ ও মানসিক স্বাস্থ্যসেবা, ৫. তৃণমূল নেতৃত্ব বিকাশ)।
              </p>
            </div>

            {/* Slides Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                    slide.isActive
                      ? 'border-slate-200 bg-white shadow-sm hover:shadow-md'
                      : 'border-slate-200 bg-slate-50/80 opacity-70'
                  }`}
                >
                  <div>
                    {/* Slide Photo Preview */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-amber-300 font-mono font-bold text-[11px]">
                          স্লাইড #{idx + 1}
                        </span>
                        {slide.categoryBadge && (
                          <span className="px-2 py-0.5 rounded-lg bg-emerald-800/90 backdrop-blur-md text-white font-bold text-[10px]">
                            {slide.categoryBadge}
                          </span>
                        )}
                      </div>

                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => updateSlide(slide.id, { isActive: !slide.isActive })}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-sm transition ${
                            slide.isActive
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-600 text-slate-200'
                          }`}
                        >
                          {slide.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </button>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-slate-900 text-sm line-clamp-1 leading-snug">
                        {slide.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {slide.subtitle}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                        <span className="font-semibold text-emerald-800">
                          বাটন: {slide.buttonText || 'বিস্তারিত জানুন'}
                        </span>
                        <span className="text-slate-400">
                          লিংক: /{slide.buttonLinkPage || 'projects'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Order buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveSlide(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded bg-white hover:bg-slate-200 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none text-slate-700"
                        title="উপরে নিন"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveSlide(idx, 'down')}
                        disabled={idx === slides.length - 1}
                        className="p-1 rounded bg-white hover:bg-slate-200 border border-slate-200 disabled:opacity-30 disabled:pointer-events-none text-slate-700"
                        title="নিচে নিন"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => startEditSlide(slide)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-200 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>সম্পাদনা</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`আপনি কি সত্যিই "${slide.title}" স্লাইডটি বিয়োজন/ডিলিট করতে চান?`)) {
                            deleteSlide(slide.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                        title="স্লাইড বিয়োজন করুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {slides.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 space-y-3">
                <Sliders className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">কোনো স্লাইড যুক্ত করা হয়নি</p>
                <button
                  onClick={() => {
                    resetSlideForm();
                    setSlideModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  প্রথম স্লাইড যুক্ত করুন
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MEMBER APPLICATIONS MANAGEMENT */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">সদস্য আবেদন ও অনুমোদন ব্যবস্থাপনা</h2>
                <p className="text-xs text-slate-500">
                  ওয়েবসাইটের Join Form থেকে আসা সকল নিবন্ধন সরাসরি ফায়ারবেসে সংরক্ষিত
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="নাম, মোবাইল বা ট্র্যাকিং..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <select
                  value={memberStatusFilter}
                  onChange={(e) => setMemberStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">সকল স্ট্যাটাস</option>
                  <option value="পেন্ডিং">পেন্ডিং</option>
                  <option value="অনুমোদিত">অনুমোদিত</option>
                  <option value="যাচাইকরণ চলছে">যাচাইকরণ চলছে</option>
                  <option value="বাতিল">বাতিল</option>
                </select>
              </div>
            </div>

            {/* Members Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-3">ট্র্যাকিং নম্বর</th>
                    <th className="py-3 px-3">নাম</th>
                    <th className="py-3 px-3">মোবাইল ও ইমেইল</th>
                    <th className="py-3 px-3">বিভাগ ও জেলা</th>
                    <th className="py-3 px-3">প্রতিষ্ঠান</th>
                    <th className="py-3 px-3">আগ্রহের ক্ষেত্র</th>
                    <th className="py-3 px-3">স্ট্যাটাস</th>
                    <th className="py-3 px-3 text-right">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 font-mono font-bold text-emerald-800">{m.trackingNumber}</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">{m.name}</td>
                      <td className="py-3 px-3">
                        <div>{m.mobile}</div>
                        <div className="text-[10px] text-slate-400">{m.email || '—'}</div>
                      </td>
                      <td className="py-3 px-3">
                        {m.district}, {m.division}
                      </td>
                      <td className="py-3 px-3">{m.institution}</td>
                      <td className="py-3 px-3">{m.interestArea}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            m.status === 'অনুমোদিত'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'পেন্ডিং'
                              ? 'bg-amber-100 text-amber-900'
                              : m.status === 'যাচাইকরণ চলছে'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {m.status !== 'অনুমোদিত' && (
                            <button
                              onClick={() => updateMemberStatus(m.id, 'অনুমোদিত')}
                              className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px]"
                            >
                              অনুমোদন
                            </button>
                          )}
                          {m.status === 'অনুমোদিত' && (
                            <button
                              onClick={() => updateMemberStatus(m.id, 'পেন্ডিং')}
                              className="px-2 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-[10px]"
                            >
                              হোল্ড
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm('আপনি কি সত্যিই এই আবেদনটি ডিলিট করতে চান?')) {
                                deleteMember(m.id);
                              }
                            }}
                            className="p-1 rounded text-red-600 hover:bg-red-50"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BANNER & SITE SETTINGS (CMS) */}
        {activeTab === 'banner-settings' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">হোম ব্যানার ও সাধারণ সাইট সেটিংস পরিবর্তন</h2>
              <p className="text-xs text-slate-500 mt-1">
                এখানে করা সকল পরিবর্তন তাৎক্ষণিকভাবে হোমপেজ এবং পুরো ওয়েবসাইটে কার্যকর হবে।
              </p>
            </div>

            {saveSettingsSuccess && (
              <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700" />
                <span>সকল সেটিংস সফলভাবে আপডেট ও ফায়ারবেসে সংরক্ষিত হয়েছে!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Hero Banner Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider">
                  ১. হোমপেজ হিরো ব্যানার
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">হিরো স্লোগান *</label>
                    <input
                      type="text"
                      required
                      value={heroSlogan}
                      onChange={(e) => setHeroSlogan(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">মূল শিরোনাম *</label>
                    <input
                      type="text"
                      required
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">উপ-শিরোনাম বা বার্তা *</label>
                    <textarea
                      rows={2}
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">হিরো স্ক্রলিং জরুরি নোটিশ</label>
                    <input
                      type="text"
                      value={heroNotice}
                      onChange={(e) => setHeroNotice(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">হিরো ব্যানার ইমেজ URL</label>
                    <input
                      type="url"
                      value={heroImageUrl}
                      onChange={(e) => setHeroImageUrl(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Office Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider">
                  ২. কেন্দ্রীয় দপ্তর ও যোগাযোগ তথ্য
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">হটলাইন / ফোন নম্বর</label>
                    <input
                      type="text"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">অফিসিয়াল ইমেইল</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">প্রধান কার্যালয় ঠিকানা</label>
                    <input
                      type="text"
                      value={officeAddress}
                      onChange={(e) => setOfficeAddress(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Donation Info Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider">
                  ৩. অনুদান ও সাদাকাহ অ্যাকাউন্ট
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">বিকাশ নম্বর</label>
                    <input
                      type="text"
                      value={bkashNumber}
                      onChange={(e) => setBkashNumber(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">নগদ নম্বর</label>
                    <input
                      type="text"
                      value={nagadNumber}
                      onChange={(e) => setNagadNumber(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">ব্যাংক অ্যাকাউন্ট বিবরণী</label>
                    <textarea
                      rows={2}
                      value={bankDetails}
                      onChange={(e) => setBankDetails(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>পরিবর্তনসমূহ সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: NEWS MANAGEMENT */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">সংবাদ ও প্রেস রিলিজ ব্যবস্থাপনা</h2>
                <p className="text-xs text-slate-500">সংবাদ যোগ, সম্পাদন বা ডিলিট করুন</p>
              </div>
              <button
                onClick={() => {
                  resetNewsForm();
                  setNewsModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন সংবাদ যোগ</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 transition space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.summary}</p>
                    <p className="text-[10px] text-slate-400">তারিখ: {item.date}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => startEditNews(item)}
                      className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>এডিট</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('আপনি কি এই সংবাদটি মুছে ফেলতে চান?')) {
                          deleteNews(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ডিলিট</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">গ্যালারি অ্যালবাম ও ছবি ব্যবস্থাপনা</h2>
                <p className="text-xs text-slate-500">কার্যক্রমের ছবি বা ভিডিও যুক্ত ও নিয়ন্ত্রণ করুন</p>
              </div>
              <button
                onClick={() => setGalModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ছবি যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden group relative flex flex-col justify-between bg-slate-50"
                >
                  <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{item.caption || item.date}</p>
                  </div>
                  <div className="p-2 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm('আপনি কি এই ছবিটি গ্যালারি থেকে মুছতে চান?')) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="p-1 rounded text-red-600 hover:bg-red-50 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ডিলিট</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: LEADERSHIP MANAGEMENT */}
        {activeTab === 'leadership' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">জাতীয় নির্বাহী পরিষদ ও নেতৃত্ব</h2>
                <p className="text-xs text-slate-500">দায়িত্বশীলাদের তালিকা ও তথ্য হালনাগাদ</p>
              </div>
              <button
                onClick={() => {
                  resetLeaderForm();
                  setLeaderModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন দায়িত্বশীলা যুক্ত</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {leaders.map((leader) => (
                <div
                  key={leader.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 transition flex gap-4"
                >
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow space-y-1">
                    <p className="text-[11px] font-semibold text-emerald-700">{leader.designation}</p>
                    <h3 className="font-bold text-slate-900 text-sm">{leader.name}</h3>
                    <p className="text-xs text-slate-500">{leader.education}</p>
                    <p className="text-[11px] text-slate-400">{leader.term}</p>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => startEditLeader(leader)}
                        className="text-emerald-700 hover:underline text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" /> এডিট
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('আপনি কি এই তথ্য মুছে ফেলতে চান?')) {
                            deleteLeader(leader.id);
                          }
                        }}
                        className="text-red-600 hover:underline text-xs font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> ডিলিট
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: DISTRICTS & UNITS MANAGEMENT */}
        {activeTab === 'districts' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">জেলা ও ইউনিট প্রশাসন</h2>
                <p className="text-xs text-slate-500">৬৪ জেলার স্থিতি, নেতৃত্ব ও যোগাযোগ আপডেট</p>
              </div>
              <button
                onClick={() => {
                  setEditingDistId(null);
                  setDistNameBn('');
                  setDistNameEn('');
                  setDistPresident('');
                  setDistSecretary('');
                  setDistPhone('');
                  setDistModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন জেলা/ইউনিট যুক্ত</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {districts.map((dist) => (
                <div
                  key={dist.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {dist.nameBn} ({dist.nameEn})
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {dist.divisionNameBn}
                    </span>
                  </div>
                  <p className="text-slate-600">
                    সভানেত্রী: <strong>{dist.presidentName}</strong>
                  </p>
                  <p className="text-slate-600">
                    সেক্রেটারি: <strong>{dist.secretaryName}</strong>
                  </p>
                  <p className="text-emerald-700 font-mono">ফোন: {dist.contactPhone}</p>
                  <p className="text-slate-500">কমিটি অবস্থা: {dist.status}</p>

                  <div className="pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        setEditingDistId(dist.id);
                        setDistNameBn(dist.nameBn);
                        setDistNameEn(dist.nameEn);
                        setDistDivisionId(dist.divisionId);
                        setDistStatus(dist.status);
                        setDistPresident(dist.presidentName);
                        setDistSecretary(dist.secretaryName);
                        setDistPhone(dist.contactPhone);
                        setDistMembers(dist.membersCount);
                        setDistModalOpen(true);
                      }}
                      className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>তথ্য আপডেট</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: EVENTS MANAGEMENT */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">আসন্ন কর্মসূচি ও সম্মেলন</h2>
                <p className="text-xs text-slate-500">জাতীয় ও আঞ্চলিক ইভেন্ট নোটিশ প্রকাশ</p>
              </div>
              <button
                onClick={() => setEvModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন কর্মসূচি যোগ</span>
              </button>
            </div>

            <div className="space-y-3">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                        {ev.status}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm">{ev.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600">
                      তারিখ: {ev.date} ({ev.time}) • স্থান: {ev.location}
                    </p>
                    <p className="text-xs text-slate-500">{ev.description}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('আপনি কি এই কর্মসূচিটি মুছে ফেলতে চান?')) {
                        deleteEvent(ev.id);
                      }
                    }}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 text-xs flex items-center gap-1 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ডিলিট</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">স্থায়ী ৬টি জাতীয় প্রকল্প</h2>
              <p className="text-xs text-slate-500">প্রকল্পের বিস্তারিত বিবরণ ও লক্ষ্যসমূহ সম্পাদন করুন</p>
            </div>

            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                    <span className="text-xs font-mono text-slate-400">{p.slug}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.details || p.description}</p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        const newDesc = prompt('প্রকল্পের নতুন সংক্ষিপ্ত বিবরণ লিখুন:', p.description);
                        if (newDesc) {
                          updateProject(p.id, { description: newDesc });
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
                    >
                      বিবরণ পরিবর্তন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD/EDIT NEWS */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              {editingNewsId ? 'সংবাদ সম্পাদন করুন' : 'নতুন সংবাদ প্রকাশ করুন'}
            </h3>
            <form onSubmit={handleSaveNews} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">ক্যাটাগরি *</label>
                  <select
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="সংবাদ">সংবাদ</option>
                    <option value="বিজ্ঞপ্তি">বিজ্ঞপ্তি</option>
                    <option value="প্রেস রিলিজ">প্রেস রিলিজ</option>
                    <option value="প্রতিবেদন">প্রতিবেদন</option>
                    <option value="কার্যক্রম">কার্যক্রম</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={newsDate}
                    onChange={(e) => setNewsDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">ছবি URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newsImageUrl}
                  onChange={(e) => setNewsImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">সংক্ষিপ্ত সারমর্ম *</label>
                <textarea
                  rows={2}
                  required
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">মূল সংবাদ বিবরণ *</label>
                <textarea
                  rows={5}
                  required
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD GALLERY PHOTO */}
      {galModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900">নতুন ছবি বা ভিডিও যুক্ত করুন</h3>
            <form onSubmit={handleSaveGallery} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={galTitle}
                  onChange={(e) => setGalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">ক্যাটাগরি</label>
                <select
                  value={galCategory}
                  onChange={(e) => setGalCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  <option value="সম্মেলন">সম্মেলন</option>
                  <option value="শিক্ষা ও তারবিয়াহ">শিক্ষা ও তারবিয়াহ</option>
                  <option value="সমাজসেবা">সমাজসেবা</option>
                  <option value="কর্মশালা">কর্মশালা</option>
                  <option value="দাওয়াহ">দাওয়াহ</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">ইমেজ URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={galUrl}
                  onChange={(e) => setGalUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">ক্যাপশন / বিবরণ</label>
                <textarea
                  rows={2}
                  value={galCaption}
                  onChange={(e) => setGalCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGalModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold"
                >
                  আপলোড করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD/EDIT LEADER */}
      {leaderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              {editingLeaderId ? 'নেতৃত্ব তথ্য সম্পাদন' : 'নতুন দায়িত্বশীলা যুক্ত করুন'}
            </h3>
            <form onSubmit={handleSaveLeader} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">নাম *</label>
                <input
                  type="text"
                  required
                  value={leaderName}
                  onChange={(e) => setLeaderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">দায়িত্ব / পদবী *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: কেন্দ্রীয় সভাপতি"
                  value={leaderDesignation}
                  onChange={(e) => setLeaderDesignation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">বিভাগ</label>
                  <input
                    type="text"
                    value={leaderDivision}
                    onChange={(e) => setLeaderDivision(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">সেশন / মেয়াদ</label>
                  <input
                    type="text"
                    value={leaderTerm}
                    onChange={(e) => setLeaderTerm(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">শিক্ষাগত যোগ্যতা</label>
                <input
                  type="text"
                  value={leaderEducation}
                  onChange={(e) => setLeaderEducation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">ছবি URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={leaderImageUrl}
                  onChange={(e) => setLeaderImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">সংক্ষিপ্ত পরিচিতি</label>
                <textarea
                  rows={2}
                  value={leaderBio}
                  onChange={(e) => setLeaderBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLeaderModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold"
                >
                  সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD/EDIT DISTRICT */}
      {distModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              {editingDistId ? 'জেলা ইউনিট আপডেট' : 'নতুন জেলা/ইউনিট সংযোজন'}
            </h3>
            <form onSubmit={handleSaveDistrict} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">জেলার নাম (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={distNameBn}
                    onChange={(e) => setDistNameBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">District Name (En) *</label>
                  <input
                    type="text"
                    required
                    value={distNameEn}
                    onChange={(e) => setDistNameEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">বিভাগ *</label>
                  <select
                    value={distDivisionId}
                    onChange={(e) => setDistDivisionId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    {BANGLADESH_DIVISIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nameBn}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">কমিটি স্ট্যাটাস</label>
                  <select
                    value={distStatus}
                    onChange={(e) => setDistStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="সক্রিয় পূর্ণাঙ্গ কমিটি">সক্রিয় পূর্ণাঙ্গ কমিটি</option>
                    <option value="আহ্বায়ক কমিটি">আহ্বায়ক কমিটি</option>
                    <option value="প্রাথমিক ইউনিট">প্রাথমিক ইউনিট</option>
                    <option value="পুনর্গঠন চলছে">পুনর্গঠন চলছে</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">জেলা সভানেত্রী</label>
                  <input
                    type="text"
                    value={distPresident}
                    onChange={(e) => setDistPresident(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">সেক্রেটারি</label>
                  <input
                    type="text"
                    value={distSecretary}
                    onChange={(e) => setDistSecretary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">যোগাযোগ ফোন নম্বর</label>
                <input
                  type="text"
                  value={distPhone}
                  onChange={(e) => setDistPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDistModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold"
                >
                  সংরক্ষণ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD EVENT */}
      {evModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900">নতুন কর্মসূচি যুক্ত করুন</h3>
            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">কর্মসূচির শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">তারিখ *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: ১৫ মে ২০২৬"
                    value={evDate}
                    onChange={(e) => setEvDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">সময়</label>
                  <input
                    type="text"
                    placeholder="যেমন: সকাল ১০:০০"
                    value={evTime}
                    onChange={(e) => setEvTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">স্থান *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ঢাকা মিলনায়তন / জুম লাইভ"
                  value={evLocation}
                  onChange={(e) => setEvLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">বিবরণ</label>
                <textarea
                  rows={3}
                  value={evDescription}
                  onChange={(e) => setEvDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEvModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold"
                >
                  যোগ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT SLIDE */}
      {slideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full space-y-5 my-8 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingSlideId ? 'স্লাইড সম্পাদনা করুন' : 'নতুন স্লাইড সংযোজন করুন'}
                  </h3>
                  <p className="text-xs text-slate-500">হোমপেজ ৫-ছবি ইন্টারাক্টিভ স্লাইডশোর জন্য তথ্য প্রদান করুন</p>
                </div>
              </div>
              <button
                onClick={() => setSlideModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-4 text-xs">
              {/* Slide Title */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">স্লাইডের মূল শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: নারীর সুরক্ষা, মর্যাদা ও সাংবিধানিক অধিকার প্রতিষ্ঠা"
                  value={slideTitle}
                  onChange={(e) => setSlideTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Subtitle / Caption */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">সংক্ষিপ্ত বিবরণ বা বার্তা *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="যেমন: আইনি পরামর্শ, পারিবারিক সুরক্ষা ও যেকোনো সহিংসতায় নারীর পাশে সার্বক্ষণিক নিবেদিত নারী অধিকার ফাউন্ডেশন।"
                  value={slideSubtitle}
                  onChange={(e) => setSlideSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Category Badge */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">ক্যাটাগরি ব্যাজ / ট্যাগ</label>
                  <input
                    type="text"
                    placeholder="যেমন: আইনি সুরক্ষা ও মানবাধিকার"
                    value={slideCategory}
                    onChange={(e) => setSlideCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Target Link Page */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">ক্লিক করলে যে পেজে যাবে</label>
                  <select
                    value={slideButtonLinkPage}
                    onChange={(e) => setSlideButtonLinkPage(e.target.value as PageView)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="projects">প্রকল্পসমূহ (Projects)</option>
                    <option value="join">সদস্য আবেদন (Join)</option>
                    <option value="about">পরিচিতি (About)</option>
                    <option value="vision-mission">লক্ষ্য ও উদ্দেশ্য (Vision)</option>
                    <option value="leadership">নেতৃত্ব (Leadership)</option>
                    <option value="divisions">৮ বিভাগ (Divisions)</option>
                    <option value="districts">৬৪ জেলা (Districts)</option>
                    <option value="news">সংবাদ (News)</option>
                    <option value="gallery">গ্যালারি (Gallery)</option>
                    <option value="contact">যোগাযোগ (Contact)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Button Text */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">বাটন টেক্সট</label>
                  <input
                    type="text"
                    placeholder="যেমন: বিস্তারিত জানুন / যুক্ত হোন"
                    value={slideButtonText}
                    onChange={(e) => setSlideButtonText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Slide Order */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">স্লাইড ক্রম (Order)</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={slideOrder}
                    onChange={(e) => setSlideOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Photo Upload & URL Area */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="font-bold text-slate-800 flex items-center justify-between">
                  <span>ছবি নির্বাচন বা আপলোড *</span>
                  {slideImageUploadLoading && (
                    <span className="text-emerald-700 font-semibold animate-pulse">
                      ছবি প্রসেস হচ্ছে...
                    </span>
                  )}
                </label>

                {/* Option 1: File Upload */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer flex items-center justify-center gap-2 transition shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>ডিভাইস থেকে ছবি আপলোড করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSlideImageFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-slate-400 font-medium">অথবা</span>
                  <input
                    type="url"
                    placeholder="ছবির সরাসরি ওয়েব URL দিন (https://...)"
                    value={slideImageUrl}
                    onChange={(e) => setSlideImageUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                {/* Sample Presets */}
                <div className="pt-2">
                  <p className="text-[11px] text-slate-500 mb-1 font-semibold">
                    বাছাইকৃত নমুনা ছবি নির্বাচন করুন (এক-ক্লিকে):
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setSlideImageUrl(
                          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80'
                        )
                      }
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 text-[11px] text-slate-700"
                    >
                      ১. আইনি অধিকার ও নেতৃত্ব
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSlideImageUrl(
                          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80'
                        )
                      }
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 text-[11px] text-slate-700"
                    >
                      ২. শিক্ষা ও প্রযুক্তি
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSlideImageUrl(
                          'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80'
                        )
                      }
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 text-[11px] text-slate-700"
                    >
                      ৩. উদ্যোক্তা ও কুটিরশিল্প
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSlideImageUrl(
                          'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80'
                        )
                      }
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 text-[11px] text-slate-700"
                    >
                      ৪. স্বাস্থ্যসেবা ক্যাম্প
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSlideImageUrl(
                          'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1600&q=80'
                        )
                      }
                      className="px-2 py-1 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 text-[11px] text-slate-700"
                    >
                      ৫. তৃণমূল সংহতি ও কর্মশালা
                    </button>
                  </div>
                </div>

                {/* Live Image Preview */}
                {slideImageUrl && (
                  <div className="mt-3 relative aspect-[16/8] rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md">
                    <img
                      src={slideImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                      {slideCategory && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-600 text-amber-200 text-[10px] font-bold w-fit mb-1">
                          {slideCategory}
                        </span>
                      )}
                      <p className="font-bold text-sm text-white line-clamp-1">{slideTitle || 'স্লাইডের শিরোনাম প্রিভিউ'}</p>
                      <p className="text-[11px] text-slate-200 line-clamp-1">{slideSubtitle || 'বিবরণ প্রিভিউ'}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="slide-active-toggle"
                  checked={slideIsActive}
                  onChange={(e) => setSlideIsActive(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="slide-active-toggle" className="font-bold text-slate-700 cursor-pointer">
                  এই স্লাইডটি হোমপেজে সক্রিয় রাখুন
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSlideModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition flex items-center gap-1.5 shadow-sm"
                  id="save-slide-submit-btn"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingSlideId ? 'পরিবর্তন সংরক্ষণ করুন' : 'স্লাইড যুক্ত করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
