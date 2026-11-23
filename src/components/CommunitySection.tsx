import React, { useState, useMemo } from 'react';
import { Plus, Users, Flame, Video, ExternalLink, Heart, Trash2, Search, ArrowUpDown, Sparkles, ImageOff } from 'lucide-react';
import { CommunityProposal, Category } from '../types/product';

interface CommunitySectionProps {
  proposals: CommunityProposal[];
  onOpenAddModal: () => void;
  onToggleLike: (proposalId: string) => void;
  userLikes: Set<string>;
  onDeleteProposal?: (proposalId: string) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  proposals,
  onOpenAddModal,
  onToggleLike,
  userLikes,
  onDeleteProposal,
}) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'likes' | 'newest'>('likes');
  const [selectedCategory, setSelectedCategory] = useState<string>('Wszystkie');
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  const handleImageError = (id: string) => {
    setBrokenImages((prev) => new Set(prev).add(id));
  };

  const filteredProposals = useMemo(() => {
    let list = [...proposals];

    if (selectedCategory !== 'Wszystkie') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'likes') {
      list.sort((a, b) => b.likes - a.likes);
    } else {
      // newest
      list.reverse();
    }

    return list;
  }, [proposals, selectedCategory, search, sortBy]);

  const categories = ['Wszystkie', 'Spodnie', 'Bluzy', 'Kurtki', 'Koszulki', "Longsleeve'y", 'Swetry', 'Biżuteria', 'Akcesoria'];

  return (
    <div className="space-y-8 animate-fadeIn pt-2">
      {/* Community Hero Card */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-gradient-to-br from-[#161824] via-[#12131c] to-[#0c0d12] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Głos Społeczności Swag Finds</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Wasze propozycje perełek &amp; dropów
            </h1>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Znalazłeś sztos ciuch, niszową markę lub viralowy fit check z TikToka, który powinien tu być?
              Dodaj go poniżej. Najwyżej oceniane propozycje trafiają bezpośrednio do głównego katalogu!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Łącznie propozycji: <strong className="text-white font-mono">{proposals.length}</strong></span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Głosowanie na żywo (polubienia)</span>
              </span>
            </div>
          </div>

          {/* Big Add Button */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={onOpenAddModal}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm text-black bg-white hover:bg-neutral-200 active:scale-95 transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              <span>Dodaj własną propozycję</span>
            </button>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter and controls bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj w propozycjach (nazwa, brand, autor)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Sort options */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-neutral-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sortuj:</span>
          </span>
          <button
            type="button"
            onClick={() => setSortBy('likes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              sortBy === 'likes'
                ? 'bg-white text-black border-white'
                : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:text-white'
            }`}
          >
            Najwięcej głosów
          </button>
          <button
            type="button"
            onClick={() => setSortBy('newest')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              sortBy === 'newest'
                ? 'bg-white text-black border-white'
                : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:text-white'
            }`}
          >
            Najnowsze
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-neutral-200 text-black border-neutral-200 font-bold'
                  : 'bg-white/[0.03] text-neutral-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Proposals Grid */}
      {filteredProposals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProposals.map((item, index) => {
            const isLiked = userLikes.has(item.id);
            const isImageBroken = brokenImages.has(item.id);

            return (
              <article
                key={item.id}
                className="group relative flex flex-col bg-[#12131a] rounded-xl border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 overflow-hidden shadow-lg hover:-translate-y-1"
              >
                {/* Visual / Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181924]">
                  {!isImageBroken && item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      onError={() => handleImageError(item.id)}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 gap-2 p-6 text-center bg-gradient-to-b from-[#181924] to-[#12131a]">
                      <ImageOff className="w-8 h-8 text-neutral-600 stroke-[1.5]" />
                      <span className="text-xs font-medium text-neutral-400">{item.name}</span>
                      <span className="text-[10px] text-neutral-600 font-mono uppercase">{item.brand}</span>
                    </div>
                  )}

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10">
                      {item.category}
                    </span>
                    {item.isUserSubmission && (
                      <span className="px-2 py-1 rounded-md bg-emerald-500/80 backdrop-blur-md text-[10px] font-bold text-white border border-emerald-400/30">
                        Twoje zgłoszenie
                      </span>
                    )}
                  </div>

                  {/* Fit check badge if video exists */}
                  {item.videoUrl && (
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/80 hover:bg-cyan-900 backdrop-blur-md text-[11px] font-semibold text-cyan-200 border border-cyan-500/30 shadow-sm transition-colors"
                      title="Obejrzyj Fit Check na TikToku"
                    >
                      <Video className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Fit Check</span>
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                        {item.brand}
                      </span>
                      {item.price !== undefined && (
                        <span className="text-sm font-black text-white font-mono">
                          {item.price} zł
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold text-white leading-snug group-hover:text-neutral-100 transition-colors">
                      {item.name}
                    </h2>

                    <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Author and Date metadata */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <span>Autor:</span>
                      <strong className="text-neutral-200 font-mono">{item.author}</strong>
                    </span>
                    <span>{item.submittedAt}</span>
                  </div>

                  {/* Actions: Store link + Like + Delete */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={item.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.08] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all group/btn"
                    >
                      <span>Strona dropu</span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover/btn:text-white transition-colors" />
                    </a>

                    {/* Like / Upvote Button */}
                    <button
                      type="button"
                      onClick={() => onToggleLike(item.id)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                        isLiked
                          ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
                          : 'bg-white/[0.04] text-neutral-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                      }`}
                      title={isLiked ? 'Usuń głos' : 'Zagłosuj na tę propozycję'}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-white' : 'text-neutral-400'}`} />
                      <span className="tabular-nums font-mono">{item.likes}</span>
                    </button>

                    {/* Delete button (only if user created it or option given) */}
                    {item.isUserSubmission && onDeleteProposal && (
                      <button
                        type="button"
                        onClick={() => onDeleteProposal(item.id)}
                        className="p-2.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Usuń swoje zgłoszenie"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty proposals state */
        <div className="py-16 px-4 text-center rounded-2xl border border-white/[0.08] bg-[#12131b] max-w-md mx-auto my-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {proposals.length === 0 ? 'Brak propozycji – tablica jest czysta!' : 'Brak propozycji dla wybranych kryteriów'}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              {proposals.length === 0
                ? 'Bądź pierwszą osobą, która doda własną propozycję ubrania lub dropu do katalogu!'
                : 'Spróbuj zmienić kategorię lub wyczyścić pole wyszukiwania.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Zgłoś pierwszą propozycję</span>
          </button>
        </div>
      )}
    </div>
  );
};
