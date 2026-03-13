import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkProduct() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, stock_quantity, reserved_quantity')
    .ilike('name', '%Vintage Nike Center Swoosh Tee%')
  
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Product Data:', JSON.stringify(data, null, 2))
  }
}

checkProduct()








