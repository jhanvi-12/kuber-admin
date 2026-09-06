import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface StartSlide {
  n: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}

interface StartSliderProps {
  slides: StartSlide[];
  index: number;
  onIndexChange: (index: number) => void;
}

const StartSlider: React.FC<StartSliderProps> = ({ slides, index, onIndexChange }) => {
  useEffect(() => {
    const id = window.setInterval(() => {
      onIndexChange((index + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [index, onIndexChange, slides.length]);

  const go = (next: number) => {
    const len = slides.length;
    onIndexChange(((next % len) + len) % len);
  };

  const slide = slides[index];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className="relative">
        <img src={slide.image} alt={slide.alt} className="aspect-[16/9] w-full object-cover" />
        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card hover:bg-white"
          onClick={() => go(index - 1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card hover:bg-white"
          onClick={() => go(index + 1)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 px-4 py-4">
        {slides.map((item, i) => (
          <button
            key={item.n}
            type="button"
            aria-label={`Go to ${item.title}`}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-7 bg-purple-700' : 'w-2 bg-line'}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default StartSlider;
