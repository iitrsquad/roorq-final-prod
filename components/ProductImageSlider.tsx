'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ProductImageSliderProps = {
  images: string[]
  name: string
}

export default function ProductImageSlider({ images, name }: ProductImageSliderProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images])
  const [activeIndex, setActiveIndex] = useState(0)

  if (safeImages.length === 0) {
    return (
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-400 font-mono text-sm uppercase tracking-widest">
        No Image Available
      </div>
    )
  }

  const goNext = () => setActiveIndex((i) => (i + 1) % safeImages.length)
  const goPrev = () => setActiveIndex((i) => (i - 1 + safeImages.length) % safeImages.length)

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] bg-gray-50 border border-gray-100 overflow-hidden group">
        <Image
          src={safeImages[activeIndex]}
          alt={`${name} ${activeIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
          Vintage
        </div>
        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 text-black shadow hover:bg-white transition"
            >
              <ChevronLeft className="h-5 w-5 mx-auto" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 text-black shadow hover:bg-white transition"
            >
              <ChevronRight className="h-5 w-5 mx-auto" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {safeImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 w-6 rounded-full transition ${idx === activeIndex ? 'bg-black' : 'bg-black/30'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {safeImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square overflow-hidden border transition ${idx === activeIndex ? 'border-black' : 'border-gray-100 hover:border-black'}`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 12.5vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
