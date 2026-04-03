import { motion } from "framer-motion";
import {
  questions,
  sectionInfo,
  getPerformanceLevel,
  getSectionScore,
  getSectionMax,
  getStrongestSection,
  getWeakestSection,
  improvementSuggestions,
  type Section,
} from "@/data/questions";

interface ResultPageProps {
  answers: Record<number, boolean>;
  onRetake: () => void;
}

const LINKTREE_URL = "https://linktr.ee/eat_wise";

const allSections: Section[] = ["nutrition", "recovery", "mental"];

const sectionGradients: Record<Section, string> = {
  nutrition: "from-lime-500/20 to-lime-900/10",
  recovery: "from-teal-500/20 to-teal-900/10",
  mental: "from-violet-500/20 to-violet-900/10",
};

const sectionBorderColors: Record<Section, string> = {
  nutrition: "border-lime-500/25",
  recovery: "border-teal-500/25",
  mental: "border-violet-500/25",
};

const sectionBarColors: Record<Section, string> = {
  nutrition: "bg-lime-400",
  recovery: "bg-teal-400",
  mental: "bg-violet-400",
};

export default function ResultPage({ answers, onRetake }: ResultPageProps) {
  const total = Object.values(answers).filter(Boolean).length;
  const percentage = Math.round((total / questions.length) * 100);
  const performance = getPerformanceLevel(total);
  const strongest = getStrongestSection(answers);
  const weakest = getWeakestSection(answers);

  return (
    <div className="min-h-screen bg-[#050f08] py-12 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-lime-400/70 text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Assessment Complete
          </p>
          <h1 className="text-white text-3xl sm:text-4xl font-black">
            Your <span className="text-lime-400">Protocol Score</span>
          </h1>
        </motion.div>

        {/* Score ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, type: "spring", damping: 12 }}
          className="flex justify-center mb-10"
        >
          <div className="relative w-48 h-48">
            {/* SVG ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#lime-grad)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - percentage / 100) }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="lime-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#a3e635" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lime-400 font-black text-4xl text-lime-glow"
              >
                {total}
              </motion.span>
              <span className="text-white/40 text-sm font-semibold">/ {questions.length}</span>
              <span className="text-white/60 text-xs mt-1">{percentage}%</span>
            </div>
          </div>
        </motion.div>

        {/* Performance level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card rounded-2xl p-6 text-center mb-6 border border-white/8"
        >
          <p className={`text-xl sm:text-2xl font-black mb-3 ${performance.color}`}>
            {performance.label}
          </p>
          <p className="text-white/60 text-sm leading-relaxed">{performance.description}</p>
        </motion.div>

        {/* Section breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="glass-card rounded-2xl p-6 mb-6 border border-white/8"
        >
          <h3 className="text-white font-black text-lg mb-5">Section Breakdown</h3>

          <div className="space-y-4">
            {allSections.map((section) => {
              const score = getSectionScore(answers, section);
              const max = getSectionMax(section);
              const pct = (score / max) * 100;
              const info = sectionInfo[section];
              const isStrongest = section === strongest;
              const isWeakest = section === weakest;

              return (
                <div key={section}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{info.icon}</span>
                      <span className="text-white font-semibold text-sm">{info.label}</span>
                      {isStrongest && (
                        <span className="text-[10px] bg-lime-400/15 text-lime-400 border border-lime-400/30 rounded-full px-2 py-0.5 font-bold">
                          STRONGEST
                        </span>
                      )}
                      {isWeakest && !isStrongest && (
                        <span className="text-[10px] bg-red-400/15 text-red-400 border border-red-400/30 rounded-full px-2 py-0.5 font-bold">
                          FOCUS AREA
                        </span>
                      )}
                    </div>
                    <span className="text-white/70 font-bold text-sm">
                      {score}/{max}
                    </span>
                  </div>
                  <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${sectionBarColors[section]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Strongest / Weakest */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
        >
          <div
            className={`glass-card rounded-2xl p-5 border ${sectionBorderColors[strongest]} bg-gradient-to-br ${sectionGradients[strongest]}`}
          >
            <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-2">Strongest Area</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{sectionInfo[strongest].icon}</span>
              <span className="text-white font-black text-lg">{sectionInfo[strongest].label}</span>
            </div>
            <p className="text-white/50 text-xs mt-2">
              {getSectionScore(answers, strongest)}/{getSectionMax(strongest)} points
            </p>
          </div>

          <div
            className={`glass-card rounded-2xl p-5 border ${sectionBorderColors[weakest]} bg-gradient-to-br ${sectionGradients[weakest]}`}
          >
            <p className="text-white/50 text-xs font-bold tracking-widest uppercase mb-2">Focus Area</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{sectionInfo[weakest].icon}</span>
              <span className="text-white font-black text-lg">{sectionInfo[weakest].label}</span>
            </div>
            <p className="text-white/50 text-xs mt-2">
              {getSectionScore(answers, weakest)}/{getSectionMax(weakest)} points
            </p>
          </div>
        </motion.div>

        {/* Improvement suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="glass-card rounded-2xl p-6 mb-8 border border-lime-500/15 bg-gradient-to-br from-lime-900/15 to-transparent"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">💡</span>
            <h3 className="text-lime-400 font-black text-sm tracking-wide uppercase">
              Top Improvement Tip
            </h3>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            {improvementSuggestions[weakest]}
          </p>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-center"
        >
          <motion.a
            href={LINKTREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-lime w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-base sm:text-lg pulse-lime"
          >
            <span>BOOK YOUR PERSONALIZED FITNESS PROTOCOL</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>

          <motion.button
            onClick={onRetake}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-5 text-white/40 hover:text-white/70 text-sm transition-colors block w-full"
          >
            Retake Assessment
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center text-white/20 text-xs mt-10"
        >
          Performance Protocol by Yashraj Ghodke
        </motion.p>
      </div>
    </div>
  );
}
