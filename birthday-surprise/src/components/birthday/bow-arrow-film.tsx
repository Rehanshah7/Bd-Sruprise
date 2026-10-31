"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Sparkles } from "lucide-react";

interface BowArrowFilmProps {
  onNext: () => void;
  onBackToHome?: () => void;
}

export function BowArrowFilm({ onNext, onBackToHome }: BowArrowFilmProps) {
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 1. Listen for message from the iframe when the animation completes
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "BOW_ARROW_DONE") {
        setIsAnimationDone(true);
      }
    }
    window.addEventListener("message", handleMessage);

    // 2. Poll the same-origin iframe document to detect when the replay button or tree wish appears
    const timer = setInterval(() => {
      try {
        const doc = iframeRef.current?.contentDocument;
        const win = iframeRef.current?.contentWindow as any;
        if (!doc) return;

        const replayBtn = doc.getElementById("replay");
        const wish = doc.getElementById("wish");

        if (
          win?.bdayDone ||
          (replayBtn && (!replayBtn.hidden || replayBtn.classList.contains("is-shown"))) ||
          (wish && wish.classList.contains("is-in"))
        ) {
          setIsAnimationDone(true);
          clearInterval(timer);
        }
      } catch {
        // Ignored if cross-origin boundary
      }
    }, 400);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(timer);
    };
  }, []);

  return (
    <section
      id="bow-arrow-section"
      className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-[#12060c] text-white select-none"
      aria-label="Cupid Bow and Arrow Animation"
    >
      {/* Top Floating Header */}
      <header className="absolute top-4 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 pointer-events-none">
        {onBackToHome ? (
          <button
            type="button"
            onClick={onBackToHome}
            title="Back to cover"
            className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-pink-500/30 text-pink-200 text-xs font-medium transition-all shadow-md active:scale-95"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Cover</span>
          </button>
        ) : (
          <div />
        )}

        <motion.div
          key={isAnimationDone ? "done-badge" : "playing-badge"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-pink-500/30 shadow-lg text-pink-200 text-xs sm:text-sm font-semibold tracking-wide"
        >
          <span className="text-base">{isAnimationDone ? "✨" : "🏹"}</span>
          <span>{isAnimationDone ? "Tap Next for More Surprises" : "Draw the Bow & Release"}</span>
          <Heart size={13} fill="currentColor" className="text-rose-400" />
        </motion.div>

        {/* Quick Next in top right (Only visible when animation is done) */}
        <AnimatePresence>
          {isAnimationDone ? (
            <motion.button
              key="top-next-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              type="button"
              onClick={onNext}
              title="Continue to next surprises"
              className="pointer-events-auto hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-600/90 hover:bg-pink-600 text-white text-xs font-semibold backdrop-blur-md border border-pink-300/40 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight size={13} />
            </motion.button>
          ) : (
            <div className="w-12 sm:block hidden" />
          )}
        </AnimatePresence>
      </header>

      {/* Main Interactive Bow & Arrow IFrame */}
      <div className="relative w-full h-full">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0 block"
          src="/cupid-film/index.html"
          title="Cupid's Bow and Arrow Surprise"
          allow="autoplay"
        />
      </div>

          {/* Floating Bottom-Right Next Surprise Button (Only visible after animation is done) */}
          <AnimatePresence>
            {isAnimationDone && (
          <motion.div
            key="bottom-next-surprise-btn"
            initial={{ opacity: 0, scale: 0.8, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 25 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 220, damping: 20 }}
            className="fixed bottom-6 right-5 sm:right-8 z-40 pointer-events-auto"
          >
            <motion.button
              type="button"
              onClick={onNext}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              className="group relative flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold text-xs sm:text-sm shadow-[0_4px_25px_rgba(244,63,94,0.65)] hover:shadow-[0_6px_32px_rgba(244,63,94,0.85)] border border-pink-300/40 backdrop-blur-md cursor-pointer transition-all"
            >
              {/* Animated Glow Halo */}
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 opacity-40 blur-md group-hover:opacity-75 transition-opacity" />

              <span className="relative z-10 flex items-center gap-1.5 font-medium">
                <span>Next Surprise</span>
                <Sparkles size={15} className="text-yellow-200 animate-pulse" />
              </span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
      </motion.div>
        )}
    </AnimatePresence>
    </section >
  );
}

export default BowArrowFilm;
