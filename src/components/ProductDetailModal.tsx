import React, { useEffect, useState, useMemo, useRef } from 'react';
import { X, ExternalLink, Video, Sparkles, Check, Share2, Shield, Info, ArrowUpRight, Maximize2, ChevronLeft, ChevronRight, Image as ImageIcon, Heart, Percent } from 'lucide-react';
import { Product } from '../types/product';
import { FullscreenLightbox } from './FullscreenLightbox';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isLiked?: boolean;
  likeCount?: number;
  onToggleLike?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isLiked = false,
  likeCount = 0,
  onToggleLike,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [product.imageUrl];
  }, [product]);

  // Reset state ONLY when product ID changes
  useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setIsLightboxOpen(false);
      // Reset selected size when product changes
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize(null);
      }
    }
  }, [product?.id]);

  // Handle body overflow and Escape key (only close modal if lightbox is not open)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLightboxOpen) {
        onClose();
      }
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [product, onClose, isLightboxOpen]);

  if (!product) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenStore = () => {
    window.open(product.storeUrl, '_blank', 'noopener,noreferrer');
  };

  // Check if videoUrl exists and is non-empty
  const hasVideo = Boolean(product.videoUrl && product.videoUrl.trim().length > 0);

  const handleGalleryTouchStart = (e: React.TouchEvent) => {
    if (galleryImages.length <= 1 || e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleGalleryTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || galleryImages.length <= 1 || e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
      } else {
        setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#101118] border border-white/[0.12] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden sm:my-auto max-h-[93vh] sm:max-h-[92vh] flex flex-col"
      >
        {/* Mobile bottom-sheet drag indicator */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" aria-hidden="true" />

        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.08] bg-[#141520] shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 min-w-0">
            <span className="hidden sm:inline">Katalog</span>
            <span aria-hidden="true" className="hidden sm:inline text-neutral-600">/</span>
            <span className="text-white shrink-0">{product.category}</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span className="text-neutral-400 truncate">{product.brand}</span>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0"
            aria-label="Zamknij podgląd"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-7 space-y-6 sm:space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column: Big Product Image & Gallery */}
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div 
                onClick={() => setIsLightboxOpen(true)}
                onTouchStart={handleGalleryTouchStart}
                onTouchEnd={handleGalleryTouchEnd}
                className="relative aspect-[4/3] sm:aspect-square w-full rounded-xl overflow-hidden bg-[#181924] border border-white/[0.08] cursor-zoom-in group select-none"
              >
                <img
                  src={galleryImages[selectedImageIndex] || product.imageUrl}
                  alt={`${product.name} - zdjęcie ${selectedImageIndex + 1}`}
                  referrerPolicy={(galleryImages[selectedImageIndex] || product.imageUrl).startsWith('http') ? 'no-referrer' : undefined}
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src !== product.imageUrl && !img.src.endsWith(product.imageUrl)) {
                      img.src = product.imageUrl;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    objectPosition: selectedImageIndex === 0 ? (product.imagePosition || 'center') : 'center'
                  }}
                />

                {/* Floating Fullscreen / Pełny Ekran Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer z-10 hover:scale-105 active:scale-95"
                  title="Otwórz w pełnym ekranie (Fullscreen)"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Pełny ekran</span>
                </button>

                {/* Photo counter badge */}
                {galleryImages.length > 1 && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/10 font-mono z-10 flex items-center gap-1.5">
                    <ImageIcon className="w-3 h-3 text-neutral-400" />
                    <span>{selectedImageIndex + 1} / {galleryImages.length}</span>
                  </div>
                )}

                {/* Next / Prev buttons on image if more than 1 photo */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 z-10 cursor-pointer shadow-lg"
                      title="Poprzednie zdjęcie"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 z-10 cursor-pointer shadow-lg"
                      title="Następne zdjęcie"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {product.colorway && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-xs text-white border border-white/10 font-mono z-10">
                    {product.colorway}
                  </div>
                )}
              </div>

              {/* Thumbnail carousel strip */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                  {galleryImages.map((img, idx) => {
                    const isSelected = idx === selectedImageIndex;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-white ring-2 ring-white/20 scale-105'
                            : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/40'
                        }`}
                        title={`Zdjęcie ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} - miniatura ${idx + 1}`}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy={img.startsWith('http') ? 'no-referrer' : undefined}
                          decoding="async"
                          onError={(e) => {
                            const el = e.currentTarget;
                            if (el.src !== product.imageUrl && !el.src.endsWith(product.imageUrl)) {
                              el.src = product.imageUrl;
                            }
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Quiet photo reassurance */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1 pt-1">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>Oficjalne zdjęcia ze sklepu partnerskiego</span>
                </div>
                {galleryImages.length > 1 && (
                  <span className="text-neutral-400">
                    <span className="sm:hidden">Przesuń palcem lub kliknij</span>
                    <span className="hidden sm:inline">Kliknij zdjęcie, aby powiększyć</span>
                  </span>
                )}
              </div>
            </div>

            {/* Right Column: Information, Pricing, Sizes, Purchase Button */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div>
                {/* Brand name */}
                <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1.5">
                  {product.brand}
                </p>

                {/* Product Name */}
                <h1 id="modal-product-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Price Display in PLN with Discount Support */}
                {(() => {
                  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
                  const discountPercent = hasDiscount && product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;
                  const discountDiff = hasDiscount && product.originalPrice
                    ? product.originalPrice - product.price
                    : 0;

                  return (
                    <div className="mt-3 space-y-1.5">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="text-3xl font-black text-white tabular-nums tracking-tight font-display">
                          {product.price} zł
                        </span>
                        {hasDiscount && product.originalPrice && (
                          <>
                            <span className="text-xl line-through text-neutral-500 tabular-nums font-mono">
                              {product.originalPrice} zł
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold tracking-wide">
                              <Percent className="w-3 h-3" />
                              <span>-{discountPercent}% ({discountDiff} zł taniej)</span>
                            </span>
                          </>
                        )}
                      </div>
                      {hasDiscount && product.originalPrice ? (
                        <p className="text-[11px] text-neutral-400">
                          Cena promocyjna w oficjalnym sklepie. Najniższa cena z 30 dni przed obniżką: <span className="text-neutral-300 font-mono font-semibold">{product.originalPrice} zł</span>
                        </p>
                      ) : (
                        <span className="text-xs text-neutral-400 uppercase tracking-wider font-medium block">
                          (Cena w oficjalnym sklepie)
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Badges list */}
              {product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/[0.06]">
                  {product.badges.map((badge) => {
                    let badgeClass = 'bg-white/[0.06] text-neutral-300 border-white/[0.1]';
                    let icon: React.ReactNode = null;

                    if (badge === 'Przecena') {
                      badgeClass = 'bg-rose-950/40 text-rose-300 border-rose-500/30';
                      icon = <Percent className="w-3.5 h-3.5 text-rose-400" />;
                    } else if (badge === 'Ukryta perełka') {
                      badgeClass = 'bg-amber-950/40 text-amber-200 border-amber-500/30';
                      icon = <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
                    } else if (badge === 'Do 200 zł') {
                      badgeClass = 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30';
                    } else if (badge === 'Fit check') {
                      badgeClass = 'bg-cyan-950/40 text-cyan-200 border-cyan-500/30';
                      icon = <Video className="w-3.5 h-3.5 text-cyan-400" />;
                    }

                    return (
                      <span
                        key={badge}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border ${badgeClass}`}
                      >
                        {icon}
                        <span>{badge}</span>
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Description & Fit characteristics */}
              {product.description && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2.5">
                  <h2 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-neutral-400" />
                    Charakterystyka kroju &amp; materiału
                  </h2>
                  <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                  {product.videoUrl && (
                    <div className="pt-1.5 border-t border-white/[0.06] flex items-center gap-2">
                      <a
                        href={product.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all group"
                      >
                        <Video className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span>Otwórz Fit Check na TikToku</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Dostępne rozmiary (sizes) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-neutral-300">
                    Dostępne rozmiary
                  </span>
                  {product.sizes && product.sizes.length > 0 && (
                    <span className="text-[11px] text-neutral-400">
                      Zaznaczony: <strong className="text-white">{selectedSize || 'Dowolny'}</strong>
                    </span>
                  )}
                </div>

                {product.sizes && product.sizes.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black border-white shadow-md'
                              : 'bg-white/[0.04] text-neutral-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400 italic">
                    Brak bezpośrednich danych o rozmiarach. Sprawdź tabelę rozmiarów na stronie producenta.
                  </p>
                )}
              </div>

              {/* Mobile Share & Store Meta Row (above sticky bottom bar) */}
              <div className="lg:hidden pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3 text-xs text-neutral-400">
                <span className="truncate">
                  Sklep: <span className="text-neutral-300 font-medium">{product.brand}</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="min-h-[40px] px-3 py-1.5 text-neutral-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Skopiowano!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Udostępnij</span>
                    </>
                  )}
                </button>
              </div>

              {/* Desktop Primary Actions: Go to Original Store + Share */}
              <div className="hidden lg:block pt-4 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleOpenStore}
                    className="flex-1 py-4 px-6 text-sm sm:text-base font-bold text-black bg-white hover:bg-neutral-200 active:scale-[0.99] rounded-xl transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Przejdź do oryginalnego sklepu</span>
                    <ExternalLink className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  {onToggleLike && product && (
                    <button
                      type="button"
                      onClick={() => onToggleLike(product.id)}
                      className={`py-4 px-5 rounded-xl border flex items-center gap-2 font-bold text-sm transition-all active:scale-95 cursor-pointer shrink-0 ${
                        isLiked
                          ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/25'
                          : 'bg-white/[0.05] border-white/10 text-neutral-300 hover:bg-white/[0.1] hover:text-white'
                      }`}
                      title={isLiked ? 'Usuń polubienie' : 'Polub ten produkt'}
                    >
                      <Heart className={`w-5 h-5 transition-transform ${isLiked ? 'fill-current text-white scale-110' : 'text-neutral-400'}`} />
                      <span className="tabular-nums font-mono font-semibold">{likeCount}</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 text-xs text-neutral-400">
                  <span className="truncate">
                    Zakup realizowany bezpośrednio na stronie sklepu: <span className="text-neutral-300 font-medium">{product.brand}</span>
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-2 text-neutral-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                    title="Udostępnij produkt"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Skopiowano!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Udostępnij</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Sekcja „Zobacz, jak leży” (WIDEO PREZENTUJĄCE UBRANIE NA CZŁOWIEKU) */}
          {/* CRITICAL REQUIREMENT: Jeśli dostępny jest film, pokaż go w tej sekcji. Jeśli nie ma filmu, UKRYJ sekcję zamiast wyświetlać pusty element. */}
          {hasVideo && (
            <div className="pt-6 border-t border-white/[0.1] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      Zobacz, jak leży
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Film prezentujący ubranie, proporcje i krój na sylwetce (Fit Check)
                    </p>
                  </div>
                </div>

                <a
                  href={product.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1 bg-white/[0.06] px-3 py-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.1] transition-all"
                >
                  <span>Otwórz źródło wideo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Video Embed Player / Official Link Showcase */}
              <div className="relative rounded-xl overflow-hidden border border-white/[0.12] bg-[#141620] p-4 sm:p-6 flex flex-col md:flex-row items-center gap-6">
                {/* Visual Video Thumbnail Preview */}
                <div className="relative aspect-[9/16] w-full max-w-[200px] rounded-lg overflow-hidden bg-black border border-white/10 shrink-0 shadow-lg group">
                  <img
                    src={product.imageUrl}
                    alt="Podgląd fit checku"
                    className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                    <a
                      href={product.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all mb-2 cursor-pointer"
                      aria-label="Odtwórz wideo z fit checkiem"
                    >
                      <Video className="w-5 h-5 fill-current ml-0.5" />
                    </a>
                    <span className="text-[11px] font-bold text-white tracking-wide">
                      FIT CHECK
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-neutral-300 font-mono">
                    {product.name}
                  </div>
                </div>

                {/* Video Info and Direct Official Embed Action */}
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
                    <Video className="w-3.5 h-3.5" />
                    <span>Oficjalne wideo / Prezentacja kroju</span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    Prezentacja na żywo: {product.name}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Sprawdź, jak materiał układa się w ruchu, jak wygląda linia ramion oraz jak spodnie lub bluza opadają na buty.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <a
                      href={product.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>Obejrzyj oficjalne nagranie na TikToku</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-[11px] text-neutral-400">
                    Materiały pochodzą wyłącznie z oficjalnych osadzeń i linków udostępnionych przez twórców.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Sticky Mobile Bottom Purchase CTA Bar */}
        <div className="lg:hidden shrink-0 border-t border-white/[0.1] bg-[#141520]/95 backdrop-blur-lg px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center gap-2.5">
          <div className="shrink-0 pr-1">
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[11px] line-through text-neutral-500 font-mono tabular-nums leading-none mb-0.5">
                {product.originalPrice} zł
              </div>
            )}
            <div className="text-lg font-black text-white font-display tabular-nums leading-none">
              {product.price} zł
            </div>
          </div>

          {onToggleLike && (
            <button
              type="button"
              onClick={() => onToggleLike(product.id)}
              className={`min-h-[44px] min-w-[44px] px-3 rounded-xl border flex items-center justify-center gap-1.5 font-bold text-xs transition-all active:scale-95 cursor-pointer shrink-0 ${
                isLiked
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25'
                  : 'bg-white/[0.06] border-white/10 text-neutral-300 hover:text-white'
              }`}
              aria-label={isLiked ? 'Usuń polubienie' : 'Polub produkt'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-white' : 'text-neutral-300'}`} />
              <span className="tabular-nums font-mono">{likeCount}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenStore}
            className="flex-1 min-h-[46px] px-4 text-sm font-bold text-black bg-white hover:bg-neutral-200 active:scale-[0.98] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Przejdź do sklepu</span>
            <ExternalLink className="w-4 h-4 text-black shrink-0" />
          </button>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox */}
      <FullscreenLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={galleryImages}
        initialIndex={selectedImageIndex}
        productName={product.name}
        brand={product.brand}
        storeUrl={product.storeUrl}
      />
    </div>
  );
};
