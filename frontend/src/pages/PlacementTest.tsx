import { useState } from "react";
import PronunciationSection from "../components/placement/PronunciationSection";
import GrammarSection from "../components/placement/GrammarSection";
import VocabularySection from "../components/placement/VocabularySection";

export default function PlacementTest() {
  const [currentSection, setCurrentSection] = useState<
    "pronunciation" | "grammar" | "vocabulary" | "listening" | "reading"
  >("pronunciation");

  const [scores, setScores] = useState<
    Record<string, { correct: number; total: number }>
  >({});

  const handleSectionComplete = (
    section: string,
    score: { correct: number; total: number }
  ) => {
    setScores((prev) => ({ ...prev, [section]: score }));

    // Auto-navigate to next section and scroll to top
    if (section === "pronunciation") {
      setCurrentSection("grammar");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "grammar") {
      setCurrentSection("vocabulary");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "vocabulary") {
      setCurrentSection("listening");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (section === "listening") {
      setCurrentSection("reading");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Placement Test</h1>

      {/* Section navigation tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setCurrentSection("pronunciation")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentSection === "pronunciation"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Pronunciation
        </button>
        <button
          onClick={() => setCurrentSection("grammar")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentSection === "grammar"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Grammar
        </button>
        <button
          onClick={() => setCurrentSection("vocabulary")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentSection === "vocabulary"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Vocabulary
        </button>
        <button
          onClick={() => setCurrentSection("listening")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentSection === "listening"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Listening
        </button>
        <button
          onClick={() => setCurrentSection("reading")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentSection === "reading"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Reading
        </button>
      </div>

      {/* Display scores summary if any */}
      {Object.keys(scores).length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Progress</h2>
          <div className="space-y-1 text-sm">
            {Object.entries(scores).map(([section, score]) => (
              <div key={section}>
                <strong className="capitalize">{section}:</strong>{" "}
                {score.correct} / {score.total} (
                {Math.round((score.correct / score.total) * 100)}%)
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render current section */}
      {currentSection === "pronunciation" && (
        <PronunciationSection
          onComplete={(score) => handleSectionComplete("pronunciation", score)}
        />
      )}

      {currentSection === "grammar" && (
        <GrammarSection
          onComplete={(score) => handleSectionComplete("grammar", score)}
        />
      )}

      {currentSection === "vocabulary" && (
        <VocabularySection
          onComplete={(score) => handleSectionComplete("vocabulary", score)}
        />
      )}

      {currentSection === "listening" && (
        <div className="p-6 bg-white rounded-md shadow-sm border">
          <h2 className="text-xl font-bold mb-3">Listening</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      )}

      {currentSection === "reading" && (
        <div className="p-6 bg-white rounded-md shadow-sm border">
          <h2 className="text-xl font-bold mb-3">Reading</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      )}
    </div>
  );
}
