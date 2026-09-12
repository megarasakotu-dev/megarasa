'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { NasiBoxPackage } from '@/lib/mock-data';
import { trackNasiBoxOrder } from '@/lib/gtm';
import {
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Clock,
  MapPin,
  Calendar,
  MessageCircle,
  Truck,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  packages: NasiBoxPackage[];
  locale: string;
  whatsappNumber: string;
}

export default function NasiBoxOrderCard({ packages, locale, whatsappNumber }: Props) {
  const t = useTranslations('nasiBox');
  const tCommon = useTranslations('common');

  // Selected package for calculation (default to first or popular)
  const defaultPkg = packages.find((p) => p.is_popular) || packages[0];
  const [selectedPkgId, setSelectedPkgId] = useState<string>(defaultPkg?.id || '');
  const [quantity, setQuantity] = useState<number>(defaultPkg?.min_order || 10);
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('11:30 WIB');
  const [deliveryLocation, setDeliveryLocation] = useState<string>('Plaza Taman Fatahillah (Depan Museum Sejarah)');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');

  const calculatorRef = useRef<HTMLDivElement>(null);

  const currentPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];

  const handleSelectPackage = (pkg: NasiBoxPackage) => {
    setSelectedPkgId(pkg.id);
    if (quantity < pkg.min_order) {
      setQuantity(pkg.min_order);
    }
    // Smooth scroll to calculator
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleQtyChange = (newQty: number) => {
    const min = currentPkg?.min_order || 10;
    if (newQty >= min) {
      setQuantity(newQty);
    }
  };

  const estimatedTotal = currentPkg ? currentPkg.price * quantity : 0;

  const handleOrderWhatsApp = () => {
    const pkgName = locale === 'en' ? currentPkg.name_en : currentPkg.name_id;
    const finalLocation = deliveryLocation === 'Lainnya' ? customLocation : deliveryLocation;

    // Track GTM Event
    trackNasiBoxOrder(pkgName, quantity, estimatedTotal);

    const message =
      locale === 'en'
        ? `*NEW NASI BOX / MEAL BOX ORDER - KANTIN MEGA RASA*\n\n` +
          `🍱 *Package*: ${pkgName}\n` +
          `📦 *Quantity*: ${quantity} Boxes\n` +
          `💵 *Estimated Total*: ${tCommon('currency')} ${estimatedTotal.toLocaleString('id-ID')}\n` +
          `📅 *Delivery Date*: ${deliveryDate || '-'}\n` +
          `⏰ *Handover Time*: ${deliveryTime || '-'}\n` +
          `📍 *Kota Tua Location*: ${finalLocation || '-'}\n` +
          `📝 *Notes*: ${orderNotes || '-'}\n\n` +
          `Hello Kantin Mega Rasa team, I would like to confirm this meal box order for our group in Kota Tua.`
        : `*PESANAN NASI BOX - KANTIN MEGA RASA KOTA TUA*\n\n` +
          `🍱 *Paket*: ${pkgName}\n` +
          `📦 *Jumlah*: ${quantity} Box\n` +
          `💵 *Estimasi Total*: ${tCommon('currency')} ${estimatedTotal.toLocaleString('id-ID')}\n` +
          `📅 *Tanggal Pengantaran*: ${deliveryDate || '-'}\n` +
          `⏰ *Jam Serah Terima*: ${deliveryTime || '-'}\n` +
          `📍 *Titik Antar di Kota Tua*: ${finalLocation || '-'}\n` +
          `📝 *Catatan Tambahan*: ${orderNotes || '-'}\n\n` +
          `Halo tim Kantin Mega Rasa, saya ingin konfirmasi ketersediaan pesanan nasi box ini untuk rombongan kami.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const locationOptions = [
    'Plaza Taman Fatahillah (Depan Museum Sejarah)',
    'Stasiun Jakarta Kota (Pintu Keluar Beos)',
    'Kantong Parkir Bus Pariwisata Jl. Cengkeh',
    'Museum Wayang / Bank Mandiri / Keramik',
    'Jembatan Kota Intan & Kali Besar Barat',
    'Lainnya',
  ];

  return (
    <div className="space-y-16">
      {/* 1. PACKAGES CATALOG */}
      <section>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-[#b43a22]" />
            <span>{locale === 'en' ? 'Authentic Indonesian Meal Boxes' : 'Katalog Pilihan Nasi Box'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2e180e]">
            {t('packages.title')}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            {t('packages.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const name = locale === 'en' ? pkg.name_en : pkg.name_id;
            const desc = locale === 'en' ? pkg.description_en : pkg.description_id;
            const badge = locale === 'en' ? pkg.badge_en : pkg.badge_id;
            const items = locale === 'en' ? pkg.items_en : pkg.items_id;
            const isSelected = selectedPkgId === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl overflow-hidden bg-white border-2 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#b43a22] shadow-xl ring-2 ring-[#b43a22]/20 scale-[1.02]'
                    : 'border-stone-200 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                {/* Image & Badges */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <Image
                    src={pkg.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {badge && (
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
                        pkg.is_popular
                          ? 'bg-[#b43a22] text-white'
                          : 'bg-amber-500 text-stone-900'
                      }`}>
                        <Sparkles className="w-3 h-3" />
                        {badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-medium opacity-90 block">
                      {t('packages.minOrderLabel', { count: pkg.min_order })}
                    </span>
                    <span className="text-xl sm:text-2xl font-black font-serif">
                      {tCommon('currency')} {pkg.price.toLocaleString('id-ID')}
                      <span className="text-xs font-normal opacity-80"> {t('packages.perBox')}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                      {name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed line-clamp-2">
                      {desc}
                    </p>

                    {/* Menu Items List */}
                    <div className="pt-4 border-t border-stone-100 mt-4 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        {t('packages.menuIncludes')}
                      </span>
                      <ul className="space-y-1.5">
                        {items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 leading-tight">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => handleSelectPackage(pkg)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#b43a22] text-white shadow-md'
                          : 'bg-amber-50 text-[#b43a22] hover:bg-[#b43a22] hover:text-white'
                      }`}
                    >
                      <span>{isSelected ? (locale === 'en' ? 'Package Selected' : 'Paket Terpilih') : t('packages.orderBtn')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. ORDER CALCULATOR & WHATSAPP ACTION CARD */}
      <section
        ref={calculatorRef}
        className="rounded-3xl bg-gradient-to-br from-[#2d170e] via-[#381c10] to-[#1d0d08] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-amber-900/40 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('calculator.freeDeliveryBadge')}</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
              {t('calculator.title')}
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm">
              {t('calculator.subtitle')}
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Inputs */}
            <div className="lg:col-span-7 space-y-5 bg-black/20 p-6 rounded-2xl border border-white/10 backdrop-blur-xs">
              {/* Select Package */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block">
                  {t('calculator.selectPackage')}
                </label>
                <select
                  value={selectedPkgId}
                  onChange={(e) => {
                    const found = packages.find((p) => p.id === e.target.value);
                    if (found) handleSelectPackage(found);
                  }}
                  aria-label={t('calculator.selectPackage')}
                  className="w-full px-4 py-3 rounded-xl bg-stone-900/90 border border-amber-500/30 text-white text-sm outline-none focus:border-amber-400 cursor-pointer"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id} className="bg-stone-900 text-white">
                      {locale === 'en' ? pkg.name_en : pkg.name_id} — {tCommon('currency')} {pkg.price.toLocaleString('id-ID')} / box
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                    {t('calculator.boxQty')}
                  </label>
                  <span className="text-xs text-stone-400">
                    {t('packages.minOrderLabel', { count: currentPkg?.min_order || 10 })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleQtyChange(quantity - 5)}
                    disabled={quantity <= (currentPkg?.min_order || 10)}
                    className="w-12 h-12 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white text-lg font-bold border border-white/10 transition-colors cursor-pointer"
                    aria-label="Kurang 5 box"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <input
                    type="number"
                    min={currentPkg?.min_order || 10}
                    value={quantity}
                    onChange={(e) => handleQtyChange(parseInt(e.target.value, 10) || (currentPkg?.min_order || 10))}
                    aria-label={t('calculator.boxQty')}
                    className="flex-1 text-center py-3 px-4 rounded-xl bg-stone-900/90 border border-amber-500/30 text-white font-bold text-lg outline-none focus:border-amber-400"
                  />

                  <button
                    type="button"
                    onClick={() => handleQtyChange(quantity + 5)}
                    className="w-12 h-12 rounded-xl bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-white text-lg font-bold border border-white/10 transition-colors cursor-pointer"
                    aria-label="Tambah 5 box"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick select buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] text-stone-400">{locale === 'en' ? 'Quick:' : 'Cepat:'}</span>
                  {[20, 50, 100, 200].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleQtyChange(num)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        quantity === num
                          ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                          : 'bg-stone-800/80 text-stone-300 border-white/10 hover:border-amber-400'
                      }`}
                    >
                      {num} box
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t('calculator.date')}</span>
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-amber-500/30 text-white text-sm outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t('calculator.time')}</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    placeholder={t('calculator.timePlaceholder')}
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-amber-500/30 text-white text-sm outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Delivery Spot in Kota Tua */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t('calculator.location')}</span>
                </label>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  aria-label={t('calculator.location')}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-amber-500/30 text-white text-sm outline-none focus:border-amber-400 cursor-pointer"
                >
                  {locationOptions.map((opt, idx) => (
                    <option key={idx} value={opt} className="bg-stone-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>

                {deliveryLocation === 'Lainnya' && (
                  <input
                    type="text"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    placeholder={t('calculator.locationPlaceholder')}
                    className="w-full mt-2 px-4 py-2.5 rounded-xl bg-stone-900/90 border border-amber-500/30 text-white text-sm outline-none focus:border-amber-400"
                  />
                )}
              </div>

              {/* Special Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block">
                  {t('calculator.notes')}
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder={t('calculator.notesPlaceholder')}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-amber-500/30 text-white text-sm outline-none focus:border-amber-400 resize-none"
                />
              </div>
            </div>

            {/* Right Col: Price Summary & WhatsApp Action */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-stone-900/80 border border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {locale === 'en' ? 'Order Summary' : 'Ringkasan Pesanan'}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white">
                    {locale === 'en' ? currentPkg?.name_en : currentPkg?.name_id}
                  </h3>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10 text-sm">
                  <div className="flex items-center justify-between text-stone-300">
                    <span>{locale === 'en' ? 'Price per Box' : 'Harga Satuan'}</span>
                    <span className="font-medium text-white">
                      {tCommon('currency')} {currentPkg?.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-stone-300">
                    <span>{locale === 'en' ? 'Quantity' : 'Jumlah Pesanan'}</span>
                    <span className="font-bold text-white">
                      {quantity} box
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-stone-300">
                    <span>{locale === 'en' ? 'Delivery Area' : 'Ongkos Kirim Kota Tua'}</span>
                    <span className="font-bold text-emerald-400 uppercase text-xs">
                      {locale === 'en' ? 'FREE' : 'GRATIS'}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block">
                      {t('calculator.totalEstimate')}
                    </span>
                    <span className="font-serif font-black text-2xl sm:text-3xl text-amber-400">
                      {tCommon('currency')} {estimatedTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Order CTA Button */}
                <button
                  type="button"
                  onClick={handleOrderWhatsApp}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                  <span>{t('calculator.btnSubmit')}</span>
                </button>

                <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                  {t('calculator.disclaimer')}
                </p>
              </div>

              {/* Quality Guarantee Note */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-300 leading-relaxed">
                  <span className="font-bold text-white block mb-0.5">
                    {locale === 'en' ? '100% Halal & Fresh Guarantee' : 'Jaminan 100% Halal & Masakan Segar'}
                  </span>
                  {locale === 'en'
                    ? 'All meals are cooked fresh in our kitchen right before your scheduled delivery time.'
                    : 'Semua masakan diolah dari bahan segar di dapur Kantin Mega Rasa sesaat sebelum waktu serah terima.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
