import { NextRequest, NextResponse } from 'next/server';

// Common Indonesian culinary dictionary enhancements
const CULINARY_DICTIONARY: Record<string, string> = {
  'soto betawi': 'Betawi Beef Soup with Rich Coconut Milk',
  'kerak telor': 'Authentic Betawi Toasted Sticky Rice with Egg',
  'bir pletok': 'Bir Pletok Heritage Herbal Elixir',
  'es selendang mayang': 'Iced Selendang Mayang Traditional Pudding',
  'ayam goreng lengkuas': 'Crispy Galangal Spiced Fried Chicken',
  'nasi ulam': 'Betawi Herb-Spiced Rice Platter',
  'gado-gado': 'Batavia Steamed Vegetables with Rich Peanut Sauce',
  'tahu gejrot': 'Sweet and Tangy Crispy Tofu with Palm Sugar Glaze',
  'pisang goreng wijen': 'Honey Sesame Crispy Banana Fritters',
  'tempe mendoan': 'Crispy Soft Fried Tempeh with Spring Onion',
  'es cendol': 'Iced Pandan Jelly with Coconut Milk and Palm Sugar',
  'es jeruk kelapa muda': 'Young Coconut & Fresh Orange Juice',
  'kopi tubruk': 'Kota Tua Heritage Spiced Drip Coffee',
  'es kopi susu gula aren': 'Iced Palm Sugar Espresso Milk Coffee',
  'teh poci melati': 'Claypot Jasmine Tea with Rock Sugar',
  'sambal terasi': 'Shrimp Paste Chili Sambal',
  'emping': 'Melinjo Nut Crackers',
  'serundeng': 'Toasted Spiced Grated Coconut',
  'dendeng': 'Caramelized Spiced Beef Jerky',
  'semur': 'Sweet Soy Spiced Stew',
};

/**
 * Cleanly translate Indonesian text into English using Google Translate API gtx
 */
async function translateWithGoogle(text: string, from = 'id', to = 'en'): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';

  // Check direct culinary dictionary match first
  const lower = trimmed.toLowerCase();
  if (CULINARY_DICTIONARY[lower]) {
    return CULINARY_DICTIONARY[lower];
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(
    trimmed
  )}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
    // cache for 1 hour
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Translation API error status: ${response.status}`);
  }

  const data = await response.json();
  if (Array.isArray(data) && Array.isArray(data[0])) {
    const translatedText = data[0].map((item: any) => item[0]).join('');
    return translatedText.trim();
  }

  throw new Error('Unexpected translation response format');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, from = 'id', to = 'en' } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Field "text" is required' }, { status: 400 });
    }

    const translated = await translateWithGoogle(text, from, to);

    return NextResponse.json({
      original: text,
      translated,
      from,
      to,
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    // Fallback if external network fails: return the original text with a fallback note
    return NextResponse.json(
      {
        error: error.message || 'Translation failed',
        translated: req.body ? (await req.json().catch(() => ({})))?.text : '',
      },
      { status: 500 }
    );
  }
}
