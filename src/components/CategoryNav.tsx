import React from 'react';
import { Flame, Users, Gem, Percent } from 'lucide-react';
import { CATEGORIES, CategoryFilter } from '../data/products';

interface CategoryNavProps {
  selectedCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  categoryCounts: Record<CategoryFilter, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full border-b border-white/[0.08] bg-[#0c0d12]/95 backdrop-blur-md relative md:sticky md:top-18 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-1.5 py-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] ?? 0;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 select-none active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black shadow-sm font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/[0.06] bg-white/[0.02]'
                }`}
                aria-pressed={isSelected}
              >
                {cat === 'Polecane' && (
                  <Flame className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-600 fill-amber-500' : 'text-amber-400 fill-amber-400/40'}`} />
                )}
                {cat === 'Promocje' && (
                  <Percent className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-600' : 'text-rose-400'}`} />
                )}
                {cat === 'Wasze propozycje' && (
                  <Users className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-700' : 'text-emerald-400'}`} />
                )}
                {cat === 'Biżuteria' && (
                  <Gem className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-600' : 'text-sky-300'}`} />
                )}
                <span>{cat}</span>
                <span
                  className={`text-[11px] tabular-nums font-mono px-1.5 py-0.2 rounded-md ${
                    isSelected
                      ? 'bg-neutral-200 text-neutral-800'
                      : 'text-neutral-400 bg-white/[0.05]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
