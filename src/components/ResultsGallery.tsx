import React, { useState, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import { ASSET_IMAGES, FINISH_DETAILS } from '../data/mockAssets';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Sliders, 
  Bookmark, 
  BookmarkCheck,
  Split, 
  Eye, 
  Sparkles, 
  Info,
  X
} from 'lucide-react';

export const ResultsGallery: React.FC = () => {
  const {
    activeResultSet,
    currentImageIndex,
    setCurrentImageIndex,
    generateNewArrangement,
    setActiveTab,
    finish,
    shelves,
    arrangementStyle,
    saveCurrentToCreations,
    showToast,
  } = useStudio();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBeforeAfterActive, setIsBeforeAfterActive] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSaved, setIsSaved] = useState(false);

  const currentImage = activeResultSet.images[currentImageIndex] || activeResultSet.images[0];
  const totalImages = activeResultSet.images.length;

  const handlePrev = () => {
    setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1);
  };

  const handleNext = () => {
    setCurrentImageIndex(currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, totalImages]);

  // Real download for active image
  const downloadSingleImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading: ${filename}`);
  };

  const handleDownloadActive = () => {
    const filename = `TARO-Shelf-${finish}-${arrangementStyle}-${currentImage.label.replace(/\s+/g, '_')}.jpg`;
    downloadSingleImage(currentImage.url, filename);
  };

  // Download all 5 images
  const handleDownloadAll = () => {
    showToast(`Preparing download for all ${totalImages} architectural renders...`);
    activeResultSet.images.forEach((img, idx) => {
      setTimeout(() => {
        const filename = `TARO-Shelf-${finish}-${arrangementStyle}-Angle_${idx + 1}_${img.label.replace(/\s+/g, '_')}.jpg`;
        downloadSingleImage(img.url, filename);
      }, idx * 300);
    });
  };

  const handleSavePortfolio = () => {
    saveCurrentToCreations();
    setIsSaved(true);
  };

  return (
    <div className="py-10 bg-[#F8F7F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[#252525]/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A78055] font-semibold">
                Visualization Output
              </span>
              <span className="text-xs px-2 py-0.5 bg-[#EEE9E1] text-[#79746E] rounded">
                Demo Sample Suite
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#252525]">
              {activeResultSet.title}
            </h1>
            <p className="text-xs text-[#79746E] mt-1">
              {shelves.length} Shelves · {shelves.map((s) => `${s.lengthCm}cm`).join(' + ')} · {FINISH_DETAILS[finish].name}
            </p>
          </div>

          {/* Action Buttons Top Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('studio')}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#252525]/20 text-[#252525] text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-[#EEE9E1]/80 transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-[#79746E]" />
              <span>Adjust Config</span>
            </button>

            <button
              onClick={() => generateNewArrangement()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#EEE9E1] text-[#252525] hover:bg-[#E5DEC7] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#A78055]" />
              <span>New Arrangement</span>
            </button>

            <button
              onClick={handleSavePortfolio}
              disabled={isSaved}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-white border border-[#252525]/20 text-[#252525] hover:bg-[#EEE9E1]/60'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5 text-[#A78055]" />}
              <span>{isSaved ? 'Saved to Portfolio' : 'Save Creation'}</span>
            </button>
          </div>
        </div>

        {/* Main Presentation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Large Display Card (9 cols) */}
          <div className="lg:col-span-9 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-[#ECE7DF] shadow-xl border border-[#252525]/10 aspect-[16/10] sm:aspect-[16/9] group">
              {/* Either Standard Viewer OR Before/After Comparison Slider */}
              {!isBeforeAfterActive ? (
                <>
                  <img
                    src={currentImage.url}
                    alt={currentImage.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-300"
                  />

                  {/* Left & Right Arrow Navigation */}
                  <button
                    onClick={handlePrev}
                    aria-label="Previous visualization"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-[#252525] hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next visualization"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-[#252525] hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                /* Interactive Before / After Split Comparison */
                <div className="relative w-full h-full select-none overflow-hidden">
                  {/* Empty room (Before) */}
                  <img
                    src={ASSET_IMAGES.emptyRoom}
                    alt="Before: Empty Wall"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Floating shelves rendered (After) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={currentImage.url}
                      alt="After: Floating Shelves Installed"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%', height: '100%' }}
                    />
                  </div>

                  {/* Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#252525] text-white flex items-center justify-center shadow-lg text-xs font-mono">
                      ↔
                    </div>
                  </div>

                  {/* Range slider input invisible over image */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                  />

                  {/* Before / After Badges */}
                  <div className="absolute top-4 left-4 z-10 bg-[#252525]/80 text-white text-[11px] px-3 py-1 rounded backdrop-blur-sm pointer-events-none">
                    Installed Elevation (After)
                  </div>
                  <div className="absolute top-4 right-4 z-10 bg-white/90 text-[#252525] text-[11px] px-3 py-1 rounded backdrop-blur-sm pointer-events-none">
                    Empty Wall (Before)
                  </div>
                </div>
              )}

              {/* Bottom Scrim with Angle Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#EEE9E1]/80">
                    Angle {currentImageIndex + 1} of {totalImages} · {currentImage.label}
                  </span>
                  <div className="font-serif text-lg sm:text-xl font-normal mt-0.5">
                    {currentImage.caption}
                  </div>
                </div>

                {/* Floating toolbar controls */}
                <div className="flex items-center gap-2 pointer-events-auto">
                  {/* Before / After Toggle */}
                  <button
                    onClick={() => setIsBeforeAfterActive(!isBeforeAfterActive)}
                    className={`px-3 py-1.5 text-xs font-medium rounded backdrop-blur-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isBeforeAfterActive
                        ? 'bg-[#A78055] text-white'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    <Split className="w-3.5 h-3.5" />
                    <span>{isBeforeAfterActive ? 'Standard View' : 'Before / After'}</span>
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="p-2 rounded bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                    title="Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 5 Thumbnails Carousel Strip */}
            <div className="grid grid-cols-5 gap-3 pt-2">
              {activeResultSet.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    setIsBeforeAfterActive(false);
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-[4/3] bg-[#ECE7DF] border-2 transition-all cursor-pointer group ${
                    currentImageIndex === idx && !isBeforeAfterActive
                      ? 'border-[#252525] ring-2 ring-[#252525]/20 shadow-md scale-[1.02]'
                      : 'border-transparent opacity-75 hover:opacity-100 hover:border-[#252525]/30'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-medium drop-shadow truncate pr-1">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Details, Specifications, & Real Downloads (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Download Hub Card */}
            <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A78055]">
                Asset Export
              </span>
              <h3 className="font-serif text-lg font-normal text-[#252525]">
                Download Imagery
              </h3>
              <p className="text-xs text-[#79746E]">
                High-resolution 8K photographic files ready for client presentations, mood boards, or architect review.
              </p>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleDownloadActive}
                  className="w-full py-3 px-4 bg-[#252525] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#3D3A37] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  <Download className="w-3.5 h-3.5 text-[#A78055]" />
                  <span>Download Active Angle</span>
                </button>

                <button
                  onClick={handleDownloadAll}
                  className="w-full py-3 px-4 border border-[#252525]/20 text-[#252525] hover:bg-[#EEE9E1]/60 text-xs font-semibold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#79746E]" />
                  <span>Download All 5 Angles</span>
                </button>
              </div>
            </div>

            {/* Architectural Summary Specifications */}
            <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#79746E]">
                Configuration Specs
              </span>
              <h4 className="font-serif text-base font-normal text-[#252525]">
                Solid Paulownia Order
              </h4>

              <div className="space-y-2 text-xs text-[#79746E]">
                <div className="flex justify-between py-1.5 border-b border-[#252525]/6">
                  <span>Timber Finish</span>
                  <span className="font-medium text-[#252525]">{FINISH_DETAILS[finish].name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#252525]/6">
                  <span>Arrangement</span>
                  <span className="font-medium text-[#252525] capitalize">{arrangementStyle}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#252525]/6">
                  <span>Quantity</span>
                  <span className="font-medium text-[#252525]">{shelves.length} Shelves</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#252525]/6">
                  <span>Profile Spec</span>
                  <span className="font-medium text-[#252525]">20 cm D × 4 cm T</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Mounting Hardware</span>
                  <span className="font-medium text-[#252525]">Concealed Steel Pins</span>
                </div>
              </div>
            </div>

            {/* Prototype Notice */}
            <div className="p-4 bg-[#EEE9E1]/50 rounded-xl text-xs text-[#79746E] flex gap-2.5">
              <Info className="w-4 h-4 text-[#A78055] shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Client Presentation Prototype:</strong> Renderings utilize pre-stored architectural imagery matched to your Paulownia wood finish and spatial arrangement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#A78055] tracking-wider uppercase block">
                TARO Shelf Studio Fullscreen
              </span>
              <h3 className="font-serif text-xl">{currentImage.label}</h3>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={currentImage.url}
              alt={currentImage.caption}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center text-white/70 text-xs">
            {currentImage.caption} · (Use arrow keys to navigate, Esc to close)
          </div>
        </div>
      )}
    </div>
  );
};
