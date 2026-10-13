import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { 
  DEMO_LEADS, 
  DEMO_CODES, 
  FINISH_DETAILS, 
  PAULOWNIA_SPECS, 
  ASSET_IMAGES,
  SAMPLE_OUTPUT_SETS 
} from '../data/mockAssets';
import { AccessCode } from '../types';
import { 
  Users, 
  BarChart3, 
  KeyRound, 
  Layers, 
  Image as ImageIcon, 
  Check, 
  Copy, 
  ShieldCheck,
  TrendingUp,
  Package
} from 'lucide-react';

export const DemoAdminScreen: React.FC = () => {
  const { credits, redeemAccessCode, showToast } = useStudio();
  const [activeAdminTab, setActiveAdminTab] = useState<'leads' | 'stats' | 'codes' | 'finishes' | 'assets'>('stats');
  const [codesList, setCodesList] = useState<AccessCode[]>(DEMO_CODES);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied code: ${text}`);
  };

  const handleToggleCode = (codeStr: string) => {
    setCodesList((prev) =>
      prev.map((c) => (c.code === codeStr ? { ...c, active: !c.active } : c))
    );
    showToast(`Toggled code ${codeStr}`);
  };

  return (
    <div className="py-12 bg-[#F8F7F4] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#252525]/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A78055] font-semibold">
                Internal Demo Console
              </span>
              <span className="text-xs px-2 py-0.5 bg-[#252525] text-white rounded font-mono">
                Prototype Mode
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#252525]">
              TARO Operations & Analytics
            </h1>
            <p className="text-xs text-[#79746E] mt-1">
              Simulated administration panel showing showroom inquiries, code allocations, and timber inventory metrics.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap gap-1 p-1 bg-[#EEE9E1]/70 rounded-lg text-xs">
            <button
              onClick={() => setActiveAdminTab('stats')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeAdminTab === 'stats'
                  ? 'bg-white text-[#252525] font-semibold shadow-xs'
                  : 'text-[#79746E]'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveAdminTab('leads')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeAdminTab === 'leads'
                  ? 'bg-white text-[#252525] font-semibold shadow-xs'
                  : 'text-[#79746E]'
              }`}
            >
              Showroom Inquiries
            </button>
            <button
              onClick={() => setActiveAdminTab('codes')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeAdminTab === 'codes'
                  ? 'bg-white text-[#252525] font-semibold shadow-xs'
                  : 'text-[#79746E]'
              }`}
            >
              Demo Access Codes
            </button>
            <button
              onClick={() => setActiveAdminTab('finishes')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeAdminTab === 'finishes'
                  ? 'bg-white text-[#252525] font-semibold shadow-xs'
                  : 'text-[#79746E]'
              }`}
            >
              Finish Specs
            </button>
            <button
              onClick={() => setActiveAdminTab('assets')}
              className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                activeAdminTab === 'assets'
                  ? 'bg-white text-[#252525] font-semibold shadow-xs'
                  : 'text-[#79746E]'
              }`}
            >
              Asset Library
            </button>
          </div>
        </div>

        {/* TAB 1: ANALYTICS & STATS */}
        {activeAdminTab === 'stats' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-1">
                <span className="text-xs uppercase font-mono tracking-wider text-[#79746E]">
                  Simulations Executed
                </span>
                <div className="font-serif text-3xl text-[#252525] font-normal tabular-nums">
                  1,428
                </div>
                <div className="text-[11px] text-[#A78055] font-medium flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +18.4% this month
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-1">
                <span className="text-xs uppercase font-mono tracking-wider text-[#79746E]">
                  Popular Finish
                </span>
                <div className="font-serif text-3xl text-[#252525] font-normal">
                  Honey Oak
                </div>
                <div className="text-[11px] text-[#79746E]">
                  63% Honey Oak · 37% Wenge
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-1">
                <span className="text-xs uppercase font-mono tracking-wider text-[#79746E]">
                  Average Shelf Count
                </span>
                <div className="font-serif text-3xl text-[#252525] font-normal tabular-nums">
                  2.9 Shelves
                </div>
                <div className="text-[11px] text-[#79746E]">
                  Most popular length: 160 cm
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-1">
                <span className="text-xs uppercase font-mono tracking-wider text-[#79746E]">
                  Client Credit Pool
                </span>
                <div className="font-serif text-3xl text-[#252525] font-normal tabular-nums">
                  {credits} / 25
                </div>
                <div className="text-[11px] text-[#A78055]">
                  Active demo session allowance
                </div>
              </div>
            </div>

            {/* Breakdown Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-normal text-[#252525]">
                  Arrangement Style Distribution
                </h3>
                <div className="space-y-3 text-xs text-[#79746E]">
                  {[
                    { label: 'Staggered Layout', pct: '34%' },
                    { label: 'Symmetrical Layout', pct: '28%' },
                    { label: 'Modern Gallery', pct: '21%' },
                    { label: 'Asymmetrical Layout', pct: '11%' },
                    { label: 'Vertical Composition', pct: '6%' },
                  ].map((row) => (
                    <div key={row.label} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#252525] font-medium">{row.label}</span>
                        <span className="font-mono tabular-nums">{row.pct}</span>
                      </div>
                      <div className="w-full bg-[#EEE9E1] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#252525] h-full"
                          style={{ width: row.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-normal text-[#252525]">
                  Customer Room Contexts
                </h3>
                <div className="space-y-3 text-xs text-[#79746E]">
                  {[
                    { label: 'Nordic Living Room Preset', count: '542 uses' },
                    { label: 'Custom Room Photo Uploads', count: '394 uses' },
                    { label: 'Contemporary Dining Preset', count: '280 uses' },
                    { label: 'Architectural Study Preset', count: '148 uses' },
                    { label: 'Japandi Bedroom Preset', count: '64 uses' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-[#252525]/6">
                      <span className="text-[#252525] font-medium">{row.label}</span>
                      <span className="font-mono tabular-nums text-[#79746E]">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SHOWROOM LEADS */}
        {activeAdminTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-[#252525]/8 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[#252525]/8 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl font-normal text-[#252525]">
                  Trade Inquiries & Client Orders
                </h3>
                <p className="text-xs text-[#79746E] mt-0.5">
                  Architectural practices and residential clients requesting timber samples and final quoting.
                </p>
              </div>
              <span className="text-xs font-mono text-[#A78055] font-semibold">
                {DEMO_LEADS.length} Active Records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F7F4] text-[#79746E] uppercase font-mono border-b border-[#252525]/8">
                  <tr>
                    <th className="py-3 px-6">Client / Studio</th>
                    <th className="py-3 px-6">Location</th>
                    <th className="py-3 px-6">Spec Requested</th>
                    <th className="py-3 px-6">Finish</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6">Est. Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252525]/6 text-[#252525]">
                  {DEMO_LEADS.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#F8F7F4]/60 transition-colors">
                      <td className="py-4 px-6 font-medium">{lead.name}</td>
                      <td className="py-4 px-6 text-[#79746E]">{lead.city}</td>
                      <td className="py-4 px-6 font-mono tabular-nums">{lead.shelvesRequested} Shelves</td>
                      <td className="py-4 px-6">
                        <span className="capitalize font-medium">
                          {lead.finish === 'honey_oak' ? 'Honey Oak' : 'Wenge'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 bg-[#EEE9E1] text-[#252525] rounded font-medium text-[11px]">
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono tabular-nums font-semibold text-[#252525]">
                        {lead.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DEMO ACCESS CODES */}
        {activeAdminTab === 'codes' && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif text-xl font-normal text-[#252525]">
                  Demonstration Access Codes
                </h3>
                <p className="text-xs text-[#79746E] mt-0.5">
                  Use these codes in the client presentation to instantly reset demo credits back to full capacity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {codesList.map((codeItem) => (
                  <div
                    key={codeItem.code}
                    className="p-5 bg-[#F8F7F4] rounded-xl border border-[#252525]/8 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-base font-bold text-[#252525] tracking-wider">
                          {codeItem.code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(codeItem.code)}
                          className="p-1 text-[#79746E] hover:text-[#252525] cursor-pointer"
                          title="Copy Code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#79746E]">
                        {codeItem.label}
                      </p>

                      <div className="text-[11px] font-mono text-[#A78055]">
                        Grants: +{codeItem.creditsGrant} Credits · Used {codeItem.usesCount} times
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => redeemAccessCode(codeItem.code)}
                        className="flex-1 py-2 px-3 bg-[#252525] text-white text-[11px] font-semibold uppercase tracking-wider rounded hover:bg-[#3D3A37] transition-colors cursor-pointer text-center"
                      >
                        Apply To Session
                      </button>

                      <button
                        onClick={() => handleToggleCode(codeItem.code)}
                        className={`py-2 px-3 text-[11px] rounded border transition-colors cursor-pointer ${
                          codeItem.active
                            ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                            : 'border-red-600 text-red-700 bg-red-50'
                        }`}
                      >
                        {codeItem.active ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FINISH SETTINGS */}
        {activeAdminTab === 'finishes' && (
          <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-xl font-normal text-[#252525]">
                Material & Timber Stock Specifications
              </h3>
              <p className="text-xs text-[#79746E] mt-0.5">
                Current warehouse stock and technical processing rules for solid Paulownia timber.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-5 bg-[#F8F7F4] rounded-xl space-y-3 border border-[#252525]/6">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg text-[#252525]">Honey Oak Grade A</h4>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    In Stock: 840 meters
                  </span>
                </div>
                <p className="text-xs text-[#79746E] leading-relaxed">
                  Kiln-dried to 8–10% moisture content. Finished with two coats of natural hardwax oil with zero VOC emission.
                </p>
                <div className="text-[11px] text-[#252525] font-mono space-y-1 pt-1">
                  <div>Stock Lengths: 40 cm to 300 cm</div>
                  <div>Lead Time: 5–7 working days for custom cuts</div>
                </div>
              </div>

              <div className="p-5 bg-[#F8F7F4] rounded-xl space-y-3 border border-[#252525]/6">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg text-[#252525]">Wenge Charcoal Tone</h4>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    In Stock: 610 meters
                  </span>
                </div>
                <p className="text-xs text-[#79746E] leading-relaxed">
                  Deep penetration charcoal pigment stain over solid Paulownia. Preserves cellular wood pores while delivering jet espresso depth.
                </p>
                <div className="text-[11px] text-[#252525] font-mono space-y-1 pt-1">
                  <div>Stock Lengths: 40 cm to 300 cm</div>
                  <div>Lead Time: 6–8 working days for custom cuts</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#EEE9E1]/50 rounded-xl space-y-2 text-xs text-[#79746E]">
              <span className="font-semibold text-[#252525]">Hardware Standard:</span>
              <p>
                Internal concealed high-tensile steel rod mounting plates (12 mm diameter pins) with ±4 mm micro-leveling eccentric cam adjustments included with every shelf order.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: ASSET LIBRARY */}
        {activeAdminTab === 'assets' && (
          <div className="p-6 bg-white rounded-2xl border border-[#252525]/8 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-xl font-normal text-[#252525]">
                Sample Visual Asset Library
              </h3>
              <p className="text-xs text-[#79746E] mt-0.5">
                Curated pre-stored photographic elevation sets organized by finish and composition style.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SAMPLE_OUTPUT_SETS.map((set, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-[#252525]/10 bg-[#ECE7DF] space-y-2 p-2">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#DDD6CC]">
                    <img
                      src={set.primaryImage}
                      alt={set.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-1 pb-1">
                    <span className="text-[10px] font-mono text-[#A78055] uppercase block truncate">
                      {set.finish} · {set.arrangementStyle}
                    </span>
                    <div className="text-xs font-serif font-medium text-[#252525] truncate">
                      {set.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
