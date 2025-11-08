import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AudioPlayer from "../ui/audio-player";
import listeningQuestions from "../../mocks/listeningQuestions";
import { toast } from "sonner";

interface ListeningSectionProps {
  onComplete: (score: { correct: number; total: number }) => void;
  reviewMode?: boolean;
}

export default function ListeningSection({
  onComplete,
  reviewMode = false,
}: ListeningSectionProps) {
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [submitted, setSubmitted] = useState(reviewMode);

  const handleFillInBlankChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value.trim() }));
  };

  const handleOptionChange = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,!?]/g, "");
  };

  const handleSubmit = () => {
    let correctCount = 0;

    listeningQuestions.forEach((question) => {
      const userAnswer = answers[question.id];

      if (question.type === "fill-in-blank") {
        const normalizedUserAnswer = normalizeText(
          typeof userAnswer === "string" ? userAnswer : ""
        );
        const normalizedCorrectAnswer = normalizeText(question.answer);

        if (normalizedUserAnswer === normalizedCorrectAnswer) {
          correctCount++;
        }
      } else {
        // For image-question and conversation types
        if (userAnswer === question.answer) {
          correctCount++;
        }
      }
    });

    const totalQuestions = listeningQuestions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    setSubmitted(true);
    toast.success(
      `You got ${correctCount} out of ${totalQuestions} correct (${percentage}%)!`
    );

    // Pass score to parent
    onComplete({ correct: correctCount, total: totalQuestions });
  };

  const isAnswerCorrect = (questionId: number): boolean => {
    const question = listeningQuestions.find((q) => q.id === questionId);
    if (!question) return false;

    const userAnswer = answers[questionId];

    if (question.type === "fill-in-blank") {
      const normalizedUserAnswer = normalizeText(
        typeof userAnswer === "string" ? userAnswer : ""
      );
      const normalizedCorrectAnswer = normalizeText(question.answer);
      return normalizedUserAnswer === normalizedCorrectAnswer;
    } else {
      return userAnswer === question.answer;
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-sm border">
      <h2 className="text-xl font-bold mb-4">Listening Comprehension</h2>
      <p className="text-gray-600 mb-6">
        Listen to the audio and answer the questions below. You can replay the
        audio as many times as needed.
      </p>

      <div className="space-y-8">
        {listeningQuestions.map((question, index) => (
          <div
            key={question.id}
            className={`p-4 border rounded-md ${
              submitted
                ? isAnswerCorrect(question.id)
                  ? "border-green-300 bg-green-50"
                  : "border-red-300 bg-red-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="font-semibold text-gray-700">{index + 1}.</span>
              <div className="flex-1">
                {/* Audio player */}
                <div className="mb-4">
                  <AudioPlayer text={question.audioText} disabled={submitted} />
                </div>

                {/* Fill-in-blank type */}
                {question.type === "fill-in-blank" && (
                  <div>
                    <p className="text-gray-700 mb-3 text-lg">
                      {question.sentence}
                    </p>
                    <Input
                      type="text"
                      placeholder="Type the missing word"
                      value={
                        typeof answers[question.id] === "string"
                          ? answers[question.id]
                          : ""
                      }
                      onChange={(e) =>
                        handleFillInBlankChange(question.id, e.target.value)
                      }
                      disabled={submitted}
                      className="max-w-md"
                    />
                  </div>
                )}

                {/* Image-question type */}
                {question.type === "image-question" && (
                  <div>
                    <img
                      src={question.imageUrl}
                      alt="Listening question"
                      className="w-full max-w-md rounded-md mb-4"
                    />
                    <p className="text-gray-700 mb-3 font-medium">
                      {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                            answers[question.id] === optionIndex
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={optionIndex}
                            checked={answers[question.id] === optionIndex}
                            onChange={() =>
                              handleOptionChange(question.id, optionIndex)
                            }
                            disabled={submitted}
                            className="w-4 h-4"
                          />
                          <span className="font-semibold text-gray-600">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conversation type */}
                {question.type === "conversation" && (
                  <div>
                    <p className="text-gray-700 mb-3 font-medium">
                      {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                            answers[question.id] === optionIndex
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={optionIndex}
                            checked={answers[question.id] === optionIndex}
                            onChange={() =>
                              handleOptionChange(question.id, optionIndex)
                            }
                            disabled={submitted}
                            className="w-4 h-4"
                          />
                          <span className="font-semibold text-gray-600">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show feedback after submission */}
                {submitted && (
                  <div className="mt-4">
                    {isAnswerCorrect(question.id) ? (
                      <p className="text-green-700 font-medium">✓ Correct!</p>
                    ) : (
                      <div className="text-red-700">
                        <p className="font-medium">✗ Incorrect</p>
                        <p className="mt-1">
                          <strong>Correct answer:</strong>{" "}
                          {question.type === "fill-in-blank"
                            ? question.answer
                            : `${String.fromCharCode(65 + question.answer)}. ${
                                question.options[question.answer]
                              }`}
                        </p>
                      </div>
                    )}
                    {question.explanation && (
                      <p className="mt-2 text-gray-600 text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="mt-6">
          <Button onClick={handleSubmit} size="lg" className="w-full sm:w-auto">
            Submit Listening Test
          </Button>
        </div>
      )}
    </div>
  );
}
