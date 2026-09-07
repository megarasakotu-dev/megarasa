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
 * Fetch all active menu items
 */
export async function getMenuItems(): Promise<MenuItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as MenuItem[];
      }
    } catch (err) {
      console.warn('Supabase query error, falling back to mock data:', err);
    }
  }
  return MOCK_MENU_ITEMS;
}

/**
 * Fetch favorite/signature menu items for home showcase
 */
export async function getFavoriteMenuItems(): Promise<MenuItem[]> {
  const allItems = await getMenuItems();
  return allItems.filter((item) => item.is_favorite);
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
  return MOCK_EVENT_SPACE;
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
  return MOCK_EVENT_PACKAGES;
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

  // If Supabase not yet connected, simulate success locally
  console.log('Saved reservation inquiry locally (Supabase not configured yet):', inquiry);
  return { success: true };
}
