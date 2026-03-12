## 1. Backend Architecture Audit

### Security & Access Control
- **Authentication**: Using Supabase Auth (correct).
- **RLS Policies**:
    - `public.users`: Users can read/update their own profiles. Admins can view all.
    - `public.products`: Public read (if active). Admin write access.
    - `public.drops`: Public read (if published). Admin write access.
    - `public.orders`: Users own orders. Admins all orders.
    - **CRITICAL**: The `reserve_inventory` function was failing RLS. We fixed this by adding `SECURITY DEFINER` which is the correct pattern for system-level operations initiated by users.
- **Database Functions**:
    - `reserve_inventory`: Now handles atomic updates and race conditions correctly with `FOR UPDATE`.
    - `process_payment_success`: Handles idempotency and status updates properly.

### Data Integrity
- **Inventory Management**:
    - Using a reserved quantity model (`stock_quantity` vs `reserved_quantity`).
    - **Gap**: There is no automatic cron job visible in the codebase to release expired reservations, although the function `cleanup_expired_reservations` exists in SQL. You need to ensure this is scheduled in Supabase (pg_cron or Edge Function).
- **Order Consistency**:
    - Orders are created with 'reserved' status first, then confirmed to 'placed' or 'paid'. This is a good 2-step process.

### Storage & Assets
- **Current State**: The `ProductForm` component accepts image URLs as text inputs. This means images must be hosted elsewhere (e.g., Unsplash, Cloudinary) manually before adding them.
- **Requirement**: You want to "upload images of drops". This implies you need a Storage Bucket in Supabase.

---

## 2. How to Upload Images (Action Plan)

To allow image uploads directly from your admin panel:

### Step 1: Create Storage Bucket
1.  Go to Supabase Dashboard -> **Storage**.
2.  Create a new bucket named **`products`**.
3.  Set it to **Public** (so anyone can view the images).
4.  Add RLS Policy to the Storage Bucket:
    - **SELECT**: Allow for role `anon` (public view).
    - **INSERT/UPDATE/DELETE**: Allow only for role `admin` or `super_admin`.

### Step 2: Update `DropForm` & `ProductForm`
We need to change the text input for "Image URL" to a **File Input**.

1.  Add a file input handler.
2.  On file selection, upload the file to the `products` bucket.
3.  Get the public URL of the uploaded file.
4.  Save that URL into the form state.

---

## 3. Implementation Guide

I will now update your `DropForm.tsx` (or `ProductForm.tsx` if drops don't have images) to support image uploads.
*Wait, looking at `DropForm.tsx`, it currently DOES NOT have an image field at all. Drops usually have a cover image.*

**I will:**
1.  Add an `image_url` column to the `drops` table (if it's missing, I'll check schema first).
2.  Update `DropForm` to include an image uploader.
3.  Provide the SQL to create the storage bucket policies.





