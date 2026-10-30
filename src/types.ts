export interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  categoryBadge?: string;
  imageUrl: string;
  buttonText?: string;
  buttonLinkPage?: PageView;
  order: number;
  isActive: boolean;
  createdAt?: string;
}

export interface SiteSettings {
  id?: string;
  heroSlogan: string;
  heroTitle: string;
  heroSubtitle: string;
  heroNotice: string;
  heroImageUrl?: string;
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  bkashNumber: string;
  nagadNumber: string;
  bankDetails: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  lastUpdated?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'সংবাদ' | 'বিজ্ঞপ্তি' | 'প্রেস রিলিজ' | 'প্রতিবেদন' | 'কার্যক্রম';
  summary: string;
  content: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
  author?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  details: string;
  iconName: string;
  imageUrl: string;
  objectives: string[];
  keyActivities: string[];
  featured?: boolean;
}

export interface LeaderItem {
  id: string;
  name: string;
  designation: string;
  division?: string;
  education?: string;
  term: string;
  bio: string;
  imageUrl: string;
  order: number;
  featured?: boolean;
}

export interface DivisionInfo {
  id: string;
  nameBn: string;
  nameEn: string;
  districtsCount: number;
  unitsCount: number;
  presidentName: string;
  contactNumber: string;
  description: string;
  imageUrl: string;
}

export interface DistrictUnit {
  id: string;
  nameBn: string;
  nameEn: string;
  divisionId: string;
  divisionNameBn: string;
  status: 'সক্রিয় পূর্ণাঙ্গ কমিটি' | 'আহ্বায়ক কমিটি' | 'প্রাথমিক ইউনিট' | 'পুনর্গঠন চলছে';
  presidentName: string;
  secretaryName: string;
  contactPhone: string;
  membersCount: number;
  officeAddress?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'সম্মেলন' | 'শিক্ষা ও তারবিয়াহ' | 'সমাজসেবা' | 'কর্মশালা' | 'দাওয়াহ';
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  caption: string;
  date: string;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'আসন্ন' | 'চলমান' | 'সম্পন্ন';
  organizer: string;
}

export interface MemberApplication {
  id: string;
  name: string;
  mobile: string;
  email: string;
  division: string;
  district: string;
  upazila: string;
  institution: string;
  interestArea: string;
  notes?: string;
  status: 'পেন্ডিং' | 'অনুমোদিত' | 'যাচাইকরণ চলছে' | 'বাতিল';
  appliedAt: string;
  trackingNumber: string;
}

export type PageView =
  | 'home'
  | 'about'
  | 'vision-mission'
  | 'leadership'
  | 'divisions'
  | 'districts'
  | 'projects'
  | 'news'
  | 'gallery'
  | 'join'
  | 'contact'
  | 'admin';
