'use client';

import { useState } from 'react';
import { EventSpace, EventPackage } from '@/lib/mock-data';
import { updateEventSpace, updateEventPackage } from '@/lib/data-service';
import {
  Building2,
  Layers,
  CheckCircle,
  Save,
  Plus,
  Trash2,
  Sparkles,
  Users,
  Clock,
  Coins,
} from 'lucide-react';

export default function EventSpaceManager({
  initialSpace,
  initialPackages,
}: {
  initialSpace: EventSpace;
  initialPackages: EventPackage[];
}) {
  const [space, setSpace] = useState<EventSpace>(initialSpace);
  const [packages, setPackages] = useState<EventPackage[]>(initialPackages);
  const [newFacility, setNewFacility] = useState('');
  const [isSavingSpace, setIsSavingSpace] = useState(false);
  const [savingPackageId, setSavingPackageId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveSpace = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSpace(true);
    const res = await updateEventSpace(space);
    if (res.success && res.data) {
      setSpace(res.data);
      showNotification('Pengaturan Ruang Acara Lantai 2 berhasil disimpan!');
    }
    setIsSavingSpace(false);
  };

  const handleAddFacility = () => {
    if (!newFacility.trim()) return;
    setSpace((prev) => ({
      ...prev,
      facilities_id: [...prev.facilities_id, newFacility.trim()],
      facilities_en: [...prev.facilities_en, newFacility.trim()],
    }));
    setNewFacility('');
  };

  const handleRemoveFacility = (index: number) => {
    setSpace((prev) => ({
      ...prev,
      facilities_id: prev.facilities_id.filter((_, i) => i !== index),
      facilities_en: prev.facilities_en.filter((_, i) => i !== index),
    }));
  };

  const handleSavePackage = async (pkg: EventPackage) => {
    setSavingPackageId(pkg.id);
    const res = await updateEventPackage(pkg.id, pkg);
    if (res.success && res.data) {
      setPackages((prev) =>
        prev.map((p) => (p.id === pkg.id ? res.data! : p))
      );
      showNotification(`Paket "${pkg.name_id}" berhasil diperbarui!`);
    }
    setSavingPackageId(null);
  };

  const handlePackageChange = (
    id: string,
    field: keyof EventPackage,
    value: any
  ) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <div className="space-y-8">
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-500/40 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Bagian 1: Detail & Spesifikasi Ruangan */}
      <form
        onSubmit={handleSaveSpace}
        className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#b43a22] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Spesifikasi Ruang Acara Lantai 2
              </h3>
              <p className="text-xs text-stone-500">
                Kapasitas, tarif per jam, durasi sewa, dan sarana fasilitas
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSavingSpace}
            className="inline-flex items-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSavingSpace ? 'Menyimpan...' : 'Simpan Spesifikasi'}</span>
          </button>
        </div>

        {/* Grid Kapasitas & Biaya */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Kapasitas Min (Orang)
            </label>
            <input
              type="number"
              value={space.capacity_min}
              onChange={(e) =>
                setSpace({
                  ...space,
                  capacity_min: parseInt(e.target.value, 10) || 0,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold outline-none focus:border-[#b43a22]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Kapasitas Maks (Orang)
            </label>
            <input
              type="number"
              value={space.capacity_max}
              onChange={(e) =>
                setSpace({
                  ...space,
                  capacity_max: parseInt(e.target.value, 10) || 0,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold outline-none focus:border-[#b43a22]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Tarif Dasar Sewa (Rp / 2 Jam)
            </label>
            <input
              type="number"
              step={10000}
              value={space.hourly_rate}
              onChange={(e) =>
                setSpace({
                  ...space,
                  hourly_rate: parseInt(e.target.value, 10) || 0,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold outline-none focus:border-[#b43a22]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Minimal Durasi (Jam)
            </label>
            <input
              type="number"
              value={space.minimum_hours}
              onChange={(e) =>
                setSpace({
                  ...space,
                  minimum_hours: parseInt(e.target.value, 10) || 0,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-bold outline-none focus:border-[#b43a22]"
            />
          </div>
        </div>

        {/* Deskripsi Ruang Acara */}
        <div className="space-y-3 pt-2">
          <div>
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
              Deskripsi Ruangan (Bahasa Indonesia)
            </label>
            <textarea
              rows={3}
              value={space.description_id}
              onChange={(e) =>
                setSpace({ ...space, description_id: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
              Deskripsi Ruangan (English)
            </label>
            <textarea
              rows={3}
              value={space.description_en}
              onChange={(e) =>
                setSpace({ ...space, description_en: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
            />
          </div>
        </div>

        {/* Kelola Daftar Fasilitas */}
        <div className="space-y-3 pt-4 border-t border-stone-100">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Daftar Fasilitas Ruangan
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              placeholder="Tambah fasilitas baru (contoh: Proyektor 4K, Smart TV, Podium)..."
              className="flex-grow px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {space.facilities_id.map((fac, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium text-stone-800"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{fac}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFacility(idx)}
                  className="p-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Hapus fasilitas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>

      {/* Bagian 2: Paket Sewa & Konsumsi */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Penyesuaian Paket Sewa & Konsumsi
            </h3>
            <p className="text-xs text-stone-500">
              Ubah harga per orang, harga paket, durasi sewa, dan badge label
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-stone-500">
                    Nama Paket
                  </label>
                  <input
                    type="text"
                    value={pkg.name_id}
                    onChange={(e) =>
                      handlePackageChange(pkg.id, 'name_id', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white font-serif font-bold text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase text-stone-500">
                      {pkg.price_package > 0 ? 'Harga Paket (Rp)' : 'Harga / Pax (Rp)'}
                    </label>
                    <input
                      type="number"
                      value={pkg.price_package > 0 ? pkg.price_package : pkg.price_per_person}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 0;
                        if (pkg.price_package > 0) {
                          handlePackageChange(pkg.id, 'price_package', val);
                        } else {
                          handlePackageChange(pkg.id, 'price_per_person', val);
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white font-bold text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase text-stone-500">
                      Min. Tamu (Pax)
                    </label>
                    <input
                      type="number"
                      value={pkg.min_pax}
                      onChange={(e) =>
                        handlePackageChange(
                          pkg.id,
                          'min_pax',
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-stone-500">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={pkg.badge_id}
                    onChange={(e) =>
                      handlePackageChange(pkg.id, 'badge_id', e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-xs font-semibold text-amber-800"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={savingPackageId === pkg.id}
                onClick={() => handleSavePackage(pkg)}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>
                  {savingPackageId === pkg.id ? 'Menyimpan...' : 'Simpan Paket Ini'}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
