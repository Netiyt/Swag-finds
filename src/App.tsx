import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { DataEditGuideModal } from './components/DataEditGuideModal';
import { CommunitySection } from './components/CommunitySection';
import { AddProposalModal } from './components/AddProposalModal';
import { Footer } from './components/Footer';
import { LegalModal, LegalTab } from './components/LegalModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PRODUCTS, CategoryFilter } from './data/products';
import {
  getStoredProposals,
  saveStoredProposals,
  getUserProposalLikes,
  saveUserProposalLikes,
} from './data/communityProposals';
import { Product, ProductBadge, SortOption, CommunityProposal } from './types/product';
import { Sparkles, PackageSearch, RefreshCw, Flame, Heart, Percent } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Wszystkie');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBadge, setSelectedBadge] = useState<ProductBadge | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isAddProposalOpen, setIsAddProposalOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalInitialTab, setLegalInitialTab] = useState<LegalTab>('disclaimer');
  const [mobileColumns, setMobileColumns] = useState<1 | 2>(2);

  // Community proposals state
  const [proposals, setProposals] = useState<CommunityProposal[]>(() => getStoredProposals());
  const [proposalUserLikes, setProposalUserLikes] = useState<Set<string>>(() => getUserProposalLikes());

  // User likes state stored in localStorage (real user clicks on this site)
  const [userLikes, setUserLikes] = useState<Set<string>>(() => {
    try {
      // Clear legacy mock data
      localStorage.removeItem('swag_like_counts');
      localStorage.removeItem('swag_user_likes');

      const saved = localStorage.getItem('swag_real_user_likes');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    return new Set<string>();
  });

  // Like counts per product - starts at 0 for every product, counting only genuine likes from this site!
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = 0;
    });

    try {
      const saved = localStorage.getItem('swag_real_product_likes');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initial, ...parsed };
      }
    } catch (e) {
      console.error(e);
    }
    return initial;
  });

  const handleToggleLike = (productId: string) => {
    setUserLikes((prevUserLikes) => {
      const nextUserLikes = new Set(prevUserLikes);
      const isAlreadyLiked = nextUserLikes.has(productId);

      if (isAlreadyLiked) {
        nextUserLikes.delete(productId);
      } else {
        nextUserLikes.add(productId);
      }

      try {
        localStorage.setItem('swag_real_user_likes', JSON.stringify(Array.from(nextUserLikes)));
      } catch (e) {
        console.error(e);
      }

      setLikeCounts((prevCounts) => {
        const current = prevCounts[productId] ?? 0;
        const nextCounts = {
          ...prevCounts,
          [productId]: isAlreadyLiked ? Math.max(0, current - 1) : current + 1,
        };

        try {
          localStorage.setItem('swag_real_product_likes', JSON.stringify(nextCounts));
        } catch (e) {
          console.error(e);
        }

        return nextCounts;
      });

      return nextUserLikes;
    });
  };

  // Community proposals actions
  const handleAddProposal = (
    data: Omit<CommunityProposal, 'id' | 'likes' | 'submittedAt' | 'isUserSubmission'>
  ) => {
    const newProposal: CommunityProposal = {
      ...data,
      id: `prop-${Date.now()}`,
      likes: 1, // Autor zaczyna z polubieniem
      submittedAt: 'Przed chwilą',
      isUserSubmission: true,
    };

    const nextProposals = [newProposal, ...proposals];
    setProposals(nextProposals);
    saveStoredProposals(nextProposals);

    // Zarejestruj głos autora
    setProposalUserLikes((prev) => {
      const next = new Set(prev).add(newProposal.id);
      saveUserProposalLikes(next);
      return next;
    });

    // Przełącz na zakładkę "Wasze propozycje" i przewiń
    setSelectedCategory('Wasze propozycje');
    handleScrollToCatalog();
  };

  const handleToggleProposalLike = (proposalId: string) => {
    setProposalUserLikes((prev) => {
      const next = new Set(prev);
      const isAlreadyLiked = next.has(proposalId);
      if (isAlreadyLiked) {
        next.delete(proposalId);
      } else {
        next.add(proposalId);
      }
      saveUserProposalLikes(next);

      setProposals((prevProposals) => {
        const nextList = prevProposals.map((p) => {
          if (p.id === proposalId) {
            return {
              ...p,
              likes: isAlreadyLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
            };
          }
          return p;
        });
        saveStoredProposals(nextList);
        return nextList;
      });

      return next;
    });
  };

  const handleDeleteProposal = (proposalId: string) => {
    setProposals((prev) => {
      const next = prev.filter((p) => p.id !== proposalId);
      saveStoredProposals(next);
      return next;
    });
    setProposalUserLikes((prev) => {
      const next = new Set(prev);
      next.delete(proposalId);
      saveUserProposalLikes(next);
      return next;
    });
  };

  const isProductOnSale = (p: Product) =>
    Boolean(
      (p.badges && p.badges.includes('Przecena')) ||
        (p.originalPrice && p.originalPrice > p.price)
    );

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      Wszystkie: PRODUCTS.length,
      Polecane: PRODUCTS.length,
      Promocje: 0,
      'Wasze propozycje': proposals.length,
      Spodnie: 0,
      Koszulki: 0,
      "Longsleeve'y": 0,
      Bluzy: 0,
      Swetry: 0,
      Kurtki: 0,
      Biżuteria: 0,
      Akcesoria: 0,
    };

    PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
      if (isProductOnSale(p)) {
        counts.Promocje++;
      }
    });

    return counts;
  }, [proposals.length]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter (Polecane displays all items sorted by likes; Promocje displays all items on sale)
    if (selectedCategory === 'Promocje') {
      result = result.filter(isProductOnSale);
    } else if (selectedCategory !== 'Wszystkie' && selectedCategory !== 'Polecane') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Search Query (matches name, brand, description, colorway, category)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.colorway && p.colorway.toLowerCase().includes(q))
      );
    }

    // 3. Badge Filter
    if (selectedBadge !== 'ALL') {
      if (selectedBadge === 'Przecena') {
        result = result.filter(isProductOnSale);
      } else {
        result = result.filter((p) => p.badges && p.badges.includes(selectedBadge));
      }
    }

    // 4. Sorting
    // If user clicked 'Polecane' tab and hasn't changed custom sort, prioritize likes
    if (selectedCategory === 'Polecane' && sortBy === 'featured') {
      result.sort((a, b) => {
        const likesA = likeCounts[a.id] ?? 0;
        const likesB = likeCounts[b.id] ?? 0;
        return likesB - likesA;
      });
    } else if (selectedCategory === 'Promocje' && sortBy === 'featured') {
      // On Promocje tab, prioritize highest percentage discount by default
      result.sort((a, b) => {
        const pctA =
          a.originalPrice && a.originalPrice > a.price
            ? (a.originalPrice - a.price) / a.originalPrice
            : 0;
        const pctB =
          b.originalPrice && b.originalPrice > b.price
            ? (b.originalPrice - b.price) / b.originalPrice
            : 0;
        return pctB - pctA;
      });
    } else {
      switch (sortBy) {
        case 'likes-desc':
          result.sort((a, b) => {
            const likesA = likeCounts[a.id] ?? 0;
            const likesB = likeCounts[b.id] ?? 0;
            return likesB - likesA;
          });
          break;
        case 'discount-desc':
          result.sort((a, b) => {
            const pctA =
              a.originalPrice && a.originalPrice > a.price
                ? (a.originalPrice - a.price) / a.originalPrice
                : -1;
            const pctB =
              b.originalPrice && b.originalPrice > b.price
                ? (b.originalPrice - b.price) / b.originalPrice
                : -1;
            return pctB - pctA;
          });
          break;
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name, 'pl'));
          break;
        case 'featured':
        default:
          break;
      }
    }

    return result;
  }, [selectedCategory, searchQuery, selectedBadge, sortBy, likeCounts]);

  const isFiltered =
    selectedCategory !== 'Wszystkie' ||
    searchQuery.trim() !== '' ||
    selectedBadge !== 'ALL' ||
    sortBy !== 'featured';

  const handleResetFilters = () => {
    setSelectedCategory('Wszystkie');
    setSearchQuery('');
    setSelectedBadge('ALL');
    setSortBy('featured');
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('kolekcja');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterFitCheck = () => {
    setSelectedBadge('Fit check');
    setSelectedCategory('Wszystkie');
    handleScrollToCatalog();
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#f1f3f7] flex flex-col selection:bg-white selection:text-black">
      {/* Top Bar */}
      <Header
        onOpenGuide={() => setIsGuideOpen(true)}
        totalProducts={PRODUCTS.length}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToCatalog();
        }}
        onOpenAddProposal={() => setIsAddProposalOpen(true)}
        proposalsCount={proposals.length}
      />

      {/* Hero Campaign Showcase */}
      <HeroBanner
        onScrollToCatalog={handleScrollToCatalog}
        onFilterFitCheck={handleFilterFitCheck}
        totalProducts={PRODUCTS.length}
      />

      {/* Category Navigation Bar (Sticky beneath Header) */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        categoryCounts={categoryCounts}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-10 sm:pb-20 w-full">
        {selectedCategory === 'Wasze propozycje' ? (
          <CommunitySection
            proposals={proposals}
            onOpenAddModal={() => setIsAddProposalOpen(true)}
            onToggleLike={handleToggleProposalLike}
            userLikes={proposalUserLikes}
            onDeleteProposal={handleDeleteProposal}
          />
        ) : (
          <>
            {/* Filter & Search Bar */}
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedBadge={selectedBadge}
              onBadgeSelect={setSelectedBadge}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalFiltered={filteredProducts.length}
              totalAll={PRODUCTS.length}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
              mobileColumns={mobileColumns}
              onToggleMobileColumns={() => setMobileColumns((c) => (c === 2 ? 1 : 2))}
            />

            {/* Banner for Polecane tab */}
            {selectedCategory === 'Polecane' && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-500/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Ranking Polecane</span>
                      <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                        Na żywo
                      </span>
                    </h2>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Ubrania uszeregowane według największej liczby polubień od użytkowników.
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>Kliknij serduszko na kafelku, aby zagłosować</span>
                </div>
              </div>
            )}

            {/* Banner for Promocje tab */}
            {selectedCategory === 'Promocje' && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-rose-500/15 via-rose-500/5 to-transparent border border-rose-500/25 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Strefa Promocji</span>
                      <span className="text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded">
                        {categoryCounts.Promocje} przecenionych
                      </span>
                    </h2>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Wszystkie produkty objęte aktualną obniżką ceny w oficjalnych sklepach, posortowane od największego rabatu.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Product Collection Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid ${
                  mobileColumns === 2 ? 'grid-cols-2 gap-3' : 'grid-cols-1 gap-5'
                } sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-7 pt-2`}
              >
                {filteredProducts.map((product, index) => {
                  const currentLikes = likeCounts[product.id] ?? 0;
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={setSelectedProduct}
                      isLiked={userLikes.has(product.id)}
                      likeCount={currentLikes}
                      onToggleLike={handleToggleLike}
                      rank={selectedCategory === 'Polecane' && currentLikes > 0 ? index + 1 : undefined}
                      compactMobile={mobileColumns === 2}
                    />
                  );
                })}
              </div>
            ) : (
              /* Empty Search / Filter State */
              <div className="py-16 px-6 text-center rounded-2xl border border-white/[0.08] bg-[#12131b] max-w-lg mx-auto my-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
                  <PackageSearch className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedCategory !== 'Wszystkie' && selectedCategory !== 'Polecane'
                      ? `Brak ubrań w kategorii: ${selectedCategory}`
                      : 'Brak produktów dla wybranych filtrów'}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed max-w-sm mx-auto">
                    {selectedCategory === 'Swetry' || selectedCategory === 'Akcesoria' || selectedCategory === 'Biżuteria'
                      ? 'Ta kategoria czeka na pierwsze perełki! Znasz świetny drop? Dodaj swoją propozycję do bazy.'
                      : 'Spróbuj zmienić kategorię, usunąć frazę wyszukiwania lub zresetować filtry oznaczeń.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Pokaż wszystkie ubrania ({PRODUCTS.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddProposalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-lg transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Zaproponuj ubranie</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Comprehensive Legal & Editorial Footer */}
      <Footer
        onOpenLegal={(tab) => {
          setLegalInitialTab(tab);
          setIsLegalModalOpen(true);
        }}
        onOpenGuide={() => setIsGuideOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToCatalog();
        }}
        onFilterFitCheck={handleFilterFitCheck}
        totalProducts={PRODUCTS.length}
        proposalsCount={proposals.length}
      />

      {/* Mobile Fixed Thumb-Zone Bottom Navigation */}
      <MobileBottomNav
        selectedCategory={selectedCategory}
        selectedBadge={selectedBadge}
        proposalsCount={proposals.length}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (cat === 'Wszystkie') {
            setSelectedBadge('ALL');
          }
          handleScrollToCatalog();
        }}
        onTogglePromo={() => {
          setSelectedBadge('ALL');
          setSelectedCategory((prev) => (prev === 'Promocje' ? 'Wszystkie' : 'Promocje'));
          handleScrollToCatalog();
        }}
        onOpenAddProposal={() => setIsAddProposalOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isLiked={selectedProduct ? userLikes.has(selectedProduct.id) : false}
        likeCount={selectedProduct ? (likeCounts[selectedProduct.id] ?? 0) : 0}
        onToggleLike={handleToggleLike}
      />

      {/* Add Community Proposal Modal */}
      <AddProposalModal
        isOpen={isAddProposalOpen}
        onClose={() => setIsAddProposalOpen(false)}
        onAddProposal={handleAddProposal}
        initialCategory={
          selectedCategory !== 'Wszystkie' &&
          selectedCategory !== 'Polecane' &&
          selectedCategory !== 'Promocje' &&
          selectedCategory !== 'Wasze propozycje'
            ? selectedCategory
            : undefined
        }
      />

      {/* Legal & Compliance Modal */}
      <LegalModal
        isOpen={isLegalModalOpen}
        initialTab={legalInitialTab}
        onClose={() => setIsLegalModalOpen(false)}
      />

      {/* Data Edit Guide Modal */}
      <DataEditGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
