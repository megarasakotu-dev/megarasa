'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { NasiBoxPackage } from '@/lib/mock-data';
import {
  getNasiBoxPackages,
  createNasiBoxPackage,
  updateNasiBoxPackage,
  deleteNasiBoxPackage,
} from '@/lib/data-service';
import ImageUploader from './ImageUploader';
import {
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Loader2,
  CheckCircle,
  XCircle,
  X,
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  Truck,
  Check,
} from 'lucide-react';

export default function NasiBoxManager({
  initialPackages,
}: {
  initialPackages: NasiBoxPackage[];
}) {
  const [packages, setPackages] = useState<NasiBoxPackage[]>(initialPackages);
  const [isLoading, setIsLoading] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<NasiBoxPackage | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Translation spinners
  const [isTranslatingName, setIsTranslatingName] = useState(false);
  const [isTranslatingDesc, setIsTranslatingDesc] = useState(false);
  const [isTranslatingItems, setIsTranslatingItems] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    slug: '',
    name_id: '',
    name_en: '',
    description_id: '',
    description_en: '',
    price: 25000,
    min_order: 10,
    items_id_text: '',
    items_en_text: '',
    badge_id: 'Paling Laris',
    badge_en: 'Most Popular',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    is_popular: false,
    order_index: 1,
  });

  const refreshPackages = async () => {
    setIsLoading(true);
    try {
      const data = await getNasiBoxPackages();
      setPackages(data);
    } catch (err) {
      console.error('Failed to reload nasi box packages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshPackages();
  }, []);

  const callTranslateApi = async (text: string): Promise<string> => {
    if (!text.trim()) return '';
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, from: 'id', to: 'en' }),
      });
      const data = await res.json();
      return data.translated || text;
    } catch (err) {
      console.error('Auto translate error:', err);
      return text;
    }
  };

  const handleTranslateName = async () => {
    if (!formData.name_id.trim()) return;
    setIsTranslatingName(true);
    const res = await callTranslateApi(formData.name_id);
    setFormData((prev) => ({ ...prev, name_en: res }));
    setIsTranslatingName(false);
  };

  const handleTranslateDesc = async () => {
    if (!formData.description_id.trim()) return;
    setIsTranslatingDesc(true);
    const res = await callTranslateApi(formData.description_id);
    setFormData((prev) => ({ ...prev, description_en: res }));
    setIsTranslatingDesc(false);
  };

  const handleTranslateItems = async () => {
    if (!formData.items_id_text.trim()) return;
    setIsTranslatingItems(true);
    const lines = formData.items_id_text.split('\n').filter((l) => l.trim().length > 0);
    const translatedLines = await Promise.all(
      lines.map(async (line) => await callTranslateApi(line.trim()))
    );
    setFormData((prev) => ({
      ...prev,
      items_en_text: translatedLines.join('\n'),
    }));
    setIsTranslatingItems(false);
  };

  const openAddModal = () => {
    setEditingPkg(null);
    setSaveError(null);
    setSaveSuccess(false);
    setFormData({
      slug: `paket-${Date.now()}`,
      name_id: '',
      name_en: '',
      description_id: '',
      description_en: '',
      price: 25000,
      min_order: 10,
      items_id_text: 'Nasi Putih Pulen\nAyam Goreng Lengkuas\nTempe Orek\nSambal & Kerupuk\nAir Mineral',
      items_en_text: 'Steamed Rice\nGalangal Fried Chicken\nTempeh Orek\nSambal & Crackers\nMineral Water',
      badge_id: 'Hemat',
      badge_en: 'Budget',
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      is_popular: false,
      order_index: packages.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: NasiBoxPackage) => {
    setEditingPkg(pkg);
    setSaveError(null);
    setSaveSuccess(false);
    setFormData({
      slug: pkg.slug,
      name_id: pkg.name_id,
      name_en: pkg.name_en,
      description_id: pkg.description_id,
      description_en: pkg.description_en,
      price: pkg.price,
      min_order: pkg.min_order,
      items_id_text: pkg.items_id.join('\n'),
      items_en_text: pkg.items_en.join('\n'),
      badge_id: pkg.badge_id,
      badge_en: pkg.badge_en,
      image_url: pkg.image_url,
      is_popular: pkg.is_popular,
      order_index: pkg.order_index,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    // Auto-translate name & description if empty
    let finalNameEn = formData.name_en.trim();
    if (!finalNameEn && formData.name_id.trim()) {
      finalNameEn = await callTranslateApi(formData.name_id);
    }

    let finalDescEn = formData.description_en.trim();
    if (!finalDescEn && formData.description_id.trim()) {
      finalDescEn = await callTranslateApi(formData.description_id);
    }

    const itemsId = formData.items_id_text
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    let itemsEn = formData.items_en_text
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    if (itemsEn.length === 0 && itemsId.length > 0) {
      itemsEn = await Promise.all(itemsId.map((line) => callTranslateApi(line)));
    }

    const payload = {
      slug: formData.slug || `paket-${Date.now()}`,
      name_id: formData.name_id,
      name_en: finalNameEn,
      description_id: formData.description_id,
      description_en: finalDescEn,
      price: Number(formData.price),
      min_order: Number(formData.min_order),
      items_id: itemsId,
      items_en: itemsEn,
      badge_id: formData.badge_id,
      badge_en: formData.badge_en,
      image_url: formData.image_url,
      is_popular: formData.is_popular,
      order_index: Number(formData.order_index),
    };

    if (editingPkg) {
      const res = await updateNasiBoxPackage(editingPkg.id, payload);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          refreshPackages();
        }, 600);
      } else {
        setSaveError(res.error || 'Gagal menyimpan perubahan');
      }
    } else {
      const res = await createNasiBoxPackage(payload);
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          refreshPackages();
        }, 600);
      } else {
        setSaveError(res.error || 'Gagal menambahkan paket');
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async (pkg: NasiBoxPackage) => {
    if (!confirm(`Hapus paket nasi box "${pkg.name_id}"?`)) return;
    const res = await deleteNasiBoxPackage(pkg.id);
    if (res.success) {
      refreshPackages();
    } else {
      alert(res.error || 'Gagal menghapus paket');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#b43a22]" />
            <span>Kelola Paket Nasi Box & Katering</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Ubah harga per box, komposisi lauk, minimal order, dan terjemahan otomatis bahasa Inggris.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshPackages}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors cursor-pointer"
            title="Muat Ulang"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-[#b43a22] hover:bg-[#962a14] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Paket Nasi Box</span>
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              {/* Header Image */}
              <div className="relative aspect-16/9 bg-stone-100 overflow-hidden">
                <Image
                  src={pkg.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                  alt={pkg.name_id}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {pkg.badge_id && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[11px] shadow-xs">
                      {pkg.badge_id}
                    </span>
                  )}
                  {pkg.is_popular && (
                    <span className="px-2 py-0.5 rounded-full bg-[#b43a22] text-white font-bold text-[11px] shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Populer
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-bold font-serif">
                  Rp {pkg.price.toLocaleString('id-ID')} / box
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {pkg.name_id}
                  </h3>
                  <p className="text-xs text-stone-500 italic mt-0.5">
                    {pkg.name_en}
                  </p>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2">
                  {pkg.description_id}
                </p>

                <div className="pt-3 border-t border-stone-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-stone-600">
                    <span className="font-semibold">Minimal Order:</span>
                    <span className="font-bold text-stone-900">{pkg.min_order} box</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span className="font-semibold">Jumlah Lauk/Item:</span>
                    <span className="font-bold text-stone-900">{pkg.items_id.length} item</span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                  <span className="text-[11px] font-bold text-amber-900 uppercase block mb-1">
                    Isi Menu Box:
                  </span>
                  <ul className="text-xs text-stone-700 space-y-0.5 list-disc list-inside">
                    {pkg.items_id.slice(0, 4).map((item, idx) => (
                      <li key={idx} className="truncate">{item}</li>
                    ))}
                    {pkg.items_id.length > 4 && (
                      <li className="text-stone-400 italic">+{pkg.items_id.length - 4} item lainnya</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(pkg)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(pkg)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  {editingPkg ? 'Edit Paket Nasi Box' : 'Tambah Paket Nasi Box Baru'}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Lengkapi informasi dalam Bahasa Indonesia & Inggris (auto-translate tersedia).
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{saveError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Row: Name ID & EN */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Nama Paket (Bahasa Indonesia) *
                  </label>
                  <button
                    type="button"
                    onClick={handleTranslateName}
                    disabled={isTranslatingName || !formData.name_id}
                    className="text-xs text-amber-800 hover:text-[#b43a22] font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isTranslatingName ? 'Menerjemahkan...' : 'Auto Translate ke EN'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formData.name_id}
                  onChange={(e) => setFormData({ ...formData, name_id: e.target.value })}
                  placeholder="Contoh: Paket Hemat Wisatawan"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
                />

                <label className="text-xs font-bold text-stone-700 uppercase block">
                  Nama Paket (English)
                </label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  placeholder="e.g. Tour Group Budget Meal Box"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
                />
              </div>

              {/* Row: Price & Min Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase block">
                    Harga per Box (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    min={5000}
                    step={1000}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase block">
                    Minimal Pemesanan (Box) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.min_order}
                    onChange={(e) => setFormData({ ...formData, min_order: parseInt(e.target.value, 10) || 10 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
                  />
                </div>
              </div>

              {/* Row: Items / Lauk Inside Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700 uppercase">
                    Rincian Menu / Lauk Box (Satu per baris)
                  </label>
                  <button
                    type="button"
                    onClick={handleTranslateItems}
                    disabled={isTranslatingItems || !formData.items_id_text}
                    className="text-xs text-amber-800 hover:text-[#b43a22] font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isTranslatingItems ? 'Menerjemahkan...' : 'Auto Translate Lauk'}</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={formData.items_id_text}
                  onChange={(e) => setFormData({ ...formData, items_id_text: e.target.value })}
                  placeholder="Nasi Putih Pulen&#10;Ayam Goreng Lengkuas&#10;Tempe Orek&#10;Sambal Terasi & Kerupuk&#10;Air Mineral"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm outline-none focus:border-[#b43a22] font-mono"
                />

                <label className="text-xs font-bold text-stone-700 uppercase block">
                  Menu Items English (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.items_en_text}
                  onChange={(e) => setFormData({ ...formData, items_en_text: e.target.value })}
                  placeholder="Fluffy Steamed Rice&#10;Galangal Fried Chicken&#10;Tempeh Orek&#10;Spicy Sambal & Crackers&#10;Mineral Water"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm outline-none focus:border-[#b43a22] font-mono"
                />
              </div>

              {/* Row: Badges & Popular */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase block">
                    Badge Promo (ID)
                  </label>
                  <input
                    type="text"
                    value={formData.badge_id}
                    onChange={(e) => setFormData({ ...formData, badge_id: e.target.value })}
                    placeholder="Contoh: Paling Hemat / Favorit"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase block">
                    Badge Promo (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.badge_en}
                    onChange={(e) => setFormData({ ...formData, badge_en: e.target.value })}
                    placeholder="e.g. Best Budget / Favorite"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <ImageUploader
                label="Foto Kemasan / Nasi Box"
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                folder="nasi-box"
              />

              {/* Popular Checkbox */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="is_popular"
                  checked={formData.is_popular}
                  onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                  className="w-4 h-4 text-[#b43a22] rounded cursor-pointer"
                />
                <label htmlFor="is_popular" className="text-xs font-semibold text-stone-700 cursor-pointer">
                  Tandai sebagai Paket Terpopuler / Paling Laris (Featured)
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-semibold cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#b43a22] hover:bg-[#962a14] text-white text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : saveSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Tersimpan!</span>
                    </>
                  ) : (
                    <span>{editingPkg ? 'Simpan Perubahan' : 'Tambah Paket'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
