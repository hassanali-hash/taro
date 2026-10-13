import React from 'react';
import { useStudio } from '../context/StudioContext';
import { FINISH_DETAILS, ASSET_IMAGES, PAULOWNIA_SPECS } from '../data/mockAssets';
import { ShelfFinish } from '../types';
import { Check, ArrowRight, Sparkles, Feather, Shield, Droplets } from 'lucide-react';

export const FinishesShowcase: React.FC = () => {
  const { finish, setFinish, setActiveTab } = useStudio();

  const handleSelectFinish = (f: ShelfFinish) => {
    setFinish(f);
  };

  return (
    <section className="py-20 bg-[#F8F7F4] border-t border-[#252525]/8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A78055] font-semibold block">
            Craftsmanship & Materiality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#252525]">
            Solid Paulownia Wood Finishes
          </h2>
          <p className="text-sm text-[#79746E] leading-relaxed">
            Revered in Japanese cabinetmaking as the "Phoenix Tree", Paulownia delivers extraordinary 
            strength-to-weight performance, silky linear grain, and natural warp-resistance. Hand-finished 
            in two signature European studio tones.
          </p>
        </div>

        {/* 2 Finishes Split Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Honey Oak Card */}
          <div 
            className={`p-8 rounded-2xl transition-all border flex flex-col justify-between ${
              finish === 'honey_oak'
                ? 'bg-white border-[#A78055] shadow-md ring-1 ring-[#A78055]/30'
                : 'bg-[#EEE9E1]/30 border-[#252525]/10 hover:border-[#252525]/20'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A78055]">Tone: Amber Golden</span>
                  <h3 className="font-serif text-2xl font-normal text-[#252525] mt-0.5">
                    Honey Oak
                  </h3>
                </div>
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                  style={{ backgroundColor: FINISH_DETAILS.honey_oak.hex }}
                >
                  {finish === 'honey_oak' && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>

              {/* Product sample imagery */}
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-[#ECE7DF] relative group shadow-sm">
                <img
                  src={ASSET_IMAGES.honeyOakGallery}
                  alt="Honey Oak floating shelves in modern living interior"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#252525]/75 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-sm">
                  Natural Plant Hardwax Oil
                </div>
              </div>

              <p className="text-sm text-[#79746E] leading-relaxed">
                {FINISH_DETAILS.honey_oak.description}
              </p>

              <div className="space-y-2 text-xs text-[#79746E]">
                <div className="flex justify-between py-1.5 border-b border-[#252525]/8">
                  <span className="font-medium text-[#252525]">Wood Grain</span>
                  <span>{FINISH_DETAILS.honey_oak.grainTexture}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#252525]/8">
                  <span className="font-medium text-[#252525]">Interior Pairing</span>
                  <span className="text-right max-w-[220px]">Limestone plaster, bouclé, Japandi, oak flooring</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium text-[#252525]">Fixed Dimensions</span>
                  <span>Depth 20 cm · Thickness 4 cm</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => {
                  handleSelectFinish('honey_oak');
                  setActiveTab('studio');
                }}
                className={`w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  finish === 'honey_oak'
                    ? 'bg-[#252525] text-white hover:bg-[#3D3A37]'
                    : 'bg-white border border-[#252525]/20 text-[#252525] hover:bg-[#EEE9E1]/50'
                }`}
              >
                <span>Select & Configure in Honey Oak</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A78055]" />
              </button>
            </div>
          </div>

          {/* Wenge Card */}
          <div 
            className={`p-8 rounded-2xl transition-all border flex flex-col justify-between ${
              finish === 'wenge'
                ? 'bg-white border-[#252525] shadow-md ring-1 ring-[#252525]/30'
                : 'bg-[#EEE9E1]/30 border-[#252525]/10 hover:border-[#252525]/20'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#79746E]">Tone: Deep Espresso Charcoal</span>
                  <h3 className="font-serif text-2xl font-normal text-[#252525] mt-0.5">
                    Wenge
                  </h3>
                </div>
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                  style={{ backgroundColor: FINISH_DETAILS.wenge.hex }}
                >
                  {finish === 'wenge' && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>

              {/* Product sample imagery */}
              <div className="rounded-xl overflow-hidden aspect-[16/10] bg-[#28211E] relative group shadow-sm">
                <img
                  src={ASSET_IMAGES.wengeAsymmetric}
                  alt="Wenge floating shelves in contemporary architectural interior"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#252525]/85 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-sm">
                  Deep Organic Pigment Stain
                </div>
              </div>

              <p className="text-sm text-[#79746E] leading-relaxed">
                {FINISH_DETAILS.wenge.description}
              </p>

              <div className="space-y-2 text-xs text-[#79746E]">
                <div className="flex justify-between py-1.5 border-b border-[#252525]/8">
                  <span className="font-medium text-[#252525]">Wood Grain</span>
                  <span>{FINISH_DETAILS.wenge.grainTexture}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#252525]/8">
                  <span className="font-medium text-[#252525]">Interior Pairing</span>
                  <span className="text-right max-w-[220px]">Warm taupe walls, brushed brass, modern dining & study</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-medium text-[#252525]">Fixed Dimensions</span>
                  <span>Depth 20 cm · Thickness 4 cm</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => {
                  handleSelectFinish('wenge');
                  setActiveTab('studio');
                }}
                className={`w-full py-3 px-4 text-xs font-semibold tracking-wider uppercase rounded transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  finish === 'wenge'
                    ? 'bg-[#252525] text-white hover:bg-[#3D3A37]'
                    : 'bg-white border border-[#252525]/20 text-[#252525] hover:bg-[#EEE9E1]/50'
                }`}
              >
                <span>Select & Configure in Wenge</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A78055]" />
              </button>
            </div>
          </div>
        </div>

        {/* Paulownia Wood Material Advantages Section */}
        <div className="p-8 sm:p-10 bg-[#EEE9E1]/50 rounded-2xl border border-[#252525]/8">
          <div className="max-w-xl mb-8 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A78055] font-semibold block">
              Why Solid Paulownia?
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#252525]">
              Lightweight Strength Without Wall Sag
            </h3>
            <p className="text-xs text-[#79746E]">
              Traditional dense hardwoods place immense cantilever stress on drywall brackets. Solid Paulownia provides the ideal structural equilibrium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white/70 rounded-xl space-y-3 border border-[#252525]/6">
              <div className="w-9 h-9 rounded-lg bg-[#EEE9E1] flex items-center justify-center text-[#A78055]">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium text-[#252525]">
                40% Lighter Than White Oak
              </h4>
              <p className="text-xs text-[#79746E] leading-relaxed">
                Paulownia's cellular microstructure yields an astonishing density of only ~310 kg/m³, drastically reducing mechanical leverage on your wall studs.
              </p>
            </div>

            <div className="p-5 bg-white/70 rounded-xl space-y-3 border border-[#252525]/6">
              <div className="w-9 h-9 rounded-lg bg-[#EEE9E1] flex items-center justify-center text-[#A78055]">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium text-[#252525]">
                Warp & Twist Resistant
              </h4>
              <p className="text-xs text-[#79746E] leading-relaxed">
                Extremely low shrinkage coefficient ensures your floating shelves remain perfectly square, flat, and true regardless of seasonal indoor humidity.
              </p>
            </div>

            <div className="p-5 bg-white/70 rounded-xl space-y-3 border border-[#252525]/6">
              <div className="w-9 h-9 rounded-lg bg-[#EEE9E1] flex items-center justify-center text-[#A78055]">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-medium text-[#252525]">
                Organic Plant Wax Seal
              </h4>
              <p className="text-xs text-[#79746E] leading-relaxed">
                Every shelf is hand-rubbed with two layers of non-toxic vegetable wax oil that enriches the grain while repelling liquid spills and moisture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
