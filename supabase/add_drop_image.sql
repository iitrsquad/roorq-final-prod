-- Add image_url to drops table
ALTER TABLE public.drops 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create a storage bucket for products/drops if it doesn't exist
-- Note: Buckets are usually created via API/Dashboard, but we can try inserting into storage.buckets if using local/self-hosted or just instruct user.
-- For Supabase hosted, it's safer to use the Dashboard for bucket creation, but we can set policies here.

-- 1. Enable RLS on objects (files)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 2. Allow public read access to 'products' bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

-- 3. Allow admins to insert/update/delete in 'products' bucket
CREATE POLICY "Admin Insert"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' 
  AND (auth.role() = 'authenticated') 
  AND (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  )
);

CREATE POLICY "Admin Update"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'products' 
  AND (auth.role() = 'authenticated') 
  AND (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  )
);

CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products' 
  AND (auth.role() = 'authenticated') 
  AND (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
  )
);








