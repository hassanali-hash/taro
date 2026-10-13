import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { KeyRound, Check, X, Sparkles } from 'lucide-react';

export const AccessCodeModal: React.FC = () => {
  const { 
    isAccessCodeModalOpen, 
    setIsAccessCodeModalOpen, 
    redeemAccessCode, 
    credits 
  } = useStudio();
  
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isAccessCodeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = redeemAccessCode(code);
    if (res.success) {
      setCode('');
      setIsAccessCodeModalOpen(false);
    } else {
      setError(res.message);
    }
  };

  const handleQuickDemoPass = () => {
    redeemAccessCode('TARO-DEMO');
    setIsAccessCodeModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#F8F7F4] rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#252525]/10 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-[#252525]/8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EEE9E1] text-[#A78055] flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-normal text-[#252525]">
                Demo Credits & Access Code
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsAccessCodeModalOpen(false)}
            className="p-1.5 text-[#79746E] hover:text-[#252525] rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#252525]/6 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#79746E]">Current Demo Balance:</span>
            <span className="font-mono tabular-nums font-semibold text-sm text-[#252525]">
              {credits} / 25 Credits
            </span>
          </div>
          <p className="text-[11px] text-[#79746E]">
            Each architectural generation creates 5 high-resolution perspectives and deducts 5 credits.
          </p>
        </div>

        {/* Access Code Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs uppercase font-mono tracking-wider text-[#79746E] block">
              Enter Demonstration Code:
            </label>
            <input
              type="text"
              placeholder="e.g. TARO-DEMO"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              className="w-full px-4 py-3 bg-white border border-[#252525]/20 focus:border-[#252525] focus:outline-none rounded-xl font-mono text-sm uppercase tracking-wider text-[#252525] placeholder:text-[#79746E]/50"
            />
            {error && (
              <p className="text-xs text-red-600 pt-1">{error}</p>
            )}
          </div>

          <div className="space-y-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#252525] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#3D3A37] transition-all cursor-pointer shadow-sm active:scale-[0.99]"
            >
              Redeem Code
            </button>

            {/* Quick 1-click apply button for reviewers */}
            <button
              type="button"
              onClick={handleQuickDemoPass}
              className="w-full py-2.5 px-4 bg-[#EEE9E1]/80 hover:bg-[#EEE9E1] text-[#252525] text-xs font-medium uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A78055]" />
              <span>Apply Instant Demo Pass (TARO-DEMO)</span>
            </button>
          </div>
        </form>

        <p className="text-[11px] text-center text-[#79746E]">
          This is a simulated presentation environment. Code restores demo balance to 25/25.
        </p>
      </div>
    </div>
  );
};
