import React from 'react';
import { Compass, Flame, Percent, Users, Plus } from 'lucide-react';
import { CategoryFilter } from '../data/products';
import { ProductBadge } from '../types/product';

interface MobileBottomNavProps {
  selectedCategory: CategoryFilter;
  selectedBadge: ProductBadge | 'ALL';
  proposalsCount: number;
  onSelectCategory: (cat: CategoryFilter) => void;
  onTogglePromo: () => void;
  onOpenAddProposal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  selectedCategory,
  selectedBadge,
  proposalsCount,
  onSelectCategory,
  onTogglePromo,
  onOpenAddProposal,
}) => {
  const isPromoActive = selectedCategory === 'Promocje' || selectedBadge === 'Przecena';
  const isCatalogActive =
    selectedCategory === 'Wszystkie' && !isPromoActive;
  const isPolecaneActive = selectedCategory === 'Polecane';
  const isProposalsActive = selectedCategory === 'Wasze propozycje';

  return (
    <nav
      aria-label="Nawigacja mobilna"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0d12]/95 backdrop-blur-lg border-t border-white/[0.1] shadow-[0_-8px_30px_rgba(0,0,0,0.6)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* Katalog */}
        <button
          type="button"
          onClick={() => onSelectCategory('Wszystkie')}
          className={`flex flex-col items-center justify-center min-h-[44px] gap-1 transition-colors cursor-pointer ${
            isCatalogActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Compass className={`w-5 h-5 ${isCatalogActive ? 'text-white' : 'text-neutral-400'}`} />
          <span className="text-[10px] font-semibold tracking-tight leading-none">
            Katalog
          </span>
        </button>

        {/* Polecane */}
        <button
          type="button"
          onClick={() => onSelectCategory('Polecane')}
          className={`flex flex-col items-center justify-center min-h-[44px] gap-1 transition-colors cursor-pointer ${
            isPolecaneActive ? 'text-amber-300' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Flame
            className={`w-5 h-5 ${
              isPolecaneActive ? 'text-amber-400 fill-amber-400/40' : 'text-neutral-400'
            }`}
          />
          <span className="text-[10px] font-semibold tracking-tight leading-none">
            Polecane
          </span>
        </button>

        {/* Przeceny */}
        <button
          type="button"
          onClick={onTogglePromo}
          className={`flex flex-col items-center justify-center min-h-[44px] gap-1 transition-colors cursor-pointer ${
            isPromoActive ? 'text-rose-400' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Percent className={`w-5 h-5 ${isPromoActive ? 'text-rose-400' : 'text-neutral-400'}`} />
          <span className="text-[10px] font-semibold tracking-tight leading-none">
            Przeceny
          </span>
        </button>

        {/* Wasze propozycje */}
        <button
          type="button"
          onClick={() => onSelectCategory('Wasze propozycje')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] gap-1 transition-colors cursor-pointer ${
            isProposalsActive ? 'text-emerald-300' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <div className="relative">
            <Users
              className={`w-5 h-5 ${
                isProposalsActive ? 'text-emerald-400' : 'text-neutral-400'
              }`}
            />
            {proposalsCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-emerald-500 text-black text-[9px] font-black flex items-center justify-center font-mono tabular-nums">
                {proposalsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight leading-none">
            Drop-y
          </span>
        </button>

        {/* Dodaj propozycję */}
        <button
          type="button"
          onClick={onOpenAddProposal}
          className="flex flex-col items-center justify-center min-h-[44px] gap-1 text-white cursor-pointer active:scale-95 transition-transform"
        >
          <span className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center shadow-sm">
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </span>
          <span className="text-[10px] font-bold tracking-tight leading-none text-neutral-200">
            Dodaj
          </span>
        </button>
      </div>
    </nav>
  );
};
