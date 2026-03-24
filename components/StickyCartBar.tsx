'use client';

import { useState } from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatINR } from '@/lib/utils/currency';
import { logger } from '@/lib/logger';

type CartItem = { productId: string; quantity: number };

interface StickyCartBarProps {
  productId: string;
  productName: string;
  price: number;
  size: string;
  disabled?: boolean;
}

export default function StickyCartBar({ productId, productName, price, size, disabled }: StickyCartBarProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
      const existing = cart.find(i => i.productId === productId);
      if (existing) {
        existing.quantity += 1;
        toast.success('Updated quantity');
      } else {
        cart.push({ productId, quantity: 1 });
        toast.success('Added to cart!');
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err: unknown) {
      logger.error('StickyCartBar add error', err instanceof Error ? err : undefined);
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  if (disabled) return null;

  return (
    // Shown only on mobile (md: hidden)
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black uppercase tracking-wide truncate text-[#1f1a17]">{productName}</p>
          <p className="text-[11px] text-gray-400 font-mono uppercase">{size} · {formatINR(price)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className={`shrink-0 flex items-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-widest transition-all ${
            added
              ? 'bg-green-600 text-white'
              : loading
              ? 'bg-gray-700 text-white cursor-wait'
              : 'bg-[#1f1a17] text-white hover:bg-[#b54637] active:scale-[0.97]'
          }`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : added ? (
            <><Check className="w-4 h-4" /> Added</>
          ) : (
            <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
}
