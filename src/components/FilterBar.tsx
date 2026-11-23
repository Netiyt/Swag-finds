import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, Sparkles, Video, Check, Percent, LayoutGrid, Rows3 } from 'lucide-react';
import { ProductBadge, SortOption } from '../types/product';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBadge: ProductBadge | 'ALL';
  onBadgeSelect: (badge: ProductBadge | 'ALL') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalFiltered: number;
  totalAll: number;
  onResetFilters: () => void;
  isFiltered: boolean;
  mobileColumns?: 1 | 2;
  onToggleMobileColumns?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedBadge,
  onBadgeSelect,
  sortBy,
  onSortChange,
  totalFiltered,
  totalAll,
  onResetFilters,
  isFiltered,
  mobileColumns = 2,
  onToggleMobileColumns,
}) => {
  const BADGES: { id: ProductBadge | 'ALL'; label: string; icon?: React.ReactNode }[] = [
    { id: 'ALL', label: 'Wszystkie' },
    { id: 'Przecena', label: 'Przeceny %', icon: <Percent className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'Ukryta perełka', label: 'Ukryta perełka', icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" /> },
    { id: 'Do 200 zł', label: 'Do 200 zł' },
    { id: 'Fit check', label: 'Fit check', icon: <Video className="w-3.5 h-3.5 text-emerald-300" /> },
  ];

  return (
    <div id="kolekcja" className="w-full py-4 sm:py-6 space-y-3 sm:space-y-4">
      {/* Upper search & sort row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Search input with quick clear (text-base prevents iOS Safari auto-zoom) */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Szukaj po nazwie, marce, kroju (np. 'boxy')..."
            className="w-full min-h-[44px] sm:min-h-0 pl-10 pr-10 py-2.5 text-base sm:text-sm bg-white/[0.05] border border-white/[0.1] rounded-xl sm:rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-2 rounded-md cursor-pointer"
              aria-label="Wyczyść wyszukiwanie"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort, mobile grid switcher & stats control */}
        <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span className="font-semibold text-neutral-200 tabular-nums">{totalFiltered}</span>
            <span>z</span>
            <span className="tabular-nums">{totalAll}</span>
            <span className="hidden xs:inline">ubrań</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Grid Column Switcher (2x vs 1x) */}
            {onToggleMobileColumns && (
              <button
                type="button"
                onClick={onToggleMobileColumns}
                className="sm:hidden min-h-[40px] px-2.5 py-2 text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-lg text-neutral-200 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                title={mobileColumns === 2 ? 'Przełącz na widok 1 kolumny' : 'Przełącz na siatkę 2 kolumn'}
                aria-label={mobileColumns === 2 ? 'Przełącz na widok 1 kolumny' : 'Przełącz na siatkę 2 kolumn'}
              >
                {mobileColumns === 2 ? (
                  <>
                    <Rows3 className="w-3.5 h-3.5 text-neutral-300" />
                    <span>1×</span>
                  </>
                ) : (
                  <>
                    <LayoutGrid className="w-3.5 h-3.5 text-neutral-300" />
                    <span>2×</span>
                  </>
                )}
              </button>
            )}

            <div className="relative flex items-center">
              <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                aria-label="Sortuj produkty"
                className="min-h-[40px] sm:min-h-0 pl-8 pr-6 py-2 text-xs font-semibold bg-white/[0.05] border border-white/[0.1] rounded-lg text-neutral-200 focus:outline-none focus:border-white/30 cursor-pointer appearance-none"
              >
                <option value="featured" className="bg-[#14151b] text-white">Sortowanie: Domyślne</option>
                <option value="likes-desc" className="bg-[#14151b] text-white">Najwięcej polubień</option>
                <option value="discount-desc" className="bg-[#14151b] text-white">Największa przecena %</option>
                <option value="price-asc" className="bg-[#14151b] text-white">Cena: od najniższej</option>
                <option value="price-desc" className="bg-[#14151b] text-white">Cena: od najwyższej</option>
                <option value="name-asc" className="bg-[#14151b] text-white">Nazwa: A - Z</option>
              </select>
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={onResetFilters}
                className="min-h-[40px] sm:min-h-0 px-2.5 sm:px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Badges filter row (clean wrap so all filter pills stay visible on mobile) */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
        <span className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400 font-semibold whitespace-nowrap mr-1 flex items-center gap-1">
          <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
          Filtr:
        </span>
        {BADGES.map((badge) => {
          const isActive = selectedBadge === badge.id;
          return (
            <button
              key={badge.id}
              type="button"
              onClick={() => onBadgeSelect(badge.id)}
              className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg sm:rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
              }`}
            >
              {badge.icon}
              <span>{badge.label}</span>
              {isActive && badge.id !== 'ALL' && (
                <Check className="w-3 h-3 text-black" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
