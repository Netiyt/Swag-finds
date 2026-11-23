export type Category =
  | 'Spodnie'
  | 'Koszulki'
  | "Longsleeve'y"
  | 'Bluzy'
  | 'Swetry'
  | 'Kurtki'
  | 'Biżuteria'
  | 'Akcesoria';

export type ProductBadge =
  | 'Przecena'
  | 'Ukryta perełka'
  | 'Do 200 zł'
  | 'Fit check';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number; // w złotych (PLN)
  originalPrice?: number; // Dawna cena regularna w PLN przed przeceną (np. compare_at_price)
  storeUrl: string;
  imageUrl: string;
  images?: string[]; // Dodatkowe oficjalne zdjęcia produktu do galerii i trybu pełnoekranowego
  sizes?: string[];
  videoUrl?: string; // Link lub oficjalny embed do TikToka / wideo prezentującego fit
  badges?: ProductBadge[];
  description?: string; // Informacja o kroju (np. boxy fit, heavy cotton 380g, baggy leg)
  colorway?: string;
  imagePosition?: string; // Opcjonalne pozycjonowanie w ramce (np. 'center bottom' lub 'top')
}

export type SortOption =
  | 'featured'
  | 'likes-desc'
  | 'discount-desc'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc';

export interface CommunityProposal {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price?: number;
  storeUrl: string;
  imageUrl: string;
  videoUrl?: string; // e.g. TikTok fit check
  description: string;
  author: string; // e.g. "@mateusz_fits"
  submittedAt: string;
  likes: number;
  isUserSubmission?: boolean;
}
