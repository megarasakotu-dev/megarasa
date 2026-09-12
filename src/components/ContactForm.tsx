'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { saveContactInquiry } from '@/lib/data-service';
import { trackContactFormSubmit, trackWhatsAppClick } from '@/lib/gtm';
import { Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';

export default function ContactForm() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    inquiryType: 'dining_reservation',
    eventDate: '',
    estimatedPax: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281299887766';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const paxNumber = formData.estimatedPax ? parseInt(formData.estimatedPax, 10) : undefined;

    try {
      const res = await saveContactInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        inquiryType: formData.inquiryType,
        eventDate: formData.eventDate,
        estimatedPax: paxNumber,
        notes: formData.notes,
      });

      if (res.success) {
        // Trigger GTM Event Tracking
        trackContactFormSubmit(formData.inquiryType, paxNumber);
        setSubmitted(true);
      } else {
        setErrorMessage(res.error || t('errorMsg'));
      }
    } catch (err: any) {
      setErrorMessage(t('errorMsg'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWaAfterSubmit = () => {
    trackWhatsAppClick('post_form_submit', 'Contact Success WhatsApp Link');
    const purposeText =
      formData.inquiryType === 'nasi_box_catering'
        ? (locale === 'en' ? 'Tour Group Meal Box & Catering' : 'Pesanan Nasi Box / Katering Rombongan')
        : formData.inquiryType === 'event_space_rental'
        ? (locale === 'en' ? '2nd Floor Event Space Rental' : 'Sewa Ruang Acara Lantai 2')
        : (locale === 'en' ? 'Dining Table Reservation' : 'Reservasi Meja Makan');

    const text =
      locale === 'en'
        ? `Hello Kantin Mega Rasa, I just submitted the inquiry form.\n\nName: ${formData.fullName}\nPurpose: ${purposeText}\nDate: ${formData.eventDate || '-'}\nQuantity/Pax: ${formData.estimatedPax || '-'}\nNotes: ${formData.notes || '-'}`
        : `Halo Kantin Mega Rasa, saya baru saja mengirim formulir reservasi.\n\nNama: ${formData.fullName}\nKeperluan: ${purposeText}\nTanggal: ${formData.eventDate || '-'}\nJumlah Orang/Box: ${formData.estimatedPax || '-'}\nCatatan: ${formData.notes || '-'}`;

    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-10 text-center space-y-5 animate-in fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-emerald-950">
          {locale === 'en' ? 'Inquiry Sent Successfully!' : 'Reservasi Berhasil Dikirim!'}
        </h3>

        <p className="text-sm sm:text-base text-emerald-800 max-w-lg mx-auto leading-relaxed">
          {t('successMsg')}
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleOpenWaAfterSubmit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>
              {locale === 'en'
                ? 'Follow-up on WhatsApp'
                : 'Lanjutkan Chat di WhatsApp'}
            </span>
          </button>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                inquiryType: 'dining_reservation',
                eventDate: '',
                estimatedPax: '',
                notes: '',
              });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-emerald-300 text-emerald-900 text-sm font-semibold hover:bg-emerald-100/50 transition-colors cursor-pointer"
          >
            {locale === 'en' ? 'Submit Another Inquiry' : 'Kirim Reservasi Baru'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/10 shadow-lg space-y-6"
    >
      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#2e180e] pb-2 border-b border-stone-100">
        {t('formTitle')}
      </h3>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Full Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            {t('fullNameLabel')} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            placeholder={t('fullNamePlaceholder')}
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#b43a22] focus:ring-2 focus:ring-[#b43a22]/20 text-sm outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            {t('phoneLabel')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            placeholder={t('phonePlaceholder')}
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#b43a22] focus:ring-2 focus:ring-[#b43a22]/20 text-sm outline-none transition-all"
          />
        </div>
      </div>

      {/* Row 2: Email & Inquiry Purpose */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            {t('emailLabel')}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder={t('emailPlaceholder')}
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#b43a22] focus:ring-2 focus:ring-[#b43a22]/20 text-sm outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            {t('inquiryTypeLabel')} <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.inquiryType}
            onChange={(e) =>
              setFormData({ ...formData, inquiryType: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:border-[#b43a22] focus:ring-2 focus:ring-[#b43a22]/20 text-sm outline-none transition-all cursor-pointer font-medium"
          >
            <option value="dining_reservation">{t('optDining')}</option>
            <option value="nasi_box_catering">{t('optNasiBox')}</option>
            <option value="event_space_rental">{t('optEvent')}</option>
            <option value="general">{t('optGeneral')}</option>
          </select>
        </div>
      </div>

      {/* Row 3: Event Date & Estimated Pax */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            {t('dateLabel')}
          </label>
          <input
            type="date"
            value={formData.eventDate}
            onChange={(e) =>
              setFormData({ ...formData, eventDate: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#b43a22] focus:ring-2 focus:ring-[#b43a22]/20 text-sm outline-none transition-all bg-white"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            {t('paxLabel')}
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={formData.estimatedPax}
            onChange={(e) =>
              setFormData({ ...formData, estimatedPax: e.target.value })
            }
            placeholder={t('paxPlaceholder')}
            className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#b43a22] focus:ring-2 focus:ring-[#b43a22]/20 text-sm outline-none transition-all"
          />
        </div>
      </div>

      {/* Row 4: Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
          {t('notesLabel')}
        </label>
        <textarea
          rows={4}
          value={formData.notes}
          onChange={(e) =>
            setFormData({ ...formData, notes: e.target.value })
          }
          placeholder={t('notesPlaceholder')}
          className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#b43a22] focus:ring-2 focus:ring-[#b43a22]/20 text-sm outline-none transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
        <span>{isSubmitting ? tCommon('sending') : t('submitBtn')}</span>
      </button>
    </form>
  );
}
