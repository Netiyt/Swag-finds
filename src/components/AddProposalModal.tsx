import React, { useState } from 'react';
import { X, Plus, Sparkles, Video, ExternalLink, Tag, User, AlignLeft, DollarSign, Image as ImageIcon } from 'lucide-react';
import { Category, CommunityProposal } from '../types/product';

interface AddProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProposal: (proposal: Omit<CommunityProposal, 'id' | 'likes' | 'submittedAt' | 'isUserSubmission'>) => void;
  initialCategory?: Category;
}

const CATEGORY_OPTIONS: Category[] = [
  'Spodnie',
  'Bluzy',
  'Kurtki',
  'Koszulki',
  "Longsleeve'y",
  'Swetry',
  'Biżuteria',
  'Akcesoria',
];

const PRESET_IMAGES = [
  { label: 'Hoodie / Bluza', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop' },
  { label: 'Spodnie / Cargo', url: 'https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=800&auto=format&fit=crop' },
  { label: 'Koszulka / T-Shirt', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop' },
  { label: 'Kurtka / Puffer', url: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop' },
];

export const AddProposalModal: React.FC<AddProposalModalProps> = ({
  isOpen,
  onClose,
  onAddProposal,
  initialCategory,
}) => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<Category>(initialCategory || 'Bluzy');
  const [price, setPrice] = useState<string>('');
  const [storeUrl, setStoreUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Podaj nazwę ubrania lub modelu.');
      return;
    }
    if (!brand.trim()) {
      setError('Podaj nazwę marki.');
      return;
    }
    if (!storeUrl.trim()) {
      setError('Podaj link do sklepu lub dropu.');
      return;
    }

    // Default image if empty
    const finalImageUrl = imageUrl.trim() || PRESET_IMAGES[0].url;

    onAddProposal({
      name: name.trim(),
      brand: brand.trim().toUpperCase(),
      category,
      price: price ? Number(price) : undefined,
      storeUrl: storeUrl.trim(),
      imageUrl: finalImageUrl,
      videoUrl: videoUrl.trim() || undefined,
      author: author.trim() ? (author.trim().startsWith('@') ? author.trim() : `@${author.trim()}`) : '@ziomal',
      description: description.trim() || 'Świetny krój i detal streetwearowy zgłoszony przez społeczność.',
    });

    // Reset and close
    setName('');
    setBrand('');
    setPrice('');
    setStoreUrl('');
    setImageUrl('');
    setVideoUrl('');
    setAuthor('');
    setDescription('');
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#12131b] border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden sm:my-8 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab indicator */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" aria-hidden="true" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-white/[0.08] bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Zgłoś propozycję dropu
              </h2>
              <p className="text-xs text-neutral-400">
                Podziel się perełką streetwearową z całą społecznością Swag Finds
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij formularz"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nazwa */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-neutral-400" />
                <span>Nazwa ubrania / modelu *</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="np. Heavy Distressed Wave Baggy Jeans"
                required
                className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Marka */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <span>Marka / Brand *</span>
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="np. No Faith Studios, Flava, Thug Club"
                required
                className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kategoria */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Kategoria *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-[#181924] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-white/30 cursor-pointer"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Cena */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-neutral-400" />
                <span>Cena w PLN (orientacyjna)</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="np. 349"
                min="0"
                className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* Link do sklepu */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              <span>Link do sklepu / oficjalnego dropu *</span>
            </label>
            <input
              type="url"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="https://..."
              required
              className="w-full px-3.5 py-2.5 text-base sm:text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 font-mono"
            />
          </div>

          {/* Link do zdjęcia */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
                <span>Link do zdjęcia (URL)</span>
              </label>
              <span className="text-[11px] text-neutral-500">
                lub kliknij szybki szablon poniżej
              </span>
            </div>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... (lub wybierz szablon)"
              className="w-full px-3.5 py-2.5 text-base sm:text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 font-mono"
            />
            {/* Quick preset chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Szablony zdjęć:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`min-h-[34px] text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                    imageUrl === preset.url
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-white/[0.04] text-neutral-400 border-white/[0.08] hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fit Check TikTok Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-cyan-400" />
                <span>Link do TikToka / Fit checku (opcjonalny)</span>
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://vm.tiktok.com/..."
                className="w-full px-3.5 py-2.5 text-base sm:text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 font-mono"
              />
            </div>

            {/* Twój nick */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>Twój nick / Instagram / TikTok</span>
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="np. @twoj_nick"
                className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* Opis / Dlaczego warto */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-neutral-400" />
              <span>Dlaczego polecasz? (krój, jakość, materiał)</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="np. Super ciężka bawełna 400gsm, skrócona talia (boxy cropped) i grube ściągacze. Sprawdzony fit..."
              className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 leading-relaxed resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] border-t border-white/[0.08] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-white/5 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Dodaj propozycję</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
