"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Mail,
  BookOpen,
} from "lucide-react";

interface LoveLetterProps {
  onBackToMemories?: () => void;
  onBackToHome?: () => void;
}

const STORY_PAGES = [
  {
    chapter: "Chapter I",
    title: "How Our Story Began",
    subtitle: "The moment everything changed...",
    photo: "/images/girlfriend.png",
    caption: "The day my world became brighter ♡",
    content: [
      "I still remember the first time you walked into my life. I didn't know it back then, but that was the exact moment my whole world shifted onto a brighter, warmer path.",
      "Your laugh was the sweetest sound I had ever heard, and that gentle smile of yours had this effortless way of making every worry simply fade away. Before I even realized it, you had quietly become the favorite part of every single day.",
    ],
  },
  {
    chapter: "Chapter II",
    title: "Our Favorite Moments",
    subtitle: "Little moments that mean everything...",
    photo: "/images/girlfriend-2.png",
    caption: "Just you, me, and pure happiness ✨",
    content: [
      "People talk about grand gestures and fairy tales, but for me, true magic is in our quiet, ordinary moments together.",
      "It's the late-night talks where we lose track of time, the silly jokes only we understand, and the way you look at me when you're happy. With you, even the simplest days feel like a celebration.",
    ],
  },
  {
    chapter: "Chapter III",
    title: "My Promises to You",
    subtitle: "For today, tomorrow, and every year ahead...",
    photo: "/images/23562-Picsart-AiImageEnhancer.png",
    caption: "A promise carved in my heart 💍",
    content: [
      "On this special birthday, I want to make you a few heartfelt promises:",
      "I promise to always listen to you, to hold your hand through every season of life, to never stop making you laugh, and to love you even more deeply with every passing sunrise. You will never have to face this world alone.",
    ],
  },
];

