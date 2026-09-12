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

export interface NasiBoxPackage {
  id: string;
  slug: string;
  name_id: string;
  name_en: string;
  description_id: string;
  description_en: string;
  price: number;
  min_order: number;
  items_id: string[];
  items_en: string[];
  badge_id: string;
  badge_en: string;
  image_url: string;
  is_popular: boolean;
  order_index: number;
}

export interface GoogleReview {
  id: string;
  author_name: string;
  author_avatar?: string;
  author_badge_id: string;
  author_badge_en: string;
  rating: number;
  relative_time_id: string;
  relative_time_en: string;
  review_text_id: string;
  review_text_en: string;
  category: 'culinary' | 'nasi_box' | 'event_space' | 'tourist';
  ordered_items_id?: string[];
  ordered_items_en?: string[];
  likes_count: number;
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

export const MOCK_NASI_BOX_PACKAGES: NasiBoxPackage[] = [
  {
    id: 'nb-1',
    slug: 'paket-hemat-wisatawan',
    name_id: 'Paket Hemat Wisatawan',
    name_en: 'Tour Group Budget Meal Box',
    description_id: 'Pilihan paling ekonomis & mengenyangkan untuk rombongan pelajar, study tour, dan rombongan bus wisata Kota Tua.',
    description_en: 'The most economical and filling choice for students, study tours, and bus tour groups visiting Kota Tua.',
    price: 22000,
    min_order: 10,
    items_id: [
      'Nasi Putih Pulen / Nasi Kuning Gurih',
      'Ayam Goreng Lengkuas Mega Rasa',
      'Tempe Orek Manis Gurih',
      'Telur Dadar Iris / Sambal Goreng Kentang',
      'Lalapan Timun & Sambal Terasi',
      'Kerupuk Renyah',
      'Air Mineral Cup'
    ],
    items_en: [
      'Fluffy Steamed White Rice or Savory Turmeric Rice',
      'Crispy Galangal Fried Chicken',
      'Sweet & Savory Tempeh Orek',
      'Shredded Omelette or Spiced Potato Cubes',
      'Fresh Cucumber & Spicy Sambal',
      'Crispy Crackers',
      'Sealed Cup Mineral Water'
    ],
    badge_id: 'Paling Hemat',
    badge_en: 'Best Budget',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    is_popular: false,
    order_index: 1,
  },
  {
    id: 'nb-2',
    slug: 'paket-selera-nusantara',
    name_id: 'Paket Selera Nusantara',
    name_en: 'Nusantara Delight Meal Box',
    description_id: 'Paket terfavorit dengan lauk ganda ayam bumbu rujak & telur balado, pas untuk rombongan keluarga besar, arisan, & gathering kantor.',
    description_en: 'Our best-selling package featuring grilled chicken & balado egg, ideal for family reunions and office gatherings.',
    price: 28000,
    min_order: 10,
    items_id: [
      'Nasi Putih Pulen Wangi',
      'Ayam Bakar Bumbu Rujak / Ayam Goreng Lengkuas',
      'Telur Balado Bulat Utuh',
      'Tumis Buncis Jagung Manis',
      'Sambal Bajak & Lalap Segar',
      'Kerupuk Udang',
      'Buah Pisang Segar',
      'Air Mineral Botol 330ml'
    ],
    items_en: [
      'Aromatic Fragrant Steamed Rice',
      'Spiced Honey Grilled Chicken or Galangal Fried Chicken',
      'Whole Hard-Boiled Egg in Balado Chili Sauce',
      'Sautéed French Beans & Sweet Corn',
      'Bajak Sambal & Fresh Greens',
      'Crispy Shrimp Crackers',
      'Fresh Sweet Banana',
      'Bottled Mineral Water 330ml'
    ],
    badge_id: 'Paling Laris',
    badge_en: 'Most Popular',
    image_url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    is_popular: true,
    order_index: 2,
  },
  {
    id: 'nb-3',
    slug: 'paket-spesial-batavia-komplit',
    name_id: 'Paket Spesial Batavia Komplit',
    name_en: 'Royal Batavia Heritage Feast Box',
    description_id: 'Paket premium cita rasa khas Batavia dengan daging sapi empal serundeng, cocok untuk VIP, rapat instansi, atau tamu istimewa.',
    description_en: 'Premium heritage lunch box with tender beef empal and Betawi spices, perfect for VIP guests and corporate luncheons.',
    price: 35000,
    min_order: 10,
    items_id: [
      'Nasi Ulam Betawi Wangi / Nasi Liwet Daun Jeruk',
      'Empal Sapi Serundeng Manis / Semur Daging Gurih',
      'Ayam Goreng Lengkuas / Suwir Rica',
      'Bakwan Jagung Renyah / Sambal Goreng Ati',
      'Acar Kuning Batavia & Emping Melinjo',
      'Sambal Terasi Jeruk Limau',
      'Puding Pandan / Buah Potong Segar',
      'Air Mineral Botol 330ml'
    ],
    items_en: [
      'Traditional Betawi Herb Rice or Lime-Leaf Rice',
      'Tender Braised Beef Empal with Toasted Coconut or Semur Beef',
      'Galangal Fried Chicken or Shredded Spiced Chicken',
      'Crispy Sweet Corn Fritter or Spiced Potato Liver',
      'Batavia Yellow Pickles & Emping Melinjo Crackers',
      'Aromatic Kaffir Lime Sambal',
      'Pandan Coconut Pudding or Fresh Cut Seasonal Fruit',
      'Bottled Mineral Water 330ml'
    ],
    badge_id: 'Pilihan VIP',
    badge_en: 'VIP Heritage',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    is_popular: false,
    order_index: 3,
  },
  {
    id: 'nb-4',
    slug: 'paket-snack-box-tradisional',
    name_id: 'Paket Snack Box Tradisional',
    name_en: 'Traditional Heritage Snack Box',
    description_id: 'Kudapan lezat tempo dulu untuk pengganjal lapar di perjalanan bus wisata, coffee break acara, atau pembagian saat keliling museum.',
    description_en: 'Delightful traditional Indonesian snacks for bus transit, museum walking breaks, and event coffee sessions.',
    price: 15000,
    min_order: 15,
    items_id: [
      '2 Pilihan Kue Tradisional (Risoles Ragout Ayam & Dadar Gulung Pandan Kelapa)',
      'Kacang Bawang Gurih Renyah',
      'Permen Segar & Tisu Higienis',
      'Air Mineral Cup'
    ],
    items_en: [
      '2 Heritage Pastries (Savory Chicken Ragout Risoles & Sweet Pandan Coconut Roll)',
      'Crispy Garlic Roasted Peanuts',
      'Refreshing Mint & Sanitized Napkin',
      'Sealed Cup Mineral Water'
    ],
    badge_id: 'Coffee Break',
    badge_en: 'Coffee Break',
    image_url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    is_popular: false,
    order_index: 4,
  },
];

export const MOCK_GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    author_name: 'Budi Pratama',
    author_badge_id: 'Local Guide · 142 ulasan',
    author_badge_en: 'Local Guide · 142 reviews',
    rating: 5,
    relative_time_id: '1 minggu yang lalu',
    relative_time_en: '1 week ago',
    review_text_id: 'Salah satu hidden gem kuliner terbaik di Kota Tua Jakarta! Soto Betawi kuah santan susunya benar-benar gurih medok dan dagingnya empuk banget. Tempatnya sangat bersih dan ber-AC dingin, penyelamat banget setelah panas-panasan jalan di Taman Fatahillah. Es Selendang Mayang-nya juga otentik. Pasti akan balik lagi bareng teman kantor!',
    review_text_en: 'One of the best culinary hidden gems in Old Batavia! The Soto Betawi with coconut-milk broth is incredibly rich and the beef melts in your mouth. Very clean, cold air conditioning—a true lifesaver after walking around Fatahillah Square under the sun. Authentic Es Selendang Mayang too. Will definitely return with colleagues!',
    category: 'culinary',
    ordered_items_id: ['Soto Betawi Kuah Santan Susu', 'Es Selendang Mayang Betawi', 'Tempe Mendoan'],
    ordered_items_en: ['Betawi Beef Soup', 'Iced Selendang Mayang', 'Crispy Mendoan Tempeh'],
    likes_count: 28,
  },
  {
    id: 'rev-2',
    author_name: 'Sarah Jenkins',
    author_badge_id: 'Wisatawan Mancanegara (Australia)',
    author_badge_en: 'Traveler from Melbourne, Australia',
    rating: 5,
    relative_time_id: '2 minggu yang lalu',
    relative_time_en: '2 weeks ago',
    review_text_id: 'Pengalaman bersantap pertama saya di Jakarta dan sangat luar biasa! Stafnya bisa berbahasa Inggris dengan sangat ramah dan membantu kami memilih menu yang pas untuk lidah barat. Nasi Goreng Mega Rasa dan Tahu Gejrot rasanya menakjubkan. Tempatnya higienis dan suasananya sangat homey tempo dulu. Highly recommended untuk turis internasional!',
    review_text_en: 'My first dining experience in Jakarta and it was magnificent! The staff spoke English wonderfully and patiently guided us through traditional options. The Mega Rasa Fried Rice and crispy Tahu Gejrot tasted out of this world. Spotlessly clean and nostalgic colonial atmosphere. Highly recommended for international travelers!',
    category: 'tourist',
    ordered_items_id: ['Nasi Goreng Mega Rasa Kota Tua', 'Tahu Gejrot Cirebon', 'Es Jeruk Kelapa Muda'],
    ordered_items_en: ['Mega Rasa Heritage Fried Rice', 'Tahu Gejrot', 'Young Coconut Citrus'],
    likes_count: 35,
  },
  {
    id: 'rev-3',
    author_name: 'Hendra Kusuma',
    author_badge_id: 'Koordinator Study Tour (Surabaya)',
    author_badge_en: 'School Study Tour Leader',
    rating: 5,
    relative_time_id: '3 minggu yang lalu',
    relative_time_en: '3 weeks ago',
    review_text_id: 'Pesan 120 box Paket Hemat Wisatawan untuk rombongan bus anak-anak sekolah kami. Pengantaran tepat waktu di kantong parkir bus Jl. Cengkeh, nasinya masih hangat pulen, ayam lengkuasnya renyah gurih disukai semua anak. Kemasannya rapi bersekat dengan sendok tisu higienis. Pelayanan WhatsApp sangat cepat dan gratis ongkir. Terima kasih banyak Kantin Mega Rasa!',
    review_text_en: 'Ordered 120 boxes of Tour Group Budget Meal Box for our school bus tour. Delivered punctually right to the Cengkeh bus parking lot, the rice was warm and fluffy, and the crispy galangal chicken was loved by all students. Sturdy multi-compartment boxes with sealed cutlery. Super responsive WhatsApp coordination and free delivery. Thank you Kantin Mega Rasa!',
    category: 'nasi_box',
    ordered_items_id: ['Paket Nasi Box Hemat Wisatawan (120 Box)', 'Air Mineral'],
    ordered_items_en: ['Budget Meal Box Package (120 Boxes)', 'Mineral Water'],
    likes_count: 42,
  },
  {
    id: 'rev-4',
    author_name: 'Dra. Maya Handayani',
    author_badge_id: 'Penyelenggara Reuni Alumni UI',
    author_badge_en: 'Alumni Reunion Organizer',
    rating: 5,
    relative_time_id: '1 bulan yang lalu',
    relative_time_en: '1 month ago',
    review_text_id: 'Sewa ruang acara lantai 2 untuk reuni angkatan 35 orang. Ruangannya privat, AC sangat dingin, sound system dan wireless mic bekerja jernih, ada proyektor juga. Paket prasmanan makanannya sangat enak dan porsi berlimpah. Semua tamu memuji pilihan tempat ini di jantung Kota Tua. Pelayanan stafnya luar biasa sigap!',
    review_text_en: 'Rented the 2nd-floor private space for our 35-person alumni reunion. Private sanctuary, icy cold AC, crystal-clear sound system and wireless mics, plus HD projector. The heritage buffet was delectable with generous portions. All guests praised the venue choice in the heart of Kota Tua. Top-notch staff hospitality!',
    category: 'event_space',
    ordered_items_id: ['Sewa Ruang Privat Lantai 2', 'Paket Prasmanan Mega Rasa Komplit'],
    ordered_items_en: ['2nd Floor Private Venue', 'Full Heritage Buffet Gathering Package'],
    likes_count: 19,
  },
  {
    id: 'rev-5',
    author_name: 'Rian Firmansyah',
    author_badge_id: 'Local Guide · 86 ulasan',
    author_badge_en: 'Local Guide · 86 reviews',
    rating: 5,
    relative_time_id: '1 bulan yang lalu',
    relative_time_en: '1 month ago',
    review_text_id: 'Langganan makan siang kalau lagi dinas ke area Kota Tua / Kali Besar. Ayam Goreng Lengkuasnya juara, bumbunya meresap sampai ke tulang dengan taburan serundeng lengkuas melimpah. Tempatnya bersih, wifi cepat, dan toiletnya terawat wangi. Jarang nemu tempat makan di Kota Tua yang harga bersahabat tapi kualitas rasa bintang lima.',
    review_text_en: 'My go-to lunch spot whenever I have business around Kota Tua / Kali Besar. The Galangal Fried Chicken is unbeatable with generous spiced crispy toppings. Clean tables, high-speed Wi-Fi, and spotless restrooms. Rare to find such an honest price with five-star restaurant standards in Old Town.',
    category: 'culinary',
    ordered_items_id: ['Ayam Goreng Lengkuas Mega Rasa', 'Es Kopi Susu Gula Aren'],
    ordered_items_en: ['Crispy Galangal Fried Chicken', 'Palm Sugar Iced Coffee'],
    likes_count: 16,
  },
  {
    id: 'rev-6',
    author_name: 'Kenji & Yuka Sato',
    author_badge_id: 'Wisatawan Jepang (Tokyo)',
    author_badge_en: 'Tourists from Tokyo, Japan',
    rating: 5,
    relative_time_id: '2 bulan yang lalu',
    relative_time_en: '2 months ago',
    review_text_id: 'Kami mampir setelah mengunjungi Museum Wayang. Mencoba Kopi Tubruk Rempah dan Kerak Telor bebek. Rasa rempahnya sangat harum dan menenangkan. Suasana resto sangat tenang dengan lagu-lagu tradisional yang menyejukkan. Stafnya sangat sopan kepada turis asing. Arigatou gozaimasu!',
    review_text_en: 'We stopped by after visiting Wayang Museum. Tried the Spiced Heritage Drip Coffee and duck egg Kerak Telor. The aroma of Indonesian herbs was soothing and exquisite. Very peaceful ambiance with calming traditional music. Staff were polite and welcoming to foreigners. Arigatou gozaimasu!',
    category: 'tourist',
    ordered_items_id: ['Kerak Telor Spesial Bebek', 'Kopi Tubruk Rempah Kota Tua', 'Pisang Goreng Wijen Madu'],
    ordered_items_en: ['Duck Egg Kerak Telor', 'Spiced Heritage Coffee', 'Honey Sesame Banana Fritters'],
    likes_count: 24,
  },
];


