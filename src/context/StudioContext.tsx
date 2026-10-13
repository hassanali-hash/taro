import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ShelfFinish, 
  ArrangementStyle, 
  ShelfItem, 
  RoomPreset, 
  StoredCreation,
  AccessCode
} from '../types';
import { 
  ROOM_PRESETS, 
  SAMPLE_OUTPUT_SETS, 
  INITIAL_CREATIONS, 
  DEMO_CODES,
  VisualOutputSet
} from '../data/mockAssets';

interface StudioContextType {
  // Navigation
  activeTab: 'home' | 'studio' | 'gallery' | 'finishes' | 'creations' | 'admin';
  setActiveTab: (tab: 'home' | 'studio' | 'gallery' | 'finishes' | 'creations' | 'admin') => void;

  // Shelf configuration
  shelves: ShelfItem[];
  setShelves: React.Dispatch<React.SetStateAction<ShelfItem[]>>;
  finish: ShelfFinish;
  setFinish: (finish: ShelfFinish) => void;
  arrangementStyle: ArrangementStyle;
  setArrangementStyle: (style: ArrangementStyle) => void;
  selectedRoom: RoomPreset;
  setSelectedRoom: (room: RoomPreset) => void;
  customRoomImage: string | null;
  setCustomRoomImage: (img: string | null) => void;

  // Actions on shelves
  addShelf: () => void;
  removeShelf: (id: string) => void;
  updateShelfLength: (id: string, lengthCm: number) => void;
  resetToPreset: (count: number, lengths: number[], style: ArrangementStyle) => void;

  // Generation & Credits
  credits: number;
  isGenerating: boolean;
  activeResultSet: VisualOutputSet;
  currentImageIndex: number;
  setCurrentImageIndex: (idx: number) => void;
  generateVisualization: (customStyle?: ArrangementStyle) => void;
  generateNewArrangement: () => void;
  redeemAccessCode: (code: string) => { success: boolean; message: string; creditsAdded?: number };

  // Creations History
  creations: StoredCreation[];
  saveCurrentToCreations: () => void;
  deleteCreation: (id: string) => void;
  loadCreation: (creation: StoredCreation) => void;

