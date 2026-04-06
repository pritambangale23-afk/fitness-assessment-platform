export type Section = "nutrition" | "recovery" | "mental";

export interface Question {
  id: number;
  section: Section;
  sectionLabel: string;
  text: string;
}

export interface SectionRule {
  number: string;
  title: string;
  rule: string;
  execution: string[];
  why: string;
}

export interface SectionMeasures {
  systemName: string;
  tagline: string;
  rules: SectionRule[];
}

export const questions: Question[] = [
  {
    id: 1,
    section: "nutrition",
    sectionLabel: "Nutrition",
    text: "Do you eat meals that include protein, carbs, and fats in proper balance?",
  },
  {
    id: 2,
    section: "nutrition",
    sectionLabel: "Nutrition",
    text: "Do you avoid sugar in your daily meals?",
  },
  {
    id: 3,
    section: "nutrition",
    sectionLabel: "Nutrition",
    text: "Do you feel comfortable (no bloating or acidity) after most meals?",
  },
  {
    id: 4,
    section: "nutrition",
    sectionLabel: "Nutrition",
    text: "Do you follow a fixed and structured eating routine daily?",
  },
  {
    id: 5,
    section: "recovery",
    sectionLabel: "Recovery",
    text: "Do you sleep before 10:00 PM consistently?",
  },
  {
    id: 6,
    section: "recovery",
    sectionLabel: "Recovery",
    text: "Do you avoid using your phone 30 minutes before sleep?",
  },
  {
    id: 7,
    section: "recovery",
    sectionLabel: "Recovery",
    text: "Do you support your recovery daily (sunlight, proper nutrition, routine)?",
  },
  {
    id: 8,
    section: "recovery",
    sectionLabel: "Recovery",
    text: "Do you regularly do stretching or mobility work?",
  },
  {
    id: 9,
    section: "mental",
    sectionLabel: "Mental & Consistency",
    text: "Do you practice meditation regularly?",
  },
  {
    id: 10,
    section: "mental",
    sectionLabel: "Mental & Consistency",
    text: "Do you use breathing techniques to calm or reset yourself?",
  },
  {
    id: 11,
    section: "mental",
    sectionLabel: "Mental & Consistency",
    text: "Do you stay emotionally stable (not easily irritated or reactive)?",
  },
  {
    id: 12,
    section: "mental",
    sectionLabel: "Mental & Consistency",
    text: "Do you consume positive or growth-focused content daily?",
  },
];

export const sectionMeasures: Record<Section, SectionMeasures> = {
  recovery: {
    systemName: "THE RECOVERY RULE SYSTEM",
    tagline: "Follow these 4 rules → your body starts recovering like an athlete.",
    rules: [
      {
        number: "01",
        title: "RECOVERY WINDOW RULE",
        rule: "Be asleep by 9:30–10:00 PM",
        execution: ["Fix a sleep time", "Start winding down 20 mins before"],
        why: "Most deep recovery happens early in the night. Between 10 PM–2 AM your body recovers the most. Miss this → poor recovery the next day.",
      },
      {
        number: "02",
        title: "ENERGY CONSERVATION RULE",
        rule: "Avoid unnecessary energy drains during the day",
        execution: ["Don't scroll randomly for long periods", "Avoid toxic content", "Avoid unnecessary talking / overthinking", "Take short breaks instead of pushing non-stop"],
        why: "Your body has limited energy. If you waste it → nothing is left for recovery and performance.",
      },
      {
        number: "03",
        title: "CAFFEINE CUT-OFF RULE",
        rule: "No caffeine after 4 PM",
        execution: ["No tea / coffee in evening", "Drink water or light fluids"],
        why: "Caffeine blocks your natural sleep drive, reduces recovery quality, and increases heart rate.",
      },
      {
        number: "04",
        title: "LAST MEAL RECOVERY RULE",
        rule: "Finish dinner 2–3 hours before sleep",
        execution: ["Eat early dinner", "Avoid heavy, oily food at night"],
        why: "If your body is digesting, it cannot fully recover. Better digestion = deeper recovery.",
      },
    ],
  },
  nutrition: {
    systemName: "THE EAT WISE NUTRITION SYSTEM",
    tagline: "Follow these 4 steps → your nutrition improves immediately.",
    rules: [
      {
        number: "01",
        title: "FIRST MEAL RULE",
        rule: "Eat within 2 hours of waking",
        execution: ["Don't skip breakfast", "Eat something simple if busy"],
        why: "Starts your energy system → better performance and focus throughout the day.",
      },
      {
        number: "02",
        title: "PROTEIN IN EVERY MEAL RULE",
        rule: "Add protein in every meal",
        execution: ["Eggs / paneer / dal / chicken", "One protein source per meal"],
        why: "Supports muscle recovery, strength, and stable energy — the three pillars of performance.",
      },
      {
        number: "03",
        title: "NO SUGAR RULE (15 DAYS)",
        rule: "Zero sugar for 15 days",
        execution: ["No sweets", "No sugary drinks", "No packaged snacks"],
        why: "Sugar causes energy crashes, fat gain, and poor recovery — eliminating it resets your system.",
      },
      {
        number: "04",
        title: "NO OUTSIDE FOOD RULE (15 DAYS)",
        rule: "Eat only home-cooked meals for 15 days",
        execution: ["Eat home-cooked meals", "Carry food if needed"],
        why: "Gives you better digestion, full control of your inputs, and consistent performance output.",
      },
    ],
  },
  mental: {
    systemName: "THE EAT WISE MENTAL SYSTEM",
    tagline: "Follow these 4 steps → your focus & control improve immediately.",
    rules: [
      {
        number: "01",
        title: "DAILY MEDITATION RULE",
        rule: "Meditate 10 minutes every day",
        execution: ["Sit quietly", "Focus on your breath", "No phone, no distractions"],
        why: "You can't control performance if you can't control your mind. Meditation builds that control.",
      },
      {
        number: "02",
        title: "DAILY BREATHWORK RULE",
        rule: "Breathing practice daily (2–5 mins)",
        execution: ["Inhale 4 sec → exhale 6 sec", "Do before training or sleep"],
        why: "Your breath controls your state. Breathwork reduces stress, anxiety, and overthinking instantly.",
      },
      {
        number: "03",
        title: "NO NEGATIVE INPUT RULE (15 DAYS)",
        rule: "Zero negative content for 15 days",
        execution: ["No toxic social media", "No unnecessary scrolling", "Avoid negativity"],
        why: "What you consume mentally shapes your performance. Guard your input like you guard your diet.",
      },
      {
        number: "04",
        title: "POSITIVE INPUT RULE",
        rule: "Consume growth-focused content daily",
        execution: ["Listen to a podcast / learning content", "10–15 mins daily minimum"],
        why: "Strong input builds strong mindset. Confidence, discipline, and clarity all start here.",
      },
    ],
  },
};

