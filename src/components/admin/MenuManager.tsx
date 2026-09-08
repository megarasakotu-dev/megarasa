'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MenuItem, MenuCategory } from '@/lib/mock-data';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuAvailable,
  toggleMenuFavorite,
} from '@/lib/data-service';
import {
  Plus,
  Search,
  Sparkles,
  Edit2,
  Trash2,
  Star,
  Flame,
  CheckCircle,
  XCircle,
  Loader2,
  X,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export default function MenuManager({
  categories,
  initialItems,
}: {
  categories: MenuCategory[];
  initialItems: MenuItem[];
}) {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Load fresh items from Supabase / data-service on mount
  const refreshItems = async () => {
    setIsLoading(true);
    try {
      const liveItems = await getMenuItems(false);
      setItems(liveItems);
    } catch (err) {
      console.error('Failed to load menu items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshItems();
  }, []);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    category_slug: 'makanan-utama',
    name_id: '',
    name_en: '',
    description_id: '',
    description_en: '',
    price: 35000,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    is_favorite: false,
    is_available: true,
    spicy_level: 0,
  });

  // Translation Loading states
  const [isTranslatingName, setIsTranslatingName] = useState(false);
  const [isTranslatingDesc, setIsTranslatingDesc] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchSearch =
      item.name_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name_en.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      filterCategory === 'all' || item.category_slug === filterCategory;
    return matchSearch && matchCategory;
  });

  // Auto-translate helper function
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
    const translated = await callTranslateApi(formData.name_id);
    setFormData((prev) => ({ ...prev, name_en: translated }));
    setIsTranslatingName(false);
  };

  const handleTranslateDesc = async () => {
    if (!formData.description_id.trim()) return;
    setIsTranslatingDesc(true);
    const translated = await callTranslateApi(formData.description_id);
    setFormData((prev) => ({ ...prev, description_en: translated }));
    setIsTranslatingDesc(false);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      category_slug: 'makanan-utama',
      name_id: '',
      name_en: '',
      description_id: '',
      description_en: '',
      price: 30000,
      image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      is_favorite: false,
      is_available: true,
      spicy_level: 0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      category_slug: item.category_slug,
      name_id: item.name_id,
      name_en: item.name_en,
      description_id: item.description_id,
      description_en: item.description_en,
      price: item.price,
      image_url: item.image_url,
      is_favorite: item.is_favorite,
      is_available: item.is_available,
      spicy_level: item.spicy_level,
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    let finalNameEn = formData.name_en;
    let finalDescEn = formData.description_en;

    // Automatic on-save translation if English fields are left blank
    if (!finalNameEn.trim() && formData.name_id.trim()) {
      finalNameEn = await callTranslateApi(formData.name_id);
    }
    if (!finalDescEn.trim() && formData.description_id.trim()) {
      finalDescEn = await callTranslateApi(formData.description_id);
    }

    if (editingItem) {
      // UPDATE
      const res = await updateMenuItem(editingItem.id, {
        ...formData,
        name_en: finalNameEn,
        description_en: finalDescEn,
      });
      if (res.success && res.data) {
        setItems((prev) =>
          prev.map((it) => (it.id === editingItem.id ? res.data! : it))
        );
        showNotification(`Menu "${res.data.name_id}" berhasil diperbarui!`);
        setIsModalOpen(false);
      } else {
        alert(`Gagal memperbarui menu di database: ${res.error || 'Terjadi kesalahan'}`);
      }
    } else {
      // CREATE
      const res = await createMenuItem({
        ...formData,
        name_en: finalNameEn,
        description_en: finalDescEn,
        order_index: items.length + 1,
      });
      if (res.success && res.data) {
        setItems((prev) => [res.data!, ...prev]);
        showNotification(`Menu baru "${res.data.name_id}" berhasil ditambahkan!`);
        setIsModalOpen(false);
      } else {
        alert(`Gagal menambahkan menu ke database: ${res.error || 'Terjadi kesalahan'}`);
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async (item: MenuItem) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus menu "${item.name_id}"?`)) {
      return;
    }
    const res = await deleteMenuItem(item.id);
    if (res.success) {
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      showNotification(`Menu "${item.name_id}" telah dihapus.`);
    } else {
      alert(`Gagal menghapus menu: ${res.error || 'Terjadi kesalahan'}`);
    }
  };

  const handleToggleAvailable = async (item: MenuItem) => {
    const nextStatus = !item.is_available;
    const res = await toggleMenuAvailable(item.id, nextStatus);
    if (res.success) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id ? { ...it, is_available: nextStatus } : it
        )
      );
      showNotification(
        `Status menu "${item.name_id}": ${nextStatus ? 'Tersedia' : 'Habis'}`
      );
    } else {
      alert(`Gagal mengubah status ketersediaan: ${res.error || 'Terjadi kesalahan'}`);
    }
  };

  const handleToggleFavorite = async (item: MenuItem) => {
    const nextStatus = !item.is_favorite;
    const res = await toggleMenuFavorite(item.id, nextStatus);
    if (res.success) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id ? { ...it, is_favorite: nextStatus } : it
        )
      );
      showNotification(
        `Status favorit "${item.name_id}": ${nextStatus ? 'Aktif ⭐' : 'Nonaktif'}`
      );
    } else {
      alert(`Gagal mengubah status favorit: ${res.error || 'Terjadi kesalahan'}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-500/40 animate-in fade-in slide-in-from-top-3">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Action Header: Search, Category Filter, and Add Button */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Search input & refresh */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama menu (ID/EN)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-[#b43a22] focus:ring-2 focus:ring-[#b43a22]/10 outline-none"
            />
          </div>
          <button
            onClick={refreshItems}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer shrink-0"
            title="Refresh Data dari Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#b43a22]' : ''}`} />
          </button>
        </div>

        {/* Center: Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
              filterCategory === 'all'
                ? 'bg-[#b43a22] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Semua ({items.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setFilterCategory(cat.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-all ${
                filterCategory === cat.slug
                  ? 'bg-[#b43a22] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.name_id}
            </button>
          ))}
        </div>

        {/* Right: Add New Menu Button */}
        <button
          onClick={openAddModal}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Menu Baru</span>
        </button>
      </div>

      {/* Menu Table / Cards */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-600 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Menu & Foto</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Harga (IDR)</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Favorit ⭐</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    Tidak ada menu yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-amber-50/40 transition-colors"
                  >
                    {/* Menu Item & Photo */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-stone-200 bg-stone-100">
                          <Image
                            src={item.image_url}
                            alt={item.name_id}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="max-w-xs sm:max-w-sm">
                          <div className="font-bold text-stone-900 flex items-center gap-1.5">
                            <span>{item.name_id}</span>
                            {item.spicy_level > 0 && (
                              <span className="inline-flex items-center text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                                <Flame className="w-3 h-3 text-amber-600" />
                                L{item.spicy_level}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-stone-400 italic">
                            EN: {item.name_en}
                          </div>
                          <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {item.description_id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 text-stone-700">
                        {categories.find((c) => c.slug === item.category_slug)
                          ?.name_id || item.category_slug}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 whitespace-nowrap font-serif font-bold text-stone-900">
                      Rp {item.price.toLocaleString('id-ID')}
                    </td>

                    {/* Available Toggle */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggleAvailable(item)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          item.is_available
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                        }`}
                        title="Klik untuk ubah status ketersediaan"
                      >
                        {item.is_available ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Tersedia</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Habis</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Favorite Star Toggle */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggleFavorite(item)}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          item.is_favorite
                            ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                            : 'text-stone-300 hover:text-amber-500 hover:bg-stone-100'
                        }`}
                        title="Klik untuk jadikan menu favorit beranda"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            item.is_favorite ? 'fill-amber-400' : ''
                          }`}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 rounded-lg text-stone-600 hover:bg-amber-100 hover:text-[#b43a22] transition-colors cursor-pointer"
                          title="Edit Menu"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                          title="Hapus Menu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT MENU DENGAN AUTO-TRANSLATE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-stone-200 my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#b43a22] to-[#882512] text-white flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg">
                {editingItem ? 'Edit Menu Kuliner' : 'Tambah Menu Kuliner Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Kategori Menu
                  </label>
                  <select
                    value={formData.category_slug}
                    onChange={(e) =>
                      setFormData({ ...formData, category_slug: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white font-medium outline-none focus:border-[#b43a22]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name_id}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Harga Jual (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={1000}
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold outline-none focus:border-[#b43a22]"
                  />
                </div>
              </div>

              {/* NAMA MENU (ID & EN dengan Auto-Translate) */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <span>Nama Menu (Bilingual)</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleTranslateName}
                    disabled={isTranslatingName || !formData.name_id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#b43a22] text-white text-xs font-bold shadow-xs hover:bg-[#922a15] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isTranslatingName ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    )}
                    <span>✨ Terjemahkan Otomatis (ID ➔ EN)</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      🇮🇩 Bahasa Indonesia <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name_id}
                      onChange={(e) =>
                        setFormData({ ...formData, name_id: e.target.value })
                      }
                      placeholder="Contoh: Soto Betawi Kuah Santan Susu"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm outline-none focus:border-[#b43a22]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      🇬🇧 English (Bisa diedit atau diisi otomatis oleh AI/Translate)
                    </label>
                    <input
                      type="text"
                      value={formData.name_en}
                      onChange={(e) =>
                        setFormData({ ...formData, name_en: e.target.value })
                      }
                      placeholder="Biarkan kosong untuk otomatis diterjemahkan saat disimpan..."
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm outline-none focus:border-[#b43a22]"
                    />
                  </div>
                </div>
              </div>

              {/* DESKRIPSI MENU (ID & EN dengan Auto-Translate) */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
                    Deskripsi Menu (Bilingual)
                  </span>
                  <button
                    type="button"
                    onClick={handleTranslateDesc}
                    disabled={isTranslatingDesc || !formData.description_id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#b43a22] text-white text-xs font-bold shadow-xs hover:bg-[#922a15] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isTranslatingDesc ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    )}
                    <span>✨ Terjemahkan Otomatis (ID ➔ EN)</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      🇮🇩 Deskripsi Bahasa Indonesia <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.description_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description_id: e.target.value,
                        })
                      }
                      placeholder="Tuliskan komposisi dan keunikan rasa hidangan..."
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm outline-none focus:border-[#b43a22]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                      🇬🇧 English Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.description_en}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description_en: e.target.value,
                        })
                      }
                      placeholder="Biarkan kosong untuk otomatis diterjemahkan saat disimpan..."
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-sm outline-none focus:border-[#b43a22]"
                    />
                  </div>
                </div>
              </div>

              {/* Photo URL & Spicy level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    URL Foto Makanan (Unsplash / Supabase)
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Tingkat Pedas
                  </label>
                  <select
                    value={formData.spicy_level}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        spicy_level: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white font-medium outline-none focus:border-[#b43a22]"
                  >
                    <option value={0}>Level 0 (Tidak Pedas)</option>
                    <option value={1}>Level 1 (Sedang)</option>
                    <option value={2}>Level 2 (Pedas)</option>
                    <option value={3}>Level 3 (Ekstra Pedas)</option>
                  </select>
                </div>
              </div>

              {/* Toggles: Favorite & Availability */}
              <div className="flex items-center gap-6 pt-2 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-stone-800">
                  <input
                    type="checkbox"
                    checked={formData.is_favorite}
                    onChange={(e) =>
                      setFormData({ ...formData, is_favorite: e.target.checked })
                    }
                    className="w-4 h-4 text-[#b43a22] rounded cursor-pointer"
                  />
                  <span>Tampilkan sebagai Menu Favorit ⭐</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-stone-800">
                  <input
                    type="checkbox"
                    checked={formData.is_available}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_available: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-[#b43a22] rounded cursor-pointer"
                  />
                  <span>Menu Tersedia (Ready Stock)</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#b43a22] hover:bg-[#922a15] text-white text-sm font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingItem ? 'Simpan Perubahan' : 'Tambahkan Menu'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