export function LoveLetter({ onBackToMemories, onBackToHome }: LoveLetterProps) {
  // State: 'envelope' -> 'opening' -> 'flipbook'
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // View mode inside letter: 'flipbook' (pages 0..2) or 'final-letter'
  const [currentPage, setCurrentPage] = useState(0);
  const [showFinalLetter, setShowFinalLetter] = useState(false);

    function handleOpenEnvelope() {
      if (isOpening || isOpen) return;
      setIsOpening(true);
      setTimeout(() => {
        setIsOpen(true);
      }, 850);
    }

    function handleNextPage() {
      if (currentPage < STORY_PAGES.length - 1) {
        setCurrentPage((prev) => prev + 1);
      } else {
        setShowFinalLetter(true);
      }
    }

    function handlePrevPage() {
      if (showFinalLetter) {
        setShowFinalLetter(false);
      } else if (currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      }
    }

    return (
      <section className="love-letter-page">
        {/* Top Floating Controls */}
        <header className="letter-header-nav">
          {onBackToMemories && (
            <button
              type="button"
              onClick={onBackToMemories}
              className="letter-nav-pill"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back to Memories</span>
            </button>
          )}

          <div className="letter-title-badge">
            <Heart size={14} fill="currentColor" className="text-rose-400" />
            <span>A LETTER FOR MY PRINCESS</span>
            <Sparkles size={13} className="text-amber-300" />
          </div>

          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              title="Start from beginning"
              className="letter-nav-pill"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Restart</span>
            </button>
          )}
        </header>

        {/* ACT 1 — THE BEAUTIFUL 3D ENVELOPE */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -40 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="envelope-container"
            >
              <div className="envelope-halo" />

              {/* The Dimensional Envelope */}
              <motion.div
                className={`real-envelope ${isOpening ? "is-opening" : ""}`}
                animate={isOpening ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                onClick={handleOpenEnvelope}
              >
                {/* Envelope Back Shell */}
                <div className="env-back" />

                  {/* The Folded Letter Peeking Out From Inside */}
                  <motion.div
                    className="env-letter-sheet"
                    animate={
                      isOpening
                        ? { y: -130, opacity: 1, scale: 1.05 }
                        : { y: 0, opacity: 0.9 }
                    }
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <div className="sheet-border">
                      <div className="sheet-watermark">
                        <Heart size={20} fill="#f43f7a" className="text-pink-300" />
                      </div>
                      <p className="sheet-title">My Dearest Jaddduuu ♡</p>
                      <div className="sheet-line" />
                      <div className="sheet-line short" />
                    </div>
                  </motion.div>

                  {/* Left Triangular Flap */}
                  <div className="env-flap-left" />

                  {/* Right Triangular Flap */}
                  <div className="env-flap-right" />

                  {/* Bottom Triangular Flap */}
                  <div className="env-flap-bottom" />

                  {/* Airmail Vintage Postage Stamp */}
                  <div className="env-postage-stamp">
                    <div className="stamp-inner">
                      <Heart size={14} fill="#e11d48" className="text-rose-500" />
                      <span className="stamp-value">100%</span>
                      <span className="stamp-text">LOVE</span>
                    </div>
                    <div className="stamp-postmark">
                      <span>AIR MAIL</span>
                      <div className="postmark-waves" />
                    </div>
                  </div>

                  {/* Calligraphy Address Tag */}
                  <div className="env-calligraphy-address">
                    <p className="addr-tag">PRIORITY DELIVERY FOR</p>
                    <h3 className="addr-name">My Beautiful Jaddduuu</h3>
                    <p className="addr-from">From: Your Rehan ♡</p>
                  </div>

                  {/* Top Triangular Flap (Folds down, swings open in 3D) */}
                  <motion.div
                    className="env-flap-top"
                    animate={
                      isOpening
                        ? { rotateX: 180, zIndex: 1 }
                        : { rotateX: 0, zIndex: 12 }
                    }
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />

                  {/* Crimson Wax Seal Stamp */}
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEnvelope();
                    }}
                    animate={
                      isOpening
                        ? { scale: [1, 1.3, 0], opacity: 0 }
                        : { scale: [1, 1.04, 1] }
                    }
                    transition={
                      isOpening
                        ? { duration: 0.4 }
                        : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                    }
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="real-wax-seal"
                    aria-label="Break wax seal and open letter"
                  >
                      <div className="wax-rim">
                        <div className="wax-emboss">
                          <Heart size={20} fill="currentColor" />
                        </div>
                      </div>
                      <span className="seal-sparkle">✦</span>
                  </motion.button>
              </motion.div>

              {/* Click Button */}
              <motion.button
                type="button"
                onClick={handleOpenEnvelope}
                disabled={isOpening}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="open-letter-btn"
              >
                <Mail size={18} />
                <span>{isOpening ? "Opening your letter..." : "Open your letter"}</span>
                <Heart size={16} fill="currentColor" className="text-white" />
              </motion.button>

              <p className="envelope-hint">
                Tap the wax seal or button to unfold your surprise 💌
              </p>
            </motion.div>
          ) : (
            /* ACT 2 & 3 — THE FLIPBOOK & FINAL LOVE LETTER */
            <motion.div
              key="letter-stage"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flipbook-wrapper"
            >
              {/* Stage Progress Indicator */}
              <div className="flipbook-progress">
                {STORY_PAGES.map((page, idx) => (
                  <button
                    key={page.chapter}
                    type="button"
                    onClick={() => {
                      setShowFinalLetter(false);
                      setCurrentPage(idx);
                    }}
                    className={`progress-dot ${!showFinalLetter && currentPage === idx ? "active" : ""
                      }`}
                    title={page.title}
                  >
                    <span className="dot-num">{idx + 1}</span>
                    <span className="hidden sm:inline text-[11px]">{page.title}</span>
                  </button>
                ))}

                {/* Final Letter Tab */}
                <button
                  type="button"
                  onClick={() => setShowFinalLetter(true)}
                  className={`progress-dot ${showFinalLetter ? "active final-tab" : ""}`}
                  title="The Birthday Letter"
                >
                  <Heart size={13} fill="currentColor" />
                  <span className="hidden sm:inline text-[11px]">Final Letter</span>
                </button>
              </div>

              {/* Parchment Book Body */}
              <div className="parchment-book">
                <AnimatePresence mode="wait">
                  {!showFinalLetter ? (
                    /* FLIPBOOK STORY PAGE */
                    <motion.div
                      key={`page-${currentPage}`}
                      initial={{ opacity: 0, rotateY: 15, x: 25 }}
                      animate={{ opacity: 1, rotateY: 0, x: 0 }}
                      exit={{ opacity: 0, rotateY: -15, x: -25 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="book-page"
                    >
                      <div className="page-watermark">♡</div>

                      <div className="page-meta">
                        <span className="chapter-badge">
                          {STORY_PAGES[currentPage].chapter}
                        </span>
                        <span className="page-count">
                          Page {currentPage + 1} of 3
                        </span>
                      </div>

                      <h2 className="page-heading">
                        {STORY_PAGES[currentPage].title}
                      </h2>
                      <p className="page-subtitle">
                        {STORY_PAGES[currentPage].subtitle}
                      </p>

                      {/* Polaroid Photo on Page */}
                      <div className="page-polaroid-wrap">
                        <div className="tape-strip" />
                        <div className="page-polaroid">
                          <img
                            src={STORY_PAGES[currentPage].photo}
                            alt={STORY_PAGES[currentPage].title}
                            className="polaroid-photo"
                          />
                          <p className="polaroid-caption">
                            {STORY_PAGES[currentPage].caption}
                          </p>
                        </div>
                      </div>

                      {/* Story Paragraphs */}
                      <div className="page-prose">
                        {STORY_PAGES[currentPage].content.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>

                      {/* Bottom Page Navigation */}
                      <div className="page-footer-nav">
                        <button
                          type="button"
                          disabled={currentPage === 0}
                          onClick={handlePrevPage}
                          className="page-nav-btn prev"
                        >
                          <ChevronLeft size={16} />
                          <span>Previous</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleNextPage}
                          className="page-nav-btn next"
                        >
                          <span>
                            {currentPage === STORY_PAGES.length - 1
                              ? "Read My Birthday Letter 💌"
                              : "Next Chapter"}
                          </span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* ACT 3 — THE FINAL LOVE LETTER */
                    <motion.div
                      key="final-letter"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="book-page final-letter-page"
                    >
                      <div className="letter-wax-stamp">
                        <Heart size={20} fill="currentColor" />
                      </div>

                      <div className="page-meta justify-center">
                        <span className="chapter-badge">THE BIRTHDAY LETTER</span>
                      </div>

                      <h1 className="final-letter-title">
                        My Dearest Jaddduuu,
                      </h1>

                      <div className="final-letter-prose">
                        <p>
                          Today is the day the world was blessed with the kindest, most radiant soul I have ever known.
                        </p>
                        <p>
                          Every second I spend with you teaches me what love really means. It's in the comfort of your voice, the way you inspire me to be a better person, and the peace I feel whenever I look into your eyes.
                        </p>
                        <p>
                          I hope this little birthday surprise showed you even a fraction of how precious you are to me. May this new year of your life be filled with endless laughter, gentle days, overflowing joy, and all the dreams your heart has been whispering for.
                        </p>
                        <p>
                          Thank you for loving me, for holding my hand, and for being my favorite person in the entire universe.
                        </p>

                        {/* Required Final Sentence */}
                        <div className="highlighted-final-quote">
                          “Happy Birthday, my love. I choose you, always. ❤️”
                        </div>

                        <div className="letter-signature">
                          <p className="sig-close">Forever and always,</p>
                          <p className="sig-name">Your Rehan ♡</p>
                        </div>
                      </div>

                      {/* Final Celebration Footer */}
                      <div className="final-action-footer">
                        <button
                          type="button"
                          onClick={() => {
                            setShowFinalLetter(false);
                            setCurrentPage(0);
                          }}
                          className="secondary-btn"
                        >
                          <BookOpen size={16} />
                          <span>Re-read Our Story</span>
                        </button>

                        {onBackToHome && (
                          <button
                            type="button"
                            onClick={onBackToHome}
                            className="primary-btn"
                          >
                            <RotateCcw size={16} />
                            <span>Replay From Beginning</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    );
  }

  export default LoveLetter;
