-- ==============================================================================
-- KANTIN MEGA RASA KOTA TUA JAKARTA
-- COMPLETE CONSOLIDATED SUPABASE DATABASE SCHEMA & SEED DATA
-- ==============================================================================
-- File ini mencakup seluruh tabel DDL, Row Level Security (RLS) Policies,
-- serta data awal (Seed Data) untuk Kantin Mega Rasa.
--
-- CARA PEMAKAIAN:
-- 1. Buka Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Pilih Project Anda
-- 3. Buka menu "SQL Editor" di bilah samping kiri
-- 4. Tempel (Paste) seluruh isi script ini
-- 5. Klik tombol "Run" (atau Ctrl+Enter)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. BERSIHKAN TABEL LAMA JIKA INGIN RE-INSTALL (URUTAN HAPUS CASCADE)
DROP TABLE IF EXISTS contact_inquiries CASCADE;
DROP TABLE IF EXISTS google_reviews CASCADE;
DROP TABLE IF EXISTS nasi_box_packages CASCADE;
DROP TABLE IF EXISTS event_packages CASCADE;
DROP TABLE IF EXISTS event_spaces CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menu_categories CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- ==============================================================================
-- 3. DDL DEFINISI TABEL
-- ==============================================================================

-- TABEL 1: PENGATURAN UMUM SITUS (SITE SETTINGS)
CREATE TABLE site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABEL 2: KATEGORI MENU
CREATE TABLE menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name_id VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    description_id TEXT,
    description_en TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABEL 3: MENU MAKANAN & MINUMAN (DINE-IN)
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_slug VARCHAR(50) REFERENCES menu_categories(slug) ON DELETE SET NULL,
    name_id VARCHAR(150) NOT NULL,
    name_en VARCHAR(150) NOT NULL,
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    image_url TEXT,
    is_favorite BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    spicy_level INT DEFAULT 0, -- 0: tidak pedas, 1-3
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABEL 4: RUANG ACARA LANTAI ATAS (HERITAGE EVENT SPACE)
CREATE TABLE event_spaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name_id VARCHAR(150) NOT NULL,
    name_en VARCHAR(150) NOT NULL,
    tagline_id VARCHAR(255),
    tagline_en VARCHAR(255),
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    capacity_min INT DEFAULT 10,
    capacity_max INT DEFAULT 50,
    hourly_rate NUMERIC(12, 2) DEFAULT 350000,
    minimum_hours INT DEFAULT 2,
    facilities_id TEXT[] DEFAULT '{}',
    facilities_en TEXT[] DEFAULT '{}',
    suitable_events_id TEXT[] DEFAULT '{}',
    suitable_events_en TEXT[] DEFAULT '{}',
    primary_image_url TEXT,
    gallery_image_urls TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABEL 5: PAKET SEWA RUANG ACARA
CREATE TABLE event_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    space_slug VARCHAR(50) REFERENCES event_spaces(slug) ON DELETE CASCADE,
    name_id VARCHAR(150) NOT NULL,
    name_en VARCHAR(150) NOT NULL,
    price_per_person NUMERIC(12, 2) DEFAULT 0,
    price_package NUMERIC(12, 2) DEFAULT 0,
    min_pax INT DEFAULT 15,
    duration_hours INT DEFAULT 4,
    features_id TEXT[] DEFAULT '{}',
    features_en TEXT[] DEFAULT '{}',
    badge_id VARCHAR(50),
    badge_en VARCHAR(50),
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABEL 6: PAKET NASI BOX (KATERING ROMBONGAN KOTA TUA)
CREATE TABLE nasi_box_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name_id VARCHAR(150) NOT NULL,
    name_en VARCHAR(150) NOT NULL,
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    min_order INT DEFAULT 10,
    items_id TEXT[] DEFAULT '{}',
    items_en TEXT[] DEFAULT '{}',
    badge_id VARCHAR(50),
    badge_en VARCHAR(50),
    image_url TEXT,
    is_popular BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABEL 7: ULASAN GOOGLE MAPS (TESTIMONI PENGUNJUNG TERVERIFIKASI)
