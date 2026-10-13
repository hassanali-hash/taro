import React from 'react';
import { useStudio } from '../context/StudioContext';
import { ShieldCheck, Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useStudio();

  return (
    <footer className="bg-[#252525] text-[#EEE9E1] pt-16 pb-12 border-t border-black/20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-white uppercase block">
              TARO
            </span>
            <p className="text-xs text-[#EEE9E1]/70 leading-relaxed max-w-sm">
              Architectural floating shelves in solid Paulownia timber. Hand-crafted with concealed 
              heavy-duty steel brackets, straight square edges, and zero-VOC natural hardwax oil finishes.
            </p>
            <div className="text-xs text-[#A78055] font-mono">
              Imagine It. Arrange It. Make It Yours.
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
              Design Platform
            </span>
            <ul className="space-y-2 text-xs text-[#EEE9E1]/70">
              <li>
                <button 
                  onClick={() => setActiveTab('studio')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Configurator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('finishes')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Honey Oak & Wenge Swatches
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('gallery')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  5-Angle Gallery Renders
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('creations')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Saved Creation History
                </button>
              </li>
            </ul>
          </div>

          {/* Specifications & Hardware */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold block">
              Product Standard
            </span>
            <ul className="space-y-2 text-xs text-[#EEE9E1]/70">
              <li>· Dimensions: 20 cm Depth × 4 cm Thickness</li>
              <li>· Custom Spans: 40 cm to 300 cm in 10 cm steps</li>
              <li>· Material: 100% Solid Paulownia Hardwood</li>
              <li>· Bracket: Concealed steel rod with micro-leveling</li>
              <li>· Rating: 35 kg per linear meter load capacity</li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#EEE9E1]/50 gap-4">
          <div>
            © 2026 TARO Architectural Living. Client Presentation Prototype.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('admin')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Demo Admin Panel
            </button>
            <span aria-hidden="true">·</span>
            <span>All mock assets stored locally</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
