"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ANIMATIONS = [
  {
    id: "heart",
    title: "Part I: A Beating Heart",
    shortTitle: "Heart",
    icon: "❤️",
    src: "/animations/heart/index.html",
    duration: 8000,
  },
  {
    id: "flowers",
    title: "Part II: Blossoming for You",
    shortTitle: "Flowers",
    icon: "🌸",
    src: "/animations/flowers/index.html",
    duration: 10000,
  },
  {
    id: "love",
    title: "Part III: Forever Yours",
    shortTitle: "I Love You",
    icon: "💌",
    src: "/animations/love/index.html",
    duration: 12000, // 12 seconds then prompts for cake
  },
  {
    id: "cake",
    title: "Part IV: Your Birthday Cake",
    shortTitle: "Cake",
    icon: "🎂",
    src: "/animations/cake/index.html",
    duration: 0,
  },
];

const NO_MESSAGES = [
  "Hey! You can't say no to your birthday cake! 🥺🎂",
  "Nope! In this world, the birthday princess MUST have cake! 👑❤️",
  "Are you sure? It was baked with 100% pure love just for you! 🍰✨",
  "Error 404: 'No' is not an option for my favorite person! 😜❤️",
  "Pretty please? Just one bite? 🥹🎂",
];

interface BirthdayFilmProps {
  onBackToHome?: () => void;
  onBackToBow?: () => void;
  onOpenMemories?: () => void;
}

  export function BirthdayFilm({ onBackToHome, onBackToBow, onOpenMemories }: BirthdayFilmProps = {}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(false); // Default is NOT auto, manual control
    const [showCakePrompt, setShowCakePrompt] = useState(false);
    const [hasAcceptedCake, setHasAcceptedCake] = useState(false);
    const [noCount, setNoCount] = useState(0);

    const currentAnim = ANIMATIONS[currentIndex];

    // Auto-advance sequence
    useEffect(() => {
      if (!isAutoPlay) return;
      if (showCakePrompt) return;

      // When on "I Love You", after its duration, show the cake prompt
      if (currentIndex === 2) {
        if (hasAcceptedCake) {
          // If already accepted before, auto advance to cake
          const timer = setTimeout(() => {
            setCurrentIndex(3);
          }, 12000);
          return () => clearTimeout(timer);
        } else {
          const timer = setTimeout(() => {
            setShowCakePrompt(true);
          }, 12000);
          return () => clearTimeout(timer);
        }
      }

      if (currentAnim.duration === 0) return; // Final screen stays

      const timer = setTimeout(() => {
        if (currentIndex < 2) {
          setCurrentIndex((prev) => prev + 1);
        } else if (currentIndex === 2) {
          setShowCakePrompt(true);
        }
      }, currentAnim.duration);

      return () => clearTimeout(timer);
    }, [currentIndex, isAutoPlay, showCakePrompt, hasAcceptedCake, currentAnim.duration]);

    // Listen for postMessage from Cake animation iframe
    useEffect(() => {
      function handleMessage(event: MessageEvent) {
        if (event.data?.type === "OPEN_MEMORIES" && onOpenMemories) {
          onOpenMemories();
        }
      }
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, [onOpenMemories]);

    function handleSelectStage(idx: number) {
      if (idx === 3 && !hasAcceptedCake) {
        setShowCakePrompt(true);
        return;
      }
      setCurrentIndex(idx);
    }

    function nextStep() {
      if (currentIndex === 2 && !hasAcceptedCake) {
        setShowCakePrompt(true);
        return;
      }
      if (currentIndex < ANIMATIONS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }

    function prevStep() {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (currentIndex === 0 && onBackToBow) {
        onBackToBow();
      }
    }

    function handleAcceptCake() {
      setHasAcceptedCake(true);
      setShowCakePrompt(false);
      setCurrentIndex(3);
    }

    function handleRejectCake() {
      setNoCount((prev) => prev + 1);
    }

    return (
      <section
        id="birthday-reveal"
        className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-black text-white flex flex-col items-center justify-center select-none"
        aria-label="Birthday Animations Sequence"
      >
        {/* Top Floating Header & Nav Pills */}
        <header className="absolute top-4 left-0 right-0 z-30 flex flex-col items-center gap-2 px-4 pointer-events-none">
          <motion.div
            key={currentAnim.id + "-title"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-4 py-1.5 border border-pink-500/30 shadow-lg pointer-events-auto"
          >
            <span className="text-base">{currentAnim.icon}</span>
            <span className="text-xs font-semibold tracking-wider text-pink-200 uppercase font-sans">
              {currentAnim.title}
            </span>
            <Sparkles size={13} className="text-pink-300 animate-pulse" />
          </motion.div>

          {/* Step Pills */}
          <div className="flex items-center gap-2 pointer-events-auto mt-1 flex-wrap justify-center">
            {onBackToBow && (
              <button
                type="button"
                onClick={onBackToBow}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-pink-400/30 bg-black/40 text-pink-200/80 hover:text-white hover:bg-black/60 transition-all"
                title="Return to Bow & Arrow"
              >
                <span>🏹</span>
                <span className="hidden sm:inline">Bow</span>
              </button>
            )}
            {ANIMATIONS.map((anim, idx) => (
              <button
                key={anim.id}
                onClick={() => handleSelectStage(idx)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border transition-all duration-300 ${currentIndex === idx
                  ? "bg-pink-600/85 border-pink-400 text-white shadow-[0_0_12px_rgba(236,72,153,0.5)] scale-105"
                  : "bg-black/40 border-white/10 text-white/60 hover:text-white hover:bg-black/60"
                  }`}
              >
                <span>{anim.icon}</span>
                <span className="hidden sm:inline">{anim.shortTitle}</span>
              </button>
            ))}
            {onOpenMemories && (
              <button
                type="button"
                onClick={onOpenMemories}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-pink-400/30 bg-black/40 text-pink-200/80 hover:text-white hover:bg-black/60 transition-all"
                title="See Our Memories"
              >
                <span>📸</span>
                <span className="hidden sm:inline">Memories</span>
              </button>
            )}
          </div>
        </header>

        {/* Animation Viewport (iFrames) */}
        <div className="relative w-full h-full flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnim.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <iframe
                className="w-full h-full border-0 block"
                src={currentAnim.src}
                title={currentAnim.title}
                allow="autoplay"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Floating Control Bar */}
        <footer className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-3 px-4 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full border border-pink-500/30 shadow-2xl pointer-events-auto">
            {/* Back to Home / Cover */}
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                title="Return to surprise cover"
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <RotateCcw size={16} />
              </button>
            )}

            {/* Previous Step */}
            <button
              type="button"
              onClick={prevStep}
              disabled={currentIndex === 0 && !onBackToBow}
              className={`p-2 rounded-full transition-colors ${currentIndex === 0 && !onBackToBow
                ? "text-white/20 cursor-not-allowed"
                : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              title={currentIndex === 0 && onBackToBow ? "Back to Bow & Arrow" : "Previous Animation"}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Auto-Play Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-white/10 hover:bg-white/20 text-pink-200 transition-colors"
              title={isAutoPlay ? "Pause Auto-Advance" : "Enable Auto-Advance"}
            >
              {isAutoPlay ? (
                <>
                  <Pause size={12} />
                  <span className="hidden sm:inline">Auto</span>
                </>
              ) : (
                <>
                  <Play size={12} />
                  <span className="hidden sm:inline">Play</span>
                </>
              )}
            </button>

            {/* Next Step Button */}
            {currentIndex < ANIMATIONS.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:brightness-110 shadow-md transition-all active:scale-95"
              >
                <span>{currentIndex === 2 ? "Get Cake 🎂" : "Next"}</span>
                <ChevronRight size={14} />
              </button>
            ) : onOpenMemories ? (
              <button
                type="button"
                onClick={onOpenMemories}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white hover:brightness-110 shadow-[0_0_15px_rgba(244,63,94,0.6)] transition-all active:scale-95"
              >
                <span>See Our Memories</span>
                <Heart size={13} fill="currentColor" />
                <ChevronRight size={13} />
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-pink-300 font-medium">
                <Heart size={13} fill="currentColor" />
                <span>Happy Birthday!</span>
              </div>
            )}
          </div>
        </footer>

        {/* Floating Call-to-Action for Memories on Cake Page */}
        {currentIndex === 3 && onOpenMemories && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7 }}
            className="fixed bottom-20 z-40 pointer-events-auto"
          >
            <motion.button
              type="button"
              onClick={onOpenMemories}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold text-xs sm:text-sm shadow-[0_4px_25px_rgba(244,63,94,0.6)] hover:shadow-[0_6px_32px_rgba(244,63,94,0.85)] border border-pink-300/40 backdrop-blur-md cursor-pointer transition-all"
            >
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 opacity-40 blur-md group-hover:opacity-75 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2 font-medium">
                <Heart size={16} fill="currentColor" className="text-yellow-200 animate-pulse" />
                <span>See Our Memories</span>
                <Sparkles size={15} className="text-yellow-200" />
              </span>
              <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}

        {/* Interactive Birthday Cake Question Modal */}
        <AnimatePresence>
          {showCakePrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.85, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#2a121c] to-[#14060d] border border-pink-500/40 shadow-[0_0_50px_rgba(244,63,94,0.35)] text-center text-white"
              >
                {/* Cute Floating Icon */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center text-4xl shadow-[0_0_25px_rgba(244,114,182,0.5)] border-2 border-pink-300"
                >
                  🎂
                </motion.div>

                <p className="text-[10px] tracking-[0.2em] font-bold text-pink-400 uppercase">
                  A SPECIAL QUESTION FOR YOU
                </p>

                <h3 className="mt-2 text-2xl sm:text-3xl font-serif italic text-pink-100">
                  Do you want a birthday cake?
                </h3>

                {/* Dynamic Loving Message when clicking No */}
                {noCount > 0 ? (
                  <motion.div
                    key={noCount}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-3 p-3 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-xs sm:text-sm text-pink-200 leading-relaxed font-medium"
                  >
                    {NO_MESSAGES[(noCount - 1) % NO_MESSAGES.length]}
                  </motion.div>
                ) : (
                  <p className="mt-2 text-xs sm:text-sm text-pink-200/80 leading-relaxed">
                    I baked a little magical cake just for my princess. Will you accept it? 💌
                  </p>
                )}

                {/* Interactive Yes / No Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  {/* YES Button - grows if she keeps clicking No */}
                  <motion.button
                    type="button"
                    onClick={handleAcceptCake}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      scale: 1 + Math.min(noCount * 0.08, 0.35),
                    }}
                    className="w-full sm:w-auto flex-1 min-h-[46px] px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold text-sm shadow-[0_4px_20px_rgba(244,63,94,0.45)] hover:shadow-[0_6px_25px_rgba(244,63,94,0.65)] flex items-center justify-center gap-2 border border-pink-300/40 transition-shadow"
                  >
                    <Heart size={16} fill="currentColor" />
                    <span>{noCount > 0 ? "Okay, YES! 🎂✨" : "Yes, please! 🎂"}</span>
                  </motion.button>

                  {/* NO Button - playfully insists */}
                  <motion.button
                    type="button"
                    onClick={handleRejectCake}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      scale: Math.max(1 - noCount * 0.06, 0.75),
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white/70 hover:text-white text-xs font-medium transition-colors"
                  >
                    <span>{noCount === 0 ? "No 🙈" : "Still No 😜"}</span>
                  </motion.button>
                </div>

                {noCount >= 2 && (
                  <p className="mt-4 text-[11px] text-pink-300/70 italic">
                    (Hint: The cake button is calling your name! ✨)
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  export default BirthdayFilm;
