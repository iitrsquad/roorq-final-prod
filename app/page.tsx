import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DropCountdown from '@/components/DropCountdown';
import { createClient } from '@/lib/supabase/server';
import ProductCard from '@/components/ProductCard';
import CommunityStrip from '@/components/CommunityStrip';
import FAQ from '@/components/FAQ';
import { ArrowRight, Check, Package, Zap, TrendingUp, ShieldCheck, Truck, CreditCard, Star, UserPlus, ShoppingBag, Clock, Quote } from 'lucide-react';

export default async function Home() {
  const supabase = await createClient();
  const serverTime = Date.now(); 
  
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8);

  const now = new Date();
  const day = now.getDay(); 
  const hour = now.getHours();
  const isDropLive = day === 3 && hour >= 5 && hour < 18;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-black pb-20 md:pb-0 selection:bg-black selection:text-white">
      <Navbar />
      
            {/* SECTION 1: Hero Banner */}
      <section className="relative overflow-hidden border-b border-[#e8e2d8] bg-[#faf8f4]">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(181,70,55,0.10),transparent_60%)]" />
        <div className="absolute -left-10 top-28 h-44 w-44 rounded-full bg-[#e9dccf] blur-3xl opacity-70" />
        <div className="absolute right-0 top-10 h-40 w-40 rounded-full bg-[#f0e6db] blur-3xl opacity-90" />

        <div className="relative max-w-[1800px] mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-[#ddd2c3] bg-white/90 px-4 py-2 text-[10px] md:text-xs font-bold tracking-[0.18em] text-[#3c352d] shadow-[0_8px_24px_rgba(33,24,16,0.06)]">
                India's First Story-Scored Vintage Marketplace
              </div>

              <h1 className="mt-6 text-[2.55rem] leading-[0.94] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-[#181512]">
                Vintage finds with
                <span className="block text-[#b54637]">real stories behind them.</span>
              </h1>

              <p className="mt-5 max-w-xl text-[15px] md:text-base leading-7 text-[#5e554d]">
                Every item on ROORQ comes with a Story Score - verified origin, era, and cultural value. So you always know what you're buying.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#1f1a17] px-6 py-4 text-sm font-black tracking-[0.14em] text-white uppercase transition hover:bg-[#b54637]"
                >
                  Shop Verified Finds
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/sell"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#1f1a17] bg-white px-6 py-4 text-sm font-black tracking-[0.14em] text-[#1f1a17] uppercase transition hover:bg-[#f4eee6]"
                >
                  Sell on ROORQ
                  <UserPlus className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                <div className="rounded-2xl border border-[#e8dfd3] bg-white px-4 py-4 shadow-[0_16px_40px_rgba(33,24,16,0.06)]">
                  <ShieldCheck className="w-5 h-5 text-[#181512]" strokeWidth={1.8} />
                  <p className="mt-3 text-sm font-black tracking-tight text-[#181512]">Story Score</p>
                  <p className="mt-1 text-sm leading-6 text-[#666059]">Every item verified</p>
                </div>
                <div className="rounded-2xl border border-[#e8dfd3] bg-white px-4 py-4 shadow-[0_16px_40px_rgba(33,24,16,0.06)]">
                  <ShoppingBag className="w-5 h-5 text-[#181512]" strokeWidth={1.8} />
                  <p className="mt-3 text-sm font-black tracking-tight text-[#181512]">50+ Sellers</p>
                  <p className="mt-1 text-sm leading-6 text-[#666059]">Verified vintage curators</p>
                </div>
                <div className="rounded-2xl border border-[#e8dfd3] bg-white px-4 py-4 shadow-[0_16px_40px_rgba(33,24,16,0.06)]">
                  <Star className="w-5 h-5 text-[#181512]" strokeWidth={1.8} />
                  <p className="mt-3 text-sm font-black tracking-tight text-[#181512]">Fresh Drops</p>
                  <p className="mt-1 text-sm leading-6 text-[#666059]">New listings daily</p>
                </div>
              </div>

              <p className="mt-5 text-xs md:text-sm text-[#766d63] tracking-[0.08em] uppercase">
                Each listing is rated on <span className="text-[#181512] font-semibold">Origin</span> &middot; <span className="text-[#181512] font-semibold">Era</span> &middot; <span className="text-[#181512] font-semibold">Brand</span> &middot; <span className="text-[#181512] font-semibold">Cultural Value</span>
              </p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-[0.8fr_1fr] gap-3 md:gap-4 items-end">
                <div className="space-y-3 md:space-y-4">
                  <div className="overflow-hidden rounded-[26px] border border-[#e5dbcf] bg-white p-2 shadow-[0_24px_60px_rgba(33,24,16,0.08)] rotate-[-4deg]">
                    <img
                      src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
                      alt="Vintage denim jacket"
                      className="h-[220px] w-full rounded-[20px] object-cover md:h-[260px]"
                    />
                  </div>
                  <div className="rounded-[22px] border border-[#e5dbcf] bg-white px-5 py-4 shadow-[0_20px_50px_rgba(33,24,16,0.06)]">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a7f73]">How Story Score works</p>
                    <p className="mt-2 text-sm leading-6 text-[#4d463f]">We grade every piece on origin, era clues, brand signals, and cultural relevance before it goes live.</p>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="overflow-hidden rounded-[30px] border border-[#e5dbcf] bg-white p-2 shadow-[0_28px_70px_rgba(33,24,16,0.10)]">
                    <img
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
                      alt="Students shopping vintage fashion"
                      className="h-[320px] w-full rounded-[24px] object-cover md:h-[460px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="overflow-hidden rounded-[24px] border border-[#e5dbcf] bg-white p-2 shadow-[0_18px_40px_rgba(33,24,16,0.08)] translate-y-2">
                      <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                        alt="Vintage accessories"
                        className="h-[150px] w-full rounded-[18px] object-cover"
                      />
                    </div>
                    <div className="rounded-[24px] border border-[#e5dbcf] bg-[#fffdf9] px-4 py-5 shadow-[0_18px_40px_rgba(33,24,16,0.06)]">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a7f73]">Fresh today</p>
                      <p className="mt-2 text-2xl font-black tracking-tight text-[#181512]">8 new</p>
                      <p className="mt-1 text-sm leading-6 text-[#5e554d]">Verified listings added across denim, outerwear, and campus staples.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COD Trust Strip */}
      <div className="bg-[#1a1a1a] text-white py-3 text-center border-b border-black">
        <p className="px-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em]">
          Story Score Verified &middot; Authentic Vintage &middot; COD &amp; UPI &middot; Campus Delivery &middot; IIT Roorkee Startup &middot; Fresh Drops Daily
        </p>
      </div>

      {/* SECTION 2: How Roorq Works (Technical Grid Background) */}
      <section className="py-16 border-b border-gray-100 bg-white relative overflow-hidden">
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-[1800px] mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-12">How Roorq Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300 rounded-none bg-white">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-2">Student Access</h3>
              <p className="text-[10px] text-gray-500 uppercase font-medium font-mono max-w-[150px]">Campus Fashion Platform</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300 rounded-none bg-white">
                <Package className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-2">Factory New</h3>
              <p className="text-[10px] text-gray-500 uppercase font-medium font-mono max-w-[150px]">Brand New Surplus</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300 rounded-none bg-white">
                <CreditCard className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-2">COD First</h3>
              <p className="text-[10px] text-gray-500 uppercase font-medium font-mono max-w-[150px]">Pay on Delivery</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 border-2 border-black flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300 rounded-none bg-white">
                <Truck className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-2">24h Delivery</h3>
              <p className="text-[10px] text-gray-500 uppercase font-medium font-mono max-w-[150px]">Direct to Hostel</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Countdown Timer */}
      <DropCountdown initialServerTime={serverTime} />

      {/* SECTION 4: This Week's Drop Preview */}
      <section className="py-16 max-w-[1800px] mx-auto px-4">
        <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-4">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2 leading-none">
              This Week's Drop
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest font-mono">
              Limited Quantities â€¢ Once Sold Out, Gone Forever
            </p>
          </div>
          <Link href="/shop" className="hidden md:inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest hover:text-gray-600 transition">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            [1, 2, 3, 4, 5, 6, 7, 8].map((_: number, idx: number) => (
              <div key={idx} className="group relative aspect-[3/4] bg-gray-100 border border-transparent hover:border-black transition-colors duration-300">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs uppercase font-bold tracking-widest">
                  Coming Soon
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/shop" className="inline-block border-2 border-black px-8 py-3 text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition rounded-none">
            View All Items
          </Link>
        </div>
      </section>

      {/* SECTION: Shop Men/Women/Outlet Trio */}
      <section className="py-8 max-w-[1800px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Men's Column */}
          <div className="relative h-[650px] group overflow-hidden border border-transparent hover:border-black transition-colors duration-300">
            <img 
              src="https://images.unsplash.com/photo-1488161628813-99c974fc5fe2?auto=format&fit=crop&w=800&q=80"
              alt="Shop Men's"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-white p-6 text-center shadow-xl border border-black">
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Shop Men's</h3>
              <div className="flex flex-col gap-2 text-xs font-bold tracking-widest uppercase">
                <Link href="/shop?category=mens" className="hover:text-gray-500 transition border-b border-gray-200 pb-1">Men's Vintage</Link>
                <Link href="/shop?category=t-shirt" className="hover:text-gray-500 transition border-b border-gray-200 pb-1">Tops & T-Shirts</Link>
                <Link href="/shop?category=trousers" className="hover:text-gray-500 transition">Vintage Trousers</Link>
              </div>
            </div>
          </div>

          {/* Women's Column */}
          <div className="relative h-[650px] group overflow-hidden border border-transparent hover:border-black transition-colors duration-300">
             <img 
              src="https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&w=800&q=80"
              alt="Shop Women's"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-white p-6 text-center shadow-xl border border-black">
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Shop Women's</h3>
              <div className="flex flex-col gap-2 text-xs font-bold tracking-widest uppercase">
                <Link href="/shop?category=womens" className="hover:text-gray-500 transition border-b border-gray-200 pb-1">Women's Vintage</Link>
                <Link href="/shop?category=womens" className="hover:text-gray-500 transition border-b border-gray-200 pb-1">Vintage Tops</Link>
                <Link href="/shop?category=womens" className="hover:text-gray-500 transition">Skirts & Trousers</Link>
              </div>
            </div>
          </div>

           {/* Outlet Column */}
           <div className="relative h-[650px] group overflow-hidden border border-transparent hover:border-black transition-colors duration-300">
             <img 
              src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80"
              alt="Shop Outlet"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-white p-6 text-center shadow-xl border border-black">
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Shop Outlet</h3>
              <div className="flex flex-col gap-2 text-xs font-bold tracking-widest uppercase">
                <Link href="/shop?category=sale" className="hover:text-gray-500 transition border-b border-gray-200 pb-1">Men's Outlet</Link>
                <Link href="/shop?category=sale" className="hover:text-gray-500 transition border-b border-gray-200 pb-1">Women's Outlet</Link>
                <Link href="/shop?category=kids" className="hover:text-gray-500 transition">Kids Outlet</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Text Links (Brand Navigation) */}
      <section className="py-16 max-w-[1800px] mx-auto px-4 border-b border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            {
              title: 'Shop Vintage Nike',
              links: ['Vintage Nike T-Shirts', 'Vintage Nike Jackets', 'Vintage Nike Sweatshirts', 'All Vintage Nike'],
            },
            {
              title: 'Shop Vintage Carhartt',
              links: ['Vintage Carhartt Jackets', 'Vintage Carhartt T-Shirts', 'Vintage Carhartt Sweatshirts', 'All Vintage Carhartt'],
            },
            {
              title: 'Shop Vintage Ralph Lauren',
              links: ['Vintage Ralph Lauren Shirts', 'Vintage Ralph Lauren Polo Shirts', 'Vintage Ralph Lauren 1/4 Zips', 'All Vintage Ralph Lauren'],
            },
            {
              title: 'Shop Vintage Dickies',
              links: ['Vintage Dickies T Shirts', 'Vintage Dickies Jackets', 'Vintage Dickies Workwear Trousers', 'All Vintage Dickies'],
            },
          ].map((column, idx) => (
            <div key={idx}>
              <h3 className="font-black text-xs uppercase tracking-widest mb-6 border-b border-black pb-2 inline-block">{column.title}</h3>
              <ul className="space-y-3 text-[10px] text-gray-500 font-medium uppercase tracking-wide font-mono">
                {column.links.map((link, index) => (
                  <li key={index} className="hover:text-black transition-colors cursor-pointer">
                    <Link href="/shop">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Shop Bestsellers (Grid) */}
      <section className="py-16 max-w-[1800px] mx-auto px-4">
        <h2 className="text-3xl font-black uppercase mb-10 tracking-tighter">Shop Bestsellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: 'Vintage Single Stitch T-Shirts', img: 'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&w=800&q=80' },
            { title: 'Vintage Workwear', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
            { title: 'Vintage Gorpcore & Outdoor Brands', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80' },
            { title: 'Vintage Denim & T Shirts', img: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=800&q=80' },
          ].map((item, idx) => (
            <Link key={idx} href="/shop" className="group block">
              <div className="aspect-square overflow-hidden bg-gray-100 mb-3 border border-transparent group-hover:border-black transition-all duration-300">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="uppercase text-xs tracking-widest font-bold font-mono group-hover:text-gray-600">{item.title} &rarr;</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION: Shop by Style (Text Links) */}
      <section className="py-12 max-w-[1800px] mx-auto px-4 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { title: 'Shop by Style', links: ['Vintage Festival', 'Vintage Blokecore', 'Vintage Y2K', 'Premium Vintage'] },
            { title: 'Vintage Sweatshirts', links: ['Nike Sweatshirts', 'Carhartt Sweatshirts', 'Champion Sweatshirts', 'All Sweatshirts'] },
            { title: 'Vintage Tops & T-Shirts', links: ['Vintage Single Stitch T Shirts', 'Vintage Band T-Shirts', 'Harley Davidson T-Shirts', 'Vintage Polo Shirts'] },
            { title: 'Vintage Jeans & Trousers', links: ['Vintage Levis 501s', 'Vintage Carhartt Jeans & Trousers', 'Vintage Men\'s Designer Trousers', 'Vintage Levis Jeans'] },
            { title: 'Shop Bestsellers', links: ['Vintage Designer', 'Vintage Workwear', 'Vintage Skater', 'Vintage Nascar'] },
          ].map((column, idx) => (
            <div key={idx}>
              <h3 className="uppercase font-black text-xs tracking-wide mb-4 border-b-2 border-gray-100 pb-2">{column.title}</h3>
              <ul className="space-y-2 text-[10px] uppercase tracking-wide font-mono">
                {column.links.map((link, index) => (
                  <li key={index} className="text-gray-500 hover:text-black transition-colors cursor-pointer">
                    <Link href="/shop">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Shop Bestsellers Row 2 */}
      <section className="pb-16 max-w-[1800px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { title: 'Vintage Designer', img: 'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&w=800&q=80' },
            { title: 'Vintage Workwear', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80' },
            { title: 'Vintage Skater', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
            { title: 'Vintage Nascar', img: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80' },
          ].map((item, idx) => (
            <Link key={idx} href="/shop" className="group block">
              <div className="aspect-square overflow-hidden bg-gray-100 mb-3 border border-transparent group-hover:border-black transition-all duration-300">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="uppercase text-xs tracking-widest font-bold font-mono group-hover:text-gray-600">{item.title} &rarr;</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 5: Gold Access (VIP Layout) */}
      <section className="py-20 bg-black text-white border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-yellow-500 text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-6">
              VIP Access
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
              Roorq Gold
            </h2>
            <p className="text-gray-400 text-lg font-medium mb-10 max-w-md leading-relaxed uppercase tracking-wide font-mono">
              Skip the queue. Get 24-hour early access to every drop. Never miss your size again.
            </p>
            <Link 
              href="/membership" 
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 border-2 border-transparent rounded-none"
            >
              Join Gold <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 w-full max-w-md bg-zinc-900 p-10 border border-zinc-800 text-center">
             <Clock className="w-16 h-16 mx-auto mb-8 text-yellow-500" />
             <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Tuesday 8 AM</h3>
             <p className="text-sm text-gray-500 uppercase tracking-widest mb-8 font-mono">Early Access Window Opens</p>
             <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
               <div className="w-3/4 h-full bg-yellow-500"></div>
             </div>
             <p className="text-[10px] text-right text-gray-600 mt-2 uppercase font-bold font-mono">Limited Spots Available</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: Referral Magic (Restored) */}
      <section className="py-20 bg-black text-white overflow-hidden relative">
        {/* Abstract bg shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-zinc-900 to-transparent opacity-50 transform skew-x-12"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-6">
                Zero-Cost Growth
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">
                Refer a Friend<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                  Get It Free.
                </span>
              </h2>
              <p className="text-gray-400 text-lg font-medium mb-10 max-w-md leading-relaxed">
                Refer a friend â€” when they buy their first order, you get the same-category item free.
              </p>
              <Link 
                href="/referrals" 
                className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-gray-200 transition"
              >
                Generate Referral Link <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { item: 'Sweater', icon: 'ðŸ§¥' },
                { item: 'Jacket', icon: 'ï¿½-' },
                { item: 'Shoes', icon: 'ðŸ‘Ÿ' },
              ].map((ex, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between h-48 hover:border-white transition duration-300">
                  <div className="text-3xl">{ex.icon}</div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Scenario {idx + 1}</p>
                    <p className="text-sm font-bold uppercase leading-tight">
                      Friend buys {ex.item} <br />
                      <span className="text-green-400">â†’ You get {ex.item} Free</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Why We're Different (Visual Upgrade - Image Cards) */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 - Brand New */}
            <div className="relative h-[500px] group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=2070&auto=format&fit=crop" 
                alt="Brand New Only"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full p-10 text-white border-t border-white/20 backdrop-blur-sm bg-black/30">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">Brand New<br/>Only</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  Direct factory surplus. No used clothes. No thrift roulette.
                </p>
                <div className="w-12 h-1 bg-white"></div>
              </div>
            </div>

            {/* Card 2 - Lowest Price */}
            <div className="relative h-[500px] group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2070&auto=format&fit=crop" 
                alt="Lowest Campus Price"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full p-10 text-white border-t border-white/20 backdrop-blur-sm bg-black/30">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">Lowest Campus<br/>Price</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  30-50% cheaper than market. Cutting middlemen for you.
                </p>
                <div className="w-12 h-1 bg-white"></div>
              </div>
            </div>

            {/* Card 3 - IITR Exclusive */}
            <div className="relative h-[500px] group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop" 
                alt="Campus Exclusive"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full p-10 text-white border-t border-white/20 backdrop-blur-sm bg-black/30">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">Campus<br/>Exclusive</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  Built for Roorq. Verified by email. Delivered to your Bhawan.
                </p>
                <div className="w-12 h-1 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Community Strip */}
      <CommunityStrip />

      {/* SECTION 9: Shop Sale Banner */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop"
          alt="Shop Sale"
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center">
          <h2 className="text-7xl md:text-[10rem] font-black uppercase text-red-600 tracking-tighter drop-shadow-xl mb-4 leading-none mix-blend-hard-light">
            Shop Sale
          </h2>
          <div className="bg-white inline-block px-8 py-3 transform -rotate-2 mb-10 shadow-2xl border-2 border-black">
             <p className="text-black font-black uppercase tracking-[0.2em] text-sm">Holiday Sale Live Now</p>
          </div>
          <div>
            <Link 
              href="/shop?category=sale" 
              className="bg-white text-black px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 rounded-none border-2 border-transparent hover:border-white"
            >
              Shop Now &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <FAQ />

      {/* Sticky Mobile Footer CTA */}
      {isDropLive && (
        <div className="fixed bottom-0 left-0 w-full bg-red-600 p-4 md:hidden z-50 animate-in slide-in-from-bottom">
          <Link 
            href="/shop" 
            className="block w-full bg-white text-red-600 text-center py-3 font-black uppercase tracking-widest text-sm rounded-none"
          >
            Shop Drop â€” Live
          </Link>
        </div>
      )}

      {/* SECTION 11: Footer */}
      <Footer />
    </div>
  );
}




