'use client';

import { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';

export default function AdminPinGate({
  onAuthenticated,
}: {
  onAuthenticated: () => void;
}) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const correctPin = '1234';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === correctPin) {
      setError(false);
      sessionStorage.setItem('megarasa_admin_auth', 'true');
      onAuthenticated();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-stone-900 via-[#2a1710] to-stone-950">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-amber-900/20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-[#b43a22] flex items-center justify-center mx-auto shadow-md">
          <KeyRound className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="font-serif font-extrabold text-2xl text-stone-900">
            Panel Admin Mega Rasa
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Masukkan PIN Keamanan untuk mengelola menu dan pengaturan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="password"
              maxLength={8}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Masukkan PIN (Default: 1234)"
              autoFocus
              className="w-full text-center tracking-[0.3em] font-mono font-bold text-2xl py-3 px-4 rounded-xl border-2 border-stone-200 focus:border-[#b43a22] focus:ring-4 focus:ring-[#b43a22]/10 outline-none transition-all"
            />
            {error && (
              <p className="text-xs text-red-600 font-medium animate-shake">
                PIN salah. Silakan coba lagi (Default PIN: 1234).
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Masuk ke Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400">
          Kantin Mega Rasa — Kawasan Wisata Kota Tua Jakarta
        </div>
      </div>
    </div>
  );
}
