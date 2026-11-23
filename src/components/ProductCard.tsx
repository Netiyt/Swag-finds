import React, { useState } from 'react';
import { ExternalLink, Video, Sparkles, ImageOff, Heart, Percent } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  isLiked: boolean;
  likeCount: number;
  onToggleLike: (productId: string) => void;
  rank?: number;
  compactMobile?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  isLiked,
  likeCount,
  onToggleLike,
  rank,
  compactMobile = false,
}) => {
  const getFallbackImage = (category: string) => {
    switch (category) {
      case 'Spodnie':
        return '/assets/images/streetwear_baggy_denim_1792352087814.jpg';
      case 'Kurtki':
        return '/assets/images/streetwear_varsity_jacket_1792352087734.jpg';
      case 'Bluzy':
      case "Longsleeve'y":
      case 'Koszulki':
        return '/assets/images/streetwear_heavy_hoodie_1792352087202.jpg';
      default:
        return '/assets/images/streetwear_hero_editorial_1792352087184.jpg';
    }
  };

  const candidateImages = React.useMemo(() => {
    const list = [
      product.imageUrl,
      ...(product.images || []),
      getFallbackImage(product.category),
    ].filter(Boolean);
    return Array.from(new Set(list));
  }, [product.imageUrl, product.images, product.category]);

  const [imgIndex, setImgIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Sync state if product changes
  React.useEffect(() => {
    setImgIndex(0);
    setImageError(false);
  }, [product.imageUrl, product.id]);

  const imgSrc = candidateImages[imgIndex] || getFallbackImage(product.category);

  const handleImageError = () => {
    if (imgIndex + 1 < candidateImages.length) {
      setImgIndex((prev) => prev + 1);
      return;
    }
    setImageError(true);
  };

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
  const discountPercent = hasDiscount && product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleOpenStore = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(product.storeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col bg-[#12131a] rounded-xl border border-white/[0.08] hover:border-white/[0.22] transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 active:scale-[0.99]"
    >
      {/* Visual Slot */}
      <div className={`relative w-full overflow-hidden bg-[#181924] ${compactMobile ? 'aspect-square sm:aspect-[4/3]' : 'aspect-[4/3]'}`}>
        {!imageError ? (
          <img
            src={imgSrc}
            alt={product.name}
            onError={handleImageError}
            referrerPolicy={imgSrc.startsWith('http') ? 'no-referrer' : undefined}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            style={{ objectPosition: product.imagePosition || 'center' }}
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 gap-2 p-6 text-center bg-gradient-to-b from-[#181924] to-[#12131a]">
            <ImageOff className="w-8 h-8 text-neutral-600 stroke-[1.5]" />
            <span className="text-xs font-medium text-neutral-400">{product.name}</span>
            <span className="text-[10px] text-neutral-600 font-mono uppercase">{product.brand}</span>
          </div>
        )}

        {/* Video / Fit Check Indicator */}
        {product.videoUrl && (
          <div className={`absolute z-10 flex items-center gap-1 rounded-md bg-black/75 backdrop-blur-md font-semibold text-white border border-white/10 shadow-sm ${
            compactMobile ? 'top-2 right-2 px-1.5 py-1 sm:top-3 sm:right-3 sm:px-2.5 text-[10px] sm:text-[11px]' : 'top-3 right-3 px-2.5 py-1 text-[11px]'
          }`}>
            <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 animate-pulse" />
            <span className={compactMobile ? 'hidden sm:inline' : 'inline'}>Fit Check</span>
          </div>
        )}

        {/* Top Badges: Category & Discount */}
        <div className={`absolute z-10 flex items-center gap-1 flex-wrap max-w-[80%] ${compactMobile ? 'top-2 left-2 sm:top-3 sm:left-3' : 'top-3 left-3 gap-1.5'}`}>
          <span className={`px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider text-neutral-300 font-medium ${compactMobile ? 'hidden sm:inline-block' : 'inline-block'}`}>
            {product.category}
          </span>
          {hasDiscount && (
            <span className="flex items-center gap-0.5 px-1.5 sm:px-2 py-0.5 rounded bg-rose-600/90 backdrop-blur-md text-[10px] sm:text-[11px] font-black text-white border border-rose-400/40 shadow-md">
              <Percent className="w-2.5 h-2.5" />
              <span>-{discountPercent}%</span>
            </span>
          )}
        </div>

        {/* Optional Rank Badge for Recommended (Polecane) */}
        {rank !== undefined && (
          <div className={`absolute z-10 flex items-center gap-1 rounded-md bg-black/80 backdrop-blur-md font-black text-amber-300 border border-amber-400/30 shadow-md ${
            compactMobile ? 'bottom-2 left-2 px-2 py-0.5 text-[10px] sm:bottom-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[11px]' : 'bottom-3 left-3 px-2.5 py-1 text-[11px]'
          }`}>
            <span>🔥 #{rank}</span>
          </div>
        )}

        {/* Interactive Like Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(product.id);
          }}
          className={`absolute z-20 flex items-center gap-1 rounded-lg font-semibold backdrop-blur-md transition-all active:scale-90 shadow-md cursor-pointer ${
            compactMobile ? 'bottom-2 right-2 px-2 py-1 sm:bottom-3 sm:right-3 sm:px-2.5 sm:py-1.5 text-[11px] sm:text-xs' : 'bottom-3 right-3 px-2.5 py-1.5 text-xs'
          } ${
            isLiked
              ? 'bg-rose-500/95 text-white shadow-rose-500/30 hover:bg-rose-500 scale-105'
              : 'bg-black/65 hover:bg-black/85 text-neutral-300 hover:text-white border border-white/10'
          }`}
          aria-label={isLiked ? `Polubiono. Kliknij, aby usunąć polubienie (${likeCount})` : `Polub ten produkt (${likeCount})`}
          title={isLiked ? 'Usuń z polubionych' : 'Polub ten produkt'}
        >
          <Heart className={`w-3.5 h-3.5 transition-transform ${isLiked ? 'fill-current text-white' : 'text-neutral-400 hover:text-rose-400'}`} />
          <span className="tabular-nums font-mono text-[11px] font-bold">{likeCount}</span>
        </button>
      </div>

      {/* Card Content & Metadata */}
      <div className={`${compactMobile ? 'p-3 sm:p-5 gap-2 sm:gap-3' : 'p-4 sm:p-5 gap-3'} flex-1 flex flex-col justify-between`}>
        <div>
          {/* Brand + subtle unboxed tags */}
          <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
            <span className={`${compactMobile ? 'text-[10px] sm:text-xs' : 'text-xs'} font-bold tracking-wider text-neutral-400 uppercase truncate`}>
              {product.brand}
            </span>
            {product.colorway && (
              <span className={`text-[11px] text-neutral-400 truncate max-w-[140px] ${compactMobile ? 'hidden sm:inline' : 'inline'}`}>
                {product.colorway}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h2 className={`${compactMobile ? 'text-xs sm:text-base line-clamp-2 sm:line-clamp-1' : 'text-base line-clamp-1'} font-semibold text-white group-hover:text-amber-200 transition-colors leading-snug`}>
            {product.name}
          </h2>

          {/* Description snippet if available */}
          {product.description && (
            <p className={`mt-1.5 text-xs text-neutral-400 leading-relaxed ${compactMobile ? 'hidden sm:line-clamp-2' : 'line-clamp-2'}`}>
              {product.description}
            </p>
          )}

          {/* Badges strip */}
          {product.badges && product.badges.length > 0 && (
            <div className={`mt-2.5 flex-wrap items-center gap-1.5 ${compactMobile ? 'hidden sm:flex' : 'flex'}`}>
              {product.badges.map((badge) => {
                let badgeStyle = 'text-neutral-300 bg-white/[0.05] border-white/[0.08]';
                let icon: React.ReactNode = null;

                if (badge === 'Przecena') {
                  badgeStyle = 'text-rose-300 bg-rose-950/40 border-rose-500/30';
                  icon = <Percent className="w-2.5 h-2.5 text-rose-400" />;
                } else if (badge === 'Ukryta perełka') {
                  badgeStyle = 'text-amber-200 bg-amber-950/30 border-amber-500/20';
                  icon = <Sparkles className="w-2.5 h-2.5 text-amber-400" />;
                } else if (badge === 'Do 200 zł') {
                  badgeStyle = 'text-emerald-300 bg-emerald-950/30 border-emerald-500/20';
                } else if (badge === 'Fit check') {
                  badgeStyle = 'text-cyan-200 bg-cyan-950/30 border-cyan-500/20';
                  icon = <Video className="w-2.5 h-2.5 text-cyan-400" />;
                }

                return (
                  <span
                    key={badge}
                    className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded border ${badgeStyle}`}
                  >
                    {icon}
                    <span>{badge}</span>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer: Price & Primary Store Action */}
        <div className={`border-t border-white/[0.06] flex items-center justify-between gap-2 sm:gap-3 mt-auto ${compactMobile ? 'pt-2.5 sm:pt-3' : 'pt-3'}`}>
          <div className="min-w-0">
            <div className={`flex items-center gap-1.5 ${compactMobile ? 'hidden sm:flex' : 'flex'}`}>
              <span className="text-[10px] text-neutral-400 block leading-tight">Cena</span>
              {hasDiscount && (
                <span className="text-[10px] font-bold text-rose-400 font-mono tracking-tight">
                  PROMO
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-baseline gap-x-1.5 sm:gap-x-2">
              <span className={`${compactMobile ? 'text-sm sm:text-lg' : 'text-lg'} font-bold text-white tabular-nums tracking-tight`}>
                {product.price} zł
              </span>
              {hasDiscount && product.originalPrice && (
                <span className="text-[11px] sm:text-xs text-neutral-500 line-through tabular-nums font-mono">
                  {product.originalPrice} zł
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenStore}
            className={`text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0 active:scale-95 shadow-sm cursor-pointer ${
              compactMobile ? 'min-h-[36px] min-w-[36px] px-2.5 py-1.5 sm:px-3.5 sm:py-2' : 'px-3.5 py-2'
            }`}
            title={`Przejdź do sklepu dla produktu ${product.name}`}
            aria-label={`Zobacz w sklepie: ${product.name}`}
          >
            <span className={compactMobile ? 'hidden sm:inline' : 'inline'}>Zobacz w sklepie</span>
            <ExternalLink className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>
    </article>
  );
};
