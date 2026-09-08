'use client';

import { useState, useEffect } from 'react';
import { SiteSettings, getSiteSettings, updateSiteSettings } from '@/lib/data-service';
import {
  Settings,
  Phone,
  Clock,
  MapPin,
  Tag,
  Save,
  CheckCircle,
  ShieldAlert,
  RefreshCw,
} from 'lucide-react';

export default function GeneralSettingsManager({
  initialSettings,
}: {
  initialSettings: SiteSettings;
}) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const refreshSettings = async () => {
    setIsLoading(true);
    try {
      const fresh = await getSiteSettings();
      setSettings(fresh);
    } catch (err) {
      console.error('Error refreshing settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await updateSiteSettings(settings);
    if (res.success) {
      setSettings(res.data);
      showNotification('Pengaturan umum berhasil disimpan!');
    } else {
      alert(`Gagal menyimpan ke Supabase: ${res.error || 'Terjadi kesalahan'}`);
    }
    setIsSaving(false);
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6 max-w-4xl"
    >
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-500/40 animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#b43a22] flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Pengaturan Umum & Operasional
            </h3>
            <p className="text-xs text-stone-500">
              WhatsApp, jam layanan, alamat, dan Google Tag Manager
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
        </button>
      </div>

      {/* WhatsApp Number */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>Nomor WhatsApp Resmi (Tanpa tanda +, contoh: 6281299887766)</span>
        </label>
        <input
          type="text"
          value={settings.whatsappNumber}
          onChange={(e) =>
            setSettings({ ...settings, whatsappNumber: e.target.value })
          }
          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-mono text-sm outline-none focus:border-[#b43a22]"
        />
        <p className="text-[11px] text-stone-400">
          Nomor ini digunakan di tombol chat WhatsApp menu, reservasi, dan floating button.
        </p>
      </div>

      {/* Operational Hours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Jam Operasional Hari Kerja</span>
          </label>
          <input
            type="text"
            value={settings.hoursWeekday}
            onChange={(e) =>
              setSettings({ ...settings, hoursWeekday: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Jam Operasional Akhir Pekan / Libur</span>
          </label>
          <input
            type="text"
            value={settings.hoursWeekend}
            onChange={(e) =>
              setSettings({ ...settings, hoursWeekend: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
          />
        </div>
      </div>

      {/* Address & Landmark */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#b43a22]" />
            <span>Alamat Lengkap</span>
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) =>
              setSettings({ ...settings, address: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Patokan Objek Wisata Terdekat
          </label>
          <textarea
            rows={2}
            value={settings.landmark}
            onChange={(e) =>
              setSettings({ ...settings, landmark: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm outline-none focus:border-[#b43a22]"
          />
        </div>
      </div>

      {/* Google Tag Manager Container ID */}
      <div className="space-y-1.5 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-600" />
          <span>Google Tag Manager Container ID (GTM)</span>
        </label>
        <input
          type="text"
          value={settings.gtmId}
          onChange={(e) =>
            setSettings({ ...settings, gtmId: e.target.value })
          }
          placeholder="Contoh: GTM-XXXXXXX"
          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-mono text-sm outline-none focus:border-[#b43a22]"
        />
        <p className="text-[11px] text-stone-400">
          Snippet GTM di website akan otomatis menggunakan Container ID ini.
        </p>
      </div>
    </form>
  );
}
