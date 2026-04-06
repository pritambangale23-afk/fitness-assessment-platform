import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  questions,
  sectionInfo,
  sectionMeasures,
  getPerformanceLevel,
  getSectionScore,
  getSectionMax,
  getStrongestSection,
  getLowSections,
  type Section,
} from "@/data/questions";

interface ResultPageProps {
  answers: Record<number, boolean>;
  onRetake: () => void;
}

const LINKTREE_URL = "https://linktr.ee/eat_wise";

const allSections: Section[] = ["nutrition", "recovery", "mental"];

const sectionAccentText: Record<Section, string> = {
  nutrition: "text-lime-400",
  recovery: "text-teal-400",
  mental: "text-violet-400",
};
const sectionAccentBg: Record<Section, string> = {
  nutrition: "bg-lime-400",
  recovery: "bg-teal-400",
  mental: "bg-violet-400",
};
const sectionAccentBorder: Record<Section, string> = {
  nutrition: "border-lime-500/30",
  recovery: "border-teal-500/30",
  mental: "border-violet-500/30",
};
const sectionGradientBg: Record<Section, string> = {
  nutrition: "from-lime-900/20 to-transparent",
  recovery: "from-teal-900/20 to-transparent",
  mental: "from-violet-900/20 to-transparent",
};
const sectionNumberClass: Record<Section, string> = {
  nutrition: "rule-number-lime",
  recovery: "rule-number-teal",
  mental: "rule-number-violet",
};
const sectionGlowClass: Record<Section, string> = {
  nutrition: "lime-glow",
  recovery: "teal-glow",
  mental: "violet-glow",
};
const sectionTextGlow: Record<Section, string> = {
  nutrition: "text-lime-glow",
  recovery: "text-teal-glow",
  mental: "text-violet-glow",
};

