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
    photo: "/images/IMG-20260329-WA0044.jpg.jpeg",
    caption: "The day my world became brighter ♡",
    content: [
      "Tu first time mari life ma aai ti jyare apde sathe cycel chalavta ta 2nd ma from that time I loved you a lot ❤️❤️❤️ 2nd ma cycle, 3rd ma badmitton, pagathiya, nadi parvat...pachi tu alag thai gai and te 4th ma kidhu tu ke aje mare school ma event jevu kai hatu and ema tu maro ghodo banyo hot to mane gamtu...aji yaad che bs ej divas thi love thai gayo ❤️❤️❤️🤗🤗🤗 tyarej and ej divas thi feelings thai ke tane mara mate kaik to hase mann ma then after tu chocolate apva aavti ti and mane thatu tu that hu babu no bhai hot to tari baju maj rehva maltu mane and pawan jode tu ramti ti tyare jealosuy thay ke mane nai boltavti bav and pawan ne bolave che😂😂😂 pachi 7th 8th ma tari feelinfs khbr padi then pakadai gaya pqchi 11th 12th first day of the snap i think so 3rd or 2nd june pehlu I love you me kidhu tu tane sanje❤️❤️❤️pachi hu kushal na ghare gayo ene kehva ke me tane I love you kidhu and te same mane❤️❤️❤️pachi chats, moments, haath pakdavo, tu maline khali hase vaat na kare😂😂😂 nibbi veda kare and hu b nibbo bani gayo pachi and taro haath pakdva hu horror house lai gayo 60rs ma😂🤣 pachi pakdai gaya then may ma para moklyo and thrn paacha pakdai gaya😂 pachi again contact thayo 2024 ma pachi navkar besvanu, parimal ma kiss, new fangled theatre ma kissssess and touches🤣🤣🤣🤣 pachi qpdi jagya jya 22 thai gaya and many more to count now.............😂😂😂and last ma kav to forever vado pose aji baki che last time nato thayo😂🤣❤️❤️🤗🤗 I LOVE YOU SOOOOO MUCH MY BIRTHDAY GIRL...ONCE AGAIN HAPPY BIRTHDAY MY JADDDUUUU❤️❤️🤗🤗☺️☺️🎉🎉🎉🥳🥳",
    ],
  },
  {
    chapter: "Chapter II",
    title: "My Promises to You",
    subtitle: "Little moments that mean everything...",
    photo: "/images/23562-Picsart-AiImageEnhancer.png",
    caption: "A promise carved in my heart 💍",
    content: [
      "I promise you taru bdhi rite dhyaan rakhis lagan pehla and lagan pachi...rasto cross karvama😂, horror house lai javama, pachi tya jaine mummy yaad nai ave huj aais😂😂😂 pachi 🤔🤔🤔🤔🤔 gadi ma roj muki jais tane tara ghare lagan pachi pakku roj muki jais 😂😂😂 pachi aji kai rite raakhu dhyaan🤔🤔🤔🤔🤔🤔 maaarruuu tara thi hoooo...na na mastii nai chalo road thi laine life sudhi tane ekli nai java dav jya sudhi mane idea avse ke na aa vastu ma tu nai pochi vade even hu b to b hu aais jode that's only called the HUSBAND☺️☺️☺️🤗🤗❤️❤️❤️",
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

              {/* Top Triangular Flap (Folds down to dead center, swings open in 3D) */}
              <motion.div
                className="env-flap-top"
                animate={
                  isOpening
                    ? { rotateX: 180, zIndex: 1 }
                    : { rotateX: 0, zIndex: 12 }
                }
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              {/* The Folded Letter That Pops Out From the Center ONLY After Clicking */}
              <motion.div
                className="env-letter-sheet"
                initial={{ y: 0, opacity: 0, scale: 0.7 }}
                animate={
                  isOpening
                    ? { y: -125, opacity: 1, scale: 1.05 }
                    : { y: 0, opacity: 0, scale: 0.7 }
                }
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
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

              {/* Crimson Wax Seal Stamp (Centered at Dead Center) */}
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEnvelope();
                }}
                animate={
                  isOpening
                    ? { scale: [1, 1.25, 0], opacity: 0 }
                    : { scale: [1, 1.04, 1] }
                }
                transition={
                  isOpening
                    ? { duration: 0.45 }
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
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
                        I LOVE YOU JADDUUU I GENUINELY LOVE YOU❤️❤️❤️🤗🤗🤗🤗🤗❤️❤️❤️😍😍😍😍🥰🥰🥰🥰🥰🥰🥰🥰😍😍😍❤️❤️😘❤️😘❤️😘❤️😘😘❤️❤️❤️❤️❤️
                      </p>
                      <p>
                        Thank you for loving me, for holding my hand, and for being my favorite person in the entire universe.
                      </p>

                      {/* Required Final Sentence */}
                      <div className="highlighted-final-quote">
                        “Happy Birthday, my Jaddduuuu. I Love you, Forever. ❤️”
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
