/**
 * Google Tag Manager (GTM) Analytics Utilities
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MEGARASA1';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

/**
 * Push an event to GTM dataLayer
 */
export const trackGtmEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...eventParams,
    });
    // Optional console log for testing & developer visibility
    if (process.env.NODE_ENV === 'development') {
      console.log(`[GTM Event]: ${eventName}`, eventParams);
    }
  }
};

/**
 * Standard Events
 */
export const trackViewMenu = (source: string = 'cta_button') => {
  trackGtmEvent('click_lihat_menu', {
    source,
    label: 'Lihat Menu',
  });
};

export const trackRentEventSpace = (source: string = 'cta_button') => {
  trackGtmEvent('click_sewa_ruang_acara', {
    source,
    label: 'Sewa Ruang Acara',
  });
};

export const trackWhatsAppClick = (category: string = 'general', label: string = '') => {
  trackGtmEvent('click_whatsapp_booking', {
    whatsapp_category: category,
    label: label || `WhatsApp - ${category}`,
  });
};

export const trackContactFormSubmit = (inquiryType: string, estimatedPax?: number) => {
  trackGtmEvent('submit_contact_form', {
    inquiry_type: inquiryType,
    estimated_pax: estimatedPax || 0,
    label: `Form Submission - ${inquiryType}`,
  });
};

export const trackNasiBoxOrder = (packageName: string, quantity: number, estimatedTotal: number) => {
  trackGtmEvent('click_nasi_box_order', {
    package_name: packageName,
    quantity,
    estimated_total: estimatedTotal,
    label: `Nasi Box Order: ${packageName} (${quantity} box)`,
  });
};

