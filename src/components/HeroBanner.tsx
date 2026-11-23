import React from 'react';
import { ArrowDownRight, Sparkles, Video, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  onScrollToCatalog: () => void;
  onFilterFitCheck: () => void;
  totalProducts: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onScrollToCatalog,
  onFilterFitCheck,
  totalProducts,
}) => {
  return (
    <section className="relative w-full overflow-hidden border-b border-white/[0.08] bg-[#090a0f]">
      {/* Background Ambient Lighting & Atmospheric Aura */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft radial glows inspired by the photo's rich navy and grass tones */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-950/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-950/15 rounded-full blur-[130px] -z-10" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-950/10 rounded-full blur-[120px] -z-10" />
        
        {/* Subtle blurred photo ambience in background */}
        <img
          src="/assets/aistudio/5650a29fd93036126d8bc217183fb03d_43bbfdfb.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-10 filter blur-3xl scale-125 transform pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/80 to-[#090a0f]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f] via-[#090a0f]/75 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, description, actions & metadata */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Natural human editorial kicker */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3 sm:mb-4">
              <span>Selekcja 2026</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Autentyczny Streetwear</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-white font-medium">
                {totalProducts === 1 ? '1 wyselekcjonowany item' : `${totalProducts} wyselekcjonowanych ubrań`}
              </span>
            </div>

            {/* Main title */}
            <h1 className="font-['Syne',sans-serif] text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-[-0.03em] leading-[0.95] text-white mb-4 sm:mb-6 select-none drop-shadow-xl">
              SWAG FINDS
            </h1>

            <p className="text-sm sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl mb-5 sm:mb-8">
              Selekcja niszowego streetwearu, szerokich krojów i ubrań z podglądem fit check. Bezpośrednie linki do oficjalnych dropów.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onScrollToCatalog}
                className="min-h-[44px] px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-black bg-white rounded-lg hover:bg-neutral-200 transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Przeglądaj kolekcję</span>
                <ArrowDownRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onFilterFitCheck}
                className="min-h-[44px] px-5 py-3 sm:py-3.5 text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Video className="w-4 h-4 text-amber-400" />
                <span>Tylko z wideo (Fit Check)</span>
              </button>
            </div>

            {/* Value highlights strip */}
            <div className="mt-6 pt-5 sm:mt-10 sm:pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-200">Legalne źródła</p>
                  <p className="text-[11px] text-neutral-400 leading-normal">Tylko oryginalne sklepy i oficjalne wideo.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Video className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-200">„Zobacz, jak leży”</p>
                  <p className="text-[11px] text-neutral-400 leading-normal">Oglądaj ubrania na sylwetce przed zakupem.</p>
                </div>
              </div>
              <div className="hidden sm:flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-200">Oznaczenia i perełki</p>
                  <p className="text-[11px] text-neutral-400 leading-normal">Oznaczenia zgodne z rzeczywistą specyfikacją i ceną.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual - Balotelli & Arnautović iconic swag fit */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end mt-1 lg:mt-0">
            <div className="relative w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[350px] xl:max-w-[380px] group">
              {/* Ambient backlight glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-amber-500/20 via-sky-500/20 to-emerald-500/15 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 -z-10" />

              {/* Elevated Card Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#12131a] shadow-2xl shadow-black/80 transition-all duration-500 group-hover:border-white/[0.22] group-hover:-translate-y-1">
                {/* Main photograph */}
                <div className="relative aspect-[4/3] sm:aspect-[2/3] w-full overflow-hidden">
                  <img
                    src="/assets/aistudio/5650a29fd93036126d8bc217183fb03d_43bbfdfb.jpg"
                    alt="Balotelli i Arnautović"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
