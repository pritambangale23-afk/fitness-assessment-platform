import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/data/questions";

interface AssessmentPageProps {
  onComplete: (answers: Record<number, boolean>) => void;
}

const sectionColors: Record<string, string> = {
  nutrition: "text-lime-400",
  recovery: "text-teal-400",
  mental: "text-violet-400",
};

const sectionBorders: Record<string, string> = {
  nutrition: "border-lime-400/40",
  recovery: "border-teal-400/40",
  mental: "border-violet-400/40",
};

const sectionBg: Record<string, string> = {
  nutrition: "from-lime-400/10 to-green-900/20",
  recovery: "from-teal-400/10 to-cyan-900/20",
  mental: "from-violet-400/10 to-purple-900/20",
};

export default function AssessmentPage({ onComplete }: AssessmentPageProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<boolean | null>(null);
  const [direction, setDirection] = useState(1);

  const question = questions[current];
  const progress = ((current) / questions.length) * 100;

  // Auto-advance after selection with brief delay
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
    }, 420);
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

  return (
    <div className="min-h-screen bg-[#050f08] flex flex-col">
      {/* Header */}
      <div className="px-5 pt-6 sm:px-8 sm:pt-8 flex justify-between items-center max-w-2xl mx-auto w-full">
        <button
          onClick={handleBack}
          disabled={current === 0}
          className="text-white/40 disabled:opacity-0 hover:text-white/80 transition-colors flex items-center gap-2 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>

        <div className="glass px-3 py-1.5 rounded-xl">
          <span className="text-lime-400 font-bold text-sm">{current + 1}</span>
          <span className="text-white/40 text-sm"> / {questions.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 sm:px-8 mt-4 max-w-2xl mx-auto w-full">
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full progress-bar-fill rounded-full"
            initial={{ width: `${progress}%` }}
            animate={{ width: `${((current + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {/* Section indicators */}
        <div className="flex justify-between mt-2">
          {["Nutrition", "Recovery", "Mental & Consistency"].map((s) => (
            <span key={s} className="text-white/30 text-[10px] tracking-wide">{s}</span>
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 py-8 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Section label */}
            <div className="mb-6">
              <motion.span
                className={`text-xs font-black tracking-[0.3em] uppercase ${sectionColors[question.section]}`}
              >
                {question.sectionLabel}
              </motion.span>
            </div>

            {/* Question */}
            <div
              className={`glass-card rounded-3xl p-7 sm:p-9 border ${sectionBorders[question.section]} bg-gradient-to-br ${sectionBg[question.section]} mb-8`}
            >
              <p className="text-white/40 text-sm font-semibold mb-4">Question {question.id} of {questions.length}</p>
              <h2 className="text-white text-xl sm:text-2xl font-bold leading-relaxed">
                {question.text}
              </h2>
            </div>

            {/* Answer buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: selected === null ? 1.03 : 1 }}
                whileTap={{ scale: selected === null ? 0.97 : 1 }}
                onClick={() => handleAnswer(true)}
                className={`answer-btn rounded-2xl py-5 flex flex-col items-center gap-2 ${
                  selected === true ? "yes-active" : ""
                } ${selected !== null && selected !== true ? "opacity-40" : ""}`}
              >
                <span className="text-2xl">✅</span>
                <span className="text-white font-black text-lg tracking-wide">YES</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: selected === null ? 1.03 : 1 }}
                whileTap={{ scale: selected === null ? 0.97 : 1 }}
                onClick={() => handleAnswer(false)}
                className={`answer-btn rounded-2xl py-5 flex flex-col items-center gap-2 ${
                  selected === false ? "no-active" : ""
                } ${selected !== null && selected !== false ? "opacity-40" : ""}`}
              >
                <span className="text-2xl">❌</span>
                <span className="text-white font-black text-lg tracking-wide">NO</span>
              </motion.button>
            </div>

            {selected !== null && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-white/40 text-sm mt-5"
              >
                Moving to next question...
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
