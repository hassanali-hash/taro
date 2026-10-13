import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { ARRANGEMENT_STYLES, SAMPLE_OUTPUT_SETS } from '../data/mockAssets';
import { ArrangementStyle } from '../types';
import { ArrowRight, Sliders, Eye } from 'lucide-react';

export const ArrangementShowcase: React.FC = () => {
  const { setActiveTab, setArrangementStyle, resetToPreset } = useStudio();
  const [selectedStyleId, setSelectedStyleId] = useState<ArrangementStyle>('staggered');

  const activeStyle = ARRANGEMENT_STYLES.find((s) => s.id === selectedStyleId) || ARRANGEMENT_STYLES[0];
  const matchedOutput = SAMPLE_OUTPUT_SETS.find((s) => s.arrangementStyle === selectedStyleId) || SAMPLE_OUTPUT_SETS[0];

  const handleApplyPreset = (styleId: ArrangementStyle) => {
    let presetLengths = [160, 120, 200];
    let count = 3;

    if (styleId === 'symmetrical') {
      presetLengths = [220, 220, 220];
      count = 3;
    } else if (styleId === 'staggered') {
      presetLengths = [180, 140];
      count = 2;
    } else if (styleId === 'vertical') {
      presetLengths = [100, 100, 100, 100];
      count = 4;
    } else if (styleId === 'gallery') {
      presetLengths = [140, 200, 160];
      count = 3;
    } else if (styleId === 'asymmetrical') {
      presetLengths = [200, 120, 160, 90];
      count = 4;
    }

    resetToPreset(count, presetLengths, styleId);
    setActiveTab('studio');
  };

  return (
    <section className="py-20 bg-[#F8F7F4] border-t border-[#252525]/8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A78055] font-semibold block">
              Architectural Geometry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#252525]">
              Curated Shelf Arrangements
            </h2>
            <p className="text-sm text-[#79746E]">
              Explore five distinct placement philosophies designed to complement varied ceiling heights, furniture proportions, and art collections.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('studio')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#252525] hover:text-[#A78055] transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Launch Studio Configurator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Style Selector Tabs (Segmented controls) */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#EEE9E1]/70 rounded-lg mb-10 max-w-3xl">
          {ARRANGEMENT_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyleId(style.id)}
              className={`px-4 py-2.5 text-xs font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
                selectedStyleId === style.id
                  ? 'bg-white text-[#252525] shadow-sm font-semibold'
                  : 'text-[#79746E] hover:text-[#252525] hover:bg-white/50'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>

        {/* Featured Layout Spotlight Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#EEE9E1]/30 p-8 sm:p-10 rounded-2xl border border-[#252525]/6">
          {/* Left Preview Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-[#ECE7DF] aspect-[4/3] group">
              <img
                src={matchedOutput.primaryImage}
                alt={matchedOutput.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-wider text-[#EEE9E1]/80 block font-sans">
                  {matchedOutput.subtitle}
                </span>
                <div className="font-serif text-xl sm:text-2xl font-medium mt-1">
                  {matchedOutput.title}
                </div>
              </div>
            </div>
          </div>

          {/* Right Information & Action Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A78055] font-semibold">
                Pattern: {activeStyle.tagline}
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#252525]">
                {activeStyle.label}
              </h3>
              <p className="text-sm text-[#79746E] leading-relaxed">
                {activeStyle.description}
              </p>
            </div>

            <div className="p-4 bg-white/80 rounded-lg border border-[#252525]/6 space-y-2 text-xs text-[#79746E]">
              <div className="flex justify-between py-1 border-b border-[#252525]/6">
                <span>Composition Structure</span>
                <span className="text-[#252525] font-medium">{activeStyle.layoutPattern}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#252525]/6">
                <span>Recommended Finishes</span>
                <span className="text-[#252525] font-medium">Honey Oak or Wenge</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Ideal Wall Width</span>
                <span className="text-[#252525] font-medium">2.0 m – 4.5 m</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => handleApplyPreset(activeStyle.id)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#252525] text-white text-xs font-semibold tracking-wider uppercase rounded hover:bg-[#3D3A37] transition-all cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <Sliders className="w-3.5 h-3.5 text-[#A78055]" />
                <span>Customize in Studio</span>
              </button>

              <button
                onClick={() => {
                  setArrangementStyle(activeStyle.id);
                  setActiveTab('gallery');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#252525]/20 text-[#252525] text-xs font-medium tracking-wider uppercase rounded hover:bg-[#EEE9E1]/80 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#79746E]" />
                <span>View 5-Angle Renders</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
