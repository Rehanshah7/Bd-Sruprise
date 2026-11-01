"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Delete, Heart, LockKeyhole, Sparkles } from "lucide-react";

const CORRECT_PIN = "0211";

export interface SecretPinProps {
  onStartFilm?: () => void;
  onBackToCover?: () => void;
}

export function SecretPin({ onStartFilm, onBackToCover }: SecretPinProps = {}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  function enterDigit(digit: string) {
    if (unlocked || pin.length >= 4) return;

    setError(false);
    const nextPin = pin + digit;
    setPin(nextPin);
  }

  function deleteDigit() {
    setError(false);
    setPin((current) => current.slice(0, -1));
  }

  function submitPin() {
    if (pin.length !== 4) {
      setError(true);
      return;
    }

    if (pin === CORRECT_PIN) {
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
      setPin("");
    }
  }

  return (
    <section id="secret-pin" className="secret-pin-section">
      <div className="pin-decoration pin-decoration-one">♡</div>
      <div className="pin-decoration pin-decoration-two">✦</div>

      {onBackToCover && (
        <button
          type="button"
          onClick={onBackToCover}
          className="absolute top-6 left-6 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-rose-700 text-xs font-semibold shadow-sm border border-rose-200 backdrop-blur-md transition-all active:scale-95"
          title="Back to cover"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
      )}

      <motion.div
        className="pin-card"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <motion.div
          className="pin-lock"
          animate={
            unlocked
              ? { scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }
              : { y: [0, -4, 0] }
          }
          transition={{ duration: 1.2, repeat: unlocked ? 0 : Infinity }}
        >
          {unlocked ? (
            <Heart size={37} fill="currentColor" />
          ) : (
            <LockKeyhole size={35} />
          )}
          <span className="pin-lock-heart">♥</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="pin-content"
            >
              <p className="pin-eyebrow">A LITTLE SECRET FOR YOU</p>

              <h2 className="pin-heading">
                Only you can
                <span>unlock my heart</span>
              </h2>

              <p className="pin-description">
                Enter our special four-digit PIN to discover what I made
                for you, princess. 💌
              </p>

              <div
                className={`pin-dots ${error ? "pin-dots-error" : ""}`}
                aria-label={`${pin.length} of 4 digits entered`}
                aria-live="polite"
              >
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    className={`pin-dot ${pin.length > index ? "pin-dot-filled" : ""}`}
                    animate={
                      error
                        ? { x: [0, -5, 5, -4, 4, 0] }
                        : { scale: pin.length > index ? [1, 1.2, 1] : 1 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {pin.length > index ? "♥" : ""}
                  </motion.div>
                ))}
              </div>

              <div className="pin-keypad">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "delete"].map(
                  (key) => (
                    <button
                      key={key}
                      type="button"
                      className={`pin-key ${key === "clear" || key === "delete" ? "pin-key-action" : ""}`}
                      onClick={() => {
                        if (key === "clear") {
                          setPin("");
                          setError(false);
                        } else if (key === "delete") {
                          deleteDigit();
                        } else {
                          enterDigit(key);
                        }
                      }}
                      aria-label={
                        key === "delete"
                          ? "Delete last digit"
                          : key === "clear"
                            ? "Clear PIN"
                            : `Enter ${key}`
                      }
                    >
                      {key === "clear" ? (
                        <span className="pin-clear-label">Clear</span>
                      ) : key === "delete" ? (
                        <Delete size={19} />
                      ) : (
                        key
                      )}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                className="pin-submit"
                onClick={submitPin}
              >
                Unlock my surprise
                <Heart size={16} fill="currentColor" />
              </button>

              <p className={`pin-feedback ${error ? "pin-feedback-error" : ""}`} aria-live="polite">
                {error
                  ? "Oops! Try our special date again, baby. 🥹"
                  : "A little hint: the date of both of our birthday's 🎂"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              className="pin-content pin-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={30} className="success-sparkles" />

              <p className="pin-eyebrow">ACCESS GRANTED, MY LOVE</p>

              <h2 className="pin-heading">
                You unlocked
                <span>my little world! ❤️</span>
              </h2>

              <p className="pin-description">
                This whole surprise was made with you in my heart.
                Are you ready for what's next?
              </p>

              {onStartFilm ? (
                <button
                  type="button"
                  onClick={onStartFilm}
                  className="pin-submit"
                >
                  Let the magic begin
                  <Heart size={16} fill="currentColor" />
                </button>
              ) : (
                <a href="#birthday-reveal" className="pin-submit">
                  Let the magic begin
                  <Heart size={16} fill="currentColor" />
                </a>
              )}

              <p className="pin-feedback">
                Made with all my love, just for you ♡
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default SecretPin;
