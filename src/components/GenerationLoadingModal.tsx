import React, { useState, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import { FINISH_DETAILS } from '../data/mockAssets';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const GenerationLoadingModal: React.FC = () => {
  const { isGenerating, finish, shelves, arrangementStyle } = useStudio();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    'Preparing shelf configuration...',
    'Analyzing wall composition & lighting angles...',
    'Rendering solid Paulownia grain & depth...',
    'Finalizing high-resolution visualization set...',
  ];

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStepIndex(0);
      return;
    }

    // Advance steps across 2.8 seconds
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 680);

    return () => clearInterval(interval);
  }, [isGenerating, steps.length]);

  if (!isGenerating) return null;

  const finishName = FINISH_DETAILS[finish].name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#F8F7F4] rounded-2xl shadow-2xl p-8 border border-[#252525]/10 space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Animated Brand Minimalist Emblem */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#EEE9E1] animate-spin border-t-[#A78055] duration-1000" />
          <span className="font-serif text-lg font-semibold tracking-wider text-[#252525]">
            TARO
          </span>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-1.5">
          <span className="text-xs uppercase font-mono tracking-widest text-[#A78055] font-semibold">
            Architectural Render Engine
          </span>
          <h3 className="font-serif text-2xl font-normal text-[#252525]">
            Generating Visualization
          </h3>
          <p className="text-xs text-[#79746E]">
            {shelves.length} Shelves · {finishName} · {arrangementStyle.charAt(0).toUpperCase() + arrangementStyle.slice(1)} Layout
          </p>
        </div>

        {/* Dynamic Multi-Step Progress List */}
        <div className="space-y-2.5 text-left py-2 px-3 bg-white/80 rounded-xl border border-[#252525]/6">
          {steps.map((stepText, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                  isCurrent
                    ? 'text-[#252525] font-medium'
                    : isCompleted
                    ? 'text-[#79746E]'
                    : 'text-[#252525]/25'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-[#A78055] shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-[#252525] border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[#252525]/20 shrink-0" />
                )}
                <span className="truncate">{stepText}</span>
              </div>
            );
          })}
        </div>

        {/* Simulated Progress Bar */}
        <div className="w-full bg-[#EEE9E1] h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#252525] h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Quiet disclaimer */}
        <p className="text-[11px] text-[#79746E]/70 italic">
          Rendering 5 high-resolution architectural angles
        </p>
      </div>
    </div>
  );
};
