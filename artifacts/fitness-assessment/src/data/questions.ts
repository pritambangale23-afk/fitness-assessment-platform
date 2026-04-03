export type Section = "nutrition" | "recovery" | "mental";

export interface Question {
  id: number;
  section: Section;
  sectionLabel: string;
  text: string;
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

export const sectionInfo: Record<Section, { label: string; icon: string; color: string }> = {
  nutrition: {
    label: "Nutrition",
    icon: "🥗",
    color: "from-lime-500/20 to-green-700/20",
  },
  recovery: {
    label: "Recovery",
    icon: "💤",
    color: "from-blue-500/20 to-teal-700/20",
  },
  mental: {
    label: "Mental & Consistency",
    icon: "🧠",
    color: "from-purple-500/20 to-violet-700/20",
  },
};

export function getPerformanceLevel(score: number): {
  label: string;
  color: string;
  description: string;
} {
  if (score <= 4) {
    return {
      label: "Needs Immediate Improvement",
      color: "text-red-400",
      description:
        "Your foundation needs work. This is where the journey begins — and with focused effort, transformation is absolutely possible.",
    };
  }
  if (score <= 8) {
    return {
      label: "Good Foundation",
      color: "text-yellow-400",
      description:
        "You have solid habits in place. Refining the gaps will unlock the next level of your performance.",
    };
  }
  return {
    label: "Elite Performance Protocol",
    color: "text-lime-400",
    description:
      "You operate at an elite level. Your discipline and consistency set you apart — keep pushing the ceiling.",
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

export function getStrongestSection(
  answers: Record<number, boolean>
): Section {
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

export function getWeakestSection(
  answers: Record<number, boolean>
): Section {
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

export const improvementSuggestions: Record<Section, string> = {
  nutrition:
    "Focus on building a consistent meal prep routine. Start by balancing your macros at every meal — protein, carbs, and healthy fats. Eliminate hidden sugars from your diet.",
  recovery:
    "Prioritize your sleep schedule. Aim to be in bed by 10 PM and eliminate screen time 30 minutes before sleep. Add a 10-minute morning mobility routine.",
  mental:
    "Begin a daily 5-minute meditation practice. Use box breathing (4-4-4-4) to reset during stressful moments. Curate your content consumption towards growth-focused material.",
};
