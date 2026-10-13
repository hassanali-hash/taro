import React from 'react';
import { useStudio } from '../context/StudioContext';
import { Sparkles, KeyRound } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, credits, setIsAccessCodeModalOpen } = useStudio();

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#252525]/8 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => setActiveTab('home')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#252525] uppercase whitespace-nowrap shrink-0 transition-opacity group-hover:opacity-80">
            TARO
          </span>
        </button>

        {/* Zone 2: Navigation Links (Single-line, 1-2 words, hover underline) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#79746E]">
          <button
            onClick={() => setActiveTab('studio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'studio'
                ? 'text-[#252525] border-[#252525]'
                : 'border-transparent hover:text-[#252525]'
            }`}
          >
            Design Studio
          </button>
          <button
            onClick={() => setActiveTab('finishes')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'finishes'
                ? 'text-[#252525] border-[#252525]'
                : 'border-transparent hover:text-[#252525]'
            }`}
          >
            Wood Finishes
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'gallery'
                ? 'text-[#252525] border-[#252525]'
                : 'border-transparent hover:text-[#252525]'
            }`}
          >
            Visualization Gallery
          </button>
          <button
            onClick={() => setActiveTab('creations')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'creations'
                ? 'text-[#252525] border-[#252525]'
                : 'border-transparent hover:text-[#252525]'
            }`}
          >
            My Creations
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer border-b-2 ${
              activeTab === 'admin'
                ? 'text-[#252525] border-[#252525]'
                : 'border-transparent hover:text-[#252525]'
            }`}
          >
            Demo Admin
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Credit pill info */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Credit status trigger */}
          <button
            onClick={() => setIsAccessCodeModalOpen(true)}
            title="Click to enter demo access code or replenish credits"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#79746E] hover:text-[#252525] hover:bg-[#EEE9E1]/80 rounded transition-colors cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#A78055]" />
            <span className="font-mono tabular-nums text-xs">
              Credits: {credits}/25
            </span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => setActiveTab('studio')}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#252525] hover:bg-[#3D3A37] transition-all rounded shadow-sm hover:shadow active:scale-[0.99] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Design Your Shelves
          </button>
        </div>
      </div>
    </header>
  );
};
