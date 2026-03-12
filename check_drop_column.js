const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkColumn() {
  const { data, error } = await supabase
    .from('drops')
    .select('image_url')
    .limit(1);
    
  if (error && error.code === 'PGRST204') { // Column not found error code often looks like this or similar API error
     console.log("Column likely missing");
  } else if (error) {
     console.log("Error:", error.message);
  } else {
     console.log("Column exists");
  }
}

checkColumn();





