export interface MenuCategory {
  id: string;
  slug: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  order_index: number;
}

export interface MenuItem {
  id: string;
  category_slug: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  price: number;
  image_url: string;
  is_favorite: boolean;
  is_available: boolean;
  spicy_level: number;
  order_index: number;
}

export interface EventSpace {
  id: string;
  slug: string;
  name_id: string;
  name_en: string;
  tagline_id: string;
  tagline_en: string;
  description_id: string;
  description_en: string;
  capacity_min: number;
  capacity_max: number;
  hourly_rate: number;
  minimum_hours: number;
  facilities_id: string[];
  facilities_en: string[];
  suitable_events_id: string[];
  suitable_events_en: string[];
  primary_image_url: string;
  gallery_image_urls: string[];
}

export interface EventPackage {
  id: string;
  space_slug: string;
  name_id: string;
  name_en: string;
  price_per_person: number;
  price_package: number;
  min_pax: number;
  duration_hours: number;
  features_id: string[];
  features_en: string[];
  badge_id: string;
  badge_en: string;
  order_index: number;
}

export const MOCK_CATEGORIES: MenuCategory[] = [
  {
    id: 'cat-1',
    slug: 'makanan-utama',
    name_id: 'Makanan Utama',
    name_en: 'Main Courses',
    description_id: 'Hidangan khas nusantara dan Betawi autentik Kota Tua',
    description_en: 'Authentic Indonesian and Betawi specialties of Kota Tua',
    order_index: 1,
  },
  {
    id: 'cat-2',
    slug: 'camilan',
    name_id: 'Camilan & Kudapan',
    name_en: 'Traditional Snacks',
    description_id: 'Kudapan ringan dan jajanan pasar tempo dulu',
    description_en: 'Traditional light bites and heritage street snacks',
    order_index: 2,
  },
  {
    id: 'cat-3',
    slug: 'minuman-khas',
    name_id: 'Minuman Khas & Tradisional',
    name_en: 'Specialty & Heritage Drinks',
    description_id: 'Kesegaran rempah dan es tradisional pelepas dahaga',
    description_en: 'Refreshing herbal spices and traditional iced treats',
    order_index: 3,
  },
  {
    id: 'cat-4',
    slug: 'kopi-teh',
    name_id: 'Kopi & Teh',
    name_en: 'Coffee & Tea',
    description_id: 'Seduhan biji kopi nusantara dan teh wangi khas peranakan',
    description_en: 'Indonesian heritage beans brew and aromatic floral tea',
    order_index: 4,
  },
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: 'menu-1',
    category_slug: 'makanan-utama',
    name_id: 'Soto Betawi Kuah Santan Susu',
    name_en: 'Betawi Beef Soup (Coconut & Fresh Milk)',
    description_id: 'Potongan daging sapi empuk dengan kuah gurih rempah santan dan susu segar, disajikan dengan emping dan acar segar.',
    description_en: 'Tender beef cuts slow-cooked in rich aromatic coconut and fresh milk broth, served with emping crackers and pickles.',
    price: 45000,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    is_favorite: true,
    is_available: true,
    spicy_level: 1,
    order_index: 1,
  },
  {
    id: 'menu-2',
    category_slug: 'makanan-utama',
    name_id: 'Nasi Goreng Mega Rasa Kota Tua',
    name_en: 'Mega Rasa Special Heritage Fried Rice',
    description_id: 'Nasi goreng racikan bumbu rahasia warisan dengan suwiran ayam kampung, telur mata sapi, sate ayam, dan kerupuk udang.',
    description_en: 'Our signature fried rice with heirloom spices, shredded free-range chicken, sunny side egg, chicken satay, and shrimp crackers.',
    price: 38000,
    image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    is_favorite: true,
    is_available: true,
    spicy_level: 1,
    order_index: 2,
  },
  {
    id: 'menu-3',
    category_slug: 'makanan-utama',
    name_id: 'Ayam Goreng Lengkuas Mega Rasa',
    name_en: 'Crispy Galangal Spiced Fried Chicken',
    description_id: 'Ayam ungkep rempah ketumbar lengkuas goreng renyah keemasan, lalapan segar dan sambal terasi terong.',
    description_en: 'Tender marinated chicken with fragrant crispy golden galangal crumbs, fresh raw vegetables and spicy shrimp paste sambal.',
    price: 35000,
    image_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    is_favorite: false,
    is_available: true,
    spicy_level: 2,
    order_index: 3,
  },
  {
    id: 'menu-4',
    category_slug: 'makanan-utama',
    name_id: 'Gado-Gado Siram Batavia',
    name_en: 'Batavia Warm Salad with Peanut Sauce',
    description_id: 'Sayuran segar rebus, kentang, tahu, tempe, dan telur rebus disiram bumbu kacang medok khas Batavia tempo dulu.',
    description_en: 'Steamed assorted vegetables, potatoes, tofu, tempeh, and boiled egg dressed in rich, velvety Batavia artisanal peanut sauce.',
    price: 30000,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    is_favorite: false,
    is_available: true,
    spicy_level: 0,
    order_index: 4,
  },
  {
    id: 'menu-5',
    category_slug: 'makanan-utama',
    name_id: 'Nasi Ulam Betawi Komplit',
    name_en: 'Betawi Herb-Spiced Rice Platter',
    description_id: 'Nasi putih diaduk serundeng kelapa sangrai wangi kemangi, disajikan dengan semur tahu kentang, dendeng manis, dan emping.',
    description_en: 'Fragrant steamed rice tossed with toasted coconut herbs and basil, served with sweet spiced beef jerky, braised tofu, and crackers.',
    price: 42000,
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    is_favorite: false,
    is_available: true,
    spicy_level: 1,
    order_index: 5,
  },
  {
    id: 'menu-6',
    category_slug: 'camilan',
    name_id: 'Kerak Telor Spesial Bebek',
    name_en: 'Authentic Duck Egg Kerak Telor',
    description_id: 'Ketan putih gurih disangrai bersama telur bebek, ebi sangrai, kelapa serundeng, dan bawang goreng renyah.',
    description_en: 'Traditional Betawi toasted glutinous rice with rich duck egg, dried shrimp powder, toasted spiced coconut, and fried shallots.',
    price: 28000,
    image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    is_favorite: true,
    is_available: true,
    spicy_level: 0,
    order_index: 6,
  },
  {
    id: 'menu-7',
    category_slug: 'camilan',
    name_id: 'Tahu Gejrot Cirebon Pedas Manis',
    name_en: 'Spicy Sweet Crispy Tofu with Palm Sugar Dressing',
    description_id: 'Tahu pong goreng renyah disiram kuah asam jawa, gula aren, bawang merah, dan cabai rawit ulek segar.',
    description_en: 'Airy fried tofu cubes drenched in tangy tamarind, dark palm sugar glaze, crushed shallots, and fresh bird eye chilies.',
    price: 18000,
    image_url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    is_favorite: false,
    is_available: true,
    spicy_level: 2,
    order_index: 7,
  },
  {
    id: 'menu-8',
    category_slug: 'camilan',
    name_id: 'Pisang Goreng Wijen Madu',
    name_en: 'Honey Sesame Crispy Banana Fritters',
    description_id: 'Pisang kepok manis berbalut tepung renyah tabur biji wijen dengan cocolan madu hutan alami.',
    description_en: 'Crispy caramelized local sweet plantain fritters sprinkled with toasted sesame seeds and wild honey dip.',
    price: 20000,
    image_url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    is_favorite: true,
    is_available: true,
    spicy_level: 0,
    order_index: 8,
  },
  {
    id: 'menu-9',
    category_slug: 'camilan',
    name_id: 'Tempe Mendoan Purwokerto (Isi 4)',
    name_en: 'Purwokerto Mendoan Soft Fried Tempeh',
    description_id: 'Tempe tipis lapis adonan tepung daun bawang gurih, disajikan hangat bersama sambal kecap rawit.',
    description_en: 'Soft batter-coated fermented soybean patties with sliced spring onions, served piping hot with sweet soy chili dip.',
    price: 18000,
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    is_favorite: false,
    is_available: true,
    spicy_level: 1,
    order_index: 9,
  },
  {
    id: 'menu-10',
    category_slug: 'minuman-khas',
    name_id: 'Es Selendang Mayang Betawi',
    name_en: 'Iced Selendang Mayang Cake',
    description_id: 'Kue puding hunkwe kenyal warna-warni khas Betawi, kuah santan gurih pandan dan gula merah cair segar.',
    description_en: 'Heritage colorful rice flour cake pudding served in rich iced coconut milk and fragrant liquid palm sugar nectar.',
    price: 20000,
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    is_favorite: true,
    is_available: true,
    spicy_level: 0,
    order_index: 10,
  },
  {
    id: 'menu-11',
    category_slug: 'minuman-khas',
    name_id: 'Bir Pletok Rempah Tradisional (Dingin/Hangat)',
    name_en: 'Bir Pletok Herbal Elixir (Hot/Iced)',
    description_id: 'Minuman rempah non-alkohol legendaris Betawi racikan jahe, secang, kapulaga, serai, dan kayu manis.',
    description_en: 'Historic non-alcoholic herbal brew infused with fresh ginger, sappan wood for ruby tint, cardamom, lemongrass, and cinnamon.',
    price: 22000,
    image_url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    is_favorite: true,
    is_available: true,
    spicy_level: 0,
    order_index: 11,
  },
  {
    id: 'menu-12',
    category_slug: 'minuman-khas',
    name_id: 'Es Cendol Durian Mega Rasa',
    name_en: 'Iced Cendol with Fresh Durian',
    description_id: 'Cendol pandan alami, kuah santan kelapa murni, gula kelapa kental organik, dan topping daging durian asli.',
    description_en: 'Silky pandan drops in creamy coconut milk, slow-cooked palm sugar syrup, crowned with pure aromatic durian pulp.',
    price: 26000,
    image_url: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
    is_favorite: false,
    is_available: true,
    spicy_level: 0,
    order_index: 12,
  },
  {
    id: 'menu-13',
    category_slug: 'minuman-khas',
    name_id: 'Es Jeruk Kelapa Muda',
    name_en: 'Young Coconut & Fresh Orange Juice',
    description_id: 'Perpaduan air dan serutan kelapa muda segar dengan perasan jeruk murni pelepas dahaga.',
    description_en: 'Fresh young coconut water and tender meat harmonized with pure squeezed sweet citrus juice.',
    price: 22000,
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    is_favorite: false,
    is_available: true,
    spicy_level: 0,
    order_index: 13,
  },
  {
    id: 'menu-14',
    category_slug: 'kopi-teh',
    name_id: 'Kopi Tubruk Rempah Kota Tua',
    name_en: 'Kota Tua Spiced Heritage Drip Coffee',
    description_id: 'Biji kopi robusta Jawa pilihan diseduh tradisional dengan sentuhan kayu manis dan cengkeh harum.',
    description_en: 'Selected Javanese Robusta beans brewed unfiltered with hints of aromatic sweet cinnamon and cloves.',
    price: 18000,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    is_favorite: true,
    is_available: true,
    spicy_level: 0,
    order_index: 14,
  },
  {
    id: 'menu-15',
    category_slug: 'kopi-teh',
    name_id: 'Es Kopi Susu Gula Aren Mega Rasa',
    name_en: 'Mega Rasa Iced Palm Sugar Milk Coffee',
    description_id: 'Espresso double shot dipadu susu segar creamy dan lelehan gula aren murni khas nusantara.',
    description_en: 'Double shot espresso blend combined with velvety fresh milk and rich unrefined organic palm sugar.',
    price: 22000,
    image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    is_favorite: true,
    is_available: true,
    spicy_level: 0,
    order_index: 15,
  },
  {
    id: 'menu-16',
    category_slug: 'kopi-teh',
    name_id: 'Teh Poci Melati Gula Batu (Untuk 2 Orang)',
    name_en: 'Traditional Claypot Jasmine Tea with Rock Sugar',
    description_id: 'Seduhan daun teh melati wangi dalam poci tanah liat alami, disajikan dengan manisnya gula batu.',
    description_en: 'Fragrant whole leaf jasmine tea brewed inside an unglazed clay teapot, served with rock sugar crystals.',
    price: 25000,
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    is_favorite: false,
    is_available: true,
    spicy_level: 0,
    order_index: 16,
  },
];