  // UI Modals
  isAccessCodeModalOpen: boolean;
  setIsAccessCodeModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CREDITS: 'taro_studio_credits',
  CREATIONS: 'taro_studio_creations',
  SHELVES: 'taro_studio_shelves',
  FINISH: 'taro_studio_finish',
  STYLE: 'taro_studio_style',
};

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'studio' | 'gallery' | 'finishes' | 'creations' | 'admin'>('home');

  // Shelves state (default 3 shelves: 160cm, 120cm, 200cm)
  const [shelves, setShelves] = useState<ShelfItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHELVES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      { id: 'shelf-1', lengthCm: 160, order: 1 },
      { id: 'shelf-2', lengthCm: 120, order: 2 },
      { id: 'shelf-3', lengthCm: 200, order: 3 },
    ];
  });

  const [finish, setFinishState] = useState<ShelfFinish>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FINISH);
      if (saved === 'honey_oak' || saved === 'wenge') return saved;
    } catch {
      // fallback
    }
    return 'honey_oak';
  });

  const [arrangementStyle, setArrangementStyleState] = useState<ArrangementStyle>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STYLE);
      if (saved) return saved as ArrangementStyle;
    } catch {
      // fallback
    }
    return 'staggered';
  });

  const [selectedRoom, setSelectedRoom] = useState<RoomPreset>(ROOM_PRESETS[0]);
  const [customRoomImage, setCustomRoomImage] = useState<string | null>(null);

  // Credits
  const [credits, setCredits] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CREDITS);
      if (saved !== null) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) return val;
      }
    } catch {
      // fallback
    }
    return 25;
  });

  // Creations
  const [creations, setCreations] = useState<StoredCreation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CREATIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CREATIONS;
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeResultSet, setActiveResultSet] = useState<VisualOutputSet>(SAMPLE_OUTPUT_SETS[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Modals & toast
  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CREDITS, credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CREATIONS, JSON.stringify(creations));
  }, [creations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHELVES, JSON.stringify(shelves));
  }, [shelves]);

  const setFinish = (newFinish: ShelfFinish) => {
    setFinishState(newFinish);
    localStorage.setItem(STORAGE_KEYS.FINISH, newFinish);
  };

  const setArrangementStyle = (style: ArrangementStyle) => {
    setArrangementStyleState(style);
    localStorage.setItem(STORAGE_KEYS.STYLE, style);
  };

  const addShelf = () => {
    if (shelves.length >= 5) {
      showToast('Maximum of 5 shelves per wall configuration');
      return;
    }
    const newId = `shelf-${Date.now()}`;
    // default length 120cm
    const newShelf: ShelfItem = {
      id: newId,
      lengthCm: 120,
      order: shelves.length + 1,
    };
    setShelves((prev) => [...prev, newShelf]);
  };

  const removeShelf = (id: string) => {
    if (shelves.length <= 1) {
      showToast('Minimum 1 shelf required for a configuration');
      return;
    }
    setShelves((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      return filtered.map((s, idx) => ({ ...s, order: idx + 1 }));
    });
  };

  const updateShelfLength = (id: string, lengthCm: number) => {
    // clamp between 40 and 300, 10cm steps
    const clamped = Math.max(40, Math.min(300, Math.round(lengthCm / 10) * 10));
    setShelves((prev) =>
      prev.map((s) => (s.id === id ? { ...s, lengthCm: clamped } : s))
    );
  };

  const resetToPreset = (count: number, lengths: number[], style: ArrangementStyle) => {
    const newShelves: ShelfItem[] = Array.from({ length: count }, (_, idx) => ({
      id: `shelf-${Date.now()}-${idx}`,
      lengthCm: lengths[idx] || 120,
      order: idx + 1,
    }));
    setShelves(newShelves);
    setArrangementStyle(style);
  };

  // Helper to pick closest output set based on finish, style, and shelf count
  const matchOutputSet = (targetFinish: ShelfFinish, targetStyle: ArrangementStyle): VisualOutputSet => {
    // 1. Exact match
    const exact = SAMPLE_OUTPUT_SETS.find(
      (s) => s.finish === targetFinish && s.arrangementStyle === targetStyle
    );
    if (exact) return exact;

    // 2. Same finish
    const sameFinish = SAMPLE_OUTPUT_SETS.filter((s) => s.finish === targetFinish);
    if (sameFinish.length > 0) return sameFinish[0];

    // 3. Fallback
    return SAMPLE_OUTPUT_SETS[0];
  };

  // Generate visualization simulation
  const generateVisualization = (customStyle?: ArrangementStyle) => {
    if (credits < 5) {
      setIsAccessCodeModalOpen(true);
      showToast('Demo credit limit reached (5 required). Enter code to replenish.');
      return;
    }

    const styleToUse = customStyle || arrangementStyle;
    setIsGenerating(true);

    // Simulated multi-step loading (2.8 seconds)
    setTimeout(() => {
      const matched = matchOutputSet(finish, styleToUse);
      setActiveResultSet(matched);
      setCurrentImageIndex(0);
      setCredits((prev) => Math.max(0, prev - 5));
      setIsGenerating(false);
      setActiveTab('gallery');
      showToast('Visualization set generated successfully (5 credits deducted)');
    }, 2800);
  };

  // Cycle to a new arrangement
  const generateNewArrangement = () => {
    const allStyles: ArrangementStyle[] = ['symmetrical', 'asymmetrical', 'staggered', 'vertical', 'gallery'];
    const currentIndex = allStyles.indexOf(arrangementStyle);
    const nextStyle = allStyles[(currentIndex + 1) % allStyles.length];
    
    setArrangementStyle(nextStyle);
    generateVisualization(nextStyle);
  };

  // Redeem access code
  const redeemAccessCode = (inputCode: string) => {
    const cleanCode = inputCode.trim().toUpperCase();
    const found = DEMO_CODES.find((c) => c.code === cleanCode);

    if (cleanCode === 'TARO-DEMO' || (found && found.active)) {
      const grant = found ? found.creditsGrant : 25;
      setCredits(25);
      showToast(`Access code accepted! Demo allowance reset to 25/25 credits.`);
      return { success: true, message: 'Credits restored', creditsAdded: grant };
    }

    return { 
      success: false, 
      message: 'Invalid access code. Please use demonstration code: TARO-DEMO' 
    };
  };

  // Save creation
  const saveCurrentToCreations = () => {
    const totalLength = shelves.reduce((sum, s) => sum + s.lengthCm, 0);
    const creationTitle = `${finish === 'honey_oak' ? 'Honey Oak' : 'Wenge'} ${
      arrangementStyle.charAt(0).toUpperCase() + arrangementStyle.slice(1)
    } (${shelves.length} Shelves)`;

    const newCreation: StoredCreation = {
      id: `creation-${Date.now()}`,
      title: creationTitle,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      finish,
      arrangement: arrangementStyle,
      shelves: [...shelves],
      roomName: customRoomImage ? 'Custom Uploaded Room' : selectedRoom.name,
      primaryImage: activeResultSet.primaryImage,
      galleryImages: activeResultSet.images.map((img) => img.url),
      isCustomRoom: Boolean(customRoomImage),
      totalLengthCm: totalLength,
    };

    setCreations((prev) => [newCreation, ...prev]);
    showToast('Saved to My Creations history');
  };

  const deleteCreation = (id: string) => {
    setCreations((prev) => prev.filter((c) => c.id !== id));
    showToast('Creation removed from portfolio history');
  };

  const loadCreation = (creation: StoredCreation) => {
    setFinish(creation.finish);
    setArrangementStyle(creation.arrangement);
    setShelves(creation.shelves);
    const matched = matchOutputSet(creation.finish, creation.arrangement);
    setActiveResultSet(matched);
    setCurrentImageIndex(0);
    setActiveTab('gallery');
    showToast(`Loaded "${creation.title}" into gallery view`);
  };

  return (
    <StudioContext.Provider
      value={{
        activeTab,
        setActiveTab,
        shelves,
        setShelves,
        finish,
        setFinish,
        arrangementStyle,
        setArrangementStyle,
        selectedRoom,
        setSelectedRoom,
        customRoomImage,
        setCustomRoomImage,
        addShelf,
        removeShelf,
        updateShelfLength,
        resetToPreset,
        credits,
        isGenerating,
        activeResultSet,
        currentImageIndex,
        setCurrentImageIndex,
        generateVisualization,
        generateNewArrangement,
        redeemAccessCode,
        creations,
        saveCurrentToCreations,
        deleteCreation,
        loadCreation,
        isAccessCodeModalOpen,
        setIsAccessCodeModalOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
