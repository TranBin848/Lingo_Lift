import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import vocabularyQuestions from "../../mocks/vocabularyQuestions";

interface VocabularySectionProps {
  onComplete?: (score: { correct: number; total: number }) => void;
  reviewMode?: boolean;
}

export default function VocabularySection({
  onComplete,
  reviewMode = false,
}: VocabularySectionProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(reviewMode);
  const [results, setResults] = useState<{
    correct: number;
    total: number;
    advice: string;
  } | null>(null);

  const handleAnswerChange = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    let correct = 0;
    const total = vocabularyQuestions.length;

    vocabularyQuestions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (userAnswer === q.answer) {
        correct++;
      }
    });

    const percentage = (correct / total) * 100;
    let advice = "";
    if (percentage >= 80) {
      advice = "Excellent vocabulary! You have a strong word knowledge.";
    } else if (percentage >= 60) {
      advice =
        "Good job! Keep expanding your vocabulary with reading and practice.";
    } else {
      advice = "Keep learning! Try to read more and learn new words every day.";
    }

    setResults({ correct, total, advice });
    setSubmitted(true);
    toast.success("Vocabulary test submitted!");

    // Notify parent component
    if (onComplete) {
      onComplete({ correct, total });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Vocabulary</h2>

      <p className="mb-4 text-sm text-gray-600">
        Answer all {vocabularyQuestions.length} vocabulary questions below, then
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
        {vocabularyQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="pb-6 border-b border-gray-100 last:border-b-0"
          >
            <div className="font-semibold text-sm text-gray-500 mb-2">
              Question {idx + 1} / {vocabularyQuestions.length}
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
                        onChange={() => handleAnswerChange(q.id, optIdx)}
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

            {q.type === "synonym" && (
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Find the word closest in meaning to the underlined word:
                </h3>
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-gray-800">
                    {q.sentence.replace(q.underlinedWord, "")}
                    <span className="underline font-semibold">
                      {q.underlinedWord}
                    </span>
                    {q.sentence.split(q.underlinedWord)[1]}
                  </p>
                </div>
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
                        onChange={() => handleAnswerChange(q.id, optIdx)}
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

            {q.type === "antonym" && (
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Find the word opposite in meaning to the underlined word:
                </h3>
                <div className="mb-3 p-3 bg-purple-50 border border-purple-200 rounded-md">
                  <p className="text-gray-800">
                    {q.sentence.replace(q.underlinedWord, "")}
                    <span className="underline font-semibold">
                      {q.underlinedWord}
                    </span>
                    {q.sentence.split(q.underlinedWord)[1]}
                  </p>
                </div>
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
                        onChange={() => handleAnswerChange(q.id, optIdx)}
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
          </div>
        ))}
      </div>

      {/* Submit button at the bottom */}
      <div className="mt-6 flex gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit}>Submit Vocabulary Test</Button>
        ) : (
          <Button variant="outline" onClick={() => window.location.reload()}>
            Restart Test
          </Button>
        )}
      </div>
    </div>
  );
}
