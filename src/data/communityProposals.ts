import { CommunityProposal } from '../types/product';

// Pusta baza początkowa - tylko propozycje dodane przez użytkowników strony
export const INITIAL_PROPOSALS: CommunityProposal[] = [];

const STORAGE_KEY = 'swag_community_proposals_v2';
const LIKES_KEY = 'swag_community_proposal_user_likes_v2';

export function getStoredProposals(): CommunityProposal[] {
  try {
    // Usunięcie starych propozycji testowych
    localStorage.removeItem('swag_community_proposals_v1');
    localStorage.removeItem('swag_community_proposal_user_likes_v1');

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Dodatkowy filtr na wypadek gdyby stare ID znalazły się w pamięci
    const filtered = parsed.filter(
      (p: CommunityProposal) => p.id !== 'prop-01' && p.id !== 'prop-02' && p.id !== 'prop-03'
    );
    return filtered;
  } catch (e) {
    console.error('Error reading proposals from localStorage', e);
    return [];
  }
}

export function saveStoredProposals(proposals: CommunityProposal[]): void {
  try {
    const filtered = proposals.filter(
      (p) => p.id !== 'prop-01' && p.id !== 'prop-02' && p.id !== 'prop-03'
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error saving proposals to localStorage', e);
  }
}

export function getUserProposalLikes(): Set<string> {
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch (e) {
    console.error('Error reading proposal likes from localStorage', e);
    return new Set();
  }
}

export function saveUserProposalLikes(likes: Set<string>): void {
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify(Array.from(likes)));
  } catch (e) {
    console.error('Error saving proposal likes to localStorage', e);
  }
}
