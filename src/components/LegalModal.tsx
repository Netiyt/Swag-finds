import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, Mail, ExternalLink, Check, Copy } from 'lucide-react';

export type LegalTab = 'terms' | 'privacy' | 'disclaimer' | 'contact';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'disclaimer',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('biznessneti@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#12131b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Informacje prawne &amp; Regulamin
              </h2>
              <p className="text-xs text-neutral-400">
                Swag Finds – niezależny katalog streetwearu
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-white/[0.06] bg-black/20 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('disclaimer')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'disclaimer'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Nota prawna (Disclaimer)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Polityka prywatności &amp; RODO</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Regulamin serwisu</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Kontakt</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm text-neutral-300 leading-relaxed">
          {/* TAB: DISCLAIMER / NOTA PRAWNA */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>1. Charakter serwisu i brak pośrednictwa handlowego</span>
              </h3>
              <p>
                Serwis <strong>Swag Finds</strong> jest wyłącznie niezależną platformą informacyjną, redakcyjną oraz katalogiem selekcjonującym ubrania i akcesoria mody ulicznej (streetwear).
              </p>
              <p>
                <strong>Swag Finds nie jest sklepem internetowym, sprzedawcą ani stroną umowy sprzedaży.</strong> Wszelkie zakupy dokonywane są bezpośrednio na zewnętrznych stronach internetowych oficjalnych producentów, marek lub dystrybutorów, do których prowadzą odnośniki.
              </p>

              <h3 className="text-base font-bold text-white pt-2">
                2. Prawa autorskie i znaki towarowe
              </h3>
              <p>
                Wszystkie znaki towarowe, logotypy marek (np. FLAVA, BEZZNACZKA, ENRAGE, COLD CULTURE, 2005 i inne), nazwy handlowe, zdjęcia produktów oraz materiały wideo prezentujące ubrania stanowią wyłączną własność ich prawnych właścicieli.
              </p>
              <p>
                Materiały te zostały wykorzystane wyłącznie w celach informacyjnych, referencyjnych i recenzenckich (zgodnie z przepisami o dozwolonym użytku). Materiały wideo pochodzą z publicznych osadzeń i linków platform społecznościowych (w tym TikTok) udostępnionych przez twórców.
              </p>

              <h3 className="text-base font-bold text-white pt-2">
                3. Wyłączenie odpowiedzialności za ceny i dostępność
              </h3>
              <p>
                Ceny, stany magazynowe oraz specyfikacje produktów podawane w serwisie mają charakter wyłącznie orientacyjny. Ostateczna cena, warunki zakupu, koszty wysyłki oraz realizacja zamówienia regulowane są przez sklep docelowy w momencie składania zamówienia przez użytkownika.
              </p>
            </div>
          )}

          {/* TAB: PRIVACY / RODO & COOKIES */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">
                1. Informacje ogólne i Administrator Danych
              </h3>
              <p>
                Szanujemy Twoją prywatność. Administratorem serwisu Swag Finds jest właściciel projektu, z którym można skontaktować się pod adresem e-mail: <strong className="text-white font-mono">biznessneti@gmail.com</strong>.
              </p>

              <h3 className="text-base font-bold text-white pt-2">
                2. Pamięć lokalna przeglądarki (localStorage)
              </h3>
              <p>
                Serwis <strong>nie wymaga zakładania konta</strong> ani podawania danych osobowych do podstawowego przeglądania katalogu.
              </p>
              <p>
                Do prawidłowego działania funkcji interaktywnych – takich jak zapisywanie polubień (serduszek) oraz zapisywanie własnych zgłoszeń w zakładce „Wasze propozycje” – serwis korzysta z pamięci lokalnej Twojej przeglądarki (tzw. <code>localStorage</code>). Dane te pozostają na Twoim urządzeniu i nie są przekazywane podmiotom trzecim.
              </p>

              <h3 className="text-base font-bold text-white pt-2">
                3. Pliki zewnętrzne i odnośniki
              </h3>
              <p>
                Strona zawiera linki do serwisów zewnętrznych (sklepy marek odzieżowych, platforma TikTok). Kliknięcie odnośnika przenosi użytkownika do zewnętrznego serwisu podlegającego odrębnej polityce prywatności danego operatora.
              </p>
            </div>
          )}

          {/* TAB: TERMS / REGULAMIN */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">
                1. Postanowienia wstępne
              </h3>
              <p>
                Korzystanie z serwisu Swag Finds oznacza akceptację niniejszego regulaminu. Dostęp do katalogu oraz przeglądanie zawartości jest bezpłatne.
              </p>

              <h3 className="text-base font-bold text-white pt-2">
                2. Zasady dodawania propozycji w zakładce „Wasze propozycje”
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                <li>Użytkownik zobowiązuje się do zgłaszania wyłącznie legalnych produktów, marek i autentycznych linków do sklepów.</li>
                <li>Zabronione jest dodawanie treści o charakterze obraźliwym, wulgarnym, nielegalnym, promującym podróbki lub naruszającym prawa osób trzecich.</li>
                <li>Administrator zastrzega sobie prawo do weryfikacji i usuwania propozycji naruszających regulamin.</li>
              </ul>

              <h3 className="text-base font-bold text-white pt-2">
                3. Reklamacje i zwroty zakupionych ubrań
              </h3>
              <p>
                Z uwagi na to, że Swag Finds nie prowadzi sprzedaży ubrań, wszelkie pytania dotyczące zamówień, reklamacji, zwrotów, gwarancji czy czasu doręczenia należy kierować bezpośrednio do sklepu, w którym dokonano zakupu.
              </p>
            </div>
          )}

          {/* TAB: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">
                Kontakt z administratorem serwisu
              </h3>
              <p>
                W sprawach współpracy biznesowej, zgłaszania marek do katalogu, propozycji partnerskich lub zgłoszeń dotyczących praw autorskich (Notice &amp; Takedown) prosimy o kontakt pod adresem:
              </p>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                      Oficjalny adres e-mail
                    </span>
                    <a
                      href="mailto:biznessneti@gmail.com"
                      className="text-base font-bold text-white hover:text-emerald-300 transition-colors font-mono"
                    >
                      biznessneti@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-neutral-200 border border-white/[0.1] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Skopiowano</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Kopiuj e-mail</span>
                      </>
                    )}
                  </button>

                  <a
                    href="mailto:biznessneti@gmail.com"
                    className="px-4 py-2 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Napisz wiadomość</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-200/90 leading-relaxed">
                <strong>Zgłoszenia dotyczące treści lub praw autorskich:</strong> Jeśli jesteś właścicielem marki lub materiału i chcesz zaktualizować dane produktu, wymienić zdjęcie lub usunąć pozycję z katalogu, napisz na powyższy adres z tematem „Prawa autorskie / Aktualizacja marki”. Odpowiadamy sprawnie.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between shrink-0 text-xs text-neutral-400">
          <span>Swag Finds © {new Date().getFullYear()}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
