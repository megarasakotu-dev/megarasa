import { supabase, isSupabaseConfigured } from './supabase';
import {
  MenuCategory,
  MenuItem,
  EventSpace,
  EventPackage,
  MOCK_CATEGORIES,
  MOCK_MENU_ITEMS,
  MOCK_EVENT_SPACE,
  MOCK_EVENT_PACKAGES,
} from './mock-data';

// Local mutable cache for fallback mode
let localMenuItems: MenuItem[] = [...MOCK_MENU_ITEMS];
let localEventSpace: EventSpace = { ...MOCK_EVENT_SPACE };
let localEventPackages: EventPackage[] = [...MOCK_EVENT_PACKAGES];

export interface SiteSettings {
  whatsappNumber: string;
  gtmId: string;
  hoursWeekday: string;
  hoursWeekend: string;
  address: string;
  landmark: string;
}

let localSettings: SiteSettings = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281299887766',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MEGARASA1',
  hoursWeekday: 'Senin - Jumat: 08.00 - 21.00 WIB',
  hoursWeekend: 'Sabtu - Minggu / Libur: 07.30 - 22.00 WIB',
  address: 'Jl. Kalibesar Timur No. 18, Kawasan Kota Tua, Pinangsia, Taman Sari, Jakarta Barat 11110',
  landmark: 'Hanya 3 menit jalan kaki dari Museum Sejarah Jakarta (Fatahillah) dan 5 menit dari Jembatan Kota Intan.',
};

/**
 * Fetch all active menu categories
 */
export async function getCategories(): Promise<MenuCategory[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('menu_categories')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as MenuCategory[];
      }
    } catch (err) {
      console.warn('Supabase query error, falling back to mock data:', err);
    }
  }
  return MOCK_CATEGORIES;
}

/**
 * Fetch all menu items (for public or admin)
 */
export async function getMenuItems(onlyAvailable = true): Promise<MenuItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('menu_items').select('*').order('order_index', { ascending: true });
      if (onlyAvailable) {
        query = query.eq('is_available', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as MenuItem[];
      }
    } catch (err) {
      console.warn('Supabase query error, falling back to mock data:', err);
    }
  }

  if (onlyAvailable) {
    return localMenuItems.filter((item) => item.is_available);
  }
  return localMenuItems;
}

/**
 * Fetch favorite/signature menu items for home showcase
 */
export async function getFavoriteMenuItems(): Promise<MenuItem[]> {
  const allItems = await getMenuItems(true);
  return allItems.filter((item) => item.is_favorite);
}

/**
 * Create a new menu item
 */
export async function createMenuItem(
  item: Omit<MenuItem, 'id'>
): Promise<{ success: boolean; data?: MenuItem; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .insert([item])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: data as MenuItem };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Server error' };
    }
  }

  // Fallback local mode
  const newItem: MenuItem = {
    ...item,
    id: `menu-${Date.now()}`,
  };
  localMenuItems.unshift(newItem);
  return { success: true, data: newItem };
}

/**
 * Update an existing menu item
 */
export async function updateMenuItem(
  id: string,
  updates: Partial<MenuItem>
): Promise<{ success: boolean; data?: MenuItem; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: data as MenuItem };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Server error' };
    }
  }

  // Fallback local mode
  const index = localMenuItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    localMenuItems[index] = { ...localMenuItems[index], ...updates };
    return { success: true, data: localMenuItems[index] };
  }
  return { success: false, error: 'Item not found' };
}

/**
 * Delete a menu item
 */
export async function deleteMenuItem(id: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Server error' };
    }
  }

  // Fallback local mode
  localMenuItems = localMenuItems.filter((item) => item.id !== id);
  return { success: true };
}

/**
 * Toggle menu availability
 */
export async function toggleMenuAvailable(id: string, isAvailable: boolean) {
  return updateMenuItem(id, { is_available: isAvailable });
}

/**
 * Toggle menu favorite status
 */
export async function toggleMenuFavorite(id: string, isFavorite: boolean) {
  return updateMenuItem(id, { is_favorite: isFavorite });
}

/**
 * Fetch upper floor event space details
 */
export async function getEventSpace(): Promise<EventSpace> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('event_spaces')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        return data as EventSpace;
      }
    } catch (err) {
      console.warn('Supabase query error, falling back to mock data:', err);
    }
  }
  return localEventSpace;
}

/**
 * Update event space details
 */
export async function updateEventSpace(
  updates: Partial<EventSpace>
): Promise<{ success: boolean; data?: EventSpace; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const current = await getEventSpace();
      const { data, error } = await supabase
        .from('event_spaces')
        .update(updates)
        .eq('id', current.id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: data as EventSpace };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Server error' };
    }
  }

  localEventSpace = { ...localEventSpace, ...updates };
  return { success: true, data: localEventSpace };
}

/**
 * Fetch event rental and catering packages
 */
export async function getEventPackages(): Promise<EventPackage[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('event_packages')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as EventPackage[];
      }
    } catch (err) {
      console.warn('Supabase query error, falling back to mock data:', err);
    }
  }
  return localEventPackages;
}

/**
 * Update an event package
 */
export async function updateEventPackage(
  id: string,
  updates: Partial<EventPackage>
): Promise<{ success: boolean; data?: EventPackage; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('event_packages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: data as EventPackage };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Server error' };
    }
  }

  const idx = localEventPackages.findIndex((pkg) => pkg.id === id);
  if (idx !== -1) {
    localEventPackages[idx] = { ...localEventPackages[idx], ...updates };
    return { success: true, data: localEventPackages[idx] };
  }
  return { success: false, error: 'Package not found' };
}

/**
 * General Settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  return localSettings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  localSettings = { ...localSettings, ...settings };
  return localSettings;
}

/**
 * Save contact / reservation inquiry to Supabase
 */
export async function saveContactInquiry(inquiry: {
  fullName: string;
  email?: string;
  phoneNumber: string;
  inquiryType: string;
  eventDate?: string;
  estimatedPax?: number;
  notes?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('contact_inquiries').insert([
        {
          full_name: inquiry.fullName,
          email: inquiry.email || null,
          phone_number: inquiry.phoneNumber,
          inquiry_type: inquiry.inquiryType,
          event_date: inquiry.eventDate || null,
          estimated_pax: inquiry.estimatedPax || null,
          notes: inquiry.notes || null,
        },
      ]);

      if (error) {
        console.error('Error inserting inquiry into Supabase:', error);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      console.error('Exception inserting inquiry into Supabase:', err);
      return { success: false, error: err?.message || 'Server error' };
    }
  }

  console.log('Saved reservation inquiry locally:', inquiry);
  return { success: true };
}
