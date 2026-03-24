'use client';

import { Share2 } from 'lucide-react';

export default function DropShareButton() {
  const handleShare = () => {
    const text = `Drop 001 — The IITR Edit is dropping March 28 at 6 PM! 🔥 25 curated vintage pieces, all Story-Scored. Shop on ROORQ: ${window.location.origin}/drops`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/10 text-white px-7 py-4 text-sm font-black tracking-[0.14em] uppercase hover:bg-white/20 transition"
    >
      <Share2 className="w-4 h-4" />
      Share on WhatsApp
    </button>
  );
}
