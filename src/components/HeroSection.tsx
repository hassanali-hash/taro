import React from 'react';
import { useStudio } from '../context/StudioContext';
import { ASSET_IMAGES } from '../data/mockAssets';
import { ArrowRight, Layers, Sliders, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useStudio();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Split Grid Hero: Content & Architectural Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A78055] font-semibold block">
                Bespoke Paulownia Floating Shelves
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl/tight font-normal text-[#252525] tracking-tight">
                Visualize Your Perfect Space
              </h1>
            </div>

            <p className="text-base text-[#79746E] leading-relaxed max-w-lg">
              Imagine It. Arrange It. Make It Yours. Experience architectural 
              solid wood shelving rendered in authentic Scandinavian living interiors. 
              Configure custom spans from 40 cm to 300 cm in Honey Oak or Wenge.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => setActiveTab('studio')}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#252525] text-white text-xs font-semibold tracking-wider uppercase rounded hover:bg-[#3D3A37] transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
              >
                <span>Design Your Shelves</span>
                <ArrowRight className="w-4 h-4 text-[#A78055]" />
              </button>

              <button
                onClick={() => setActiveTab('finishes')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#252525]/20 text-[#252525] text-xs font-medium tracking-wider uppercase rounded hover:bg-[#EEE9E1]/60 transition-colors cursor-pointer"
              >
                <span>Honey Oak & Wenge</span>
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="pt-4 flex items-center gap-6 text-xs text-[#79746E] border-t border-[#252525]/10">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A78055]" />
                Concealed Heavy Steel Mount
              </span>
              <span aria-hidden="true" className="text-[#252525]/20">·</span>
              <span>100% Solid Paulownia</span>
              <span aria-hidden="true" className="text-[#252525]/20">·</span>
              <span>Zero-VOC Matte Hardwax</span>
            </div>
          </div>

          {/* Right Column: Hero Architectural Media Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#ECE7DF] aspect-[16/10] sm:aspect-[16/9] group">
              <img
                src={ASSET_IMAGES.hero}
                alt="Luxury Scandinavian living room with Honey Oak solid Paulownia floating shelves"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Minimal architectural tag overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                <div className="bg-[#252525]/80 backdrop-blur-md text-white/90 text-xs px-3.5 py-2 rounded font-sans tracking-wide">
                  <span className="font-medium text-white">Curated Elevation</span>
                  <span className="text-white/50 mx-2">·</span>
                  <span>Honey Oak Paulownia · 3 × 240 cm</span>
                </div>
                
                <button
                  onClick={() => setActiveTab('studio')}
                  className="pointer-events-auto bg-[#F8F7F4]/95 text-[#252525] hover:bg-white text-xs font-medium px-3.5 py-2 rounded shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#A78055]" />
                  <span>Configure Similar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-metric strip below hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 bg-[#EEE9E1]/50 border border-[#252525]/8 rounded-xl">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#79746E] block font-medium">Thickness</span>
            <div className="font-serif text-2xl text-[#252525] font-medium">4.0 cm</div>
            <p className="text-xs text-[#79746E]">Solid square-edge profile</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#79746E] block font-medium">Depth</span>
            <div className="font-serif text-2xl text-[#252525] font-medium">20.0 cm</div>
            <p className="text-xs text-[#79746E]">Optimized for books & stoneware</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#79746E] block font-medium">Custom Spans</span>
            <div className="font-serif text-2xl text-[#252525] font-medium">40 – 300 cm</div>
            <p className="text-xs text-[#79746E]">Precision 10 cm increments</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#79746E] block font-medium">Weight Capacity</span>
            <div className="font-serif text-2xl text-[#252525] font-medium tabular-nums">35 kg / m</div>
            <p className="text-xs text-[#79746E]">Concealed steel rod internal bracket</p>
          </div>
        </div>
      </div>
    </section>
  );
};
