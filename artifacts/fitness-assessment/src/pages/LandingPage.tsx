import { motion } from "framer-motion";

interface LandingPageProps {
  onStart: () => void;
}

const cardData = [
  {
    emoji: "🥗",
    title: "Nutrition",
    subtitle: "Fuel your body with precision",
    accent: "lime",
    border: "border-lime-500/20",
    glow: "rgba(163,230,53,0.08)",
    gradient: "from-lime-900/50 to-green-900/30",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=85&auto=format&fit=crop",
    stat: "4 Rules",
  },
  {
    emoji: "💤",
    title: "Recovery",
    subtitle: "Sleep, restore, perform",
    accent: "teal",
    border: "border-teal-500/20",
    glow: "rgba(45,212,191,0.08)",
    gradient: "from-teal-900/50 to-cyan-900/30",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=85&auto=format&fit=crop",
    stat: "4 Rules",
  },
  {
    emoji: "🧠",
    title: "Mental",
    subtitle: "Master your mindset daily",
    accent: "violet",
    border: "border-violet-500/20",
    glow: "rgba(167,139,250,0.08)",
    gradient: "from-violet-900/50 to-purple-900/30",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=85&auto=format&fit=crop",
    stat: "4 Rules",
  },
];

const statsData = [
  { value: "500+", label: "Athletes Coached" },
  { value: "12", label: "Questions" },
  { value: "3", label: "Core Pillars" },
  { value: "< 3min", label: "To Complete" },
];

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#040e07] overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1800&q=85&auto=format&fit=crop')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        {/* Lime ambient */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-60 h-60 bg-lime-400/4 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar */}
        <div className="relative z-10 flex justify-between items-start px-5 pt-6 sm:px-8 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="glass px-4 py-2.5 rounded-xl"
          >
            <p className="text-[9px] text-lime-400/65 font-black tracking-[0.3em] uppercase">Coach</p>
            <p className="text-white font-black text-sm sm:text-base tracking-wider">YASHRAJ GHODKE</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="glass px-4 py-2.5 rounded-xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <p className="text-lime-400 font-black text-sm tracking-[0.2em] uppercase">Certified</p>
          </motion.div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-14 px-5 sm:px-8 max-w-3xl mx-auto w-full">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.p
              variants={fadeUp}
              className="text-lime-400/75 text-xs sm:text-sm font-black tracking-[0.3em] uppercase mb-4"
            >
              Performance System · Est. 2024
            </motion.p>

            <motion.div variants={fadeUp}>
              <h1 className="text-[3.4rem] sm:text-[5.5rem] lg:text-[7rem] font-black leading-[0.88] tracking-[-0.025em] text-white">
                PERFOR<br />MANCE
              </h1>
              <h1 className="text-[3.4rem] sm:text-[5.5rem] lg:text-[7rem] font-black leading-[0.88] tracking-[-0.025em] text-lime-400 text-lime-glow mb-7">
                PROTOCOL
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-white/70 text-base sm:text-lg font-light max-w-sm leading-relaxed mb-3"
            >
              Personalized assessment &amp; coaching system
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="flex -space-x-2">
                {["Y","R","A","K"].map((l) => (
                  <div
                    key={l}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-400 to-green-600 flex items-center justify-center text-[11px] font-black text-black border-2 border-[#040e07]"
                  >
                    {l}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-[9px] font-black text-lime-400 border-2 border-[#040e07]">
                  +496
                </div>
              </div>
              <p className="text-white/55 text-sm">
                <span className="text-lime-400 font-black">500+</span> Athletes Trained
              </p>
            </motion.div>

            <motion.button
              variants={fadeUp}
              onClick={onStart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lime w-full sm:w-auto px-10 py-5 rounded-2xl text-base sm:text-lg pulse-lime flex items-center justify-center gap-3 sm:inline-flex"
            >
              START YOUR ASSESSMENT
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>

            <motion.p variants={fadeUp} className="text-white/30 text-xs mt-3 text-center sm:text-left">
              12 questions · under 3 minutes · free
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ROW ────────────────────────────────────── */}
      <section className="py-8 px-5 sm:px-8 border-y border-white/5">
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-lime-400 font-black text-2xl sm:text-3xl text-lime-glow">{stat.value}</p>
              <p className="text-white/40 text-xs font-semibold tracking-wide mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PILLARS SECTION ──────────────────────────────── */}
      <section className="py-16 px-5 sm:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-lime-400/65 text-[10px] font-black tracking-[0.35em] uppercase mb-3">
            Assessment Areas
          </p>
          <h2 className="text-white text-3xl sm:text-4xl font-black leading-tight">
            3 Pillars of{" "}
            <span className="text-lime-400 text-lime-glow">Elite Performance</span>
          </h2>
          <p className="text-white/40 text-sm mt-3 max-w-md mx-auto">
            We assess you across three core domains. You'll get a score, a breakdown, and exact rules to fix your weakest areas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cardData.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -7, scale: 1.02 }}
              className={`glass-card rounded-2xl overflow-hidden border ${card.border} cursor-default group`}
              style={{ boxShadow: `0 0 40px ${card.glow}` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient}`} />
                <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-lg">
                  <p className="text-white/70 text-[10px] font-black tracking-wide">{card.stat}</p>
                </div>
              </div>

              <div className="p-5">
                <span className="text-3xl">{card.emoji}</span>
                <h3 className="text-white font-black text-xl mt-2 mb-1">{card.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What you'll get */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 glass-card rounded-2xl p-6 border border-lime-500/15"
        >
          <p className="text-lime-400/70 text-[10px] font-black tracking-[0.3em] uppercase mb-4">
            What You'll Receive
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "📊", title: "Your Score", desc: "Scored out of 12 with % and performance label" },
              { icon: "🎯", title: "Action Plan", desc: "Exact rules to fix each low-scoring section" },
              { icon: "📋", title: "Personalized Path", desc: "Option to get a custom protocol built for you" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white font-black text-sm">{item.title}</p>
                  <p className="text-white/40 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-lime px-14 py-5 rounded-2xl text-lg w-full sm:w-auto"
          >
            START ASSESSMENT NOW
          </motion.button>
          <p className="text-white/25 text-xs mt-3">Free · No sign-up required</p>
        </motion.div>
      </section>
    </div>
  );
}
