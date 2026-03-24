'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

// Drop 001 "The IITR Edit" — March 28, 2026 at 18:00 IST (12:30 UTC)
const DROP_001_DATE = new Date('2026-03-28T12:30:00Z');

export default function Drop001Banner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const now = Date.now();
      const distance = DROP_001_DATE.getTime() - now;

      if (distance <= 0) {
        setIsLive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  if (isLive) {
    return (
      <div className="bg-[#b54637] text-white py-2.5 text-center animate-pulse">
        <Link href="/drops" className="flex items-center justify-center gap-2 group">
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span className="text-[11px] md:text-xs font-black tracking-[0.2em] uppercase">
            Drop 001 "The IITR Edit" is LIVE — Shop Now
          </span>
          <Zap className="w-3.5 h-3.5 fill-white" />
        </Link>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="bg-[#1f1a17] text-white py-2.5 text-center border-b border-[#3a322b]">
      <Link href="/drops" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 group">
        <span className="text-[10px] md:text-[11px] font-black tracking-[0.18em] uppercase text-[#e8c99a]">
          Drop 001 · The IITR Edit
        </span>
        <span className="hidden sm:block text-gray-600">·</span>
        <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest">
          {timeLeft.days > 0 && (
            <>
              <span>{pad(timeLeft.days)}d</span>
              <span className="text-gray-500">:</span>
            </>
          )}
          <span>{pad(timeLeft.hours)}h</span>
          <span className="text-gray-500">:</span>
          <span>{pad(timeLeft.minutes)}m</span>
          <span className="text-gray-500">:</span>
          <span>{pad(timeLeft.seconds)}s</span>
        </div>
        <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden md:block">
          Mar 28 · 6 PM
        </span>
      </Link>
    </div>
  );
}
