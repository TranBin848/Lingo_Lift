import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import grammarQuestions from "../../mocks/grammarQuestions";

interface GrammarSectionProps {
  onComplete?: (score: { correct: number; total: number }) => void;
}

export default function GrammarSection({ onComplete }: GrammarSectionProps) {
  // Store answers: for multiple-choice and error-correction: selected option index
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{
    correct: number;
    total: number;
    advice: string;
  } | null>(null);

  const handleMultipleChoiceChange = (
    questionId: number,
    optionIndex: number
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    let correct = 0;
    const total = grammarQuestions.length;

    grammarQuestions.forEach((q) => {
      const userAnswer = answers[q.id];

      if (q.type === "multiple-choice") {
        if (userAnswer === q.answer) {
          correct++;
        }
      } else if (q.type === "error-correction") {
        if (userAnswer === q.errorIndex) {
          correct++;
        }
      }
    });

    const percentage = (correct / total) * 100;
    let advice = "";
    if (percentage >= 80) {
      advice = "Excellent grammar knowledge! You have a strong foundation.";
    } else if (percentage >= 60) {
      advice = "Good work! Review the explanations to strengthen your grammar.";
    } else {
      advice = "Keep practicing! Focus on grammar rules and common patterns.";
    }

    setResults({ correct, total, advice });
    setSubmitted(true);
    toast.success("Grammar test submitted!");

    // Notify parent component
    if (onComplete) {
      onComplete({ correct, total });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Grammar</h2>

      <p className="mb-4 text-sm text-gray-600">
        Answer all {grammarQuestions.length} grammar questions below, then
        submit your test at the bottom.
      </p>

      {/* Results summary - show after submission */}
      {submitted && results && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Results</h3>
          <p className="mb-1">
            <strong>Correct:</strong> {results.correct} / {results.total}
          </p>
          <p className="mb-1">
            <strong>Score:</strong>{" "}
            {Math.round((results.correct / results.total) * 100)}%
          </p>
          <p className="text-sm text-gray-700">{results.advice}</p>
        </div>
      )}

      {/* Single scrollable box with all questions */}
      <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200 space-y-8">
        {grammarQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="pb-6 border-b border-gray-100 last:border-b-0"
          >
            <div className="font-semibold text-sm text-gray-500 mb-2">
              Question {idx + 1} / {grammarQuestions.length}
            </div>

            {q.type === "multiple-choice" && (
              <div>
                <h3 className="text-md font-semibold mb-3">{q.question}</h3>
                <div className="space-y-2">
                  {q.options.map((option, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${
                        answers[q.id] === optIdx
                          ? "bg-blue-50 border-blue-300"
                          : "hover:bg-gray-50"
                      } ${submitted ? "cursor-not-allowed" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === optIdx}
                        onChange={() =>
                          handleMultipleChoiceChange(q.id, optIdx)
                        }
                        disabled={submitted}
                        className="w-4 h-4"
                      />
                      <span className="flex-1">
                        <strong>{String.fromCharCode(65 + optIdx)}.</strong>{" "}
                        {option}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Show explanation after submission */}
                {submitted && (
                  <div
                    className={`mt-3 p-3 rounded-md ${
                      answers[q.id] === q.answer
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {answers[q.id] === q.answer
                        ? "✅ Correct!"
                        : `❌ Incorrect. Correct answer: ${String.fromCharCode(
                            65 + q.answer
                          )}`}
                    </p>
                    {q.explanation && (
                      <p className="text-sm text-gray-700">{q.explanation}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {q.type === "error-correction" && (
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Find the incorrect word in this sentence:
                </h3>
                <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="text-gray-800">{q.sentence}</p>
                </div>
                <div className="space-y-2">
                  {q.words.map((word, wordIdx) => (
                    <label
                      key={wordIdx}
                      className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${
                        answers[q.id] === wordIdx
                          ? "bg-blue-50 border-blue-300"
                          : "hover:bg-gray-50"
                      } ${submitted ? "cursor-not-allowed" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === wordIdx}
                        onChange={() =>
                          handleMultipleChoiceChange(q.id, wordIdx)
                        }
                        disabled={submitted}
                        className="w-4 h-4"
                      />
                      <span className="flex-1">
                        <strong>{String.fromCharCode(65 + wordIdx)}.</strong>{" "}
                        {word}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Show explanation after submission */}
                {submitted && (
                  <div
                    className={`mt-3 p-3 rounded-md ${
                      answers[q.id] === q.errorIndex
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {answers[q.id] === q.errorIndex
                        ? "✅ Correct!"
                        : `❌ Incorrect. The error is: ${String.fromCharCode(
                            65 + q.errorIndex
                          )}`}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Correction:</strong> "{q.words[q.errorIndex]}"
                      should be "{q.correctWord}"
                    </p>
                    {q.explanation && (
                      <p className="text-sm text-gray-700">{q.explanation}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit button at the bottom */}
      <div className="mt-6 flex gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit}>Submit Grammar Test</Button>
        ) : (
          <Button variant="outline" onClick={() => window.location.reload()}>
            Restart Test
          </Button>
        )}
      </div>
    </div>
  );
}
