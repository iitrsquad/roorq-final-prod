import { cache } from 'react';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductImageSlider from '@/components/ProductImageSlider';
import AddToCartButton from '@/components/AddToCartButton';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, productSchema } from '@/lib/seo/schema';
import { formatINR } from '@/lib/utils/currency';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ShieldCheck, Truck, RefreshCcw, Ruler } from 'lucide-react';
import StickyCartBar from '@/components/StickyCartBar';

const getProduct = cache(async (id: string) => {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      vendor:users(
        id,
        full_name,
        email,
        store_name,
        store_description,
        store_logo_url,
        business_name,
        business_email,
        business_phone,
        vendor_status
      )
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single();

  return product;
});

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await getProduct(params.id);

  if (!product) {
    return buildMetadata({
      title: 'Product not found',
      description: 'The requested product could not be found.',
      path: `/products/${params.id}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: product.name,
    description: product.description || 'Vintage fashion item from Roorq.',
    path: `/products/${product.id}`,
    image: product.images?.[0],
    keywords: [product.name, product.category, product.brand].filter(Boolean) as string[],
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const savings = product.retail_price 
    ? Math.round(((product.retail_price - product.price) / product.retail_price) * 100)
    : 0;

  const availableStock = product.stock_quantity - product.reserved_quantity;
  const vendor = Array.isArray(product.vendor) ? product.vendor[0] : product.vendor;
  const vendorName =
    vendor?.store_name ||
    vendor?.business_name ||
    vendor?.full_name ||
    'Roorq Seller';
  const vendorInitial = vendorName.charAt(0).toUpperCase();
  const askQuestionHref = vendor?.business_phone
    ? `https://wa.me/${vendor.business_phone.replace(/\D/g, '')}?text=${encodeURIComponent(
        `Hi ${vendorName}, I had a question about ${product.name} on Roorq.`
      )}`
    : vendor?.business_email || vendor?.email
      ? `mailto:${vendor.business_email || vendor.email}?subject=${encodeURIComponent(
          `Question about ${product.name}`
        )}&body=${encodeURIComponent(
          `Hi ${vendorName},%0D%0A%0D%0AI had a question about ${product.name} on Roorq.`
        )}`
      : `/contact?product=${product.id}`;
  const sellerStatus = vendor?.vendor_status === 'approved' ? 'Verified campus seller' : 'Seller on Roorq';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <StructuredData
        data={[
          productSchema({
            id: product.id,
            name: product.name,
            description: product.description,
            images: product.images,
            price: product.price,
            brand: product.brand,
            category: product.category,
            inStock: availableStock > 0,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Shop', path: '/shop' },
            { name: product.name, path: `/products/${product.id}` },
          ]),
        ]}
      />
      <Navbar />
      
      <div className="flex-1 max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          <a href="/" className="hover:text-black">Home</a> / <a href="/shop" className="hover:text-black">Shop</a> / <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images - Slider */}
          <ProductImageSlider images={product.images ?? []} name={product.name} />

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="border-b border-gray-100 pb-8 mb-8">
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                {product.name}
              </h1>
              
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-4">
                    <span className="text-3xl font-black tracking-tight">{formatINR(product.price)}</span>
                    {product.retail_price && product.retail_price > product.price && (
                      <div className="flex items-center gap-2">
                        <span className="text-xl text-gray-400 line-through decoration-1">
                          {formatINR(product.retail_price)}
                        </span>
                        <span className="bg-red-600 text-white px-2 py-0.5 text-xs font-black uppercase tracking-widest">
                          -{savings}%
                        </span>
                      </div>
                    )}
                 </div>
                 {/* Brand Badge */}
                 {product.brand && (
                   <span className="border border-black px-3 py-1 text-xs font-bold uppercase tracking-widest">
                     {product.brand}
                   </span>
                 )}
              </div>

              {/* Size Display */}
              <div className="bg-gray-50 p-6 border border-gray-100 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold uppercase tracking-widest">Size</span>
                  <Link href="/sizing" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide underline text-gray-500 hover:text-black">
                    <Ruler className="w-3 h-3" /> Size Guide
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center bg-black text-white text-lg font-bold border-2 border-black">
                    {product.size}
                  </div>
                  <span className="text-xs text-gray-500 font-mono uppercase">
                    Single Item in Stock
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mb-8">
                <AddToCartButton 
                  productId={product.id} 
                  disabled={availableStock === 0}
                />
                {availableStock === 0 && (
                   <p className="mt-2 text-red-600 text-xs font-bold uppercase tracking-widest text-center">
                     Sold Out
                   </p>
                )}
              </div>

              {vendor && (
                <div className="border-y border-gray-100 py-6 mb-8">
                  <div className="flex items-center gap-4 mb-5">
                    {vendor.store_logo_url ? (
                      <img
                        src={vendor.store_logo_url}
                        alt={vendorName}
                        className="h-14 w-14 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-black uppercase text-white">
                        {vendorInitial}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black uppercase tracking-wide text-black">
                        {vendorName}
                      </p>
                      <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500">
                        {sellerStatus}
                      </p>
                      {vendor.store_description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                          {vendor.store_description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link
                      href={`/shop?vendor=${vendor.id}`}
                      className="flex h-12 items-center justify-center border border-black bg-white px-5 text-sm font-black uppercase tracking-widest text-black transition hover:bg-black hover:text-white"
                    >
                      Visit Shop
                    </Link>
                    <a
                      href={askQuestionHref}
                      target={askQuestionHref.startsWith('http') ? '_blank' : undefined}
                      rel={askQuestionHref.startsWith('http') ? 'noreferrer' : undefined}
                      className="flex h-12 items-center justify-center border border-gray-300 bg-gray-50 px-5 text-sm font-black uppercase tracking-widest text-black transition hover:border-black hover:bg-white"
                    >
                      Ask A Question
                    </a>
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-1">Authentic</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed">Verified by our experts for authenticity and quality.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-1">24h Delivery</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed">Direct to your hostel within 24 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCcw className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-1">Cleaned</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed">Professionally laundered and ready to wear.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-1">Easy Returns</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed">Hassle-free returns within 48 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vintage Passport — Story Score Breakdown */}
            {product.story_score_total != null && (
              <div className="border border-[#e8dfd3] bg-[#faf8f4] mb-8">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8dfd3]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#b54637] text-base font-black">◆</span>
                    <span className="text-sm font-black uppercase tracking-[0.18em] text-[#1f1a17]">Story Score</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#1f1a17] tracking-tight">
                      {Number(product.story_score_total).toFixed(1)}
                      <span className="text-sm text-gray-400 font-normal">/10</span>
                    </span>
                    <span className="bg-[#1f1a17] text-white text-[9px] font-black tracking-[0.18em] uppercase px-2 py-1">
                      VERIFIED
                    </span>
                  </div>
                </div>

                {/* Score Rows */}
                <div className="divide-y divide-[#e8dfd3]">
                  {[
                    { label: 'Origin',    score: product.story_score_origin,    text: product.story_origin_text },
                    { label: 'Era',       score: product.story_score_era,       text: product.story_era_text },
                    { label: 'Brand',     score: product.story_score_brand,     text: product.story_brand_text },
                    { label: 'Condition', score: product.story_score_condition, text: product.story_condition_text },
                    { label: 'Cultural',  score: product.story_score_cultural,  text: product.story_cultural_text },
                  ].map(({ label, score, text }) => score != null && (
                    <div key={label} className="px-5 py-3 flex items-center gap-4">
                      <span className="w-20 text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 shrink-0">
                        {label}
                      </span>
                      {/* Score bar */}
                      <div className="flex-1 h-1.5 bg-[#e8dfd3] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#b54637] rounded-full transition-all"
                          style={{ width: `${(score / 10) * 100}%` }}
                        />
                      </div>
                      <span className="w-7 text-xs font-black text-right text-[#1f1a17] shrink-0">{score}/10</span>
                      {text && (
                        <span className="text-[11px] text-gray-500 font-mono leading-tight hidden sm:block max-w-[180px] truncate" title={text}>
                          {text}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-[#e8dfd3] flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">
                    Verified by {product.story_verified_by || 'ROORQ Team'}
                    {product.story_verified_at
                      ? ` · ${new Date(product.story_verified_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
                      : ''}
                  </span>
                  {product.story_rarity && (
                    <span className={`text-[9px] font-black tracking-[0.18em] uppercase px-2 py-1 ${
                      product.story_rarity === 'grail' || product.story_rarity === '1of1'
                        ? 'bg-[#b54637] text-white'
                        : 'bg-[#1f1a17] text-white'
                    }`}>
                      {product.story_rarity === '1of1' ? '1 OF 1' : product.story_rarity.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed font-mono text-xs">
                {product.description || "No description available for this item."}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs font-mono uppercase text-gray-500">
                <div><span className="font-bold text-black">Material:</span> {product.material || 'N/A'}</div>
                <div><span className="font-bold text-black">Color:</span> {product.color || 'N/A'}</div>
                <div><span className="font-bold text-black">Category:</span> {product.category}</div>
                <div><span className="font-bold text-black">Condition:</span> {product.story_condition_text || 'Vintage'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StickyCartBar
        productId={product.id}
        productName={product.name}
        price={product.price}
        size={product.size}
        disabled={availableStock === 0}
      />
      <Footer />
    </div>
  );
}
