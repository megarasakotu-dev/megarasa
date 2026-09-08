'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import AdminPinGate from '@/components/admin/AdminPinGate';
import MenuManager from '@/components/admin/MenuManager';
import EventSpaceManager from '@/components/admin/EventSpaceManager';
import GeneralSettingsManager from '@/components/admin/GeneralSettingsManager';
import {
  MOCK_CATEGORIES,
  MOCK_MENU_ITEMS,
  MOCK_EVENT_SPACE,
  MOCK_EVENT_PACKAGES,
} from '@/lib/mock-data';
import {
  UtensilsCrossed,
  Building2,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
} from 'lucide-react';

export default function AdminPage() {
  const locale = useLocale();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'menu' | 'event' | 'settings'>('menu');

  // Check auth session
  useEffect(() => {
    const isAuth = sessionStorage.getItem('megarasa_admin_auth') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('megarasa_admin_auth');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="w-8 h-8 border-4 border-[#b43a22] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminPinGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-800 flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="bg-white border-b border-stone-200/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo & Admin Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#b43a22] flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-lg text-stone-900 leading-none">
                    Kantin Mega Rasa
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-[#b43a22] border border-amber-300">
                    Admin Panel
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 block mt-0.5">
                  Kota Tua Jakarta Management
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                title="Buka Website Pengunjung"
              >
                <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">Lihat Website</span>
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                title="Kunci / Keluar Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-t border-stone-100 pt-1">
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'menu'
                  ? 'border-[#b43a22] text-[#b43a22]'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Manajemen Menu (Auto-Translate ✨)</span>
            </button>

            <button
              onClick={() => setActiveTab('event')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'event'
                  ? 'border-[#b43a22] text-[#b43a22]'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Ruang Acara Lantai 2</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'border-[#b43a22] text-[#b43a22]'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan Umum</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {activeTab === 'menu' && (
          <MenuManager
            categories={MOCK_CATEGORIES}
            initialItems={MOCK_MENU_ITEMS}
          />
        )}

        {activeTab === 'event' && (
          <EventSpaceManager
            initialSpace={MOCK_EVENT_SPACE}
            initialPackages={MOCK_EVENT_PACKAGES}
          />
        )}

        {activeTab === 'settings' && (
          <GeneralSettingsManager
            initialSettings={{
              whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281299887766',
              gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MEGARASA1',
              hoursWeekday: 'Senin - Jumat: 08.00 - 21.00 WIB',
              hoursWeekend: 'Sabtu - Minggu / Libur: 07.30 - 22.00 WIB',
              address: 'Jl. Kalibesar Timur No. 18, Kawasan Kota Tua, Pinangsia, Taman Sari, Jakarta Barat 11110',
              landmark: 'Hanya 3 menit jalan kaki dari Museum Sejarah Jakarta (Fatahillah) dan 5 menit dari Jembatan Kota Intan.',
            }}
          />
        )}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-stone-200 py-4 text-center text-xs text-stone-400">
        Kantin Mega Rasa Kota Tua Jakarta — Panel Administrasi & Manajemen Menu
      </footer>
    </div>
  );
}
