const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkProducts() {
  // 1. Get recent products and their drop_ids
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, drop_id')
    .limit(5);
    
  if (error) console.error('Error fetching products:', error);
  else console.log('Products:', JSON.stringify(products, null, 2));

  // 2. Get drops
  const { data: drops } = await supabase
    .from('drops')
    .select('id, name, status');
    
  console.log('Drops:', JSON.stringify(drops, null, 2));
}

checkProducts();





