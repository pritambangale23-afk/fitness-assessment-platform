import { useState } from "react";
import LandingPage from "@/pages/LandingPage";
import AssessmentPage from "@/pages/AssessmentPage";
import ResultPage from "@/pages/ResultPage";

type Screen = "landing" | "assessment" | "result";

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const handleStart = () => setScreen("assessment");

  const handleComplete = (completedAnswers: Record<number, boolean>) => {
    setAnswers(completedAnswers);
    setScreen("result");
  };

  const handleRetake = () => {
    setAnswers({});
    setScreen("landing");
  };

  if (screen === "landing") return <LandingPage onStart={handleStart} />;
  if (screen === "assessment") return <AssessmentPage onComplete={handleComplete} />;
  return <ResultPage answers={answers} onRetake={handleRetake} />;
}