export const MOCK_EVENT_SPACE: EventSpace = {
  id: 'space-1',
  slug: 'ruang-fatahillah-lantai-2',
  name_id: 'Ruang Acara Lantai 2 Mega Rasa',
  name_en: 'Mega Rasa 2nd Floor Event Space',
  tagline_id: 'Ruang eksklusif lantai atas ber-AC dengan fasilitas lengkap di jantung Kota Tua',
  tagline_en: 'Exclusive fully air-conditioned upper floor room with complete amenities in Kota Tua',
  description_id: 'Terletak di lantai atas Kantin Mega Rasa dengan suasana hangat, tenang, dan privat di jantung Kota Tua Jakarta. Ruangan ini dilengkapi pendingin ruangan (AC) dingin maksimal, proyektor HD & layar 100", wireless mic, sound system modern, high-speed Wi-Fi, dan penataan meja/kursi yang fleksibel. Sangat cocok untuk gathering kantor, arisan keluarga, reuni sekolah, workshop kreatif, maupun perayaan ulang tahun.',
  description_en: 'Located on the top floor of Kantin Mega Rasa offering a warm, quiet, and private sanctuary in the heart of historic Kota Tua Jakarta. Fully equipped with heavy-duty air conditioning, HD projector & 100" screen, wireless microphones, modern audio system, high-speed Wi-Fi, and versatile seating arrangements. Perfect for corporate gatherings, family arisan, school reunions, creative workshops, and birthday celebrations.',
  capacity_min: 10,
  capacity_max: 50,
  hourly_rate: 350000,
  minimum_hours: 2,
  facilities_id: [
    'Full Air Conditioning (AC dingin)',
    'Proyektor HD & Layar Lebar 100"',
    '2 Wireless Microphones & Sound System',
    'High-Speed Wi-Fi 100 Mbps',
    'Penataan Meja Fleksibel (Theater, Round, Boardroom)',
    'Toilet Bersih Khusus Lantai 2',
    'Musholla Bersih & Nyaman',
    'Area Khusus Buffet Prasmanan & Coffee Break'
  ],
  facilities_en: [
    'Full Air Conditioning (AC)',
    'HD Projector & 100" Wide Screen',
    '2 Wireless Microphones & Sound System',
    'High-Speed Wi-Fi 100 Mbps',
    'Flexible Layouts (Theater, Round, Boardroom)',
    'Dedicated Clean Restroom on 2nd Floor',
    'Prayer Room (Musholla)',
    'Dedicated Buffet & Coffee Break Counter'
  ],
  suitable_events_id: [
    'Gathering & Meeting Kantor',
    'Reuni Sekolah & Komunitas',
    'Arisan Keluarga & Sahabat',
    'Workshop, Training & Seminar',
    'Perayaan Ulang Tahun & Syukuran',
    'Press Conference & Peluncuran Buku'
  ],
  suitable_events_en: [
    'Corporate Meetings & Gatherings',
    'School & Alumni Reunions',
    'Family & Community Arisan',
    'Workshops, Training & Seminars',
    'Birthday & Anniversary Celebrations',
    'Press Conferences & Book Launches'
  ],
  primary_image_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
  gallery_image_urls: [
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'
  ]
};

