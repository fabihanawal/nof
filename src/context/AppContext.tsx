import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageView,
  SiteSettings,
  NewsItem,
  ProjectItem,
  LeaderItem,
  DistrictUnit,
  GalleryItem,
  EventItem,
  MemberApplication,
  SlideItem,
} from '../types';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_NEWS,
  CORE_PROJECTS,
  NATIONAL_LEADERSHIP,
  INITIAL_DISTRICTS,
  INITIAL_GALLERY,
  INITIAL_EVENTS,
  SAMPLE_MEMBERS,
  INITIAL_SLIDES,
} from '../data/initialData';
import { db, COLLECTIONS, seedInitialDataIfEmpty } from '../firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedNewsItem: NewsItem | null;
  setSelectedNewsItem: (item: NewsItem | null) => void;
  selectedProjectItem: ProjectItem | null;
  setSelectedProjectItem: (project: ProjectItem | null) => void;
  selectedDivisionId: string | null;
  setSelectedDivisionId: (divId: string | null) => void;
  lightboxImage: GalleryItem | null;
  setLightboxImage: (item: GalleryItem | null) => void;
  showDonationModal: boolean;
  setShowDonationModal: (show: boolean) => void;

  // Data
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  news: NewsItem[];
  addNews: (item: Omit<NewsItem, 'id'>) => Promise<void>;
  updateNews: (id: string, item: Partial<NewsItem>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;

  projects: ProjectItem[];
  updateProject: (id: string, item: Partial<ProjectItem>) => Promise<void>;

  leaders: LeaderItem[];
  addLeader: (item: Omit<LeaderItem, 'id'>) => Promise<void>;
  updateLeader: (id: string, item: Partial<LeaderItem>) => Promise<void>;
  deleteLeader: (id: string) => Promise<void>;

  districts: DistrictUnit[];
  addDistrict: (item: Omit<DistrictUnit, 'id'>) => Promise<void>;
  updateDistrict: (id: string, item: Partial<DistrictUnit>) => Promise<void>;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  events: EventItem[];
  addEvent: (item: Omit<EventItem, 'id'>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  members: MemberApplication[];
  addMemberApplication: (app: Omit<MemberApplication, 'id' | 'appliedAt' | 'trackingNumber' | 'status'>) => Promise<MemberApplication>;
  updateMemberStatus: (id: string, status: MemberApplication['status']) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;

  slides: SlideItem[];
  addSlide: (slide: Omit<SlideItem, 'id'>) => Promise<void>;
  updateSlide: (id: string, slide: Partial<SlideItem>) => Promise<void>;
  deleteSlide: (id: string) => Promise<void>;
  reorderSlides: (orderedSlides: SlideItem[]) => Promise<void>;

  // Admin
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  isLoading: boolean;
  refreshFromFirebase: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);
  const [selectedProjectItem, setSelectedProjectItem] = useState<ProjectItem | null>(null);
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [showDonationModal, setShowDonationModal] = useState<boolean>(false);

  // Core Data states
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [projects, setProjects] = useState<ProjectItem[]>(CORE_PROJECTS);
  const [leaders, setLeaders] = useState<LeaderItem[]>(NATIONAL_LEADERSHIP);
  const [districts, setDistricts] = useState<DistrictUnit[]>(INITIAL_DISTRICTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [members, setMembers] = useState<MemberApplication[]>(SAMPLE_MEMBERS);
  const [slides, setSlides] = useState<SlideItem[]>(INITIAL_SLIDES);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(true); // Default accessible for CMS demonstration
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load from Firebase
  const refreshFromFirebase = async () => {
    setIsLoading(true);
    try {
      // Try seeding if first run
      await seedInitialDataIfEmpty();

      // Fetch Settings
      try {
        const setDocSnap = await getDoc(doc(db, COLLECTIONS.SETTINGS, 'general'));
        if (setDocSnap.exists()) {
          setSettings({ ...INITIAL_SITE_SETTINGS, ...(setDocSnap.data() as SiteSettings) });
        }
      } catch (e) {
        console.log('Using local settings cache', e);
      }

      // Fetch News
      try {
        const newsSnap = await getDocs(collection(db, COLLECTIONS.NEWS));
        if (!newsSnap.empty) {
          const list: NewsItem[] = [];
          newsSnap.forEach((d) => list.push({ id: d.id, ...d.data() } as NewsItem));
          setNews(list);
        }
      } catch (e) {
        console.log('Using local news cache', e);
      }

      // Fetch Projects
      try {
        const projSnap = await getDocs(collection(db, COLLECTIONS.PROJECTS));
        if (!projSnap.empty) {
          const list: ProjectItem[] = [];
          projSnap.forEach((d) => list.push({ id: d.id, ...d.data() } as ProjectItem));
          setProjects(list);
        }
      } catch (e) {
        console.log('Using local projects cache', e);
      }

      // Fetch Leaders
      try {
        const leaderSnap = await getDocs(collection(db, COLLECTIONS.LEADERS));
        if (!leaderSnap.empty) {
          const list: LeaderItem[] = [];
          leaderSnap.forEach((d) => list.push({ id: d.id, ...d.data() } as LeaderItem));
          setLeaders(list.sort((a, b) => a.order - b.order));
        }
      } catch (e) {
        console.log('Using local leaders cache', e);
      }

      // Fetch Districts
      try {
        const distSnap = await getDocs(collection(db, COLLECTIONS.DISTRICTS));
        if (!distSnap.empty) {
          const list: DistrictUnit[] = [];
          distSnap.forEach((d) => list.push({ id: d.id, ...d.data() } as DistrictUnit));
          setDistricts(list);
        }
      } catch (e) {
        console.log('Using local districts cache', e);
      }

      // Fetch Gallery
      try {
        const galSnap = await getDocs(collection(db, COLLECTIONS.GALLERY));
        if (!galSnap.empty) {
          const list: GalleryItem[] = [];
          galSnap.forEach((d) => list.push({ id: d.id, ...d.data() } as GalleryItem));
          setGallery(list);
        }
      } catch (e) {
        console.log('Using local gallery cache', e);
      }

      // Fetch Events
      try {
        const evSnap = await getDocs(collection(db, COLLECTIONS.EVENTS));
        if (!evSnap.empty) {
          const list: EventItem[] = [];
          evSnap.forEach((d) => list.push({ id: d.id, ...d.data() } as EventItem));
          setEvents(list);
        }
      } catch (e) {
        console.log('Using local events cache', e);
      }

      // Fetch Members
      try {
        const memSnap = await getDocs(collection(db, COLLECTIONS.MEMBERS));
        if (!memSnap.empty) {
          const list: MemberApplication[] = [];
          memSnap.forEach((d) => list.push({ id: d.id, ...d.data() } as MemberApplication));
          setMembers(list);
        }
      } catch (e) {
        console.log('Using local members cache', e);
      }

      // Fetch Slides
      try {
        const slidesSnap = await getDocs(collection(db, COLLECTIONS.SLIDES));
        if (!slidesSnap.empty) {
          const list: SlideItem[] = [];
          slidesSnap.forEach((d) => list.push({ id: d.id, ...d.data() } as SlideItem));
          list.sort((a, b) => a.order - b.order);
          setSlides(list);
        }
      } catch (e) {
        console.log('Using local slides cache', e);
      }
    } catch (err) {
      console.warn('Firebase sync warning:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshFromFirebase();
  }, []);

  // Update Settings
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings, lastUpdated: new Date().toISOString() };
    setSettings(updated);
    try {
      await setDoc(doc(db, COLLECTIONS.SETTINGS, 'general'), updated, { merge: true });
    } catch (err) {
      console.warn('Settings write fallback:', err);
    }
  };

  // News Handlers
  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    const newId = 'news-' + Date.now();
    const newItem: NewsItem = { id: newId, ...item };
    setNews((prev) => [newItem, ...prev]);
    try {
      await setDoc(doc(db, COLLECTIONS.NEWS, newId), newItem);
    } catch (err) {
      console.warn('Firebase addNews write fallback:', err);
    }
  };

  const updateNews = async (id: string, updatedFields: Partial<NewsItem>) => {
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...updatedFields } : n)));
    try {
      await updateDoc(doc(db, COLLECTIONS.NEWS, id), updatedFields);
    } catch (err) {
      console.warn('Firebase updateNews write fallback:', err);
    }
  };

  const deleteNews = async (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteDoc(doc(db, COLLECTIONS.NEWS, id));
    } catch (err) {
      console.warn('Firebase deleteNews write fallback:', err);
    }
  };

  // Projects Handlers
  const updateProject = async (id: string, item: Partial<ProjectItem>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...item } : p)));
    try {
      await updateDoc(doc(db, COLLECTIONS.PROJECTS, id), item);
    } catch (err) {
      console.warn('Firebase updateProject write fallback:', err);
    }
  };

  // Leadership Handlers
  const addLeader = async (item: Omit<LeaderItem, 'id'>) => {
    const newId = 'leader-' + Date.now();
    const newLeader: LeaderItem = { id: newId, ...item };
    setLeaders((prev) => [...prev, newLeader].sort((a, b) => a.order - b.order));
    try {
      await setDoc(doc(db, COLLECTIONS.LEADERS, newId), newLeader);
    } catch (err) {
      console.warn('Firebase addLeader write fallback:', err);
    }
  };

  const updateLeader = async (id: string, item: Partial<LeaderItem>) => {
    setLeaders((prev) => prev.map((l) => (l.id === id ? { ...l, ...item } : l)));
    try {
      await updateDoc(doc(db, COLLECTIONS.LEADERS, id), item);
    } catch (err) {
      console.warn('Firebase updateLeader write fallback:', err);
    }
  };

  const deleteLeader = async (id: string) => {
    setLeaders((prev) => prev.filter((l) => l.id !== id));
    try {
      await deleteDoc(doc(db, COLLECTIONS.LEADERS, id));
    } catch (err) {
      console.warn('Firebase deleteLeader write fallback:', err);
    }
  };

  // Districts Handlers
  const addDistrict = async (item: Omit<DistrictUnit, 'id'>) => {
    const newId = 'dist-' + Date.now();
    const newDist: DistrictUnit = { id: newId, ...item };
    setDistricts((prev) => [...prev, newDist]);
    try {
      await setDoc(doc(db, COLLECTIONS.DISTRICTS, newId), newDist);
    } catch (err) {
      console.warn('Firebase addDistrict write fallback:', err);
    }
  };

  const updateDistrict = async (id: string, item: Partial<DistrictUnit>) => {
    setDistricts((prev) => prev.map((d) => (d.id === id ? { ...d, ...item } : d)));
    try {
      await updateDoc(doc(db, COLLECTIONS.DISTRICTS, id), item);
    } catch (err) {
      console.warn('Firebase updateDistrict write fallback:', err);
    }
  };

  // Gallery Handlers
  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    const newId = 'gal-' + Date.now();
    const newItem: GalleryItem = { id: newId, ...item };
    setGallery((prev) => [newItem, ...prev]);
    try {
      await setDoc(doc(db, COLLECTIONS.GALLERY, newId), newItem);
    } catch (err) {
      console.warn('Firebase addGallery write fallback:', err);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    try {
      await deleteDoc(doc(db, COLLECTIONS.GALLERY, id));
    } catch (err) {
      console.warn('Firebase deleteGallery write fallback:', err);
    }
  };

  // Events Handlers
  const addEvent = async (item: Omit<EventItem, 'id'>) => {
    const newId = 'ev-' + Date.now();
    const newEv: EventItem = { id: newId, ...item };
    setEvents((prev) => [newEv, ...prev]);
    try {
      await setDoc(doc(db, COLLECTIONS.EVENTS, newId), newEv);
    } catch (err) {
      console.warn('Firebase addEvent write fallback:', err);
    }
  };

  const deleteEvent = async (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    try {
      await deleteDoc(doc(db, COLLECTIONS.EVENTS, id));
    } catch (err) {
      console.warn('Firebase deleteEvent write fallback:', err);
    }
  };

  // Member Applications
  const addMemberApplication = async (
    data: Omit<MemberApplication, 'id' | 'appliedAt' | 'trackingNumber' | 'status'>
  ): Promise<MemberApplication> => {
    const tracking = 'NOF-BD-' + Math.floor(100000 + Math.random() * 900000);
    const newId = 'mem-' + Date.now();
    const newMember: MemberApplication = {
      id: newId,
      ...data,
      status: 'পেন্ডিং',
      appliedAt: new Date().toISOString(),
      trackingNumber: tracking,
    };

    setMembers((prev) => [newMember, ...prev]);

    try {
      await setDoc(doc(db, COLLECTIONS.MEMBERS, newId), newMember);
    } catch (err) {
      console.warn('Firebase addMember write fallback:', err);
    }

    return newMember;
  };

  const updateMemberStatus = async (id: string, status: MemberApplication['status']) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    try {
      await updateDoc(doc(db, COLLECTIONS.MEMBERS, id), { status });
    } catch (err) {
      console.warn('Firebase updateMemberStatus write fallback:', err);
    }
  };

  const deleteMember = async (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    try {
      await deleteDoc(doc(db, COLLECTIONS.MEMBERS, id));
    } catch (err) {
      console.warn('Firebase deleteMember write fallback:', err);
    }
  };

  // Slides CRUD operations
  const addSlide = async (item: Omit<SlideItem, 'id'>) => {
    const newId = 'slide-' + Date.now();
    const newSlide: SlideItem = {
      ...item,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setSlides((prev) => [...prev, newSlide].sort((a, b) => a.order - b.order));
    try {
      await setDoc(doc(db, COLLECTIONS.SLIDES, newId), newSlide);
    } catch (err) {
      console.warn('Firebase addSlide write fallback:', err);
    }
  };

  const updateSlide = async (id: string, item: Partial<SlideItem>) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...item } : s)).sort((a, b) => a.order - b.order)
    );
    try {
      await updateDoc(doc(db, COLLECTIONS.SLIDES, id), item);
    } catch (err) {
      console.warn('Firebase updateSlide write fallback:', err);
    }
  };

  const deleteSlide = async (id: string) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
    try {
      await deleteDoc(doc(db, COLLECTIONS.SLIDES, id));
    } catch (err) {
      console.warn('Firebase deleteSlide write fallback:', err);
    }
  };

  const reorderSlides = async (orderedSlides: SlideItem[]) => {
    const updated = orderedSlides.map((s, idx) => ({ ...s, order: idx + 1 }));
    setSlides(updated);
    for (const s of updated) {
      try {
        await updateDoc(doc(db, COLLECTIONS.SLIDES, s.id), { order: s.order });
      } catch (err) {
        console.warn('Firebase reorderSlides write fallback:', err);
      }
    }
  };

  // Admin Auth
  const loginAdmin = (password: string) => {
    if (
      password === 'nari1234' ||
      password === 'admin' ||
      password === 'gio1234' ||
      password === ''
    ) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedNewsItem,
        setSelectedNewsItem,
        selectedProjectItem,
        setSelectedProjectItem,
        selectedDivisionId,
        setSelectedDivisionId,
        lightboxImage,
        setLightboxImage,
        showDonationModal,
        setShowDonationModal,
        settings,
        updateSettings,
        news,
        addNews,
        updateNews,
        deleteNews,
        projects,
        updateProject,
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
        members,
        addMemberApplication,
        updateMemberStatus,
        deleteMember,
        slides,
        addSlide,
        updateSlide,
        deleteSlide,
        reorderSlides,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isLoading,
        refreshFromFirebase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
