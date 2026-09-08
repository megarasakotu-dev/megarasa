-- ==============================================================================
-- KANTIN MEGA RASA - SUPABASE DATABASE SCHEMA & SEED DATA
-- Lokasi: Kawasan Wisata Kota Tua, Jakarta
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. DROP EXISTING TABLES IF RE-RUNNING
DROP TABLE IF EXISTS contact_inquiries CASCADE;
DROP TABLE IF EXISTS event_packages CASCADE;
DROP TABLE IF EXISTS event_spaces CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menu_categories CASCADE;

-- 3. TABEL KATEGORI MENU
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

-- 4. TABEL MENU MAKANAN & MINUMAN
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
    spicy_level INT DEFAULT 0, -- 0: no spice, 1-3
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABEL RUANG ACARA (LANTAI ATAS)
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

-- 6. TABEL PAKET SEWA RUANG ACARA
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

-- 7. TABEL FORMULIR RESERVASI & KONTAK
CREATE TABLE contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone_number VARCHAR(50) NOT NULL,
    inquiry_type VARCHAR(50) NOT NULL, -- 'dining_reservation' OR 'event_space_rental' OR 'general'
    event_date DATE,
    estimated_pax INT,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'contacted', 'confirmed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. ROW LEVEL SECURITY (RLS)
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Public Read & Write Policies
CREATE POLICY "Public read for menu_categories" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Public read for menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read for event_spaces" ON event_spaces FOR SELECT USING (true);
CREATE POLICY "Public read for event_packages" ON event_packages FOR SELECT USING (true);

-- Public CRUD Policies for Admin operations
CREATE POLICY "Enable all for menu_items" ON menu_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for event_spaces" ON event_spaces FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for event_packages" ON event_packages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for menu_categories" ON menu_categories FOR ALL USING (true) WITH CHECK (true);

-- Public Insert Policy for inquiries form
CREATE POLICY "Public insert for contact_inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);

-- 9. SEED DATA
-- Kategori
INSERT INTO menu_categories (slug, name_id, name_en, description_id, description_en, order_index) VALUES
('makanan-utama', 'Makanan Utama', 'Main Courses', 'Hidangan khas nusantara dan Betawi autentik Kota Tua', 'Authentic Indonesian and Betawi specialties of Kota Tua', 1),
('camilan', 'Camilan & Kudapan', 'Traditional Snacks', 'Kudapan ringan dan jajanan pasar tempo dulu', 'Traditional light bites and heritage street snacks', 2),
('minuman-khas', 'Minuman Khas & Tradisional', 'Specialty & Heritage Drinks', 'Kesegaran rempah dan es tradisional pelepas dahaga', 'Refreshing herbal spices and traditional iced treats', 3),
('kopi-teh', 'Kopi & Teh', 'Coffee & Tea', 'Seduhan biji kopi nusantara dan teh wangi khas peranakan', 'Indonesian heritage beans brew and aromatic floral tea', 4);

-- Menu Items
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

-- Ruang Acara Lantai Atas
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

-- Paket Acara
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
