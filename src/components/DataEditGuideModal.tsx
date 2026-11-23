import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Sparkles, Video, HelpCircle } from 'lucide-react';

interface DataEditGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataEditGuideModal: React.FC<DataEditGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const exampleSnippet = `// Plik: src/data/products.ts
{
  id: 'prod-01',
  name: 'Twoja Nazwa Produktu',
  brand: 'NAZWA MARKI',
  category: 'Bluzy', // 'Spodnie' | 'Koszulki' | "Longsleeve'y" | 'Bluzy' | 'Swetry' | 'Kurtki' | 'Biżuteria' | 'Akcesoria'
  price: 189, // Liczba w złotówkach (PLN)
  storeUrl: 'https://oryginalnysklep.pl/produkt',
  imageUrl: 'https://twoje-zdjecie.pl/foto.jpg',
  sizes: ['S', 'M', 'L', 'XL'], // Opcjonalne dostępne rozmiary
  videoUrl: 'https://www.tiktok.com/@profil/video/123456789', // Opcjonalny film do sekcji "Zobacz, jak leży"
  badges: ['Ukryta perełka', 'Fit check'], // Opcjonalne: 'Ukryta perełka' | 'Do 200 zł' | 'Fit check'
  description: 'Opis kroju: boxy fit, gruba bawełna 400g, ściągacze vintage.',
  colorway: 'Washed Black'
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exampleSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#111219] border border-white/[0.12] rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 my-auto text-left"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Instrukcja: Jak edytować i dodawać produkty
              </h2>
              <p className="text-xs text-neutral-400">
                Wszystkie dane ubrań znajdują się w jednym, przejrzystym pliku
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <p>
            Wszystkie produkty w katalogu są zdefiniowane w pliku{' '}
            <code className="text-amber-300 bg-black/50 px-2 py-0.5 rounded font-mono text-xs border border-white/10">
              src/data/products.ts
            </code>
            . Znajduje się tam obecnie <strong>13 w 100% autentycznych ubrań</strong> z bezpośrednimi linkami do sklepów i filmów Fit Check na TikToku.
          </p>

          <div className="bg-[#090a0f] p-4 rounded-xl border border-white/[0.08] space-y-3 font-mono text-xs text-neutral-300">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <span className="text-neutral-400 text-[11px]">Wzór pojedynczego rekordu produktu:</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded bg-white/[0.08] hover:bg-white/[0.15] text-white transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Skopiowano!' : 'Kopiuj wzór'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-[11px] leading-relaxed text-neutral-200">
              {exampleSnippet}
            </pre>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Zasady oznaczeń (Badges):
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-400">
              <li><strong className="text-neutral-200">„Do 200 zł”</strong> – dodawaj tylko, gdy cena wynosi maksymalnie 200 zł.</li>
              <li><strong className="text-neutral-200">„Fit check”</strong> – dodawaj, gdy uzupełniasz pole <code className="text-neutral-300">videoUrl</code>.</li>
              <li><strong className="text-neutral-200">„Ukryta perełka”</strong> – dla unikalnych krojów i niszowych marek.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-400" />
              Sekcja „Zobacz, jak leży”:
            </h3>
            <p className="text-xs text-neutral-400">
              Gdy uzupełnisz <code className="text-neutral-300">videoUrl</code> (np. link do TikToka), w szczegółach produktu pojawi się dedykowany moduł prezentujący ubranie na człowieku. Jeśli pole jest puste lub pominięte, sekcja jest <strong>automatycznie ukrywana</strong> bez pustych miejsc.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            Rozumiem, przejdź do katalogu
          </button>
        </div>
      </div>
    </div>
  );
};
