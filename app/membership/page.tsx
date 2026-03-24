import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { Check, Star, Zap, Clock, Package, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = buildMetadata({
  title: 'ROORQ Gold — Early Access Membership',
  description: 'Get early access to vintage drops at IIT Roorkee. ROORQ Gold members shop Tuesday 8 AM — before public access opens.',
  path: '/membership',
  keywords: ['membership', 'ROORQ Gold', 'early access', 'vintage', 'IITR'],
});

export default function MembershipPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-black">
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'ROORQ Gold', path: '/membership' },
        ])}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1f1a17] text-white py-20 md:py-28 px-5 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(181,70,55,0.2),transparent_55%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-[#3a322b] bg-[#2a2320] px-4 py-2 text-[10px] font-black tracking-[0.25em] uppercase text-[#e8c99a] mb-6">
            <Star className="w-3 h-3 fill-[#e8c99a]" />
            ROORQ GOLD
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Get In <span className="text-[#b54637]">First.</span>
          </h1>
          <p className="text-[#a09488] text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-3">
            Gold members shop every drop on <strong className="text-white">Tuesday at 8 AM</strong> — a full day before the public gets in on Wednesday.
          </p>
          {/* The joke */}
          <p className="text-[#6b5e54] text-sm font-mono italic max-w-xl mx-auto">
            ₹10/month. That&apos;s literally 2 Maggi packets. Or one failed re-sit exam print-out.
            For the price of your worst decisions, get early access to the best vintage on campus.
          </p>
        </div>
      </section>

      {/* Access Comparison */}
      <section className="border-b border-[#e8dfd3] bg-[#faf8f4]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-12">
          <h2 className="text-center text-xs font-black uppercase tracking-[0.25em] text-gray-400 mb-6">Drop Access Window</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-[#b54637] bg-white p-6 relative">
              <div className="absolute -top-3 left-4 bg-[#b54637] text-white text-[9px] font-black tracking-widest uppercase px-2 py-0.5">
                Gold Members
              </div>
              <Star className="w-5 h-5 text-[#b54637] fill-[#b54637] mb-3" />
              <p className="text-2xl font-black text-[#1f1a17]">Tue · 8 AM</p>
              <p className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-wide">First access, full selection</p>
            </div>
            <div className="border border-[#e8dfd3] bg-white p-6 relative">
              <div className="absolute -top-3 left-4 bg-gray-300 text-gray-600 text-[9px] font-black tracking-widest uppercase px-2 py-0.5">
                Public
              </div>
              <Clock className="w-5 h-5 text-gray-300 mb-3" />
              <p className="text-2xl font-black text-gray-400">Wed · 5 AM</p>
              <p className="text-xs text-gray-400 font-mono mt-1 uppercase tracking-wide">Whatever&apos;s left</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing card + benefits */}
      <section className="py-16 md:py-24 px-5 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 items-start">

          {/* Benefits list */}
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">What You Get</h2>
            <ul className="space-y-5">
              {[
                { icon: Zap,        title: 'Tuesday 8 AM Early Access', body: 'Shop every drop 21 hours before the public. Best pieces, full sizes — no leftovers.' },
                { icon: Star,       title: 'Gold Badge on Profile',     body: 'Verified Gold member badge shown on your orders and profile. Campus credibility unlocked.' },
                { icon: Package,    title: 'Priority Drop Notifications', body: 'WhatsApp + email alert when a new drop is curated. You hear about it before anyone else.' },
                { icon: ShieldCheck,title: 'Story Score Deep Dives',    body: 'Gold members see the full vintage passport breakdown including verifier notes.' },
                { icon: Check,      title: 'COD Priority Processing',   body: 'Your COD orders get queued first — faster delivery to your Bhawan.' },
              ].map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4 items-start">
                  <div className="mt-0.5 shrink-0 w-8 h-8 flex items-center justify-center bg-[#faf8f4] border border-[#e8dfd3]">
                    <Icon className="w-4 h-4 text-[#b54637]" />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-[#1f1a17]">{title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5 font-mono">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing card */}
          <div className="border-2 border-[#1f1a17] bg-[#1f1a17] text-white p-8 sticky top-24">
            <Star className="w-8 h-8 text-[#e8c99a] fill-[#e8c99a] mb-4" />
            <div className="text-5xl font-black mb-1">₹10</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#6b5e54] mb-2">per month</div>
            <div className="text-[10px] text-[#4a3f37] font-mono mb-6">= 2 Maggi packets. Worth it.</div>

            <Link
              href="/contact?topic=gold-membership"
              className="block w-full text-center bg-[#b54637] text-white font-black uppercase tracking-widest py-4 text-sm hover:bg-[#9e3c30] transition mb-3"
            >
              Join ROORQ Gold
            </Link>
            <Link
              href="/drops"
              className="block w-full text-center border border-[#3a322b] text-[#a09488] font-bold uppercase tracking-widest py-3 text-xs hover:border-white hover:text-white transition"
            >
              See the Drop First →
            </Link>

            <p className="mt-5 text-[9px] text-[#4a3f37] text-center font-mono uppercase tracking-widest">
              Pay via UPI · Cancel anytime · No auto-renew trap
            </p>
          </div>
        </div>
      </section>

      {/* What Gold is NOT */}
      <section className="bg-[#faf8f4] border-t border-[#e8dfd3] py-12 px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-gray-400 mb-4">No BS Guarantee</h3>
          <p className="text-sm text-gray-600 leading-relaxed font-mono">
            ROORQ Gold is not a subscription trap. No auto-renewal. No hidden fees.
            Pay ₹10 via UPI, get Gold access for the month. If we&apos;re not delivering value,
            you ghost us — we won&apos;t chase you.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
