import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { FINISH_DETAILS } from '../data/mockAssets';
import { StoredCreation, ShelfFinish } from '../types';
import { 
  Eye, 
  Download, 
  Trash2, 
  Sliders, 
  Calendar, 
  Layers, 
  ArrowRight,
  Sparkles,
  Plus
} from 'lucide-react';

export const MyCreationsPage: React.FC = () => {
  const { 
    creations, 
    loadCreation, 
    deleteCreation, 
    setActiveTab, 
    showToast 
  } = useStudio();

  const [filterFinish, setFilterFinish] = useState<'all' | ShelfFinish>('all');

  const filteredCreations = creations.filter((c) => {
    if (filterFinish === 'all') return true;
    return c.finish === filterFinish;
  });

  const handleDownloadCreation = (creation: StoredCreation) => {
    const link = document.createElement('a');
    link.href = creation.primaryImage;
    link.download = `TARO-${creation.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading: ${creation.title}`);
  };

  return (
    <div className="py-12 bg-[#F8F7F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-[#252525]/10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#A78055] font-semibold block mb-1">
              Portfolio Archive
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#252525]">
              My Saved Creations
            </h1>
            <p className="text-xs text-[#79746E] mt-1">
              Review and reopen your bespoke Paulownia floating shelf compositions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-[#EEE9E1]/70 rounded-lg text-xs">
              <button
                onClick={() => setFilterFinish('all')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  filterFinish === 'all'
                    ? 'bg-white text-[#252525] font-semibold shadow-xs'
                    : 'text-[#79746E]'
                }`}
              >
                All Finishes ({creations.length})
              </button>
              <button
                onClick={() => setFilterFinish('honey_oak')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  filterFinish === 'honey_oak'
                    ? 'bg-white text-[#252525] font-semibold shadow-xs'
                    : 'text-[#79746E]'
                }`}
              >
                Honey Oak
              </button>
              <button
                onClick={() => setFilterFinish('wenge')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  filterFinish === 'wenge'
                    ? 'bg-white text-[#252525] font-semibold shadow-xs'
                    : 'text-[#79746E]'
                }`}
              >
                Wenge
              </button>
            </div>

            <button
              onClick={() => setActiveTab('studio')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#252525] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#3D3A37] transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Design</span>
            </button>
          </div>
        </div>

        {/* Creations Grid */}
        {filteredCreations.length === 0 ? (
          <div className="p-16 text-center bg-white rounded-2xl border border-[#252525]/8 space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#EEE9E1] text-[#A78055] flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-normal text-[#252525]">
              No saved creations found
            </h3>
            <p className="text-xs text-[#79746E]">
              You haven't saved any shelf configurations with this finish filter yet.
            </p>
            <button
              onClick={() => setActiveTab('studio')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#252525] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#3D3A37] transition-colors cursor-pointer"
            >
              <span>Open Studio Configurator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCreations.map((creation) => (
              <div
                key={creation.id}
                className="bg-white rounded-2xl border border-[#252525]/8 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] bg-[#ECE7DF] overflow-hidden">
                    <img
                      src={creation.primaryImage}
                      alt={creation.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 left-3 bg-[#252525]/80 text-white text-[11px] px-2.5 py-1 rounded backdrop-blur-sm">
                      {FINISH_DETAILS[creation.finish].name}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/90 text-[#252525] text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                      {creation.shelves.length} Shelves · {creation.totalLengthCm} cm
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#79746E]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#A78055]" />
                        {creation.date}
                      </span>
                      <span className="capitalize font-medium text-[#252525]">
                        {creation.arrangement} layout
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#252525]">
                        {creation.title}
                      </h3>
                      <p className="text-xs text-[#79746E] mt-1">
                        Environment: {creation.roomName}
                      </p>
                    </div>

                    {/* Shelf lengths pill tags */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[#79746E]">
                      {creation.shelves.map((s, idx) => (
                        <span
                          key={s.id}
                          className="px-2 py-0.5 bg-[#F8F7F4] border border-[#252525]/8 rounded"
                        >
                          S{idx + 1}: {s.lengthCm}cm
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-4 bg-[#F8F7F4] border-t border-[#252525]/6 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadCreation(creation)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#252525] text-white text-xs font-medium rounded hover:bg-[#3D3A37] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Reopen Renders</span>
                    </button>

                    <button
                      onClick={() => handleDownloadCreation(creation)}
                      className="p-1.5 text-[#79746E] hover:text-[#252525] hover:bg-[#EEE9E1] rounded transition-colors cursor-pointer"
                      title="Download image"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => deleteCreation(creation.id)}
                    className="p-1.5 text-[#79746E] hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    title="Delete creation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
