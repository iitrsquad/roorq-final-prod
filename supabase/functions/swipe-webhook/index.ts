import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SWIPE_WEBHOOK_SECRET = Deno.env.get('SWIPE_WEBHOOK_SECRET') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    // 1. Verify Webhook Signature (If Swipe provides one)
    // const signature = req.headers.get('x-swipe-signature');
    // Verify logic here...

    const payload = await req.json();
    console.log('Swipe Webhook Payload:', payload);

    // HYPOTHETICAL PAYLOAD STRUCTURE - ADJUST ACCORDING TO SWIPE DOCS
    const { 
      reference_id: orderId, 
      payment_status, 
      transaction_id, 
      amount_paid 
    } = payload;

    if (payment_status === 'PAID' || payment_status === 'SUCCESS') {
       // Call Atomic DB Function to mark order as paid
       const { data, error } = await supabase.rpc('process_payment_success', {
         p_order_id: orderId,
         p_transaction_id: transaction_id,
         p_amount: amount_paid,
         p_method: 'swipe'
       });

       if (error) {
         console.error('DB Update Error:', error);
         return new Response(JSON.stringify({ error: error.message }), { status: 500 });
       }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });

  } catch (error: any) {
    console.error('Webhook Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    )
  }
})










