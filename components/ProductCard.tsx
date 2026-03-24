'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatINR } from '@/lib/utils/currency';

const RARITY_LABELS: Record<string, string> = {
  find:  'FIND',
  rare:  'RARE',
  grail: 'GRAIL',
  '1of1': '1 OF 1',
};

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  size: string;
  reserved_quantity?: number;
  stock_quantity?: number;
  // Story Score fields
  story_score_total?: number | null;
  story_era_text?: string | null;
  story_rarity?: string | null;
}

export default function ProductCard({ product }: { product: Product }) {
  const stockQuantity = Math.max(0, Number(product.stock_quantity ?? 0));
  const reservedQuantity = Math.max(0, Number(product.reserved_quantity ?? 0));
  const availableStock = Math.max(0, stockQuantity - reservedQuantity);
  const isSoldOut = availableStock <= 0;

  const score = product.story_score_total ? Number(product.story_score_total) : null;
  // Extract short era label from story_era_text e.g. "Mid-90s grunge era" → "90s"
  const eraLabel = product.story_era_text
    ? product.story_era_text.match(/\b(Y2K|80s|90s|00s|70s|60s|2000s|1990s|1980s|1970s)\b/i)?.[0]?.toUpperCase()
    : null;
  const rarity = product.story_rarity ?? null;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Top-left: Era badge */}
        {eraLabel && (
          <div className="absolute top-2 left-2 bg-[#1f1a17]/80 text-[#e8c99a] text-[9px] font-black tracking-[0.15em] uppercase px-2 py-0.5 backdrop-blur-sm">
            {eraLabel}
          </div>
        )}

        {/* Top-right: Rarity badge */}
        {rarity && RARITY_LABELS[rarity] && (
          <div className={`absolute top-2 right-2 text-[9px] font-black tracking-[0.15em] uppercase px-2 py-0.5 backdrop-blur-sm ${
            rarity === 'grail' || rarity === '1of1'
              ? 'bg-[#b54637] text-white'
              : 'bg-black/70 text-white'
          }`}>
            {RARITY_LABELS[rarity]}
          </div>
        )}

        {/* Sold out */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-black tracking-widest uppercase">Sold Out</span>
          </div>
        )}

        {/* Bottom-right: Story Score chip */}
        {score !== null && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 shadow-md">
            <span className="text-[#b54637] text-[10px] font-black">◆</span>
            <span className="text-[11px] font-black text-[#1f1a17] tracking-tight">{score.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-bold text-sm uppercase tracking-wide mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{product.size}</p>
          <p className="font-mono font-medium">{formatINR(product.price)}</p>
        </div>
      </div>
    </Link>
  );
}
