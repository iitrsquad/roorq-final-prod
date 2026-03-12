## 1. How the Frontend Expects Data

The frontend is built using **Next.js Server Components** and **Supabase Client**. This means data fetching happens in two main ways:

### A. Server-Side Fetching (Primary Method)
Used in pages like `app/page.tsx` (Home), `app/shop/page.tsx` (Shop), and `app/drops/page.tsx`.

**Example Pattern:**
```typescript
// app/page.tsx
export default async function Home() {
  const supabase = await createClient(); // Server-side client
  
  // Fetches products directly from the 'products' table
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8);
    
  // Passes data directly to components as props
  return (
    <div>
       {products.map(p => <ProductCard product={p} />)}
    </div>
  )
}
```

**Key Takeaway:** The frontend expects flat JSON objects matching your database schema.
- **Drops:** `id`, `name`, `status`, `scheduled_at`, `image_url`
- **Products:** `id`, `name`, `price`, `images` (array of strings), `drop_id`

### B. Client-Side Fetching
Used in interactive forms (like `DropForm` or `ProductForm`) or dynamic user data (Cart, Auth).

**Example Pattern:**
```typescript
// components/DropForm.tsx
const supabase = createClient(); // Client-side client

const handleSubmit = async () => {
   await supabase.from('drops').insert({ ...form_data });
}
```

---

## 2. Recommended Backend Structure

Since this project uses **Next.js App Router** + **Supabase**, you actually **don't need a separate backend server** (like Express or Python) for standard CRUD operations. Next.js *is* your backend.

However, for specific API logic (like payments or complex tasks), you should use **Next.js Route Handlers**.

**Recommended Structure:**
```
app/
  api/               <-- YOUR BACKEND LIVES HERE
    payment/         <-- Payment logic (already exists)
      create-order/
        route.ts     <-- Endpoint: POST /api/payment/create-order
      webhook/
        route.ts     <-- Endpoint: POST /api/payment/webhook
    upload/          <-- (New) If you want a custom upload API
      route.ts
    cron/            <-- Scheduled tasks (e.g. cleanup)
      route.ts
```

**Why this is best:**
- It keeps everything in one repo (Monorepo).
- It shares types and utility functions easily.
- It deploys automatically with Vercel/Netlify.

---

## 3. Plan: 'Upload Image' Implementation

You have two choices:
1.  **Direct Client Upload (Current & Easiest):** The frontend talks directly to Supabase Storage. This is faster and puts less load on your server.
2.  **API Proxy Upload (Your Request):** The frontend sends the file to `/api/upload`, and your server uploads it.

**I recommend Method 1 (Direct Client Upload)** because Supabase is designed for it. But since you asked for an API plan, here is the Hybrid Approach (Secure & Professional):

### Step-by-Step Implementation Plan

**Goal:** Allow users to upload images securely to Supabase Storage.

1.  **Database & Storage Setup (Already Done)**
    *   Bucket `products` exists and is set to Public.
    *   RLS policies allow authenticated uploads.

2.  **Frontend: File Input**
    *   User selects file.
    *   Frontend converts file to `FormData`.

3.  **Backend: The API Route (`app/api/upload/route.ts`)**
    *   **Validate:** Check if the user is an Admin (Security).
    *   **Process:** Receive the `FormData`.
    *   **Upload:** Use `supabase-admin` client to upload to Storage.
    *   **Response:** Return the public URL of the image.

4.  **Frontend: Save URL**
    *   Receive URL from API.
    *   Save that URL string into the `drops` or `products` table.

---

### 4. Beginner Explanation

Think of this codebase like a restaurant:

*   **The Database (Supabase):** This is the kitchen pantry. It has all the raw ingredients (Data: Products, Users, Drops).
*   **The Frontend (Next.js):** This is the dining area and the waiters.
    *   **Server Components (`app/page.tsx`):** These are waiters who go *directly* to the pantry (Database) to get ingredients before the customer even sits down. This is fast and efficient.
    *   **Client Components (`DropForm`):** These are the customers ordering at the table. They sometimes need to ask the kitchen for something specific (API Calls).
*   **The Backend (API Routes):** This is the Head Chef station. You only go here for special requests (Payments, Secure Uploads, Admin Tasks) that regular waiters (Frontend) aren't allowed to handle on their own.

**Your Job as Backend Dev:**
You mostly work in `app/api/` (Creating special endpoints) and `supabase/` (Managing the database schema). You don't need to touch the UI components much.





