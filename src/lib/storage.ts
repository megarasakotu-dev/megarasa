import { supabase, isSupabaseConfigured } from './supabase';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload a media file (Image) to Supabase Storage bucket 'megarasa-media'
 * Falls back to local Object URL / Base64 if Supabase is not yet configured.
 *
 * @param file - The File object from input[type="file"]
 * @param folder - Destination folder: 'menus' | 'nasi-box' | 'spaces' | 'general'
 */
export async function uploadImageToStorage(
  file: File,
  folder: 'menus' | 'nasi-box' | 'spaces' | 'general' = 'menus'
): Promise<UploadResult> {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: 'Format file tidak didukung. Harap gunakan format JPG, PNG, atau WebP.',
    };
  }

  // Validate size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      success: false,
      error: 'Ukuran gambar terlalu besar. Maksimal 5 MB per gambar.',
    };
  }

  // If Supabase is connected, upload to Storage
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanFileName = file.name
        .replace(/[^a-zA-Z0-9]/g, '-')
        .toLowerCase()
        .slice(0, 30);
      const uniqueFileName = `${folder}/${Date.now()}-${cleanFileName}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('megarasa-media')
        .upload(uniqueFileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.error('Supabase Storage upload error:', error);
        return {
          success: false,
          error: `Gagal upload ke Supabase Storage: ${error.message}`,
        };
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from('megarasa-media')
        .getPublicUrl(uniqueFileName);

      return {
        success: true,
        url: publicData.publicUrl,
      };
    } catch (err: any) {
      console.error('Unexpected error during image upload:', err);
      return {
        success: false,
        error: err?.message || 'Terjadi kesalahan saat upload gambar.',
      };
    }
  }

  // Fallback: If Supabase not yet configured, create a local FileReader data URL for instant preview
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        success: true,
        url: reader.result as string,
      });
    };
    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Gagal membaca file gambar lokal.',
      });
    };
    reader.readAsDataURL(file);
  });
}
