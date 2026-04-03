import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";

interface AssessmentPageProps {
  onComplete: (answers: Record<number, boolean>) => void;
}

const sectionConfig = {
  nutrition: {
    label: "Nutrition",
    emoji: "🥗",
    accentText: "text-lime-400",
    accentBorder: "border-lime-400/35",
    accentBg: "from-lime-900/20",
    barColor: "bg-lime-400",
    dot: "bg-lime-400",
  },
  recovery: {
    label: "Recovery",
    emoji: "💤",
    accentText: "text-teal-400",
    accentBorder: "border-teal-400/35",
    accentBg: "from-teal-900/20",
    barColor: "bg-teal-400",
    dot: "bg-teal-400",
  },
  mental: {
    label: "Mental & Consistency",
    emoji: "🧠",
    accentText: "text-violet-400",
    accentBorder: "border-violet-400/35",
    accentBg: "from-violet-900/20",
    barColor: "bg-violet-400",
    dot: "bg-violet-400",
  },
} as const;

export default function AssessmentPage({ onComplete }: AssessmentPageProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<boolean | null>(null);
  const [direction, setDirection] = useState(1);

  const question = questions[current];
  const config = sectionConfig[question.section];
  const progressPct = (current / questions.length) * 100;

  useEffect(() => {
    if (selected === null) return;
    const timer = setTimeout(() => {
      const newAnswers = { ...answers, [question.id]: selected };
      if (current === questions.length - 1) {
        onComplete(newAnswers);
      } else {
        setDirection(1);
        setCurrent((c) => c + 1);
        setSelected(null);
        setAnswers(newAnswers);
      }
    }, 380);
    return () => clearTimeout(timer);
  }, [selected]);

  const handleAnswer = (value: boolean) => {
    if (selected !== null) return;
    setSelected(value);
  };

  const handleBack = () => {
    if (current === 0) return;
    setDirection(-1);
    setCurrent((c) => c - 1);
    setSelected(null);
  };

  // Section pills
  const sectionNames = ["Nutrition", "Recovery", "Mental & Consistency"] as const;
  const sectionKeys = ["nutrition", "recovery", "mental"] as const;
  const currentSectionIndex = sectionKeys.indexOf(question.section);

  return (
    <div className="min-h-screen bg-[#040e07] flex flex-col">
      {/* Ambient glow matching section */}
      <div
        key={question.section}
        className="fixed top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background:
            question.section === "nutrition"
              ? "rgba(163,230,53,0.04)"
              : question.section === "recovery"
              ? "rgba(45,212,191,0.04)"
              : "rgba(167,139,250,0.04)",
        }}
      />

      {/* ── TOP BAR ───────────────────────────────────── */}
      <div className="relative z-10 px-5 pt-6 sm:px-8 sm:pt-8 max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={handleBack}
            disabled={current === 0}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 ${
              current === 0 ? "opacity-0 pointer-events-none" : "text-white/40 hover:text-white/75"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>

          <div className="glass px-4 py-1.5 rounded-full">
            <span className={`font-black text-sm ${config.accentText}`}>{current + 1}</span>
            <span className="text-white/30 text-sm"> / {questions.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/6 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full progress-bar-fill rounded-full"
            animate={{ width: `${((current + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {/* Section pills */}
        <div className="flex gap-2 mb-6">
          {sectionNames.map((name, i) => (
            <div
              key={name}
              className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                i === currentSectionIndex
                  ? config.barColor
                  : i < currentSectionIndex
                  ? "bg-white/25"
                  : "bg-white/8"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── QUESTION CARD ─────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 pb-8 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 55, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -55, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Section label */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">{config.emoji}</span>
              <span className={`text-xs font-black tracking-[0.28em] uppercase ${config.accentText}`}>
                {config.label}
              </span>
              <div className={`ml-auto text-[9px] font-black tracking-widest uppercase text-white/30`}>
                Q{current + 1} of {questions.length}
              </div>
            </div>

            {/* Card */}
            <div
              className={`glass-card rounded-3xl p-7 sm:p-9 border ${config.accentBorder} bg-gradient-to-br ${config.accentBg} to-transparent mb-7`}
            >
              <h2 className="text-white text-xl sm:text-2xl font-bold leading-relaxed">
                {question.text}
              </h2>
            </div>

            {/* YES / NO */}
            <div className="grid grid-cols-2 gap-4">
              {/* YES */}
              <motion.button
                whileHover={{ scale: selected === null ? 1.03 : 1 }}
                whileTap={{ scale: selected === null ? 0.97 : 1 }}
                onClick={() => handleAnswer(true)}
                className={`answer-btn rounded-2xl py-6 flex flex-col items-center gap-2 transition-all duration-250 ${
                  selected === true ? "yes-active" : ""
                } ${selected !== null && selected !== true ? "opacity-35 scale-98" : ""}`}
              >
                <span className="text-3xl">{selected === true ? "✅" : "👍"}</span>
                <span className="text-white font-black text-lg tracking-widest">YES</span>
                <span className="text-white/30 text-xs">+1 point</span>
              </motion.button>

              {/* NO */}
              <motion.button
                whileHover={{ scale: selected === null ? 1.03 : 1 }}
                whileTap={{ scale: selected === null ? 0.97 : 1 }}
                onClick={() => handleAnswer(false)}
                className={`answer-btn rounded-2xl py-6 flex flex-col items-center gap-2 transition-all duration-250 ${
                  selected === false ? "no-active" : ""
                } ${selected !== null && selected !== false ? "opacity-35 scale-98" : ""}`}
              >
                <span className="text-3xl">{selected === false ? "❌" : "👎"}</span>
                <span className="text-white font-black text-lg tracking-widest">NO</span>
                <span className="text-white/30 text-xs">0 points</span>
              </motion.button>
            </div>

            {/* Loading indicator */}
            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 mt-5"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className={`w-3.5 h-3.5 rounded-full border-2 border-transparent border-t-2 ${config.barColor.replace("bg-", "border-t-")}`}
                    style={{ borderTopColor: "currentColor" }}
                  />
                  <span className={`text-xs font-semibold ${config.accentText}`}>
                    {current === questions.length - 1 ? "Calculating results..." : "Next question..."}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
