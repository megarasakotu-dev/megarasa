'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { uploadImageToStorage } from '@/lib/storage';
import { UploadCloud, Loader2, CheckCircle2, AlertCircle, Image as ImageIcon, Link2 } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: 'menus' | 'nasi-box' | 'spaces' | 'general';
  required?: boolean;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  folder = 'menus',
  required = false,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const result = await uploadImageToStorage(file, folder);

    if (result.success && result.url) {
      onChange(result.url);
    } else {
      setUploadError(result.error || 'Gagal mengupload gambar.');
    }

    setIsUploading(false);
    // Reset file input so re-selecting same file triggers change
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#b43a22]" />
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-[#b43a22] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Link2 className="w-3 h-3" />
          <span>{showUrlInput ? 'Sembunyikan Input URL' : 'Atau Input URL Manual'}</span>
        </button>
      </div>

      {/* Main Upload Box & Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Thumbnail */}
        <div className="sm:col-span-4 relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 border-2 border-dashed border-stone-300 flex items-center justify-center group shadow-2xs">
          {value ? (
            <>
              <Image
                src={value}
                alt="Preview Foto"
                fill
                sizes="(max-width: 768px) 100vw, 200px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                <span className="text-white text-[11px] font-bold text-center">
                  Klik tombol di samping untuk ganti
                </span>
              </div>
            </>
          ) : (
            <div className="text-center p-3 text-stone-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
              <span className="text-[11px] block">Belum ada foto</span>
            </div>
          )}
        </div>

        {/* Upload Action Area */}
        <div className="sm:col-span-8 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-stone-800 hover:text-[#b43a22] font-bold text-xs sm:text-sm transition-all shadow-2xs cursor-pointer disabled:opacity-60"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 text-[#b43a22] animate-spin" />
                <span>Mengupload ke Supabase Storage...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4 text-[#b43a22]" />
                <span>Pilih Foto dari HP / Komputer</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-stone-500 leading-tight">
            Mendukung file JPG, PNG, atau WebP (Maksimal 5 MB). Foto langsung tersimpan ke Supabase Storage.
          </p>

          {uploadError && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      </div>

      {/* Optional Manual URL Input (for Unsplash or external URLs) */}
      {showUrlInput && (
        <div className="pt-2 animate-in fade-in">
          <label className="text-[11px] text-stone-500 block mb-1">
            Atau masukkan link gambar langsung (URL):
          </label>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm outline-none focus:border-[#b43a22]"
          />
        </div>
      )}
    </div>
  );
}
