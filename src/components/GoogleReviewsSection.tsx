'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GoogleReview } from '@/lib/mock-data';
import {
  Star,
  ExternalLink,
  ThumbsUp,
  ShieldCheck,
  MapPin,
  MessageSquarePlus,
  Utensils,
  ShoppingBag,
  Building2,
  Globe2,
} from 'lucide-react';

interface Props {
  reviews: GoogleReview[];
  locale: string;
}

// Google avatar color palette
const AVATAR_COLORS = [
  'bg-blue-600',
  'bg-red-600',
  'bg-amber-600',
  'bg-emerald-600',
  'bg-purple-600',
  'bg-teal-600',
];

export default function GoogleReviewsSection({ reviews, locale }: Props) {
  const t = useTranslations('about.reviews');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Direct Google Maps review link for Kantin Mega Rasa
  const googleMapsReviewUrl =
    'https://maps.google.com/?q=Kantin+Mega+Rasa+Kota+Tua+Jakarta';

  const handleLike = (id: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredReviews =
    activeCategory === 'all'
      ? reviews
      : reviews.filter((r) => r.category === activeCategory);

  const categories = [
    { id: 'all', label: t('filterAll'), icon: null },
    { id: 'culinary', label: t('filterCulinary'), icon: Utensils },
    { id: 'nasi_box', label: t('filterNasiBox'), icon: ShoppingBag },
    { id: 'event_space', label: t('filterEvent'), icon: Building2 },
    { id: 'tourist', label: t('filterTourist'), icon: Globe2 },
  ];

  return (
    <section className="space-y-10">
      {/* 1. Header & Google Rating Summary Card */}
      <div className="rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-stone-50 border border-amber-900/15 p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Title & Google Badge */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-semibold text-stone-700">
              {/* Google G Logo SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="font-bold text-stone-800">{t('badge')}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#2e180e] leading-tight">
              {t('title')}
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Right Column: Google Score Display & Actions */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-md flex flex-col items-center text-center space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif font-black text-5xl text-[#2e180e]">
                {t('overallScore')}
              </span>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-stone-500 font-medium block mt-1">
                  {t('outOf')} · <strong className="text-stone-700">{t('totalReviews')}</strong>
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="w-full pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={googleMapsReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#b43a22] hover:bg-[#922a15] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>{t('btnWriteReview')}</span>
              </a>

              <a
                href={googleMapsReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t('btnViewMore')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#b43a22] text-white shadow-md'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-400 hover:bg-amber-50/50'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {cat.id === 'all'
                  ? reviews.length
                  : reviews.filter((r) => r.category === cat.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review, idx) => {
          const reviewText = locale === 'en' ? review.review_text_en : review.review_text_id;
          const badge = locale === 'en' ? review.author_badge_en : review.author_badge_id;
          const relativeTime = locale === 'en' ? review.relative_time_en : review.relative_time_id;
          const orderedItems = locale === 'en' ? review.ordered_items_en : review.ordered_items_id;
          const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
          const isLiked = likedReviews[review.id];
          const totalLikes = review.likes_count + (isLiked ? 1 : 0);

          return (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3.5">
                {/* Reviewer Header */}
                <div className="flex items-start gap-3">
                  {/* Google style initial avatar */}
                  <div
                    className={`w-11 h-11 rounded-full ${avatarColor} text-white flex items-center justify-center font-bold text-base shadow-2xs shrink-0`}
                  >
                    {review.author_name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-stone-900 truncate">
                        {review.author_name}
                      </h4>
                      {/* Google verified checkmark badge */}
                      <span title={t('verifiedVisit')}>
                        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 truncate">
                      {badge && (
                        <span className="text-amber-700 font-semibold truncate">
                          {badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stars & Date */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400">·</span>
                  <span className="text-xs text-stone-500 font-medium">
                    {relativeTime}
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{reviewText}&rdquo;
                </p>

                {/* Ordered items chips */}
                {orderedItems && orderedItems.length > 0 && (
                  <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-1.5">
                    {orderedItems.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="inline-block px-2.5 py-1 rounded-md bg-stone-100 text-stone-600 text-[11px] font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Helpful button & Google Maps link */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <button
                  type="button"
                  onClick={() => handleLike(review.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isLiked
                      ? 'bg-blue-50 text-blue-700 border-blue-200 font-bold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <ThumbsUp
                    className={`w-3.5 h-3.5 ${isLiked ? 'fill-blue-600 text-blue-600' : ''}`}
                  />
                  <span>{t('helpfulBtn')}</span>
                  <span className="text-[11px] text-stone-400">({totalLikes})</span>
                </button>

                <a
                  href={googleMapsReviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-800 transition-colors inline-flex items-center gap-1 text-[11px]"
                  title="Lihat ulasan asli di Google Maps"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Trust & Invite Banner */}
      <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif font-bold text-lg text-[#2e180e]">
            {locale === 'en'
              ? 'Have You Visited Kantin Mega Rasa Kota Tua?'
              : 'Pernah Menikmati Hidangan di Kantin Mega Rasa?'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            {locale === 'en'
              ? 'Share your experience to help fellow travelers explore the best of Old Batavia!'
              : 'Bagikan ulasan dan foto Anda di Google Maps untuk membantu wisatawan lain menjelajahi kelezatan Kota Tua!'}
          </p>
        </div>

        <a
          href={googleMapsReviewUrl}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center gap-2 bg-[#b43a22] hover:bg-[#922a15] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>{t('btnWriteReview')}</span>
        </a>
      </div>
    </section>
  );
}