export const MOCK_EVENT_PACKAGES: EventPackage[] = [
  {
    id: 'pkg-1',
    space_slug: 'ruang-fatahillah-lantai-2',
    name_id: 'Paket Sewa Ruangan Saja (Room Only)',
    name_en: 'Room Only Rental Package',
    price_per_person: 0,
    price_package: 350000,
    min_pax: 10,
    duration_hours: 2,
    features_id: [
      'Sewa ruang privat lantai 2 selama 2 jam (bisa perpanjang Rp 175.000/jam)',
      'Full fasilitas: AC, Proyektor, Sound System, 2 Mic Wireless, Wi-Fi',
      'Setting kursi & meja sesuai kebutuhan acara',
      'Air mineral gratis untuk seluruh peserta'
    ],
    features_en: [
      '2 hours private room rental (additional hours IDR 175,000/hr)',
      'Full amenities: AC, Projector, Sound System, 2 Wireless Mics, Wi-Fi',
      'Custom chair & table arrangement',
      'Complimentary mineral water for all attendees'
    ],
    badge_id: 'Ekonomis',
    badge_en: 'Budget Friendly',
    order_index: 1,
  },
  {
    id: 'pkg-2',
    space_slug: 'ruang-fatahillah-lantai-2',
    name_id: 'Paket Coffee Break & Kudapan',
    name_en: 'Coffee Break & Heritage Snack Package',
    price_per_person: 65000,
    price_package: 0,
    min_pax: 15,
    duration_hours: 3,
    features_id: [
      'Penggunaan ruang privat selama 3 jam',
      'Full fasilitas audio visual & Wi-Fi',
      '2 Pilihan kudapan tradisional (Pisang Goreng Wijen, Tempe Mendoan, Tahu Gejrot)',
      'Free flow Kopi Tubruk Kota Tua, Teh Melati Hangat, dan Air Mineral'
    ],
    features_en: [
      '3 hours private upper floor rental',
      'Full AV equipment & Wi-Fi included',
      '2 Traditional snack selections (Crispy Sesame Banana, Mendoan, Tahu Gejrot)',
      'Free-flow Kota Tua Coffee, Hot Jasmine Tea, and Mineral Water'
    ],
    badge_id: 'Favorit Arisan',
    badge_en: 'Arisan Favorite',
    order_index: 2,
  },
  {
    id: 'pkg-3',
    space_slug: 'ruang-fatahillah-lantai-2',
    name_id: 'Paket Prasmanan Mega Rasa Komplit',
    name_en: 'Full Heritage Buffet Gathering Package',
    price_per_person: 125000,
    price_package: 0,
    min_pax: 20,
    duration_hours: 4,
    features_id: [
      'Penggunaan ruang privat selama 4 jam penuh',
      'Full fasilitas audio visual, mic wireless, proyektor, Wi-Fi, dan backdrop stand',
      'Prasmanan lengkap: Pilihan Ayam Goreng Lengkuas / Soto Betawi, Gado-Gado, Nasi, Kerupuk & Sambal',
      '1 Pilihan dessert tradisional (Es Selendang Mayang / Buah Segar)',
      'Free flow Es Jeruk / Es Teh Manis & Air Mineral'
    ],
    features_en: [
      '4 full hours of private venue usage',
      'Complete AV, wireless microphones, projector, Wi-Fi, and banner backdrop stand',
      'Full Indonesian buffet: Galangal Fried Chicken / Soto Betawi, Gado-Gado, Rice, Crackers & Sambal',
      '1 Traditional dessert (Es Selendang Mayang or Seasonal Fresh Fruits)',
      'Free-flow Iced Citrus / Sweet Tea & Mineral Water'
    ],
    badge_id: 'Paling Laris',
    badge_en: 'Best Value & Seller',
    order_index: 3,
  },
];
