import { Product } from '../types/product';

/**
 * ============================================================================
 * PLIK Z DANYMI PRODUKTÓW (KATALOG)
 * ============================================================================
 * Każdy produkt zawiera:
 * - id: unikalny identyfikator
 * - name: nazwa produktu
 * - brand: nazwa marki
 * - category: jedna z kategorii ('Spodnie' | 'Koszulki' | "Longsleeve'y" | 'Bluzy' | 'Swetry' | 'Kurtki' | 'Biżuteria' | 'Akcesoria')
 * - price: cena w złotówkach (PLN)
 * - storeUrl: link do oficjalnego sklepu
 * - imageUrl: główne zdjęcie produktu
 * - images: galeria wszystkich oficjalnych zdjęć ze sklepu (do podglądu i pełnego ekranu)
 * - sizes: tablica dostępnych rozmiarów
 * - videoUrl: opcjonalny link do filmu (np. TikTok / fit check)
 * - badges: opcjonalne oznaczenia: 'Ukryta perełka' | 'Do 200 zł' | 'Fit check'
 * - description: krótki opis kroju / materiału
 */

export const PRODUCTS: Product[] = [
  // 1. Longsleeve Rage Born Studio
  {
    id: 'prod-rageborn-01',
    name: 'Longsleeve Black Distorted Logo Print',
    brand: 'RAGE BORN STUDIO',
    category: "Longsleeve'y",
    price: 159,
    storeUrl: 'https://ragebornstudio.com/pl/products/longsleeve-black-distorted-logo-print-kopia?variant=54758606569818',
    imageUrl: '/assets/images/rageborn_official.jpg',
    images: [
      '/assets/images/rageborn_official.jpg',
      'https://cdn.shopify.com/s/files/1/0997/4785/6730/files/CHINESE_BLACK_EYELETS.jpg?v=1789010373&width=1200',
      'https://cdn.shopify.com/s/files/1/0997/4785/6730/files/CHINESE_BLACK_STUDS.jpg?v=1789010373&width=1200',
      'https://cdn.shopify.com/s/files/1/0997/4785/6730/files/CHINESE_BLACK_DOUBLE_EYELETS.jpg?v=1789010373&width=1200'
    ],
    sizes: ['S', 'M', 'L'],
    badges: ['Ukryta perełka', 'Do 200 zł'],
    description: 'Nietuzinkowy krój z efektownymi podwójnymi rękawkami (double-layer effect) oraz charakterystycznym, zniekształconym nadrukiem logo distorted na klatce piersiowej.',
    colorway: 'Washed Black',
  },

  // 2. Spodnie camo Flava
  {
    id: 'prod-flava-02',
    name: 'Combat Zip Camo Pants 2in1',
    brand: 'FLAVA',
    category: 'Spodnie',
    price: 299,
    storeUrl: 'https://www.flavamadeit.com/products/combat-zipped-cargo-pants',
    videoUrl: 'https://vm.tiktok.com/ZN8U51tfR/',
    imageUrl: '/assets/images/flava_camo_front_seamless_zoomed.jpg',
    images: [
      '/assets/images/flava_camo_front_seamless_zoomed.jpg',
      '/assets/images/flava_combat_pants_seamless_zoomed.jpg',
      '/assets/images/flava_combat_pants.png',
      'https://cdn.shopify.com/s/files/1/0827/7694/9066/files/dupa.png?v=1763661745&width=1200',
      'https://cdn.shopify.com/s/files/1/0827/7694/9066/files/Bez_nazwy-2.png?v=1763661745&width=1200',
      'https://cdn.shopify.com/s/files/1/0827/7694/9066/files/s.png?v=1763661745&width=1200',
      'https://cdn.shopify.com/s/files/1/0827/7694/9066/files/prod-12.jpg?v=1763661745&width=1200',
      'https://cdn.shopify.com/s/files/1/0827/7694/9066/files/prod-11.jpg?v=1763661745&width=1200'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badges: ['Fit check', 'Ukryta perełka'],
    description: 'Bojówki camo w unikalnym systemie 2w1 z zamkami umożliwiającymi odpinanie nogawek, szerokim krojem i praktycznymi kieszeniami cargo.\n\nFit check (TikTok): https://vm.tiktok.com/ZN8U51tfR/',
    colorway: 'Woodland Camo',
  },

  // 3. Bluza hipocrisia
  {
    id: 'prod-hipocrisia-03',
    name: 'Fragile Distressed Hoodie',
    brand: 'HIPOCRISIA',
    category: 'Bluzy',
    price: 389,
    storeUrl: 'https://hipocrisia.com/products/frahile-hoodie',
    imageUrl: '/assets/images/hipocrisia_fragile_hoodie.jpg',
    images: [
      '/assets/images/hipocrisia_fragile_hoodie.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    badges: ['Ukryta perełka'],
    description: 'Ciężka, masywna bluza z kapturem z surowym efektem przetarć materiału (distressing) oraz minimalistycznym nadrukiem na froncie.',
    colorway: 'Washed Black',
  },

  // 4. Bluza bezznaczka
  {
    id: 'prod-bezznaczka-04',
    name: 'Bluza Boxy z Kapturem Czarna',
    brand: 'BEZZNACZKA',
    category: 'Bluzy',
    price: 309,
    storeUrl: 'https://bezznaczka.store/bluza-boxy-czarna',
    videoUrl: 'https://vm.tiktok.com/ZN8U5LXnF/',
    imageUrl: '/assets/images/bezznaczka_boxy_hoodie.jpg',
    images: [
      '/assets/images/bezznaczka_boxy_hoodie.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['Fit check', 'Ukryta perełka'],
    description: 'Krój boxy fit o skróconej długości z szerokimi, obniżonymi ramionami i głębokim kapturem bez sznurków. Czysta forma bez logotypów.\n\nFit check (TikTok): https://vm.tiktok.com/ZN8U5LXnF/',
    colorway: 'Deep Black',
  },

  // 5. Long sleeve each can hear
  {
    id: 'prod-eachcanhear-05',
    name: 'Printed Techno Longsleeve SS/26',
    brand: 'EACH CAN HEAR',
    category: "Longsleeve'y",
    price: 169,
    storeUrl: 'https://eachcanhear.com/products/printed-techno-longsleeve-ss-27?variant=54144516358483',
    imageUrl: '/assets/images/eachcanhear_longsleeve.jpg',
    images: [
      '/assets/images/eachcanhear_longsleeve.jpg',
      'https://cdn.shopify.com/s/files/1/0970/9053/5763/files/532215A5-7C9D-4510-9C48-8DFEA289FEFF.jpg?v=1782818639&width=1200',
      'https://cdn.shopify.com/s/files/1/0970/9053/5763/files/855E5650-5F72-4433-A34D-64C7ED572BDF.jpg?v=1782818722&width=1200',
      'https://cdn.shopify.com/s/files/1/0970/9053/5763/files/1D712748-8D9F-4F25-B04C-F07F09EAD92A.jpg?v=1782818722&width=1200',
      'https://cdn.shopify.com/s/files/1/0970/9053/5763/files/347CAD58-B6B3-4302-B2AC-99F4C896B090.jpg?v=1782818722&width=1200',
      'https://cdn.shopify.com/s/files/1/0970/9053/5763/files/447DB5AA-BEF5-471B-8F64-BA5AC024B4FB.jpg?v=1782818780&width=1200'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['Do 200 zł', 'Ukryta perełka'],
    description: 'Autorski longsleeve w stylistyce techno i industrialu, z surowym printem graficznym z kolekcji SS/26 i luźnym krojem.',
    colorway: 'Washed Charcoal',
  },

  // 6. Koszulka each can hear
  {
    id: 'prod-eachcanhear-06',
    name: '+ T-Shirt SS/26',
    brand: 'EACH CAN HEAR',
    category: 'Koszulki',
    price: 135,
    storeUrl: 'https://eachcanhear.com/products/tshirt-ss-26?variant=54143124504915',
    imageUrl: '/assets/images/eachcanhear_tshirt.jpg',
    images: [
      '/assets/images/eachcanhear_tshirt.jpg',
      'https://cdn.shopify.com/s/files/1/0970/9053/5763/files/27AA6467-F7FD-4E28-8959-916D88843D99.jpg?v=1782818473&width=1200',
      'https://cdn.shopify.com/s/files/1/0970/9053/5763/files/D19C19E1-F454-43AB-8EB1-0FBCC16018EF.jpg?v=1782818578&width=1200',
      'https://cdn.shopify.com/s/files/1/0970/9053/5763/files/978A196D-0F7F-4ADD-B362-7B5AC52EC877.jpg?v=1782818578&width=1200',
      'https://cdn.shopify.com/s/files/1/0970/9053/5763/files/23F67CA1-67AE-4E07-A280-1A7F8DBDF9F8.jpg?v=1782818638&width=1200'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['Do 200 zł'],
    description: 'Pudełkowy T-shirt z ciężkiej bawełny z kolekcji SS/26, z minimalistycznym nadrukiem i surowym chwytem.',
    colorway: 'Vintage Black',
  },

  // 7. Kurtka enrage tik tok ulubione
  {
    id: 'prod-enrage-07',
    name: 'Puffy Jacket Black',
    brand: 'ENRAGE',
    category: 'Kurtki',
    price: 899,
    storeUrl: 'https://enrage.pl/pl/products/puffy-jacket-black-1',
    imageUrl: '/assets/aistudio/enrage_puffy_jacket_v2_4x3.png',
    images: [
      '/assets/aistudio/enrage_puffy_jacket_v2_4x3.png',
      '/assets/aistudio/image_4a73a21c.png',
      '/assets/images/enrage_puffy_jacket.jpg',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/puffyblackfront.jpg?v=1787226309&width=1200',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/puffyblackpoza.jpg?v=1787226311&width=1200',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/puffyblacktyl.jpg?v=1787226309&width=1200',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/puffyblackopen.jpg?v=1787226309&width=1200',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/puffy_black_detal2.jpg?v=1787472494&width=1200',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/puffy_black_detal.jpg?v=1787472534&width=1200'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    videoUrl: 'https://vm.tiktok.com/ZN8U5jKFw/',
    badges: ['Fit check', 'Ukryta perełka'],
    description: 'Viralowa kurtka puchowa uwielbiana na TikToku. Wyrazisty krój puffer, wysoki kołnierz chroniący przed chłodem i głęboka matowa czerń.\n\nFit check (TikTok): https://vm.tiktok.com/ZN8U5jKFw/',
    colorway: 'Matte Black',
  },

  // 8. Kurtka cold culture
  {
    id: 'prod-coldculture-08',
    name: 'Cloud Armor Puffer Black',
    brand: 'COLD CULTURE',
    category: 'Kurtki',
    price: 559,
    storeUrl: 'https://coldcultureworldwide.com/en/products/cloud-armor-puffer-black',
    videoUrl: 'https://vm.tiktok.com/ZN8U5e129/',
    imageUrl: '/assets/images/coldculture_cloud_armor_zoomed.jpg',
    images: [
      '/assets/images/coldculture_cloud_armor_zoomed.jpg',
      '/assets/images/coldculture_cloud_armor.jpg',
      'https://cdn.shopify.com/s/files/1/0039/1839/7529/files/cloud-armor-puffer-black-3038372.jpg?v=1790394508&width=1200',
      'https://cdn.shopify.com/s/files/1/0039/1839/7529/files/cloud-armor-puffer-black-9785073.jpg?v=1790313502&width=1200',
      'https://cdn.shopify.com/s/files/1/0039/1839/7529/files/cloud-armor-puffer-black-2068702.jpg?v=1790394508&width=1200',
      'https://cdn.shopify.com/s/files/1/0039/1839/7529/files/cloud-armor-puffer-black-5449258.jpg?v=1790394508&width=1200',
      'https://cdn.shopify.com/s/files/1/0039/1839/7529/files/cloud-armor-puffer-black-2458514.jpg?v=1790394508&width=1200',
      'https://cdn.shopify.com/s/files/1/0039/1839/7529/files/cloud-armor-puffer-black-5902620.jpg?v=1790394508&width=1200',
      'https://cdn.shopify.com/s/files/1/0039/1839/7529/files/cloud-armor-puffer-black-4732956.jpg?v=1790394508&width=1200'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badges: ['Fit check', 'Ukryta perełka'],
    description: 'Nowoczesna kurtka puchowa z geometryczną strukturą pikowania i podwyższonym kołnierzem od madryckiej marki Cold Culture.\n\nFit check (TikTok): https://vm.tiktok.com/ZN8U5e129/',
    colorway: 'Jet Black',
  },

  // 9. Dresy czarne 2005
  {
    id: 'prod-2005-09',
    name: 'Pull Sweatpants - Black',
    brand: '2005',
    category: 'Spodnie',
    price: 289,
    storeUrl: 'https://2005.global/pl/products/pull-sweatpants-black',
    imageUrl: '/assets/images/2005_pull_sweatpants_black_zoomed.jpg',
    images: [
      '/assets/images/2005_pull_sweatpants_black_zoomed.jpg',
      'https://cdn.shopify.com/s/files/1/0950/7500/8851/files/260925_2005_ecom8427.jpg?v=1790844745&width=1200',
      'https://cdn.shopify.com/s/files/1/0950/7500/8851/files/260925_2005_ecom8434.jpg?v=1790844747&width=1200',
      'https://cdn.shopify.com/s/files/1/0950/7500/8851/files/260925_2005_ecom8437.jpg?v=1790844797&width=1200',
      'https://cdn.shopify.com/s/files/1/0950/7500/8851/files/260925_2005_ecom8004.jpg?v=1790844862&width=1200'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['Ukryta perełka'],
    description: 'Czarne spodnie dresowe z regulacją w pasie, swobodnym krojem i charakterystycznym, minimalistycznym brandingiem 2005.',
    colorway: 'Black',
  },

  // 10. Ultra Baggy Sweatpants - Heather Grey 2005
  {
    id: 'prod-2005-10',
    name: 'Ultra Baggy Sweatpants - Heather Grey',
    brand: '2005',
    category: 'Spodnie',
    price: 279,
    storeUrl: 'https://2005.global/products/uniform-baggy-sweatpants-heather-grey-1',
    imageUrl: '/assets/aistudio/2005_baggy_sweatpants_grey_perfect.png',
    imagePosition: 'center',
    images: [
      '/assets/aistudio/2005_baggy_sweatpants_grey_perfect.png',
      '/assets/aistudio/image_92ef951b.png',
      'https://cdn.shopify.com/s/files/1/0950/7500/8851/files/260813_2005_Ecom_3_2311.jpg?v=1787212486&width=1200',
      'https://cdn.shopify.com/s/files/1/0950/7500/8851/files/260813_2005_Ecom_3_2318.jpg?v=1787212488&width=1200',
      'https://cdn.shopify.com/s/files/1/0950/7500/8851/files/260813_2005_Ecom_3_0904_fcb464a2-1d2a-4ac9-a146-c3e6a9daff31.jpg?v=1787212490&width=1200',
      'https://cdn.shopify.com/s/files/1/0950/7500/8851/files/260813_2005_Ecom_3_0903.jpg?v=1787212492&width=1200'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['Ukryta perełka'],
    description: 'Kultowe spodnie dresowe o kroju ultra baggy w kolorze melanżowej szarości. Ciężka bawełna, szeroka nogawka opadająca na buty.',
    colorway: 'Heather Grey',
  },

  // 11. Jersey Koelskye
  {
    id: 'prod-koelskye-11',
    name: 'Jaguar Football Jersey',
    brand: 'KOELSKYE',
    category: 'Koszulki',
    price: 279,
    storeUrl: 'https://koelskye.com/products/jaguar-football-jersey',
    imageUrl: '/assets/images/koelskye_jaguar_jersey.jpg',
    images: [
      '/assets/images/koelskye_jaguar_jersey.jpg',
      'https://cdn.shopify.com/s/files/1/0755/3735/0987/files/FINALbackjaguar.jpg?v=1783424332&width=1200',
      'https://cdn.shopify.com/s/files/1/0755/3735/0987/files/SESJA_tiger.jpg?v=1783424344&width=1200'
    ],
    sizes: ['S', 'M', 'L'],
    badges: ['Ukryta perełka'],
    description: 'Streetwearowy jersey piłkarski z dynamiczną grafiką jaguara, oddychającą techniczną siatką sportową i luźnym krojem.',
    colorway: 'Black / Green',
  },

  // 12. Longsleeve The One Hundred
  {
    id: 'prod-onehundred-12',
    name: 'Longsleeve Waffle Black',
    brand: 'THE ONE HUNDRED',
    category: "Longsleeve'y",
    price: 219,
    storeUrl: 'https://theonehundred.pl/products/longsleeve-waffle-black',
    imageUrl: '/assets/images/theonehundred_waffle_black.jpg',
    images: [
      '/assets/images/theonehundred_waffle_black.jpg',
      'https://cdn.shopify.com/s/files/1/0968/0148/9160/files/got2_waffle-black_1_kopia.jpg?v=1782804908&width=1200',
      'https://cdn.shopify.com/s/files/1/0968/0148/9160/files/got2_waffle-black_1.jpg?v=1782804907&width=1200',
      'https://cdn.shopify.com/s/files/1/0968/0148/9160/files/got2_waffle-black_2.jpg?v=1782804907&width=1200',
      'https://cdn.shopify.com/s/files/1/0968/0148/9160/files/got2_waffle-black_5.jpg?v=1782804907&width=1200'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['Ukryta perełka'],
    description: 'Mięsisty bawełniany longsleeve o strukturze wafla (waffle knit), wzmocnionym ściągaczu przy dekolcie i swobodnym kroju.',
    colorway: 'Pure Black',
  },

  // 13. Szare dresy Enrage
  {
    id: 'prod-enrage-13',
    name: 'Bubble Sweatpants - Gray',
    brand: 'ENRAGE',
    category: 'Spodnie',
    price: 299,
    storeUrl: 'https://enrage.pl/pl/products/bubble-sweatpants-gray',
    imageUrl: '/assets/images/enrage_bubble_sweatpants_gray_zoomed.jpg',
    images: [
      '/assets/images/enrage_bubble_sweatpants_gray_zoomed.jpg',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/0005_BubbleFleece_Gray_Man.jpg?v=1779878119&width=1200',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/0004_BubbleFleece_Gray_Woman.jpg?v=1779878118&width=1200',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/Gray_M3.jpg?v=1771251218&width=1200',
      'https://cdn.shopify.com/s/files/1/0764/9381/6153/files/Gray_M2.jpg?v=1771251218&width=1200'
    ],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
    videoUrl: 'https://www.tiktok.com/tag/enrage',
    badges: ['Ukryta perełka', 'Fit check'],
    description: 'Spodnie dresowe z grubego polaru fleece o charakterystycznym zaokrąglonym kroju bubble i szerokich nogawkach ze ściągaczem.',
    colorway: 'Heather Gray',
  },

  // 14. Bluza Archives Zip Hoodie Mind Arcade
  {
    id: 'prod-mindarcade-14',
    name: 'Archives Zip Hoodie',
    brand: 'MIND ARCADE',
    category: 'Bluzy',
    price: 329,
    originalPrice: 350,
    storeUrl: 'https://mindarcade.pl/products/archives-zip-hoodie',
    imageUrl: '/assets/images/mindarcade_archives_zip_hoodie.png',
    images: [
      '/assets/images/mindarcade_archives_zip_hoodie.png',
      '/assets/images/mindarcade_archives_zip_hoodie_back.jpg',
      'https://cdn.shopify.com/s/files/1/0593/8334/9411/files/ARCHIVES_ZIP_HOODIE.png?v=1771861472&width=1200',
      'https://cdn.shopify.com/s/files/1/0593/8334/9411/files/m-2.jpg?v=1771861472&width=1200'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badges: ['Przecena', 'Ukryta perełka'],
    description: 'Ciężka bluza z kapturem na zamek (full zip) z mięsistej bawełny 420 GSM o kroju oversized z opuszczonymi ramionami. Front zdobi postarzana grafika „MA” z motywami heraldycznymi i subtelnym tonalnym nadrukiem, a na rękawach potrójne postarzone pasy.',
    colorway: 'Graphite',
  },

  // 15. Longsleeve Concrete White The One Hundred
  {
    id: 'prod-onehundred-15',
    name: 'Longsleeve Concrete White',
    brand: 'THE ONE HUNDRED',
    category: "Longsleeve'y",
    price: 159,
    storeUrl: 'https://theonehundred.pl/products/longsleeve-concrete-white',
    imageUrl: '/assets/images/theonehundred_concrete_white_1.jpg',
    images: [
      '/assets/images/theonehundred_concrete_white_1.jpg',
      '/assets/images/theonehundred_concrete_white_2.jpg',
      '/assets/images/theonehundred_concrete_white_3.jpg',
      'https://cdn.shopify.com/s/files/1/0968/0148/9160/files/long-bialy-concrete-1.jpg?v=1778766866&width=1200',
      'https://cdn.shopify.com/s/files/1/0968/0148/9160/files/got2-concrete-logn-white_1.jpg?v=1782713990&width=1200',
      'https://cdn.shopify.com/s/files/1/0968/0148/9160/files/got2-concrete-logn-white_3.jpg?v=1782713990&width=1200'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['Do 200 zł', 'Ukryta perełka'],
    description: 'Koszulka z długim rękawem z polskiej dzianiny bawełnianej 275 GSM (100% bawełna). Pudełkowy krój boxy z obniżoną linią ramion oraz wydłużonymi, efektownie rozszerzanymi rękawami. Gładki ściągacz przy dekolcie, wyprodukowano w Polsce.',
    colorway: 'Concrete White',
  },

  // 16. Bluza Flaws Zip Hoodie Black ISEO Customs
  {
    id: 'prod-iseo-16',
    name: 'Flaws zip hoodie black',
    brand: 'ISEO CUSTOMS',
    category: 'Bluzy',
    price: 310,
    originalPrice: 350,
    storeUrl: 'https://iseocustoms.com/products/flaws-zip-hoodie-1',
    imageUrl: '/assets/images/iseo_flaws_zip_hoodie_1.jpg',
    images: [
      '/assets/images/iseo_flaws_zip_hoodie_1.jpg',
      '/assets/images/iseo_flaws_zip_hoodie_2.jpg',
      '/assets/images/iseo_flaws_zip_hoodie_3.jpg',
      'https://cdn.shopify.com/s/files/1/0852/6033/7496/files/IMG-0563.jpg?v=1743266700&width=1200',
      'https://cdn.shopify.com/s/files/1/0852/6033/7496/files/7DB92826-ABD0-4501-A75D-791AE330F193.jpg?v=1743272798&width=1200',
      'https://cdn.shopify.com/s/files/1/0852/6033/7496/files/F00FC080-819F-425B-A16C-2A6FDC41A8D8.jpg?v=1743272797&width=1200'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['Przecena', 'Ukryta perełka'],
    description: 'Bluza z kapturem zapinana na zamek full zip. Masywny, gruby materiał (90% bawełna, 10% poliester) z trwałym nadrukiem DTG z przodu i z tyłu. Model ma 177 cm wzrostu i nosi rozmiar M. Uszyte w Polsce.',
    colorway: 'Washed Black',
  },

  // 17. T-shirt Celebrity Flaws White ISEO Customs
  {
    id: 'prod-iseo-17',
    name: 'Flaws t-shirt white',
    brand: 'ISEO CUSTOMS',
    category: 'Koszulki',
    price: 130,
    originalPrice: 160,
    storeUrl: 'https://iseocustoms.com/products/t-shirt-celebrity-flaws',
    imageUrl: '/assets/images/iseo_celebrity_flaws_tshirt_1.jpg',
    images: [
      '/assets/images/iseo_celebrity_flaws_tshirt_1.jpg',
      '/assets/images/iseo_celebrity_flaws_tshirt_2.jpg',
      '/assets/images/iseo_celebrity_flaws_tshirt_3.jpg',
      'https://cdn.shopify.com/s/files/1/0852/6033/7496/files/56BED752-262F-487D-B565-38F4B50F94F0.jpg?v=1753458840&width=1200',
      'https://cdn.shopify.com/s/files/1/0852/6033/7496/files/6B4AE570-6A4A-46E2-9DD7-6FB6A853E6CE.jpg?v=1753459288&width=1200',
      'https://cdn.shopify.com/s/files/1/0852/6033/7496/files/84B7A473-6149-4A11-A565-116A492FE862.jpg?v=1753459125&width=1200'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['Przecena', 'Do 200 zł', 'Ukryta perełka'],
    description: 'Biały t-shirt z wysokiej jakości, mięsistej bawełny o gramaturze 220 GSM (100% bawełna). Wyrazisty nadruk DTF z motywem Celebrity Flaws, luźny streetwearowy krój. Model ma 177 cm wzrostu i nosi rozmiar M. Wyprodukowane w Polsce.',
    colorway: 'White',
  },

  // 18. Spodenki Omirad Camo Wide-Leg Cargo Shorts (Jorts)
  {
    id: 'prod-omirad-18',
    name: 'Camo Wide-Leg Cargo Shorts (Jorts)',
    brand: 'OMIRAD',
    category: 'Spodnie',
    price: 279,
    originalPrice: 319,
    storeUrl: 'https://omirad.com/products/american-vintage-camouflage-jorts-1',
    imageUrl: '/assets/images/omirad_camo_jorts_1.jpg',
    images: [
      '/assets/images/omirad_camo_jorts_1.jpg',
      '/assets/images/omirad_camo_jorts_2.jpg',
      '/assets/images/omirad_camo_jorts_3.jpg',
      '/assets/images/omirad_camo_jorts_4.jpg',
      '/assets/images/omirad_camo_jorts_5.jpg',
      'https://cdn.shopify.com/s/files/1/0538/4883/4235/files/6b6f9fbe.jpg?v=1745645986&width=1200',
      'https://cdn.shopify.com/s/files/1/0538/4883/4235/files/df11bd6d.jpg?v=1745645986&width=1200',
      'https://cdn.shopify.com/s/files/1/0538/4883/4235/files/ea02c21a.jpg?v=1745645986&width=1200',
      'https://cdn.shopify.com/s/files/1/0538/4883/4235/files/6bff5519.jpg?v=1745645986&width=1200',
      'https://cdn.shopify.com/s/files/1/0538/4883/4235/files/0a13505c.jpg?v=1745645986&width=1200'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    badges: ['Przecena', 'Ukryta perełka'],
    description: 'Szerokie spodenki jorts cargo w militarny wzór woodland camo (100% bawełna). Potężny, luźny fason wide-leg z charakterystycznym dropem, pojemne podwójne kieszenie cargo po bokach, tylne kieszenie z patkami i kontrastowy czerwony haft z przodu.',
    colorway: 'Woodland Camo',
  },

  // 19. Steel White Longsleeve ReLab
  {
    id: 'prod-relab-19',
    name: 'Steel White Longsleeve',
    brand: 'RELAB',
    category: "Longsleeve'y",
    price: 215,
    storeUrl: 'https://relab.store/pl/d%C5%82ugi-r%C4%99kaw/34388-34320-steel-white-longsleeve.html#/1-rozmiar-l',
    imageUrl: '/assets/images/relab_steel_white_longsleeve_1.jpg',
    images: [
      '/assets/images/relab_steel_white_longsleeve_1.jpg',
      '/assets/images/relab_steel_white_longsleeve_2.jpg',
      '/assets/images/relab_steel_white_longsleeve_3.jpg',
      '/assets/images/relab_steel_white_longsleeve_4.jpg',
      '/assets/images/relab_steel_white_longsleeve_5.jpg',
      'https://relab.store/6215-product_main/steel-white-longsleeve.jpg',
      'https://relab.store/6216-product_main/steel-white-longsleeve.jpg',
      'https://relab.store/6217-product_main/steel-white-longsleeve.jpg',
      'https://relab.store/6214-product_main/steel-white-longsleeve.jpg',
      'https://relab.store/6213-product_main/steel-white-longsleeve.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['Ukryta perełka'],
    description: 'Biały longsleeve z ciężkiej, mięsistej bawełny o gramaturze 300 GSM (100% bawełna, krój unisex). Wyrazisty nadruk graficzny wykonany technologią DTG na klatce piersiowej i plecach. Wyprodukowany w Polsce.',
    colorway: 'White / Steel',
  },

  // 20. Biggie Pink Longsleeve ReLab
  {
    id: 'prod-relab-20',
    name: 'Biggie Pink Longsleeve',
    brand: 'RELAB',
    category: "Longsleeve'y",
    price: 195,
    storeUrl: 'https://relab.store/pl/d%C5%82ugi-r%C4%99kaw/34367-34194-biggie-pink-longsleeve.html#/12-rozmiar-xs',
    imageUrl: '/assets/images/relab_biggie_pink_longsleeve_1.jpg',
    images: [
      '/assets/images/relab_biggie_pink_longsleeve_1.jpg',
      '/assets/images/relab_biggie_pink_longsleeve_2.jpg',
      '/assets/images/relab_biggie_pink_longsleeve_3.jpg',
      '/assets/images/relab_biggie_pink_longsleeve_4.jpg',
      '/assets/images/relab_biggie_pink_longsleeve_5.jpg',
      '/assets/images/relab_biggie_pink_longsleeve_6.jpg',
      'https://relab.store/6018-product_main/biggie-pink-longsleeve.jpg',
      'https://relab.store/6037-product_main/biggie-pink-longsleeve.jpg',
      'https://relab.store/6038-product_main/biggie-pink-longsleeve.jpg',
      'https://relab.store/6044-product_main/biggie-pink-longsleeve.jpg',
      'https://relab.store/6043-product_main/biggie-pink-longsleeve.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['Do 200 zł', 'Ukryta perełka'],
    description: 'Różowy longsleeve z grubiej dzianiny bawełnianej o gramaturze 300 GSM (100% bawełna, krój unisex). Przód i rękawy zdobi precyzyjnie wykonany, wypukły haft z motywem Biggie. Wyprodukowany w Europie.',
    colorway: 'Pink',
  },

  // 21. Anty-Heritage Longsleeve ReLab
  {
    id: 'prod-relab-21',
    name: 'Anty-Heritage Longsleeve',
    brand: 'RELAB',
    category: "Longsleeve'y",
    price: 215,
    storeUrl: 'https://relab.store/pl/d%C5%82ugi-r%C4%99kaw/34443-34554-anty-heritage-longsleeve.html#/12-rozmiar-xs',
    imageUrl: '/assets/images/relab_anty_heritage_longsleeve_1.webp',
    images: [
      '/assets/images/relab_anty_heritage_longsleeve_1.webp',
      '/assets/images/relab_anty_heritage_longsleeve_2.webp',
      '/assets/images/relab_anty_heritage_longsleeve_3.webp',
      'https://relab.store/6814-product_main/anty-heritage-longsleeve.jpg',
      'https://relab.store/6816-product_main/anty-heritage-longsleeve.jpg',
      'https://relab.store/6817-product_main/anty-heritage-longsleeve.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['Ukryta perełka'],
    description: 'Longsleeve w odcieniu oliwkowym / khaki z mięsistej bawełny 300 GSM (100% bawełna, krój unisex). Wyrazisty nadruk graficzny z przodu i z tyłu wykonany trwałą techniką DTG.',
    colorway: 'Olive / Khaki',
  },

  // 22. Naszyjnik OX Scarline Vesperis
  {
    id: 'prod-vesperis-22',
    name: 'OX Scarline (Naszyjnik z krzyżem)',
    brand: 'VESPERIS',
    category: 'Biżuteria',
    price: 190,
    originalPrice: 220,
    storeUrl: 'https://vesperis.pl/products/999-scarline-cross-ox',
    imageUrl: '/assets/images/vesperis_ox_scarline_1.png',
    images: [
      '/assets/images/vesperis_ox_scarline_1.png',
      '/assets/images/vesperis_ox_scarline_2.jpg',
      '/assets/images/vesperis_ox_scarline_3.jpg',
      'https://cdn.shopify.com/s/files/1/0900/3221/0253/files/krzyz_czarne_tlo_4.png?v=1794313597&width=1200',
      'https://cdn.shopify.com/s/files/1/0900/3221/0253/files/e853585f-image_crop_1.jpg?v=1792518088&width=1200',
      'https://cdn.shopify.com/s/files/1/0900/3221/0253/files/VP-5.jpg?v=1787659764&width=1200'
    ],
    sizes: ['One Size (z łańcuszkiem)'],
    badges: ['Przecena', 'Do 200 zł', 'Ukryta perełka'],
    description: 'Ręcznie wykonywany na zamówienie naszyjnik z krzyżem OX Scarline ze srebra najwyższej próby 999 z surowym, oksydowanym wykończeniem. Każda zawieszka jest wysyłana w komplecie z łańcuszkiem (czas realizacji ok. 2 tygodnie).',
    colorway: 'Srebro 999 / Oksyda',
  },

  // 23. T-shirt Silicon Valley Tee (black) HILLS
  {
    id: 'prod-hills-23',
    name: 'SILICON VALLEY TEE (black)',
    brand: 'HILLS®',
    category: 'Koszulki',
    price: 126,
    originalPrice: 210,
    storeUrl: 'https://hillswear.com/products/silicon-valley-tee-black',
    imageUrl: '/assets/images/hills_silicon_valley_tee_1.png',
    images: [
      '/assets/images/hills_silicon_valley_tee_1.png',
      '/assets/images/hills_silicon_valley_tee_2.jpg',
      '/assets/images/hills_silicon_valley_tee_3.jpg',
      'https://cdn.shopify.com/s/files/1/0885/1075/9237/files/siliconvalleyteeblacksite.png?v=1781010939&width=1200',
      'https://cdn.shopify.com/s/files/1/0885/1075/9237/files/silicon_valley_tee_black2.jpg?v=1781095615&width=1200',
      'https://cdn.shopify.com/s/files/1/0885/1075/9237/files/silicon_valley_tee_black_3.jpg?v=1781095561&width=1200'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['Przecena', 'Do 200 zł', 'Ukryta perełka'],
    description: 'Bawełniany t-shirt o autorskim kroju boxy fit (lekko skrócona długość, opuszczone ramiona, szerokie rękawy) z grubszej bawełny premium 230 GSM (100% bawełna, OEKO-TEX® Standard 100, technologia anti-peeling). Trwały nadruk sitodrukowy inspirowany klimatem Doliny Krzemowej lat 80. 100% Made in Poland.',
    colorway: 'Black',
  },

  // 24. Basic Longsleeve (cream/black) HILLS
  {
    id: 'prod-hills-24',
    name: 'BASIC LONGSLEEVE (cream/black)',
    brand: 'HILLS®',
    category: "Longsleeve'y",
    price: 154,
    originalPrice: 230,
    storeUrl: 'https://hillswear.com/products/basic-longsleeve-cream-black',
    imageUrl: '/assets/images/hills_basic_longsleeve_1.png',
    images: [
      '/assets/images/hills_basic_longsleeve_1.png',
      '/assets/images/hills_basic_longsleeve_2.jpg',
      '/assets/images/hills_basic_longsleeve_3.jpg',
      '/assets/images/hills_basic_longsleeve_4.jpg',
      'https://cdn.shopify.com/s/files/1/0885/1075/9237/files/stripes_longsleeve_packshot.png?v=1751367343&width=1200',
      'https://cdn.shopify.com/s/files/1/0885/1075/9237/files/IMG_3578.heic?v=1751367343&format=jpg&width=1200',
      'https://cdn.shopify.com/s/files/1/0885/1075/9237/files/IMG_3571.heic?v=1751367343&format=jpg&width=1200',
      'https://cdn.shopify.com/s/files/1/0885/1075/9237/files/IMG_3557.heic?v=1751367343&format=jpg&width=1200'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badges: ['Przecena', 'Do 200 zł', 'Ukryta perełka'],
    description: 'Kremowy longsleeve w czarne paski o kroju boxy oversized fit z miękkiej, mięsistej bawełny premium 250 GSM (100% bawełna, OEKO-TEX® Standard 100, wykończenie anti-peeling). Opuszczona linia ramion, szerokie rękawy i subtelny haft hills® na karku. 100% Made in Poland.',
    colorway: 'Cream / Black',
  },

  // 25. Yami Club T-shirt HOODSY
  {
    id: 'prod-hoodsy-25',
    name: 'Yami Club T-shirt',
    brand: 'HOODSY',
    category: 'Koszulki',
    price: 179,
    originalPrice: 219,
    storeUrl: 'https://hoodsy.pl/products/yami-club-tee?variant=61937365713226',
    imageUrl: '/assets/images/hoodsy_yami_club_tee_1.png',
    images: [
      '/assets/images/hoodsy_yami_club_tee_1.png',
      '/assets/images/hoodsy_yami_club_tee_2.jpg',
      '/assets/images/hoodsy_yami_club_tee_3.jpg',
      '/assets/images/hoodsy_yami_club_tee_4.jpg',
      '/assets/images/hoodsy_yami_club_tee_5.jpg',
      'https://cdn.shopify.com/s/files/1/0999/0379/9626/files/3F4133D0-A157-4883-A975-AB368FA5CEA9.png?v=1780046415&width=1200',
      'https://cdn.shopify.com/s/files/1/0999/0379/9626/files/C3A3AC0B-A6C0-4267-BA6B-C53CD8F38A99.jpg?v=1782410001&width=1200',
      'https://cdn.shopify.com/s/files/1/0999/0379/9626/files/61127D8F-020E-4E8A-B31A-5EBD8713376F.jpg?v=1782410001&width=1200',
      'https://cdn.shopify.com/s/files/1/0999/0379/9626/files/26F588D3-A8C2-4AEF-AE3D-F0C50A48D5F7.jpg?v=1782410001&width=1200',
      'https://cdn.shopify.com/s/files/1/0999/0379/9626/files/F08C72F6-B12C-4E1B-8BCF-A3134E0862A6.jpg?v=1782410002&width=1200'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    badges: ['Przecena', 'Do 200 zł', 'Ukryta perełka'],
    description: 'Czarny t-shirt wyprodukowany w 100% w Polsce z wysokogatunkowej, mięsistej bawełny o gramaturze 210 GSM. Gruba dzianina zapewnia strukturalny, czysty krój oraz trwałość w głębokim, solidnym odcieniu czerni.',
    colorway: 'Black',
  },
];

export const CATEGORIES = [
  'Wszystkie',
  'Polecane',
  'Promocje',
  'Wasze propozycje',
  'Spodnie',
  'Koszulki',
  "Longsleeve'y",
  'Bluzy',
  'Swetry',
  'Kurtki',
  'Biżuteria',
  'Akcesoria'
] as const;

export type CategoryFilter = typeof CATEGORIES[number];
