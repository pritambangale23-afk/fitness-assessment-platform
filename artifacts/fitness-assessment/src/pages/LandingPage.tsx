import { motion } from "framer-motion";

interface LandingPageProps {
  onStart: () => void;
}

const cardData = [
  {
    emoji: "🥗",
    title: "Nutrition",
    subtitle: "Fuel your body with precision",
    gradient: "from-lime-900/40 to-green-900/30",
    border: "border-lime-500/20",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80&auto=format&fit=crop",
  },
  {
    emoji: "💤",
    title: "Recovery",
    subtitle: "Sleep, restore, perform",
    gradient: "from-teal-900/40 to-cyan-900/30",
    border: "border-teal-500/20",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&q=80&auto=format&fit=crop",
  },
  {
    emoji: "🧠",
    title: "Mental",
    subtitle: "Master your mindset daily",
    gradient: "from-violet-900/40 to-purple-900/30",
    border: "border-violet-500/20",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80&auto=format&fit=crop",
  },
];

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#050f08] overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80&auto=format&fit=crop')",
          }}
        />

        {/* Overlay */}
        <div className="hero-overlay absolute inset-0" />

        {/* Top badges */}
        <div className="relative z-10 flex justify-between items-start px-5 pt-6 sm:px-8 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass px-3 py-2 rounded-xl"
          >
            <p className="text-[10px] text-lime-400/70 font-semibold tracking-widest uppercase">Coach</p>
            <p className="text-white font-bold text-sm sm:text-base tracking-wide">YASHRAJ GHODKE</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass px-3 py-2 rounded-xl flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-lime-400 inline-block animate-pulse" />
            <p className="text-lime-400 font-bold text-sm tracking-widest uppercase">Certified</p>
          </motion.div>
        </div>

        {/* Main hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-12 px-5 sm:px-8 max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-lime-400/80 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-3">
              Performance System
            </p>

            <h1 className="text-[3.2rem] sm:text-[5rem] lg:text-[6.5rem] font-black leading-[0.9] tracking-[-0.02em] text-white mb-2">
              PERFOR
              <br />
              MANCE
            </h1>
            <h1 className="text-[3.2rem] sm:text-[5rem] lg:text-[6.5rem] font-black leading-[0.9] tracking-[-0.02em] text-lime-400 text-lime-glow mb-6">
              PROTOCOL
            </h1>

            <p className="text-white/75 text-base sm:text-lg font-light max-w-md leading-relaxed mb-2">
              Personalized assessment &amp; coaching system
            </p>

            <div className="flex items-center gap-2 mb-8">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((l) => (
                  <div
                    key={l}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-lime-400 to-green-600 flex items-center justify-center text-[10px] font-bold text-black border-2 border-[#050f08]"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-sm">
                Coached <span className="text-lime-400 font-bold">500+</span> Athletes Trained
              </p>
            </div>

            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-lime w-full sm:w-auto px-10 py-5 rounded-2xl text-base sm:text-lg pulse-lime"
            >
              START ASSESSMENT
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="py-16 px-5 sm:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-lime-400/70 text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Assessment Areas
          </p>
          <h2 className="text-white text-3xl sm:text-4xl font-black">
            3 Pillars of{" "}
            <span className="text-lime-400">Elite Performance</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cardData.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`glass-card rounded-2xl overflow-hidden border ${card.border} cursor-default`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient}`} />
              </div>

              <div className="p-5">
                <span className="text-3xl">{card.emoji}</span>
                <h3 className="text-white font-black text-xl mt-2 mb-1">{card.title}</h3>
                <p className="text-white/50 text-sm">{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-white/40 text-sm mb-6">
            12 questions · takes under 3 minutes
          </p>
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-lime px-12 py-5 rounded-2xl text-lg w-full sm:w-auto"
          >
            START ASSESSMENT
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
