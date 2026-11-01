"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Gift,
  Heart,
  Sparkles,
  Star,
} from "lucide-react";

const balloons = [
  { left: "7%", delay: 0, color: "#ff9eb5" },
  { left: "86%", delay: 1.2, color: "#c9a7f8" },
  { left: "16%", delay: 2.2, color: "#ffd27d" },
  { left: "77%", delay: 0.6, color: "#ffb9cb" },
];

interface BirthdayCoverProps {
  onOpenSurprise?: () => void;
}

export function BirthdayCover({ onOpenSurprise }: BirthdayCoverProps = {}) {
  return (
    <main className="birthday-cover">
      <div className="cover-glow cover-glow-one" />
      <div className="cover-glow cover-glow-two" />

      {balloons.map((balloon, index) => (
        <motion.div
          key={index}
          className="balloon"
          style={{
            left: balloon.left,
            backgroundColor: balloon.color,
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: [0, -15, 0],
            opacity: 1,
            rotate: [-5, 5, -5],
          }}
          transition={{
            delay: balloon.delay,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="floating-decoration decoration-heart"
        animate={{ y: [0, -12, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <Heart size={27} fill="currentColor" />
      </motion.div>

      <motion.div
        className="floating-decoration decoration-star"
        animate={{ rotate: 360, scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles size={28} />
      </motion.div>

      <div className="cover-content">
        <motion.div
          className="cover-eyebrow"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Heart size={13} fill="currentColor" />
          MADE WITH LOVE, JUST FOR YOU
          <Heart size={13} fill="currentColor" />
        </motion.div>

        <motion.h1
          className="cover-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Happy Birthday,
          <span>My Jaduu!</span>
        </motion.h1>

        <motion.p
          className="cover-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Today, the whole world celebrates you.
          <br />
          And I have something special for you... ♡
        </motion.p>

        <motion.div
          className="photo-stage"
          initial={{ opacity: 0, scale: 0.85, rotate: -7 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{
            delay: 0.35,
            duration: 0.9,
            type: "spring",
            stiffness: 100,
          }}
        >
          <div className="photo-tape" />

          <div className="polaroid">
            <div className="polaroid-image">
              <Image
                src="/images/girlfriend-2.png"
                alt="My beautiful birthday girl"
                width={480}
                height={600}
                priority
                className="girlfriend-photo"
              />

              <div className="photo-sparkle">
                <Star size={19} fill="currentColor" />
              </div>
            </div>

            <div className="polaroid-caption">
              <span>My Favorite Person</span>
              <Heart size={17} fill="currentColor" />
            </div>
          </div>

          <motion.div
            className="mini-gift mini-gift-left"
            animate={{ y: [0, -7, 0], rotate: [-8, 0, -8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Gift size={34} />
          </motion.div>

          <motion.div
            className="mini-gift mini-gift-right"
            animate={{ y: [0, -9, 0], rotate: [7, -3, 7] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <Heart size={30} fill="currentColor" />
          </motion.div>
        </motion.div>

        <motion.div
          className="hamper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <span className="hamper-bow">🎀</span>
          <span className="hamper-items">🌹 🧸 🍫</span>
          <div className="hamper-basket">
            <span>FOR YOU</span>
          </div>
        </motion.div>

        <motion.div
          className="gift-decoration gift-one"
          animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        >
          🎁
        </motion.div>

        <motion.div
          className="gift-decoration gift-two"
          animate={{ y: [0, -8, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        >
          🎀
        </motion.div>

        <motion.button
          type="button"
          onClick={onOpenSurprise}
          className="cover-button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Open your surprise
          <Heart size={17} fill="currentColor" />
        </motion.button>
      </div>

      <div className="cover-footer">
        <Heart size={12} fill="currentColor" />
        A LITTLE WORLD MADE JUST FOR YOU
        <Heart size={12} fill="currentColor" />
      </div>
    </main>
  );
}

export default BirthdayCover;