export const sectionInfo: Record<
  Section,
  { label: string; icon: string; color: string; accent: string; barColor: string; borderColor: string; gradientFrom: string }
> = {
  nutrition: {
    label: "Nutrition",
    icon: "🥗",
    color: "from-lime-500/20 to-green-700/20",
    accent: "lime",
    barColor: "bg-lime-400",
    borderColor: "border-lime-500/25",
    gradientFrom: "from-lime-500/15",
  },
  recovery: {
    label: "Recovery",
    icon: "💤",
    color: "from-teal-500/20 to-teal-700/20",
    accent: "teal",
    barColor: "bg-teal-400",
    borderColor: "border-teal-500/25",
    gradientFrom: "from-teal-500/15",
  },
  mental: {
    label: "Mental & Consistency",
    icon: "🧠",
    color: "from-violet-500/20 to-violet-700/20",
    accent: "violet",
    barColor: "bg-violet-400",
    borderColor: "border-violet-500/25",
    gradientFrom: "from-violet-500/15",
  },
};

export function getPerformanceLevel(score: number): {
  label: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  description: string;
  emoji: string;
} {
  if (score <= 4) {
    return {
      label: "Needs Immediate Improvement",
      colorClass: "text-red-400",
      bgClass: "from-red-900/20 to-transparent",
      borderClass: "border-red-500/20",
      description:
        "Your foundation needs serious work — but this is exactly where transformation begins. With focused daily effort, you can rebuild from the ground up.",
      emoji: "🔴",
    };
  }
  if (score <= 8) {
    return {
      label: "Good Foundation",
      colorClass: "text-yellow-400",
      bgClass: "from-yellow-900/20 to-transparent",
      borderClass: "border-yellow-500/20",
      description:
        "Solid habits are in place. The gaps holding you back are clear — target them specifically and you'll unlock the next performance level fast.",
      emoji: "🟡",
    };
  }
  return {
    label: "Elite Performance Protocol",
    colorClass: "text-lime-400",
    bgClass: "from-lime-900/20 to-transparent",
    borderClass: "border-lime-500/20",
    description:
      "You operate at an elite level. Your discipline and consistency set you apart. Keep refining — champions don't coast.",
    emoji: "🟢",
  };
}

export function getSectionScore(
  answers: Record<number, boolean>,
  section: Section
): number {
  const sectionQuestions = questions.filter((q) => q.section === section);
  return sectionQuestions.reduce((sum, q) => sum + (answers[q.id] ? 1 : 0), 0);
}

export function getSectionMax(section: Section): number {
  return questions.filter((q) => q.section === section).length;
}

export function getStrongestSection(answers: Record<number, boolean>): Section {
  const sections: Section[] = ["nutrition", "recovery", "mental"];
  let best = sections[0];
  let bestPct = -1;
  for (const s of sections) {
    const pct = getSectionScore(answers, s) / getSectionMax(s);
    if (pct > bestPct) {
      bestPct = pct;
      best = s;
    }
  }
  return best;
}

export function getWeakestSection(answers: Record<number, boolean>): Section {
  const sections: Section[] = ["nutrition", "recovery", "mental"];
  let worst = sections[0];
  let worstPct = 2;
  for (const s of sections) {
    const pct = getSectionScore(answers, s) / getSectionMax(s);
    if (pct < worstPct) {
      worstPct = pct;
      worst = s;
    }
  }
  return worst;
}

export function getLowSections(answers: Record<number, boolean>): Section[] {
  const sections: Section[] = ["nutrition", "recovery", "mental"];
  return sections
    .filter((s) => getSectionScore(answers, s) <= Math.floor(getSectionMax(s) / 2))
    .sort(
      (a, b) =>
        getSectionScore(answers, a) / getSectionMax(a) -
        getSectionScore(answers, b) / getSectionMax(b)
    );
}