CREATE TABLE google_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name VARCHAR(150) NOT NULL,
    author_avatar TEXT,
    author_badge_id VARCHAR(100),
    author_badge_en VARCHAR(100),
    rating INT DEFAULT 5,
    relative_time_id VARCHAR(50),
    relative_time_en VARCHAR(50),
    review_text_id TEXT NOT NULL,
    review_text_en TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'culinary', -- 'culinary', 'nasi_box', 'event_space', 'tourist'
    ordered_items_id TEXT[] DEFAULT '{}',
    ordered_items_en TEXT[] DEFAULT '{}',
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TABEL 8: FORMULIR INQUIRY, RESERVASI & KONTAK
CREATE TABLE contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone_number VARCHAR(50) NOT NULL,
    inquiry_type VARCHAR(50) NOT NULL, -- 'dining_reservation', 'event_space_rental', 'nasi_box_catering', 'general'
    event_date DATE,
    estimated_pax INT,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'contacted', 'confirmed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) & AKSES API
-- ==============================================================================

-- Aktifkan RLS di seluruh tabel
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE nasi_box_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy Publik: Membaca Data (SELECT)
CREATE POLICY "Public read for site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read for menu_categories" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Public read for menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read for event_spaces" ON event_spaces FOR SELECT USING (true);
CREATE POLICY "Public read for event_packages" ON event_packages FOR SELECT USING (true);
CREATE POLICY "Public read for nasi_box_packages" ON nasi_box_packages FOR SELECT USING (true);
CREATE POLICY "Public read for google_reviews" ON google_reviews FOR SELECT USING (true);

-- Policy Admin / Anon Key: Kelola Data Penuh (INSERT, UPDATE, DELETE)
CREATE POLICY "Enable all for site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for menu_categories" ON menu_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for menu_items" ON menu_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for event_spaces" ON event_spaces FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for event_packages" ON event_packages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for nasi_box_packages" ON nasi_box_packages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for google_reviews" ON google_reviews FOR ALL USING (true) WITH CHECK (true);

-- Policy Pengunjung: Mengirim formulir reservasi
CREATE POLICY "Public insert for contact_inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable all for contact_inquiries" ON contact_inquiries FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 5. SEED DATA AWAL (INITIAL DATA)
-- ==============================================================================