function RuleCard({
  rule,
  section,
  index,
}: {
  rule: {
    number: string;
    title: string;
    rule: string;
    execution: string[];
    why: string;
  };
  section: Section;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const numClass = sectionNumberClass[section];
  const accentText = sectionAccentText[section];
  const accentBorder = sectionAccentBorder[section];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`glass-rule rounded-2xl border ${accentBorder} overflow-hidden`}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-start gap-4 p-5 text-left"
      >
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-xl border text-xs font-black flex items-center justify-center ${numClass}`}
        >
          {rule.number}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`text-[10px] font-black tracking-[0.25em] uppercase mb-0.5 ${accentText}`}
          >
            Rule {rule.number}
          </p>
          <h4 className="text-white font-black text-sm sm:text-base leading-tight">
            {rule.title}
          </h4>
          <p className="text-white/50 text-xs mt-1 font-medium">
            ⚙️ {rule.rule}
          </p>
        </div>

        <div
          className={`flex-shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <svg
            className={`w-4 h-4 ${accentText}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-white/5">
              {/* Execution */}
              <div className="mt-4 mb-4">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-lime-400/70 mb-2">
                  🔥 Simple Execution
                </p>
                <ul className="space-y-1.5">
                  {rule.execution.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-white/75 text-sm"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${sectionAccentBg[section]}`}
                      />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why */}
              <div
                className={`rounded-xl p-3.5 bg-gradient-to-br ${sectionGradientBg[section]} border ${accentBorder}`}
              >
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 mb-1.5">
                  💥 Why This Works
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  {rule.why}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SectionMeasuresBlock({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const measures = sectionMeasures[section];
  const info = sectionInfo[section];
  const accentText = sectionAccentText[section];
  const accentBorder = sectionAccentBorder[section];
  const gradientBg = sectionGradientBg[section];
  const glowClass = sectionGlowClass[section];
  const textGlow = sectionTextGlow[section];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-10"
    >
      {/* Section header */}
      <div
        className={`rounded-2xl p-6 mb-4 glass-card border ${accentBorder} bg-gradient-to-br ${gradientBg} ${glowClass}`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{info.icon}</span>
          <div>
            <p
              className={`text-[10px] font-black tracking-[0.3em] uppercase ${accentText}`}
            >
              Fix This Section
            </p>
            <h3
              className={`text-white font-black text-lg sm:text-xl ${textGlow}`}
            >
              {info.label}
            </h3>
          </div>
        </div>
        <p className="text-white/50 text-xs font-bold tracking-widest uppercase mt-3">
          {measures.systemName}
        </p>
        <p className="text-white/65 text-sm mt-1 leading-relaxed">
          {measures.tagline}
        </p>
      </div>

      {/* Rules */}
      <div className="space-y-3">
        {measures.rules.map((rule, i) => (
          <RuleCard key={rule.number} rule={rule} section={section} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function ResultPage({ answers, onRetake }: ResultPageProps) {
  const total = Object.values(answers).filter(Boolean).length;
  const percentage = Math.round((total / questions.length) * 100);
  const performance = getPerformanceLevel(total);
  const strongest = getStrongestSection(answers);
  const lowSections = getLowSections(answers);
  const hasLowSections = lowSections.length > 0;

  return (
    <div className="min-h-screen bg-[#040e07]">
      {/* ── SCORE HERO ─────────────────────────────────── */}
      <div className="relative overflow-hidden pb-8">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-lime-400/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 pt-10 px-5 sm:px-8 max-w-2xl mx-auto">
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="h-px flex-1 bg-white/8" />
            <p className="text-lime-400/70 text-[10px] font-black tracking-[0.35em] uppercase px-3">
              Assessment Complete
            </p>
            <div className="h-px flex-1 bg-white/8" />
          </motion.div>

          {/* Score ring + level */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            {/* Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                type: "spring",
                damping: 14,
              }}
              className="relative w-44 h-44 flex-shrink-0"
            >
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="9"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#ring-grad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 50 * (1 - percentage / 100),
                  }}
                  transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient
                    id="ring-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#a3e635" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-lime-400 font-black text-5xl text-lime-glow"
                >
                  {total}
                </motion.span>
                <span className="text-white/35 text-sm font-semibold">
                  / {questions.length}
                </span>
                <span className="text-white/55 text-xs mt-0.5">
                  {percentage}%
                </span>
              </div>
            </motion.div>

            {/* Performance level */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`glass-card rounded-2xl p-5 flex-1 w-full border ${performance.borderClass} bg-gradient-to-br ${performance.bgClass}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{performance.emoji}</span>
                <p className="text-white/50 text-[10px] font-black tracking-[0.25em] uppercase">
                  Performance Level
                </p>
              </div>
              <p
                className={`font-black text-xl sm:text-2xl mb-3 ${performance.colorClass}`}
              >
                {performance.label}
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                {performance.description}
              </p>
            </motion.div>
          </div>

          {/* Section breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card rounded-2xl p-5 mb-6 border border-white/6"
          >
            <h3 className="text-white font-black text-base mb-5">
              Score Breakdown
            </h3>
            <div className="space-y-4">
              {allSections.map((section) => {
                const score = getSectionScore(answers, section);
                const max = getSectionMax(section);
                const pct = (score / max) * 100;
                const info = sectionInfo[section];
                const isStrongest = section === strongest;
                const isLow = score <= Math.floor(max / 2);

                return (
                  <div key={section}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base">{info.icon}</span>
                        <span className="text-white font-semibold text-sm">
                          {info.label}
                        </span>
                        {isStrongest && (
                          <span className="text-[9px] bg-lime-400/12 text-lime-400 border border-lime-400/25 rounded-full px-2 py-0.5 font-black tracking-wide">
                            STRONGEST
                          </span>
                        )}
                        {isLow && !isStrongest && (
                          <span className="text-[9px] bg-red-400/12 text-red-400 border border-red-400/25 rounded-full px-2 py-0.5 font-black tracking-wide">
                            NEEDS WORK
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-black text-sm ${sectionAccentText[section]}`}
                      >
                        {score}/{max}
                      </span>
                    </div>
                    <div className="h-2 bg-white/6 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${sectionAccentBg[section]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── ACTION PLAN ────────────────────────────────── */}
      <div className="px-5 sm:px-8 max-w-2xl mx-auto">
        {/* Section divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px flex-1 bg-white/8" />
          <div className="glass px-4 py-2 rounded-full">
            <p className="text-lime-400 text-[10px] font-black tracking-[0.3em] uppercase">
              {hasLowSections ? "Your Action Plan" : "You're On Track"}
            </p>
          </div>
          <div className="h-px flex-1 bg-white/8" />
        </motion.div>

        {hasLowSections ? (
          <>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/50 text-sm text-center mb-8 leading-relaxed"
            >
              Based on your score, here are the exact rules to fix{" "}
              {lowSections.length === 1
                ? "your weak section"
                : "your weak sections"}
              .
              <br />
              <span className="text-lime-400/80">
                Tap each rule to expand the full protocol.
              </span>
            </motion.p>

            {lowSections.map((section, i) => (
              <SectionMeasuresBlock key={section} section={section} index={i} />
            ))}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 text-center border border-lime-500/15 bg-gradient-to-br from-lime-900/10 to-transparent mb-8"
          >
            <span className="text-4xl block mb-3">🏆</span>
            <p className="text-lime-400 font-black text-lg mb-2">
              No Critical Gaps Detected
            </p>
            <p className="text-white/55 text-sm leading-relaxed">
              You scored above 50% in all three sections — solid foundation
              across the board. A personalized protocol will push you to the
              next level.
            </p>
          </motion.div>
        )}
      </div>

      {/* ── PERSONALIZED PLAN CTA ──────────────────────── */}
      <div className="px-5 sm:px-8 max-w-2xl mx-auto pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-7 text-center border border-lime-500/20 bg-gradient-to-br from-lime-900/15 via-transparent to-transparent lime-glow"
        >
          <span className="text-4xl mb-4 block">🎯</span>
          <h3 className="text-white font-black text-xl sm:text-2xl mb-3 leading-tight">
            Want a{" "}
            <span className="text-lime-400 text-lime-glow">
              Fully Personalized
            </span>
            <br />
            Fitness Protocol?
          </h3>
          <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
            These rules are a starting point. A custom plan built around your
            body, schedule, and goals will unlock results 10× faster.
          </p>

          <motion.a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-lime w-full inline-flex items-center justify-center gap-3 px-6 py-5 rounded-2xl text-base pulse-lime"
          >
            <span>BOOK YOUR PERSONALIZED PROTOCOL</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>

          <p className="text-white/25 text-xs mt-4">
            Coached by Yashraj Ghodke · 500+ Athletes
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={onRetake}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 text-white/30 hover:text-white/60 text-sm transition-colors block w-full text-center"
        >
          ↩ Retake Assessment
        </motion.button>
      </div>
    </div>
  );
}
