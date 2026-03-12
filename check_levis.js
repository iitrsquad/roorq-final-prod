const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProduct() {
  console.log('Checking product...');
  const { data, error } = await supabase
    .from('products')
    .select('id, name, stock_quantity, reserved_quantity')
    .ilike('name', '%Vintage Levis 501 Jeans%');
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Product Data:', JSON.stringify(data, null, 2));
  }
}

checkProduct();