-- 1. PENGATURAN UMUM SITUS
INSERT INTO site_settings (key, value) VALUES
('whatsapp_number', '628129506237'),
('gtm_id', 'GTM-MEGARASA1'),
('hours_weekday', 'Senin - Jumat: 08.00 - 21.00 WIB'),
('hours_weekend', 'Sabtu - Minggu / Libur: 07.30 - 22.00 WIB'),
('address', 'Jl. Kalibesar Timur No. 18, Kawasan Kota Tua, Pinangsia, Taman Sari, Jakarta Barat 11110'),
('landmark', 'Hanya 3 menit jalan kaki dari Museum Sejarah Jakarta (Fatahillah) dan 5 menit dari Jembatan Kota Intan.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. KATEGORI MENU
INSERT INTO menu_categories (slug, name_id, name_en, description_id, description_en, order_index) VALUES
('makanan-utama', 'Makanan Utama', 'Main Courses', 'Hidangan khas nusantara dan Betawi autentik Kota Tua', 'Authentic Indonesian and Betawi specialties of Kota Tua', 1),
('camilan', 'Camilan & Kudapan', 'Traditional Snacks', 'Kudapan ringan dan jajanan pasar tempo dulu', 'Traditional light bites and heritage street snacks', 2),
('minuman-khas', 'Minuman Khas & Tradisional', 'Specialty & Heritage Drinks', 'Kesegaran rempah dan es tradisional pelepas dahaga', 'Refreshing herbal spices and traditional iced treats', 3),
('kopi-teh', 'Kopi & Teh', 'Coffee & Tea', 'Seduhan biji kopi nusantara dan teh wangi khas peranakan', 'Indonesian heritage beans brew and aromatic floral tea', 4);

-- 3. MENU MAKANAN & MINUMAN
INSERT INTO menu_items (category_slug, name_id, name_en, description_id, description_en, price, image_url, is_favorite, spicy_level, order_index) VALUES
('makanan-utama', 'Soto Betawi Kuah Santan Susu', 'Betawi Beef Soup (Coconut & Fresh Milk)', 'Potongan daging sapi empuk dengan kuah gurih rempah santan dan susu segar, disajikan dengan emping dan acar segar.', 'Tender beef cuts slow-cooked in rich aromatic coconut and fresh milk broth, served with emping crackers and pickles.', 45000, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', true, 1, 1),
('makanan-utama', 'Nasi Goreng Mega Rasa Kota Tua', 'Mega Rasa Special Heritage Fried Rice', 'Nasi goreng racikan bumbu rahasia warisan dengan suwiran ayam kampung, telur mata sapi, sate ayam, dan kerupuk udang.', 'Our signature fried rice with heirloom spices, shredded free-range chicken, sunny side egg, chicken satay, and shrimp crackers.', 38000, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80', true, 1, 2),
('makanan-utama', 'Ayam Goreng Lengkuas Mega Rasa', 'Crispy Galangal Spiced Fried Chicken', 'Ayam ungkep rempah ketumbar lengkuas goreng renyah keemasan, lalapan segar dan sambal terasi terong.', 'Tender marinated chicken with fragrant crispy golden galangal crumbs, fresh raw vegetables and spicy shrimp paste sambal.', 35000, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80', false, 2, 3),
('makanan-utama', 'Gado-Gado Siram Batavia', 'Batavia Warm Salad with Peanut Sauce', 'Sayuran segar rebus, kentang, tahu, tempe, dan telur rebus disiram bumbu kacang medok khas Batavia tempo dulu.', 'Steamed assorted vegetables, potatoes, tofu, tempeh, and boiled egg dressed in rich, velvety Batavia artisanal peanut sauce.', 30000, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', false, 0, 4),
('makanan-utama', 'Nasi Ulam Betawi Komplit', 'Betawi Herb-Spiced Rice Platter', 'Nasi putih diaduk serundeng kelapa sangrai wangi kemangi, disajikan dengan semur tahu kentang, dendeng manis, dan emping.', 'Fragrant steamed rice tossed with toasted coconut herbs and basil, served with sweet spiced beef jerky, braised tofu, and crackers.', 42000, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', false, 1, 5),

('camilan', 'Kerak Telor Spesial Bebek', 'Authentic Duck Egg Kerak Telor', 'Ketan putih gurih disangrai bersama telur bebek, ebi sangrai, kelapa serundeng, dan bawang goreng renyah.', 'Traditional Betawi toasted glutinous rice with rich duck egg, dried shrimp powder, toasted spiced coconut, and fried shallots.', 28000, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80', true, 0, 6),
('camilan', 'Tahu Gejrot Cirebon Pedas Manis', 'Spicy Sweet Crispy Tofu with Palm Sugar Dressing', 'Tahu pong goreng renyah disiram kuah asam jawa, gula aren, bawang merah, dan cabai rawit ulek segar.', 'Airy fried tofu cubes drenched in tangy tamarind, dark palm sugar glaze, crushed shallots, and fresh bird eye chilies.', 18000, 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80', false, 2, 7),
('camilan', 'Pisang Goreng Wijen Madu', 'Honey Sesame Crispy Banana Fritters', 'Pisang kepok manis berbalut tepung renyah tabur biji wijen dengan cocolan madu hutan alami.', 'Crispy caramelized local sweet plantain fritters sprinkled with toasted sesame seeds and wild honey dip.', 20000, 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80', true, 0, 8),
('camilan', 'Tempe Mendoan Purwokerto (Isi 4)', 'Purwokerto Mendoan Soft Fried Tempeh', 'Tempe tipis lapis adonan tepung daun bawang gurih, disajikan hangat bersama sambal kecap rawit.', 'Soft batter-coated fermented soybean patties with sliced spring onions, served piping hot with sweet soy chili dip.', 18000, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', false, 1, 9),

('minuman-khas', 'Es Selendang Mayang Betawi', 'Iced Selendang Mayang Cake', 'Kue puding hunkwe kenyal warna-warni khas Betawi, kuah santan gurih pandan dan gula merah cair segar.', 'Heritage colorful rice flour cake pudding served in rich iced coconut milk and fragrant liquid palm sugar nectar.', 20000, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', true, 0, 10),
('minuman-khas', 'Bir Pletok Rempah Tradisional (Dingin/Hangat)', 'Bir Pletok Herbal Elixir (Hot/Iced)', 'Minuman rempah non-alkohol legendaris Betawi racikan jahe, secang, kapulaga, serai, dan kayu manis.', 'Historic non-alcoholic herbal brew infused with fresh ginger, sappan wood for ruby tint, cardamom, lemongrass, and cinnamon.', 22000, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80', true, 0, 11),
('minuman-khas', 'Es Cendol Durian Mega Rasa', 'Iced Cendol with Fresh Durian', 'Cendol pandan alami, kuah santan kelapa murni, gula kelapa kental organik, dan topping daging durian asli.', 'Silky pandan drops in creamy coconut milk, slow-cooked palm sugar syrup, crowned with pure aromatic durian pulp.', 26000, 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80', false, 0, 12),
('minuman-khas', 'Es Jeruk Kelapa Muda', 'Young Coconut & Fresh Orange Juice', 'Perpaduan air dan serutan kelapa muda segar dengan perasan jeruk murni pelepas dahaga.', 'Fresh young coconut water and tender meat harmonized with pure squeezed sweet citrus juice.', 22000, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80', false, 0, 13),

('kopi-teh', 'Kopi Tubruk Rempah Kota Tua', 'Kota Tua Spiced Heritage Drip Coffee', 'Biji kopi robusta Jawa pilihan diseduh tradisional dengan sentuhan kayu manis dan cengkeh harum.', 'Selected Javanese Robusta beans brewed unfiltered with hints of aromatic sweet cinnamon and cloves.', 18000, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', true, 0, 14),
('kopi-teh', 'Es Kopi Susu Gula Aren Mega Rasa', 'Mega Rasa Iced Palm Sugar Milk Coffee', 'Espresso double shot dipadu susu segar creamy dan lelehan gula aren murni khas nusantara.', 'Double shot espresso blend combined with velvety fresh milk and rich unrefined organic palm sugar.', 22000, 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80', true, 0, 15),
('kopi-teh', 'Teh Poci Melati Gula Batu (Untuk 2 Orang)', 'Traditional Claypot Jasmine Tea with Rock Sugar', 'Seduhan daun teh melati wangi dalam poci tanah liat alami, disajikan dengan manisnya gula batu.', 'Fragrant whole leaf jasmine tea brewed inside an unglazed clay teapot, served with rock sugar crystals.', 25000, 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80', false, 0, 16);

-- 4. RUANG ACARA LANTAI ATAS
INSERT INTO event_spaces (
    slug, name_id, name_en, tagline_id, tagline_en,
    description_id, description_en,
    capacity_min, capacity_max, hourly_rate, minimum_hours,
    facilities_id, facilities_en,
    suitable_events_id, suitable_events_en,
    primary_image_url, gallery_image_urls
) VALUES (
    'ruang-fatahillah-lantai-2',
    'Ruang Acara Lantai 2 Mega Rasa',
    'Mega Rasa 2nd Floor Event Space',
    'Ruang eksklusif lantai atas ber-AC dengan pemandangan heritage dan fasilitas lengkap untuk acara istimewa Anda.',
    'Exclusive fully air-conditioned upper floor room with heritage ambience and complete amenities for your special moments.',
    'Terletak di lantai atas Kantin Mega Rasa dengan suasana hangat, tenang, dan privat di jantung Kota Tua Jakarta. Ruangan ini dilengkapi pencahayaan natural yang nyaman, pendingin ruangan (AC) dingin maksimal, proyektor & layar lebar, wireless mic, sound system modern, high-speed Wi-Fi, dan penataan meja/kursi yang fleksibel (model boardroom, theater, U-shape, maupun round table). Cocok untuk gathering instansi/kantor, arisan keluarga, reuni sekolah, workshop kreatif, maupun perayaan ulang tahun intim.',
    'Located on the top floor of Kantin Mega Rasa offering a warm, quiet, and private sanctuary in the heart of historic Kota Tua Jakarta. Fully equipped with natural daylight, heavy-duty air conditioning, HD projector & wide screen, wireless microphones, modern audio system, high-speed Wi-Fi, and versatile seating arrangements (boardroom, theater, U-shape, or dining round tables). Perfect for corporate gatherings, family arisan, school reunions, creative workshops, and intimate birthday celebrations.',
    10, 50, 350000, 2,
    ARRAY['Full Air Conditioning (AC)', 'Proyektor HD & Screen 100"', '2 Wireless Microphones & Audio System', 'High-Speed Wi-Fi 100 Mbps', 'Penataan Meja Fleksibel (Theater/Round/Classroom)', 'Toilet Bersih Khusus Lantai 2', 'Musholla Bersih & Nyaman', 'Area Khusus Prasmanan/Coffee Break'],
    ARRAY['Full Air Conditioning (AC)', 'HD Projector & 100" Screen', '2 Wireless Microphones & Sound System', 'High-Speed Wi-Fi 100 Mbps', 'Flexible Table/Chair Layouts (Theater/Round/Classroom)', 'Dedicated Clean Restroom on 2nd Floor', 'Prayer Room (Musholla)', 'Dedicated Buffet & Coffee Break Counter'],
    ARRAY['Gathering & Meeting Kantor', 'Reuni Sekolah / Komunitas', 'Arisan Keluarga & Sahabat', 'Workshop & Pelatihan', 'Perayaan Ulang Tahun / Syukuran', 'Press Conference & Peluncuran Buku'],
    ARRAY['Corporate Meetings & Gatherings', 'School & Alumni Reunions', 'Family & Community Arisan', 'Creative Workshops & Seminars', 'Birthday & Anniversary Celebrations', 'Press Conferences & Book Launches'],
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    ARRAY[
        'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'
    ]
);

-- 5. PAKET SEWA RUANG ACARA
INSERT INTO event_packages (
    space_slug, name_id, name_en, price_per_person, price_package, min_pax, duration_hours,
    features_id, features_en, badge_id, badge_en, order_index
) VALUES
(
    'ruang-fatahillah-lantai-2',
    'Paket Sewa Ruangan Saja (Room Only)',
    'Room Only Rental Package',
    0, 350000, 10, 2,
    ARRAY['Sewa ruang privat lantai 2 selama 2 jam (bisa tambah jam)', 'Full fasilitas: AC, Proyektor, Sound System, 2 Mic Wireless, Wi-Fi', 'Setting kursi & meja sesuai request', 'Air mineral gratis untuk seluruh peserta'],
    ARRAY['2 hours private room rental (extendable per hour)', 'Full amenities: AC, Projector, Sound System, 2 Wireless Mics, Wi-Fi', 'Custom chair & table arrangement', 'Complimentary mineral water for all attendees'],
    'Ekonomis', 'Budget Friendly', 1
),
(
    'ruang-fatahillah-lantai-2',
    'Paket Coffee Break & Kudapan',
    'Coffee Break & Heritage Snack Package',
    65000, 0, 15, 3,
    ARRAY['Penggunaan ruang privat selama 3 jam', 'Full fasilitas audio visual & Wi-Fi', '2 Pilihan kue/kudapan tradisional (Pisang Wijen, Tempe Mendoan, dll)', 'Free flow Kopi Tubruk Kota Tua, Teh Hangat Melati, dan Air Mineral'],
    ARRAY['3 hours private upper floor rental', 'Full AV equipment & Wi-Fi included', '2 Traditional snack selections (Crispy Sesame Banana, Mendoan, etc.)', 'Free-flow Kota Tua Coffee, Hot Jasmine Tea, and Mineral Water'],
    'Favorit Arisan', 'Arisan Favorite', 2
),
(
    'ruang-fatahillah-lantai-2',
    'Paket Prasmanan Mega Rasa Komplit',
    'Full Heritage Buffet Gathering Package',
    125000, 0, 20, 4,
    ARRAY['Penggunaan ruang privat selama 4 jam penuh', 'Full fasilitas audio visual, mic, proyektor, Wi-Fi, dan backdrop stand', 'Prasmanan lengkap: 1 Menu Utama Ayam/Daging, Sayur/Soto, Nasi, Sambal & Kerupuk', '1 Dessert tradisional (Es Selendang Mayang / Buah Segar)', 'Free flow Es Jeruk / Teh Manis & Air Mineral'],
    ARRAY['4 full hours of private venue usage', 'Complete AV, microphones, projector, Wi-Fi, and banner backdrop stand', 'Full Indonesian buffet: 1 Main Meat/Chicken dish, Vegetable/Soto, Rice, Sambal & Crackers', '1 Traditional dessert (Es Selendang Mayang or Seasonal Fresh Fruits)', 'Free-flow Iced Citrus / Sweet Tea & Mineral Water'],
    'Paling Laris', 'Best Value & Seller', 3
);

-- 6. PAKET NASI BOX & SNACK BOX (KATERING WISATA KOTA TUA)
INSERT INTO nasi_box_packages (
    slug, name_id, name_en, description_id, description_en,
    price, min_order, items_id, items_en, badge_id, badge_en,
    image_url, is_popular, order_index
) VALUES
(
    'paket-hemat-wisatawan',
    'Paket Hemat Wisatawan',
    'Tour Group Budget Meal Box',
    'Pilihan paling ekonomis & mengenyangkan untuk rombongan pelajar, study tour, dan rombongan bus wisata Kota Tua.',
    'The most economical and filling choice for students, study tours, and bus tour groups visiting Kota Tua.',
    22000, 10,
    ARRAY['Nasi Putih Pulen / Nasi Kuning Gurih', 'Ayam Goreng Lengkuas Mega Rasa', 'Tempe Orek Manis Gurih', 'Telur Dadar Iris / Sambal Goreng Kentang', 'Lalapan Timun & Sambal Terasi', 'Kerupuk Renyah', 'Air Mineral Cup'],
    ARRAY['Fluffy Steamed White Rice or Savory Turmeric Rice', 'Crispy Galangal Fried Chicken', 'Sweet & Savory Tempeh Orek', 'Shredded Omelette or Spiced Potato Cubes', 'Fresh Cucumber & Spicy Sambal', 'Crispy Crackers', 'Sealed Cup Mineral Water'],
    'Paling Hemat', 'Best Budget',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    false, 1
),
(
    'paket-selera-nusantara',
    'Paket Selera Nusantara',
    'Nusantara Delight Meal Box',
    'Paket terfavorit dengan lauk ganda ayam bumbu rujak & telur balado, pas untuk rombongan keluarga besar, arisan, & gathering kantor.',
    'Our best-selling package featuring grilled chicken & balado egg, ideal for family reunions and office gatherings.',
    28000, 10,
    ARRAY['Nasi Putih Pulen Wangi', 'Ayam Bakar Bumbu Rujak / Ayam Goreng Lengkuas', 'Telur Balado Bulat Utuh', 'Tumis Buncis Jagung Manis', 'Sambal Bajak & Lalap Segar', 'Kerupuk Udang', 'Buah Pisang Segar', 'Air Mineral Botol 330ml'],
    ARRAY['Aromatic Fragrant Steamed Rice', 'Spiced Honey Grilled Chicken or Galangal Fried Chicken', 'Whole Hard-Boiled Egg in Balado Chili Sauce', 'Sautéed French Beans & Sweet Corn', 'Bajak Sambal & Fresh Greens', 'Crispy Shrimp Crackers', 'Fresh Sweet Banana', 'Bottled Mineral Water 330ml'],
    'Paling Laris', 'Most Popular',
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    true, 2
),
(
    'paket-spesial-batavia-komplit',
    'Paket Spesial Batavia Komplit',
    'Royal Batavia Heritage Feast Box',
    'Paket premium cita rasa khas Batavia dengan daging sapi empal serundeng, cocok untuk VIP, rapat instansi, atau tamu istimewa.',
    'Premium heritage lunch box with tender beef empal and Betawi spices, perfect for VIP guests and corporate luncheons.',
    35000, 10,
    ARRAY['Nasi Ulam Betawi Wangi / Nasi Liwet Daun Jeruk', 'Empal Sapi Serundeng Manis / Semur Daging Gurih', 'Ayam Goreng Lengkuas / Suwir Rica', 'Bakwan Jagung Renyah / Sambal Goreng Ati', 'Acar Kuning Batavia & Emping Melinjo', 'Sambal Terasi Jeruk Limau', 'Puding Pandan / Buah Potong Segar', 'Air Mineral Botol 330ml'],
    ARRAY['Traditional Betawi Herb Rice or Lime-Leaf Rice', 'Tender Braised Beef Empal with Toasted Coconut or Semur Beef', 'Galangal Fried Chicken or Shredded Spiced Chicken', 'Crispy Sweet Corn Fritter or Spiced Potato Liver', 'Batavia Yellow Pickles & Emping Melinjo Crackers', 'Aromatic Kaffir Lime Sambal', 'Pandan Coconut Pudding or Fresh Cut Seasonal Fruit', 'Bottled Mineral Water 330ml'],
    'Pilihan VIP', 'VIP Heritage',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    false, 3
),
(
    'paket-snack-box-tradisional',
    'Paket Snack Box Tradisional',
    'Traditional Heritage Snack Box',
    'Kudapan lezat tempo dulu untuk pengganjal lapar di perjalanan bus wisata, coffee break acara, atau pembagian saat keliling museum.',
    'Delightful traditional Indonesian snacks for bus transit, museum walking breaks, and event coffee sessions.',
    15000, 15,
    ARRAY['2 Pilihan Kue Tradisional (Risoles Ragout Ayam & Dadar Gulung Pandan Kelapa)', 'Kacang Bawang Gurih Renyah', 'Permen Segar & Tisu Higienis', 'Air Mineral Cup'],
    ARRAY['2 Heritage Pastries (Savory Chicken Ragout Risoles & Sweet Pandan Coconut Roll)', 'Crispy Garlic Roasted Peanuts', 'Refreshing Mint & Sanitized Napkin', 'Sealed Cup Mineral Water'],
    'Coffee Break', 'Coffee Break',
    'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    false, 4
);

-- 7. ULASAN GOOGLE MAPS (TESTIMONI PENGUNJUNG)
INSERT INTO google_reviews (
    author_name, author_badge_id, author_badge_en,
    rating, relative_time_id, relative_time_en,
    review_text_id, review_text_en,
    category, ordered_items_id, ordered_items_en, likes_count
) VALUES
(
    'Budi Pratama',
    'Local Guide · 142 ulasan', 'Local Guide · 142 reviews',
    5, '1 minggu yang lalu', '1 week ago',
    'Salah satu hidden gem kuliner terbaik di Kota Tua Jakarta! Soto Betawi kuah santan susunya benar-benar gurih medok dan dagingnya empuk banget. Tempatnya sangat bersih dan ber-AC dingin, penyelamat banget setelah panas-panasan jalan di Taman Fatahillah. Es Selendang Mayang-nya juga otentik. Pasti akan balik lagi bareng teman kantor!',
    'One of the best culinary hidden gems in Old Batavia! The Soto Betawi with coconut-milk broth is incredibly rich and the beef melts in your mouth. Very clean, cold air conditioning—a true lifesaver after walking around Fatahillah Square under the sun. Authentic Es Selendang Mayang too. Will definitely return with colleagues!',
    'culinary',
    ARRAY['Soto Betawi Kuah Santan Susu', 'Es Selendang Mayang Betawi', 'Tempe Mendoan'],
    ARRAY['Betawi Beef Soup', 'Iced Selendang Mayang', 'Crispy Mendoan Tempeh'],
    28
),
(
    'Sarah Jenkins',
    'Wisatawan Mancanegara (Australia)', 'Traveler from Melbourne, Australia',
    5, '2 minggu yang lalu', '2 weeks ago',
    'Pengalaman bersantap pertama saya di Jakarta dan sangat luar biasa! Stafnya bisa berbahasa Inggris dengan sangat ramah dan membantu kami memilih menu yang pas untuk lidah barat. Nasi Goreng Mega Rasa dan Tahu Gejrot rasanya menakjubkan. Tempatnya higienis dan suasananya sangat homey tempo dulu. Highly recommended untuk turis internasional!',
    'My first dining experience in Jakarta and it was magnificent! The staff spoke English wonderfully and patiently guided us through traditional options. The Mega Rasa Fried Rice and crispy Tahu Gejrot tasted out of this world. Spotlessly clean and nostalgic colonial atmosphere. Highly recommended for international travelers!',
    'tourist',
    ARRAY['Nasi Goreng Mega Rasa Kota Tua', 'Tahu Gejrot Cirebon', 'Es Jeruk Kelapa Muda'],
    ARRAY['Mega Rasa Heritage Fried Rice', 'Tahu Gejrot', 'Young Coconut Citrus'],
    35
),
(
    'Hendra Kusuma',
    'Koordinator Study Tour (Surabaya)', 'School Study Tour Leader',
    5, '3 minggu yang lalu', '3 weeks ago',
    'Pesan 120 box Paket Hemat Wisatawan untuk rombongan bus anak-anak sekolah kami. Pengantaran tepat waktu di kantong parkir bus Jl. Cengkeh, nasinya masih hangat pulen, ayam lengkuasnya renyah gurih disukai semua anak. Kemasannya rapi bersekat dengan sendok tisu higienis. Pelayanan WhatsApp sangat cepat dan gratis ongkir. Terima kasih banyak Kantin Mega Rasa!',
    'Ordered 120 boxes of Tour Group Budget Meal Box for our school bus tour. Delivered punctually right to the Cengkeh bus parking lot, the rice was warm and fluffy, and the crispy galangal chicken was loved by all students. Sturdy multi-compartment boxes with sealed cutlery. Super responsive WhatsApp coordination and free delivery. Thank you Kantin Mega Rasa!',
    'nasi_box',
    ARRAY['Paket Nasi Box Hemat Wisatawan (120 Box)', 'Air Mineral'],
    ARRAY['Budget Meal Box Package (120 Boxes)', 'Mineral Water'],
    42
),
(
    'Dra. Maya Handayani',
    'Penyelenggara Reuni Alumni UI', 'Alumni Reunion Organizer',
    5, '1 bulan yang lalu', '1 month ago',
    'Sewa ruang acara lantai 2 untuk reuni angkatan 35 orang. Ruangannya privat, AC sangat dingin, sound system dan wireless mic bekerja jernih, ada proyektor juga. Paket prasmanan makanannya sangat enak dan porsi berlimpah. Semua tamu memuji pilihan tempat ini di jantung Kota Tua. Pelayanan stafnya luar biasa sigap!',
    'Rented the 2nd-floor private space for our 35-person alumni reunion. Private sanctuary, icy cold AC, crystal-clear sound system and wireless mics, plus HD projector. The heritage buffet was delectable with generous portions. All guests praised the venue choice in the heart of Kota Tua. Top-notch staff hospitality!',
    'event_space',
    ARRAY['Sewa Ruang Privat Lantai 2', 'Paket Prasmanan Mega Rasa Komplit'],
    ARRAY['2nd Floor Private Venue', 'Full Heritage Buffet Gathering Package'],
    19
),
(
    'Rian Firmansyah',
    'Local Guide · 86 ulasan', 'Local Guide · 86 reviews',
    5, '1 bulan yang lalu', '1 month ago',
    'Langganan makan siang kalau lagi dinas ke area Kota Tua / Kali Besar. Ayam Goreng Lengkuasnya juara, bumbunya meresap sampai ke tulang dengan taburan serundeng lengkuas melimpah. Tempatnya bersih, wifi cepat, dan toiletnya terawat wangi. Jarang nemu tempat makan di Kota Tua yang harga bersahabat tapi kualitas rasa bintang lima.',
    'My go-to lunch spot whenever I have business around Kota Tua / Kali Besar. The Galangal Fried Chicken is unbeatable with generous spiced crispy toppings. Clean tables, high-speed Wi-Fi, and spotless restrooms. Rare to find such an honest price with five-star restaurant standards in Old Town.',
    'culinary',
    ARRAY['Ayam Goreng Lengkuas Mega Rasa', 'Es Kopi Susu Gula Aren'],
    ARRAY['Crispy Galangal Fried Chicken', 'Palm Sugar Iced Coffee'],
    16
),
(
    'Kenji & Yuka Sato',
    'Wisatawan Jepang (Tokyo)', 'Tourists from Tokyo, Japan',
    5, '2 bulan yang lalu', '2 months ago',
    'Kami mampir setelah mengunjungi Museum Wayang. Mencoba Kopi Tubruk Rempah dan Kerak Telor bebek. Rasa rempahnya sangat harum dan menenangkan. Suasana resto sangat tenang dengan lagu-lagu tradisional yang menyejukkan. Stafnya sangat sopan kepada turis asing. Arigatou gozaimasu!',
    'We stopped by after visiting Wayang Museum. Tried the Spiced Heritage Drip Coffee and duck egg Kerak Telor. The aroma of Indonesian herbs was soothing and exquisite. Very peaceful ambiance with calming traditional music. Staff were polite and welcoming to foreigners. Arigatou gozaimasu!',
    'tourist',
    ARRAY['Kerak Telor Spesial Bebek', 'Kopi Tubruk Rempah Kota Tua', 'Pisang Goreng Wijen Madu'],
    ARRAY['Duck Egg Kerak Telor', 'Spiced Heritage Coffee', 'Honey Sesame Banana Fritters'],
    24
);

-- ==============================================================================
-- SELESAI! SEMUA TABEL, POLICIES, DAN DATA AWAL TELAH SIAP DIGUNAKAN.
-- ==============================================================================
