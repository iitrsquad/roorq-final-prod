import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Drop001Banner from '@/components/Drop001Banner';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { ArrowRight, Share2, Star } from 'lucide-react';
import DropShareButton from '@/components/DropShareButton';

export const metadata = buildMetadata({
  title: 'Drop 001 — The IITR Edit',
  description: 'India\'s first Story-Scored vintage drop. 25 curated pieces from IIT Roorkee. Once sold out, gone forever.',
  path: '/drops',
  keywords: ['drop', 'vintage', 'IITR', 'limited edition', 'story score'],
});

export default async function DropsPage() {
  const supabase = await createClient();

  // Fetch the most recent/upcoming drop
  const { data: drops } = await supabase
    .from('drops')
    .select('*')
    .order('scheduled_at', { ascending: false })
    .limit(5);

  const featuredDrop = drops?.find(d => d.status === 'upcoming' || d.status === 'live') ?? drops?.[0];

  // Fetch products for the featured drop (or latest 25 active products if no drop ID)
  const productsQuery = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(25);

  if (featuredDrop?.id) {
    productsQuery.eq('drop_id', featuredDrop.id);
  }

  const { data: products } = await productsQuery;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-black">
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Drops', path: '/drops' },
          ]),
        ]}
      />
      <Navbar />
      <Drop001Banner />

      {/* Hero — Drop 001 Launch */}
      <section className="relative bg-[#1f1a17] text-white overflow-hidden">
        {/* Subtle noise texture via gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(181,70,55,0.15),transparent_60%)]" />
        <div className="relative max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Drop number */}
            <div className="inline-flex items-center gap-2 border border-[#3a322b] bg-[#2a2320] px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase text-[#e8c99a] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b54637] animate-pulse" />
              DROP 001
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              The IITR
              <span className="block text-[#b54637]">Edit.</span>
            </h1>

            <p className="text-[#a09488] text-base md:text-lg leading-relaxed max-w-xl mb-8">
              25 curated vintage pieces. Every one Story-Scored, verified, and cleaned.
              Once a piece is gone — it&apos;s gone forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 bg-[#b54637] text-white px-7 py-4 text-sm font-black tracking-[0.14em] uppercase hover:bg-[#9e3c30] transition"
              >
                Shop the Drop <ArrowRight className="w-4 h-4" />
              </a>
              <DropShareButton />
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap gap-8">
            {[
              { label: 'Pieces', value: String(products?.length ?? 25) },
              { label: 'Story Scored', value: '100%' },
              { label: 'Avg Score', value: products?.length
                  ? `${(products.reduce((s, p) => s + (Number(p.story_score_total) || 7.5), 0) / products.length).toFixed(1)}/10`
                  : '—' },
              { label: 'Launch', value: 'Mar 28, 6 PM' },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-black text-white">{value}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b5e54] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Member Early Access Banner */}
      <div className="bg-[#f9f3e8] border-y border-[#e8dfd3] py-4 px-4">
        <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Star className="w-4 h-4 text-[#b54637] fill-[#b54637] shrink-0" />
            <p className="text-sm font-bold text-[#1f1a17]">
              ROORQ Gold members get access <span className="text-[#b54637]">2 days early</span> — Tuesday 8 AM
            </p>
          </div>
          <Link
            href="/membership"
            className="shrink-0 text-[11px] font-black uppercase tracking-[0.18em] border border-[#1f1a17] bg-white px-4 py-2 hover:bg-[#1f1a17] hover:text-white transition"
          >
            Get Gold · ₹10/mo
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <section id="products" className="max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-8 border-b-2 border-black pb-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              25 Pieces
            </h2>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 font-mono mt-1">
              Limited · Story Scored · Gone When Sold
            </p>
          </div>
          <Link href="/shop" className="hidden md:inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-gray-500 transition">
            All Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-200">
            <p className="text-2xl font-black uppercase tracking-widest text-gray-300">Dropping March 28</p>
            <p className="text-sm text-gray-400 font-mono mt-2">25 vintage pieces going live at 6 PM IST</p>
          </div>
        )}
      </section>

      {/* What is a Drop? */}
      <section className="bg-[#faf8f4] border-t border-[#e8dfd3] py-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8">How Drops Work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Curated & Scored',
                body: 'Every piece in a Drop is hand-picked and given a full Story Score — Origin, Era, Brand, Condition, Cultural Value.',
              },
              {
                step: '02',
                title: 'Limited Window',
                body: 'Gold members get in first (Tue 8 AM). Public access opens Wed 5 AM. When items sell out, they\'re gone permanently.',
              },
              {
                step: '03',
                title: 'Campus Delivery',
                body: 'Order before 6 PM and it arrives at your Bhawan within 24 hours. COD available — pay when it shows up.',
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="border border-[#e8dfd3] bg-white p-6">
                <div className="text-[10px] font-black tracking-[0.25em] text-[#b54637] mb-3">{step}</div>
                <h4 className="text-sm font-black uppercase tracking-wide mb-2">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-mono">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Drops listing (if any) */}
      {drops && drops.length > 1 && (
        <section className="max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8 py-12">
          <h3 className="text-lg font-black uppercase tracking-widest mb-6 border-b border-gray-200 pb-3">Past Drops</h3>
          <div className="space-y-3">
            {drops.slice(1).map((drop) => (
              <Link
                key={drop.id}
                href={`/shop?drop=${drop.id}`}
                className="flex items-center justify-between border border-gray-200 px-5 py-4 hover:border-black transition group"
              >
                <div>
                  <span className="text-sm font-black uppercase tracking-wide">{drop.name}</span>
                  <span className="ml-3 text-xs font-mono text-gray-400">
                    {new Date(drop.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
