import React from 'react';
import { useStudio } from '../context/StudioContext';
import { Sliders, Camera, Eye, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { setActiveTab } = useStudio();

  const steps = [
    {
      number: '01',
      title: 'Configure Dimensions & Wood',
      description: 'Select between 1 to 5 shelves. Adjust individual spans from 40 cm to 300 cm in exact 10 cm increments with standard 20 cm depth and 4 cm solid thickness. Choose Honey Oak or Wenge finish.',
      icon: Sliders,
    },
    {
      number: '02',
      title: 'Select or Upload Room Context',
      description: 'Select from our curated Scandinavian room environments—including Nordic Living, Japandi Bedroom, and Study—or upload your own room photograph to evaluate wall proportion.',
      icon: Camera,
    },
    {
      number: '03',
      title: 'Generate Architectural Views',
      description: 'Simulate high-resolution multi-angle visualization sets. Inspect eye-level elevations, close-up wood grain details, download high-res files, and save arrangements to your private portfolio.',
      icon: Eye,
    },
  ];

  return (
    <section className="py-20 bg-[#F8F7F4] border-t border-[#252525]/8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A78055] font-semibold block">
            Seamless Workflow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#252525]">
            How TARO Shelf Studio Works
          </h2>
          <p className="text-sm text-[#79746E]">
            A tailored three-step design experience engineered to turn architectural concept into precision timber shelving for your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-8 bg-[#EEE9E1]/30 border border-[#252525]/6 rounded-2xl flex flex-col justify-between space-y-6 hover:bg-white hover:border-[#252525]/12 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-normal text-[#A78055]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#EEE9E1] flex items-center justify-center text-[#252525] group-hover:bg-[#252525] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#252525]">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#79746E] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 text-xs font-mono uppercase tracking-wider text-[#A78055]">
                  Step {step.number} of 03
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setActiveTab('studio')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#252525] text-white text-xs font-semibold tracking-wider uppercase rounded hover:bg-[#3D3A37] transition-all shadow-sm active:scale-[0.99] cursor-pointer"
          >
            <span>Start Designing Your Shelves</span>
            <ArrowRight className="w-4 h-4 text-[#A78055]" />
          </button>
        </div>
      </div>
    </section>
  );
};
