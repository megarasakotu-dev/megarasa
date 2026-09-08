import { createClient } from '@supabase/supabase-js';

const url = 'https://innavihmulmzsuuqxnue.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlubmF2aWhtdWxtenN1dXF4bnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3ODk5NjQsImV4cCI6MjEwNDM2NTk2NH0.GWEut5EeYKdYmzPwDJzZRzjsuhuOCi-mn8kSs0A-m68';

const supabase = createClient(url, key);

async function diagnose() {
  console.log('--- DIAGNOSTIC START ---');
  
  // 1. Check Select
  const { data: items, error: selectErr } = await supabase.from('menu_items').select('*');
  if (selectErr) {
    console.error('SELECT Error:', selectErr);
  } else {
    console.log(`SELECT OK: Found ${items.length} items in Supabase`);
    if (items.length > 0) {
      console.log('First item:', { id: items[0].id, name_id: items[0].name_id, price: items[0].price, is_favorite: items[0].is_favorite });
    }
  }

  // 2. Check Update permission
  if (items && items.length > 0) {
    const firstItem = items[0];
    console.log(`Testing UPDATE on item ${firstItem.id} ("${firstItem.name_id}")...`);
    const { data: updateData, error: updateErr } = await supabase
      .from('menu_items')
      .update({ price: firstItem.price })
      .eq('id', firstItem.id)
      .select();
    
    if (updateErr) {
      console.error('UPDATE Error:', updateErr);
    } else {
      console.log('UPDATE OK:', updateData);
    }
  }

  // 3. Check Insert permission
  console.log('Testing INSERT on menu_items...');
  const testObj = {
    category_slug: 'makanan-utama',
    name_id: '__test_item__',
    name_en: '__test_item__',
    description_id: 'test',
    description_en: 'test',
    price: 12345,
    is_favorite: false,
    is_available: true,
  };
  const { data: insertData, error: insertErr } = await supabase
    .from('menu_items')
    .insert([testObj])
    .select();

  if (insertErr) {
    console.error('INSERT Error:', insertErr);
  } else {
    console.log('INSERT OK:', insertData);
    // clean up
    if (insertData && insertData[0]?.id) {
      await supabase.from('menu_items').delete().eq('id', insertData[0].id);
      console.log('DELETE test item OK');
    }
  }

  console.log('--- DIAGNOSTIC END ---');
}

diagnose();
