import { useState } from "react";
import PronunciationSection from "../components/placement/PronunciationSection";
import GrammarSection from "../components/placement/GrammarSection";
import VocabularySection from "../components/placement/VocabularySection";
import ListeningSection from "../components/placement/ListeningSection";
import ReadingSection from "../components/placement/ReadingSection";

export default function PlacementTest() {
  const [currentSection, setCurrentSection] = useState<
    "pronunciation" | "grammar" | "vocabulary" | "listening" | "reading"
  >("pronunciation");

  const [scores, setScores] = useState<
    Record<string, { correct: number; total: number }>
  >({});

  const [showResults, setShowResults] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const handleSectionComplete = (
    section: string,
    score: { correct: number; total: number }
  ) => {
    const newScores = { ...scores, [section]: score };
    setScores(newScores);

    // Check if all sections are completed
    const allSections = [
      "pronunciation",
      "grammar",
      "vocabulary",
      "listening",
      "reading",
    ];
    const completedSections = Object.keys(newScores);
    const allCompleted = allSections.every((s) =>
      completedSections.includes(s)
    );

    if (allCompleted) {
      // Show results instead of navigating
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
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
    }
  };

  const calculateBand = (percentage: number): string => {
    if (percentage >= 85) return "7-8";
    if (percentage >= 65) return "5-6";
    if (percentage >= 40) return "3-4";
    return "1-2";
  };

  const getBandColor = (band: string): string => {
    if (band === "7-8") return "text-green-700 bg-green-100 border-green-300";
    if (band === "5-6") return "text-blue-700 bg-blue-100 border-blue-300";
    if (band === "3-4")
      return "text-yellow-700 bg-yellow-100 border-yellow-300";
    return "text-red-700 bg-red-100 border-red-300";
  };

  const getOverallFeedback = (percentage: number): string => {
    if (percentage >= 85) {
      return "Excellent work! You have demonstrated a strong command of English across all skill areas. You are ready for advanced-level materials.";
    }
    if (percentage >= 65) {
      return "Good job! You have a solid foundation in English. With some focused practice, you can reach advanced proficiency.";
    }
    if (percentage >= 40) {
      return "You're making progress! Focus on strengthening your fundamentals. Regular practice will help you improve significantly.";
    }
    return "Keep working hard! You're at the beginning of your English learning journey. Consistent practice and dedication will lead to improvement.";
  };

  const getSectionFeedback = (section: string, percentage: number): string => {
    const feedbacks: Record<string, Record<string, string>> = {
      pronunciation: {
        high: "Your pronunciation is excellent! You articulate words clearly.",
        medium:
          "Good pronunciation overall. Practice speaking more to improve fluency.",
        low: "Focus on pronunciation drills and listening to native speakers.",
      },
      grammar: {
        high: "Excellent grammar skills! You understand complex structures well.",
        medium:
          "Solid grammar foundation. Review tenses and sentence structures.",
        low: "Focus on basic grammar rules and practice with exercises.",
      },
      vocabulary: {
        high: "Impressive vocabulary range! You can express ideas precisely.",
        medium: "Good vocabulary. Expand your word knowledge through reading.",
        low: "Build your vocabulary through reading and flashcards.",
      },
      listening: {
        high: "Excellent listening comprehension! You understand spoken English well.",
        medium: "Good listening skills. Practice with podcasts and videos.",
        low: "Focus on listening exercises and watch English content with subtitles.",
      },
      reading: {
        high: "Outstanding reading comprehension! You grasp main ideas and details.",
        medium: "Good reading skills. Read more diverse texts to improve.",
        low: "Practice reading regularly. Start with simpler texts and gradually increase difficulty.",
      },
    };

    const level =
      percentage >= 70 ? "high" : percentage >= 50 ? "medium" : "low";
    return feedbacks[section]?.[level] || "Keep practicing!";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Placement Test</h1>

      {/* Section navigation tabs - hide in review mode */}
      {!isReviewMode && (
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
      )}

      {/* Back to Results button when in review mode */}
      {isReviewMode && (
        <div className="mb-6">
          <button
            onClick={() => {
              setIsReviewMode(false);
              setShowResults(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            ← Quay lại kết quả
          </button>
        </div>
      )}

      {/* Display final results if all sections completed */}
      {showResults && Object.keys(scores).length === 5 && (
        <div className="mb-6 space-y-6">
          {/* Overall Score Card */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🎓 Final Results
            </h2>

            {(() => {
              const totalCorrect = Object.values(scores).reduce(
                (sum, s) => sum + s.correct,
                0
              );
              const totalQuestions = Object.values(scores).reduce(
                (sum, s) => sum + s.total,
                0
              );
              const overallPercentage = Math.round(
                (totalCorrect / totalQuestions) * 100
              );
              const band = calculateBand(overallPercentage);

              return (
                <>
                  {/* Band Score */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Overall Band</p>
                      <div
                        className={`inline-block px-6 py-3 rounded-lg font-bold text-3xl border-2 ${getBandColor(
                          band
                        )}`}
                      >
                        {band}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-sm mb-1">Total Score</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {totalCorrect} / {totalQuestions}
                      </p>
                      <p className="text-lg text-gray-600">
                        ({overallPercentage}%)
                      </p>
                    </div>
                  </div>

                  {/* Overall Feedback */}
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {getOverallFeedback(overallPercentage)}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Section Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              📊 Section Breakdown
            </h3>
            {Object.entries(scores).map(([section, score]) => {
              const percentage = Math.round(
                (score.correct / score.total) * 100
              );
              const band = calculateBand(percentage);

              return (
                <div
                  key={section}
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-semibold capitalize text-gray-800">
                        {section}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-md text-sm font-semibold border ${getBandColor(
                          band
                        )}`}
                      >
                        Band {band}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">
                          {score.correct} / {score.total}
                        </p>
                        <p className="text-sm text-gray-600">({percentage}%)</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowResults(false);
                          setIsReviewMode(true);
                          setCurrentSection(
                            section as
                              | "pronunciation"
                              | "grammar"
                              | "vocabulary"
                              | "listening"
                              | "reading"
                          );
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
                      >
                        📝 Xem đáp án
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {getSectionFeedback(section, percentage)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => {
                setShowResults(false);
                setScores({});
                setCurrentSection("pronunciation");
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Retake Test
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Print Results
            </button>
          </div>
        </div>
      )}

      {/* Render current section */}
      {!showResults && (
        <>
          {currentSection === "pronunciation" && (
            <PronunciationSection
              onComplete={(score) =>
                handleSectionComplete("pronunciation", score)
              }
              reviewMode={isReviewMode}
            />
          )}

          {currentSection === "grammar" && (
            <GrammarSection
              onComplete={(score) => handleSectionComplete("grammar", score)}
              reviewMode={isReviewMode}
            />
          )}

          {currentSection === "vocabulary" && (
            <VocabularySection
              onComplete={(score) => handleSectionComplete("vocabulary", score)}
              reviewMode={isReviewMode}
            />
          )}

          {currentSection === "listening" && (
            <ListeningSection
              onComplete={(score) => handleSectionComplete("listening", score)}
              reviewMode={isReviewMode}
            />
          )}

          {currentSection === "reading" && (
            <ReadingSection
              onComplete={(score) => handleSectionComplete("reading", score)}
              reviewMode={isReviewMode}
            />
          )}
        </>
      )}
    </div>
  );
}
