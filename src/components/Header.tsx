import React from 'react';
import { HelpCircle, Compass, Users, Plus } from 'lucide-react';
import { CategoryFilter } from '../data/products';

interface HeaderProps {
  onOpenGuide: () => void;
  totalProducts: number;
  onSelectCategory?: (category: CategoryFilter) => void;
  onOpenAddProposal?: () => void;
  proposalsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGuide,
  totalProducts,
  onSelectCategory,
  onOpenAddProposal,
  proposalsCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0c0d12]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-18 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="/" 
          className="flex items-center gap-2 sm:gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus:outline-none min-h-[44px]"
        >
          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-white to-neutral-400 text-black flex items-center justify-center font-black text-xs sm:text-sm font-display tracking-normal shadow-sm">
            SF
          </span>
          <div className="flex items-center">
            <span className="font-display font-extrabold tracking-tight text-base sm:text-lg text-white leading-none">
              SWAG <span className="text-neutral-400 font-light">FINDS</span>
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            type="button"
            onClick={() => onSelectCategory?.('Wszystkie')}
            className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-neutral-400" />
            <span>Kolekcja ({totalProducts})</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectCategory?.('Wasze propozycje')}
            className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer group"
          >
            <Users className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-white font-semibold">Wasze propozycje</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
              {proposalsCount}
            </span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onOpenAddProposal && (
            <button
              type="button"
              onClick={onOpenAddProposal}
              className="hidden sm:flex px-3.5 py-2 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all items-center gap-1.5 whitespace-nowrap active:scale-95 cursor-pointer shadow-sm"
              title="Zgłoś własny drop lub perełkę"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Dodaj propozycję</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenGuide}
            className="min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 px-2.5 sm:px-3.5 py-2 text-xs font-semibold text-neutral-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap hover:text-white active:scale-95 cursor-pointer"
            title="Struktura bazy produktów"
            aria-label="Struktura bazy produktów"
          >
            <HelpCircle className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-neutral-300" />
            <span className="hidden sm:inline">Struktura bazy</span>
          </button>
        </div>
      </div>
    </header>
  );
};
