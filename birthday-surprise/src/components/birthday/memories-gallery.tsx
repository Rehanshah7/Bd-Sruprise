"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X, ArrowRight, ArrowLeft } from "lucide-react";

type Memory = {
  image: string;
  caption: string;
  date?: string;
};

const memories: Memory[] = [
  { image: "/images/20260626_195124.jpg.jpeg", caption: "One of my favorite moments ❤️" },
  { image: "/images/20261027_193434.jpg.jpeg", caption: "That beautiful smile of yours 💗" },
  { image: "/images/20261028_195052.jpg.jpeg", caption: "Us, just being us 🥹" },
  { image: "/images/23562-Picsart-AiImageEnhancer.png", caption: "A memory I want to keep forever ✨" },
  { image: "/images/23629-Picsart-AiImageEnhancer.png", caption: "My favorite person, always 💕" },
  { image: "/images/23630-Picsart-AiImageEnhancer.png", caption: "Every moment with you matters ❤️" },
  { image: "/images/23632-Picsart-AiImageEnhancer.png", caption: "You make ordinary days special 🌷" },
  { image: "/images/32314-Picsart-AiImageEnhancer.png", caption: "More smiles, more memories 💕" },
  { image: "/images/32315-Picsart-AiImageEnhancer.png", caption: "A moment worth remembering ✨" },
  { image: "/images/32316-Picsart-AiImageEnhancer.png", caption: "You and me, always 🌷" },
  { image: "/images/32317-Picsart-AiImageEnhancer.png", caption: "Another reason I love us 💗" },
  { image: "/images/girlfriend-2.png", caption: "Little moments, big feelings 🥹" },
  { image: "/images/girlfriend.png", caption: "My heart feels at home with you ❤️" },
  { image: "/images/IMG-20260329-WA0044.jpg.jpeg", caption: "Our story is my favorite story 💌" },
  { image: "/images/IMG-20260329-WA0055.jpg.jpeg", caption: "Still falling for you 💖" },
  { image: "/images/IMG-20260329-WA0057.jpg.jpeg", caption: "And this is only the beginning ✨" },
  { image: "/images/IMG-20260507-WA0009.jpg.jpeg", caption: "One more memory with my favorite girl 💕" },
  { image: "/images/IMG-20260507-WA0010.jpg.jpeg", caption: "A picture full of feelings ❤️" },
  { image: "/images/IMG-20260512-WA0009.jpg.jpeg", caption: "My kind of forever 🫶" },
  { image: "/images/IMG_20251210_185354_494.webp", caption: "So many reasons to smile 💗" },
  { image: "/images/IMG_20260608_232547_604(1).jpg.jpeg", caption: "Making everyday brighter together ✨" },
  { image: "/images/IMG_20261026_101616_950.jpg.jpeg", caption: "Forever grateful for you 🌷" },
  { image: "/images/IMG_20261026_101641_552.jpg.jpeg", caption: "To us, and everything still to come 💖" },
];

export type MemoriesGalleryProps = {
  onContinue?: () => void;
  onBackToCake?: () => void;
};

export function MemoriesGallery({ onContinue, onBackToCake }: MemoriesGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const activeMemory =
    selected === null ? null : memories[selected];

  return (
    <main className="memories-page">
      {onBackToCake && (
        <div className="max-w-[600px] mx-auto mb-4 flex justify-start">
          <button
            type="button"
            onClick={onBackToCake}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-pink-700 text-xs font-semibold shadow-sm border border-pink-200/60 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Cake</span>
          </button>
        </div>
      )}

      <header className="memories-header">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="memories-kicker">
            <Heart size={14} fill="currentColor" /> OUR LITTLE WORLD
          </span>

          <h1>Our Memories</h1>

          <p>
            Every picture holds a little piece of my heart.
            Tap a photo to relive the moment. 💌
          </p>
        </motion.div>
      </header>

      <section className="memories-grid" aria-label="Our photo memories">
        {memories.map((memory, index) => (
          <motion.button
            key={memory.image}
            type="button"
            className={`memory-polaroid memory-tilt-${index % 5}`}
            initial={{ opacity: 0, y: 22, rotate: index % 2 ? 4 : -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelected(index)}
            aria-label={`Open memory ${index + 1}: ${memory.caption}`}
          >
            <span className="memory-photo-wrap">
              <img
                src={memory.image}
                alt={`Memory ${index + 1}`}
                loading="lazy"
              />
              <span className="memory-heart">
                <Heart size={15} fill="currentColor" />
              </span>
            </span>

            <span className="memory-caption">
              {memory.caption}
            </span>
          </motion.button>
        ))}
      </section>

      <footer className="memories-footer">
        <Heart size={18} fill="currentColor" />
        <p>These are our memories, and I want many more with you.</p>

        <button
          className="memories-next"
          onClick={onContinue}
          type="button"
        >
          One last little surprise <ArrowRight size={17} />
        </button>
      </footer>

      <AnimatePresence>
        {activeMemory && selected !== null && (
          <motion.div
            className="memory-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Selected memory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              className="memory-close"
              aria-label="Close photo"
              onClick={() => setSelected(null)}
            >
              <X size={23} />
            </button>

            <motion.div
              className="memory-expanded"
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activeMemory.image}
                alt={`Memory ${selected + 1}`}
              />

              <p>{activeMemory.caption}</p>

              <div className="memory-navigation">
                <button
                  type="button"
                  disabled={selected === 0}
                  onClick={() => setSelected(selected - 1)}
                >
                  Previous
                </button>

                <span>{selected + 1} / {memories.length}</span>

                <button
                  type="button"
                  disabled={selected === memories.length - 1}
                  onClick={() => setSelected(selected + 1)}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default MemoriesGallery;

