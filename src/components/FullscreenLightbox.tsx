import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ExternalLink, ZoomIn, ZoomOut, Image as ImageIcon } from 'lucide-react';

interface FullscreenLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  productName: string;
  brand: string;
  storeUrl: string;
}

export const FullscreenLightbox: React.FC<FullscreenLightboxProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  productName,
  brand,
  storeUrl,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Sync index when opening or when initialIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, images.length, handleNext, handlePrev, onClose]);

  // Mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50 && images.length > 1) {
      handleNext();
    } else if (diff < -50 && images.length > 1) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        e.stopPropagation();
        // If user clicks on the backdrop container itself, close
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[9999] bg-[#07080c]/98 backdrop-blur-2xl flex flex-col justify-between select-none animate-in fade-in duration-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/[0.08] bg-[#0c0d14]/80 backdrop-blur-md z-20 shrink-0"
      >
        <div className="flex flex-col min-w-0 pr-4">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold truncate">
            {brand} · Zdjęcie {currentIndex + 1} z {images.length}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
            {productName}
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-neutral-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-lg border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            title={isZoomed ? 'Oddal' : 'Powiększ (Zoom)'}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4 text-amber-300" /> : <ZoomIn className="w-4 h-4" />}
            <span className="hidden sm:inline">{isZoomed ? 'Dopasuj' : 'Zoom'}</span>
          </button>

          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-2 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="hidden sm:inline">Przejdź do sklepu</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-300 hover:text-white bg-white/[0.08] hover:bg-white/[0.16] rounded-lg border border-white/10 transition-colors cursor-pointer"
            title="Zamknij pełny ekran (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Image Stage */}
      <div 
        className="relative flex-1 flex items-center justify-center p-3 sm:p-8 overflow-hidden cursor-pointer"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Previous Image Arrow */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-8 z-30 p-3 sm:p-4 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-md cursor-pointer"
            title="Poprzednie zdjęcie (Strzałka w lewo)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Current Image */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(!isZoomed);
          }}
          className={`relative max-w-full max-h-[76vh] flex items-center justify-center transition-transform duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          <img
            src={currentImage}
            alt={`${productName} - pełny ekran`}
            className="max-h-[76vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-xl shadow-2xl transition-all"
            referrerPolicy={currentImage.startsWith('http') ? 'no-referrer' : undefined}
            decoding="async"
            onError={(e) => {
              const el = e.currentTarget;
              if (images[0] && el.src !== images[0] && !el.src.endsWith(images[0])) {
                el.src = images[0];
              }
            }}
          />
        </div>

        {/* Next Image Arrow */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-8 z-30 p-3 sm:p-4 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-md cursor-pointer"
            title="Następne zdjęcie (Strzałka w prawo)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full px-4 sm:px-8 py-3 border-t border-white/[0.08] bg-[#0c0d14]/85 backdrop-blur-md z-20 shrink-0"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-none">
            {images.map((img, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-white ring-2 ring-white/30 scale-105'
                      : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/40'
                  }`}
                  title={`Przejdź do zdjęcia ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`Miniaturka ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy={img.startsWith('http') ? 'no-referrer' : undefined}
                    decoding="async"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (images[0] && el.src !== images[0] && !el.src.endsWith(images[0])) {
                        el.src = images[0];
                      }
                    }}
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-white/10 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 shrink-0">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Nawigacja: ← / → lub Esc</span>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
