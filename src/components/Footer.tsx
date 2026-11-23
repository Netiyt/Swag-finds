import React, { useState } from 'react';
import { Mail, ShieldCheck, FileText, Lock, Sparkles, ExternalLink, Copy, Check, Heart, Compass, Users, Percent } from 'lucide-react';
import { LegalTab } from './LegalModal';
import { CategoryFilter } from '../data/products';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
  onOpenGuide: () => void;
  onSelectCategory: (category: CategoryFilter) => void;
  onFilterFitCheck: () => void;
  totalProducts: number;
  proposalsCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onOpenGuide,
  onSelectCategory,
  onFilterFitCheck,
  totalProducts,
  proposalsCount,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('biznessneti@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#08090d] text-neutral-400 text-xs pb-20 md:pb-0">
      {/* Top Banner / Contact Highlight Bar */}
      <div className="border-b border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-bold block text-sm">
                  Współpraca biznesowa, dodanie marki lub kontakt
                </span>
                <span className="text-neutral-400 text-xs">
                  Masz markę streetwearową lub pytania prawne? Napisz do nas bezpośrednio.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="mailto:biznessneti@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all active:scale-95 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="font-mono">biznessneti@gmail.com</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-2.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-neutral-300 border border-white/[0.08] transition-all flex items-center gap-1.5 cursor-pointer"
                title="Kopiuj adres e-mail"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Skopiowano</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Kopiuj</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-white/[0.06]">
          
          {/* Column 1: Brand & Editorial Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-white to-neutral-400 text-black flex items-center justify-center font-black text-xs font-display">
                SF
              </span>
              <span className="font-display font-extrabold text-base tracking-tight text-white leading-none">
                SWAG <span className="text-neutral-400 font-light">FINDS</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Niezależny internetowy katalog mody ulicznej i undergroundowych dropów.
              Wyszukujemy, weryfikujemy kroje i linkujemy bezpośrednio do oficjalnych sklepów twórców.
            </p>

            <div className="pt-2 text-[11px] text-neutral-500 leading-relaxed max-w-sm">
              Serwis ma charakter wyłącznie informacyjno-katalogowy. Zakupy odbywają się bezpośrednio u zewnętrznych partnerów i producentów.
            </div>
          </div>

          {/* Column 2: Nawigacja & Odkrywanie (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Nawigacja po katalogu
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Wszystkie')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Kolekcja dropów ({totalProducts})</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Polecane')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Ranking Polecane</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Promocje')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-rose-300 hover:text-rose-200"
                >
                  <Percent className="w-3.5 h-3.5 text-rose-400" />
                  <span>Strefa Promocji</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Wasze propozycje')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-emerald-300 hover:text-emerald-200"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Wasze propozycje ({proposalsCount})</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onFilterFitCheck}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Wideo Fit Check (TikTok)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-neutral-400 hover:text-white"
                >
                  <span>Struktura bazy produktów</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Zgodność prawna & Bezpieczeństwo (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Informacje prawne &amp; Regulamin</span>
            </h3>
            
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-neutral-300 hover:underline"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Nota prawna (Brak pośrednictwa handlowego)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-neutral-300 hover:underline"
                >
                  <Lock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Polityka prywatności &amp; Pliki Cookies (RODO)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-neutral-300 hover:underline"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Regulamin serwisu &amp; Zasady dodawania propozycji</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-neutral-300 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Kontakt i zgłoszenia naruszeń (DMCA / IP)</span>
                </button>
              </li>
            </ul>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[11px] text-neutral-400 leading-normal">
              Wszelkie znaki towarowe i nazwy marek należą do ich właścicieli i zostały użyte wyłącznie w celach informacyjno-prezentacyjnych.
            </div>
          </div>

        </div>

        {/* Bottom copyright & legal disclaimer summary */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Swag Finds. Wszystkie prawa zastrzeżone.</p>

          <p className="text-center md:text-right">
            Kontakt: <a href="mailto:biznessneti@gmail.com" className="text-neutral-400 hover:text-white underline font-mono">biznessneti@gmail.com</a> · Materiały wideo i zdjęcia pochodzą z oficjalnych osadzeń sklepów i twórców.
          </p>
        </div>
      </div>
    </footer>
  );
};
