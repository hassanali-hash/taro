import React, { useState, useRef } from 'react';
import { useStudio } from '../context/StudioContext';
import { 
  FINISH_DETAILS, 
  ROOM_PRESETS, 
  ARRANGEMENT_STYLES, 
  PAULOWNIA_SPECS,
  ASSET_IMAGES 
} from '../data/mockAssets';
import { ShelfFinish, ArrangementStyle, RoomPreset } from '../types';
import { 
  Plus, 
  Minus, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  Sliders, 
  Sparkles, 
  Layers, 
  Info, 
  ArrowRight,
  Maximize2,
  RefreshCw,
  X
} from 'lucide-react';

export const StudioConfigurator: React.FC = () => {
  const {
    shelves,
    addShelf,
    removeShelf,
    updateShelfLength,
    finish,
    setFinish,
    arrangementStyle,
    setArrangementStyle,
    selectedRoom,
    setSelectedRoom,
    customRoomImage,
    setCustomRoomImage,
    generateVisualization,
    resetToPreset,
    credits,
    setIsAccessCodeModalOpen,
    showToast,
  } = useStudio();

  const [activeRoomTab, setActiveRoomTab] = useState<'presets' | 'upload'>('presets');
  const [alignmentMode, setAlignmentMode] = useState<'centered' | 'staggered' | 'left' | 'right'>('centered');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculations
  const totalLengthCm = shelves.reduce((acc, s) => acc + s.lengthCm, 0);
  const totalCapacityKg = Math.round((totalLengthCm / 100) * PAULOWNIA_SPECS.loadCapacityKgPerM);
  const estimatedTimberWeightKg = ((totalLengthCm / 100) * (PAULOWNIA_SPECS.depthFixedCm / 100) * (PAULOWNIA_SPECS.thicknessFixedCm / 100) * 310).toFixed(1);

  // Handle image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showToast('Please upload a JPG, PNG, or WebP image');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCustomRoomImage(reader.result as string);
      setActiveRoomTab('upload');
      showToast('Room photo uploaded successfully');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showToast('Please upload a JPG, PNG, or WebP image');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCustomRoomImage(reader.result as string);
      setActiveRoomTab('upload');
      showToast('Room photo uploaded successfully');
    };
    reader.readAsDataURL(file);
  };

  // Helper for wall visualizer offset based on alignment and shelf order
  const getShelfHorizontalOffset = (shelfIndex: number, totalShelves: number) => {
    if (alignmentMode === 'centered') return 'center';
    if (alignmentMode === 'left') return 'flex-start';
    if (alignmentMode === 'right') return 'flex-end';
    // staggered: alternate
    return shelfIndex % 2 === 0 ? 'flex-start' : 'flex-end';
  };

  return (
    <div className="py-10 bg-[#F8F7F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Studio Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-[#252525]/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#A78055] font-semibold block mb-1">
              Interactive 3D Elevation Studio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#252525]">
              Shelf Configurator
            </h1>
            <p className="text-xs text-[#79746E] mt-1">
              Select 1–5 solid Paulownia shelves. Customize lengths from 40 to 300 cm in 10 cm increments.
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <span className="text-xs text-[#79746E] uppercase tracking-wider whitespace-nowrap">
              Presets:
            </span>
            {ARRANGEMENT_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => {
                  setArrangementStyle(style.id);
                  if (style.id === 'symmetrical') {
                    resetToPreset(3, [200, 200, 200], style.id);
                  } else if (style.id === 'staggered') {
                    resetToPreset(2, [180, 140], style.id);
                  } else if (style.id === 'vertical') {
                    resetToPreset(4, [100, 100, 100, 100], style.id);
                  } else if (style.id === 'gallery') {
                    resetToPreset(3, [140, 200, 160], style.id);
                  } else if (style.id === 'asymmetrical') {
                    resetToPreset(4, [200, 120, 160, 90], style.id);
                  }
                }}
                className={`px-3 py-1.5 text-xs rounded transition-all whitespace-nowrap cursor-pointer ${
                  arrangementStyle === style.id
                    ? 'bg-[#252525] text-white font-medium'
                    : 'bg-[#EEE9E1]/80 text-[#252525] hover:bg-[#EEE9E1]'
                }`}
              >
                {style.label.replace(' Layout', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Studio Grid: Left Configuration & Right Architectural Wall Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Controls & Sliders (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Shelf Count & Add Shelf Controller */}
            <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A78055]">Step 01</span>
                  <h2 className="font-serif text-lg font-normal text-[#252525]">
                    Shelf Quantity ({shelves.length} / 5)
                  </h2>
                </div>
                
                {/* 1-5 Number Steppers */}
                <div className="flex items-center gap-1.5 p-1 bg-[#EEE9E1]/70 rounded-lg">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        if (num > shelves.length) {
                          const needed = num - shelves.length;
                          for (let i = 0; i < needed; i++) {
                            addShelf();
                          }
                        } else if (num < shelves.length) {
                          const target = shelves.slice(0, num);
                          // reset state safely
                          target.forEach((_, idx) => {
                            if (idx + 1 > num) removeShelf(shelves[idx].id);
                          });
                        }
                      }}
                      className={`w-7 h-7 text-xs font-medium rounded transition-colors cursor-pointer ${
                        shelves.length === num
                          ? 'bg-[#252525] text-white shadow-sm'
                          : 'text-[#79746E] hover:text-[#252525]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Shelf List Controls */}
              <div className="space-y-4 pt-2">
                {shelves.map((shelf, idx) => (
                  <div
                    key={shelf.id}
                    className="p-4 bg-[#F8F7F4] rounded-xl border border-[#252525]/6 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#EEE9E1] text-[11px] font-mono flex items-center justify-center text-[#252525] font-semibold">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#252525]">
                          Shelf {idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono tabular-nums text-sm font-semibold text-[#252525]">
                          {shelf.lengthCm} cm
                        </span>
                        {shelves.length > 1 && (
                          <button
                            onClick={() => removeShelf(shelf.id)}
                            className="text-[#79746E] hover:text-red-700 p-1 transition-colors cursor-pointer"
                            title="Remove shelf"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Interactive Length Slider */}
                    <div className="space-y-1.5">
                      <input
                        type="range"
                        min="40"
                        max="300"
                        step="10"
                        value={shelf.lengthCm}
                        onChange={(e) => updateShelfLength(shelf.id, Number(e.target.value))}
                        className="w-full h-1.5 bg-[#EEE9E1] rounded-lg appearance-none cursor-pointer accent-[#252525]"
                      />
                      <div className="flex justify-between text-[10px] text-[#79746E] font-mono">
                        <span>40 cm</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateShelfLength(shelf.id, shelf.lengthCm - 10)} 
                            className="hover:text-[#252525] cursor-pointer"
                            disabled={shelf.lengthCm <= 40}
                          >
                            -10cm
                          </button>
                          <span>·</span>
                          <button 
                            onClick={() => updateShelfLength(shelf.id, shelf.lengthCm + 10)} 
                            className="hover:text-[#252525] cursor-pointer"
                            disabled={shelf.lengthCm >= 300}
                          >
                            +10cm
                          </button>
                        </div>
                        <span>300 cm</span>
                      </div>
                    </div>

                    {/* Fixed dimensions indicator */}
                    <div className="text-[11px] text-[#79746E] flex items-center justify-between pt-1 border-t border-[#252525]/5">
                      <span>Dimensions: {shelf.lengthCm} × 20 × 4 cm</span>
                      <span>Max load: {Math.round((shelf.lengthCm / 100) * 35)} kg</span>
                    </div>
                  </div>
                ))}
              </div>

              {shelves.length < 5 && (
                <button
                  onClick={addShelf}
                  className="w-full py-2.5 px-4 border border-dashed border-[#252525]/20 hover:border-[#252525]/50 text-[#252525] text-xs font-medium uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Shelf ({shelves.length + 1} of 5)</span>
                </button>
              )}
            </div>

            {/* Step 02: Wood Finish Selection */}
            <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#A78055]">Step 02</span>
                <h2 className="font-serif text-lg font-normal text-[#252525]">
                  Paulownia Finish
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Honey Oak Swatch */}
                <button
                  onClick={() => setFinish('honey_oak')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    finish === 'honey_oak'
                      ? 'border-[#A78055] bg-[#A78055]/5 ring-1 ring-[#A78055]'
                      : 'border-[#252525]/10 hover:border-[#252525]/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: FINISH_DETAILS.honey_oak.hex }}
                    />
                    {finish === 'honey_oak' && (
                      <Check className="w-4 h-4 text-[#A78055]" />
                    )}
                  </div>
                  <div className="font-serif text-base font-medium text-[#252525]">
                    Honey Oak
                  </div>
                  <div className="text-[11px] text-[#79746E] mt-0.5">
                    Warm amber & gold
                  </div>
                </button>

                {/* Wenge Swatch */}
                <button
                  onClick={() => setFinish('wenge')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    finish === 'wenge'
                      ? 'border-[#252525] bg-[#252525]/5 ring-1 ring-[#252525]'
                      : 'border-[#252525]/10 hover:border-[#252525]/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: FINISH_DETAILS.wenge.hex }}
                    />
                    {finish === 'wenge' && (
                      <Check className="w-4 h-4 text-[#252525]" />
                    )}
                  </div>
                  <div className="font-serif text-base font-medium text-[#252525]">
                    Wenge
                  </div>
                  <div className="text-[11px] text-[#79746E] mt-0.5">
                    Deep espresso charcoal
                  </div>
                </button>
              </div>

              <div className="p-3 bg-[#F8F7F4] rounded-lg text-xs text-[#79746E] space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-[#252525]">
                  <Info className="w-3.5 h-3.5 text-[#A78055]" />
                  <span>{FINISH_DETAILS[finish].woodSpecies}</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {FINISH_DETAILS[finish].description}
                </p>
              </div>
            </div>

            {/* Step 03: Room Context & Upload */}
            <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A78055]">Step 03</span>
                  <h2 className="font-serif text-lg font-normal text-[#252525]">
                    Room Environment
                  </h2>
                </div>

                {/* Segmented Tab: Presets vs Upload */}
                <div className="flex items-center gap-1 p-1 bg-[#EEE9E1]/60 rounded-lg text-xs">
                  <button
                    onClick={() => setActiveRoomTab('presets')}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      activeRoomTab === 'presets'
                        ? 'bg-white text-[#252525] shadow-xs font-medium'
                        : 'text-[#79746E]'
                    }`}
                  >
                    Presets
                  </button>
                  <button
                    onClick={() => setActiveRoomTab('upload')}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      activeRoomTab === 'upload'
                        ? 'bg-white text-[#252525] shadow-xs font-medium'
                        : 'text-[#79746E]'
                    }`}
                  >
                    Upload Room
                  </button>
                </div>
              </div>

              {activeRoomTab === 'presets' ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {ROOM_PRESETS.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => {
                        setSelectedRoom(room);
                        setCustomRoomImage(null);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                        selectedRoom.id === room.id && !customRoomImage
                          ? 'border-[#252525] bg-[#EEE9E1]/40 ring-1 ring-[#252525]/30'
                          : 'border-[#252525]/10 hover:border-[#252525]/20'
                      }`}
                    >
                      <div className="aspect-[16/10] rounded-lg overflow-hidden mb-2 bg-[#ECE7DF]">
                        <img
                          src={room.image}
                          alt={room.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="text-xs font-medium text-[#252525] truncate">
                        {room.name}
                      </div>
                      <div className="text-[10px] text-[#79746E]">
                        {room.category}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                /* Drag & Drop Room Photo Upload Area */
                <div className="space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  {customRoomImage ? (
                    <div className="relative rounded-xl overflow-hidden border border-[#252525]/10 aspect-[16/10] group">
                      <img
                        src={customRoomImage}
                        alt="Uploaded user room"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-white text-[#252525] text-xs font-medium rounded shadow cursor-pointer"
                        >
                          Change Photo
                        </button>
                        <button
                          onClick={() => setCustomRoomImage(null)}
                          className="p-1.5 bg-red-600 text-white rounded shadow cursor-pointer"
                          title="Remove custom room"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#252525]/20 hover:border-[#A78055] rounded-xl p-6 text-center cursor-pointer transition-colors bg-[#F8F7F4] space-y-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#EEE9E1] text-[#A78055] flex items-center justify-center mx-auto">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-[#252525] block">
                          Drop your room photo here, or browse
                        </span>
                        <span className="text-[10px] text-[#79746E] block mt-0.5">
                          Supports JPG, PNG, WebP (Max 15MB)
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 bg-[#EEE9E1]/50 rounded-lg text-[11px] text-[#79746E] leading-relaxed">
                    <span className="font-semibold text-[#252525]">Demo Mode Notice:</span> Your uploaded photo is used for wall context preview. The resulting 5-angle visualization set illustrates solid Paulownia shelves scaled to typical wall heights.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Architectural Wall Elevation Visualizer & Primary Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-28">
            {/* Interactive Wall Elevation Canvas Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#252525]/8 shadow-sm space-y-6">
              {/* Canvas Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252525]/8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A78055]">
                    Proportional Wall Elevation
                  </span>
                  <div className="font-serif text-xl text-[#252525]">
                    {customRoomImage ? 'Custom Room Wall' : selectedRoom.name}
                  </div>
                </div>

                {/* Alignment Toggles */}
                <div className="flex items-center gap-1.5 p-1 bg-[#EEE9E1]/70 rounded-lg text-xs self-start sm:self-auto">
                  <span className="text-[11px] text-[#79746E] px-1 font-mono uppercase">Align:</span>
                  {(['centered', 'staggered', 'left', 'right'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setAlignmentMode(mode)}
                      className={`px-2.5 py-1 rounded capitalize transition-all cursor-pointer ${
                        alignmentMode === mode
                          ? 'bg-white text-[#252525] font-semibold shadow-xs'
                          : 'text-[#79746E] hover:text-[#252525]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Architectural Wall Simulation Canvas */}
              <div 
                className="relative rounded-xl overflow-hidden aspect-[16/11] flex flex-col justify-center px-8 sm:px-12 py-10 transition-colors shadow-inner"
                style={{
                  backgroundColor: customRoomImage ? '#F0ECE6' : selectedRoom.wallColor,
                  backgroundImage: customRoomImage 
                    ? `linear-gradient(rgba(240, 236, 230, 0.88), rgba(240, 236, 230, 0.88)), url(${customRoomImage})`
                    : 'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.03) 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Architectural Scale Grid lines (Subtle) */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:30px_30px]" />

                {/* Wall Height Callout */}
                <div className="absolute top-3 left-4 text-[10px] font-mono text-[#79746E] tracking-wider uppercase pointer-events-none">
                  Wall Span: 3.60 m · Plaster Finish
                </div>

                {/* Shelves Stack on Wall */}
                <div className="relative z-10 w-full flex flex-col gap-6 sm:gap-8 justify-center my-auto">
                  {shelves.map((shelf, idx) => {
                    // Calculate visual width percentage based on length (40cm to 300cm scaled to 25% to 92%)
                    const widthPercent = Math.min(94, Math.max(26, (shelf.lengthCm / 300) * 94));
                    const shelfBg = finish === 'honey_oak' ? '#C89B60' : '#28211E';
                    const shelfEdge = finish === 'honey_oak' ? '#A87C43' : '#1A1412';
                    const justifyPos = getShelfHorizontalOffset(idx, shelves.length);

                    return (
                      <div
                        key={shelf.id}
                        className="w-full flex items-center transition-all duration-300"
                        style={{ justifyContent: justifyPos }}
                      >
                        <div
                          style={{ width: `${widthPercent}%` }}
                          className="group relative transition-all duration-300"
                        >
                          {/* Top dimension label line */}
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#252525]/70 mb-1 opacity-80 group-hover:opacity-100">
                            <span className="truncate">Shelf {idx + 1}</span>
                            <span className="font-semibold">{shelf.lengthCm} cm</span>
                          </div>

                          {/* 3D Realistic Floating Solid Wood Shelf Body */}
                          <div
                            className="h-4 sm:h-5 rounded-xs transition-transform duration-200 group-hover:scale-[1.01] relative"
                            style={{
                              backgroundColor: shelfBg,
                              boxShadow: '0 8px 18px -4px rgba(0, 0, 0, 0.28), 0 3px 6px -2px rgba(0, 0, 0, 0.15)',
                              borderTop: `1px solid rgba(255, 255, 255, ${finish === 'honey_oak' ? 0.4 : 0.15})`,
                              borderBottom: `2px solid ${shelfEdge}`,
                            }}
                          >
                            {/* Realistic Wood Grain Sheen Overlay */}
                            <div 
                              className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                              style={{
                                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.15) 15px, rgba(0,0,0,0.15) 30px)'
                              }}
                            />
                          </div>

                          {/* Subtle wall shadow cast beneath */}
                          <div
                            className="h-2 w-full mx-auto -mt-1 rounded-full opacity-30 filter blur-xs pointer-events-none"
                            style={{ backgroundColor: '#000' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Floor trim line */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#DDD6CC] border-t border-[#CCC4B8]" />
              </div>

              {/* Architectural Technical Specification Breakdown */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-[#F8F7F4] rounded-xl border border-[#252525]/6 text-xs text-[#79746E]">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#A78055] block">
                    Combined Span
                  </span>
                  <div className="font-serif text-lg font-medium text-[#252525] tabular-nums mt-0.5">
                    {totalLengthCm} cm
                  </div>
                  <span className="text-[10px]">{shelves.length} units total</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#A78055] block">
                    Load Rating
                  </span>
                  <div className="font-serif text-lg font-medium text-[#252525] tabular-nums mt-0.5">
                    {totalCapacityKg} kg
                  </div>
                  <span className="text-[10px]">35 kg / linear meter</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#A78055] block">
                    Timber Weight
                  </span>
                  <div className="font-serif text-lg font-medium text-[#252525] tabular-nums mt-0.5">
                    ~{estimatedTimberWeightKg} kg
                  </div>
                  <span className="text-[10px]">Solid Paulownia core</span>
                </div>
              </div>

              {/* Primary Call to Action: Generate Visualization */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => generateVisualization()}
                  className="w-full py-4 px-6 bg-[#252525] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#3D3A37] transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 text-[#A78055] group-hover:rotate-12 transition-transform" />
                  <span>Generate Visualization (5 Images)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Credit balance reminder & demo code redemption trigger */}
                <div className="flex items-center justify-between text-xs text-[#79746E] px-1">
                  <span className="font-mono tabular-nums">
                    Credits Remaining: <strong className="text-[#252525]">{credits}/25</strong> (5 required)
                  </span>
                  <button
                    onClick={() => setIsAccessCodeModalOpen(true)}
                    className="text-[#A78055] hover:underline cursor-pointer font-medium"
                  >
                    Enter Demo Pass (TARO-DEMO)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
