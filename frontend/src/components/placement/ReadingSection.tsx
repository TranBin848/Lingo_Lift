import { useState } from "react";
import { Button } from "../ui/button";
import readingQuestions from "../../mocks/readingQuestions";
import { toast } from "sonner";

interface ReadingSectionProps {
  onComplete: (score: { correct: number; total: number }) => void;
  reviewMode?: boolean;
}

export default function ReadingSection({ onComplete, reviewMode = false }: ReadingSectionProps) {
  const [answers, setAnswers] = useState<
    Record<number, Record<number, number | string>>
  >({});
  const [submitted, setSubmitted] = useState(reviewMode);

  const handleComprehensionAnswer = (
    questionId: number,
    subQuestionId: number,
    optionIndex: number
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [subQuestionId]: optionIndex,
      },
    }));
  };

  const handleFillInBlankAnswer = (
    questionId: number,
    blankIndex: number,
    word: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [blankIndex]: word,
      },
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let totalQuestions = 0;

    readingQuestions.forEach((question) => {
      if (question.type === "comprehension") {
        // Count each sub-question
        question.questions.forEach((subQ) => {
          totalQuestions++;
          const userAnswer = answers[question.id]?.[subQ.id];
          if (userAnswer === subQ.answer) {
            correctCount++;
          }
        });
      } else if (question.type === "fill-in-blank-passage") {
        // Count each blank
        question.answers.forEach((correctAnswer, index) => {
          totalQuestions++;
          const userAnswer = answers[question.id]?.[index];
          if (
            typeof userAnswer === "string" &&
            userAnswer.toLowerCase().trim() ===
              correctAnswer.toLowerCase().trim()
          ) {
            correctCount++;
          }
        });
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    setSubmitted(true);
    toast.success(
      `You got ${correctCount} out of ${totalQuestions} correct (${percentage}%)!`
    );

    // Pass score to parent
    onComplete({ correct: correctCount, total: totalQuestions });
  };

  const isComprehensionAnswerCorrect = (
    questionId: number,
    subQuestionId: number
  ): boolean => {
    const question = readingQuestions.find((q) => q.id === questionId);
    if (!question || question.type !== "comprehension") return false;

    const subQuestion = question.questions.find(
      (sq) => sq.id === subQuestionId
    );
    if (!subQuestion) return false;

    const userAnswer = answers[questionId]?.[subQuestionId];
    return userAnswer === subQuestion.answer;
  };

  const isFillInBlankCorrect = (
    questionId: number,
    blankIndex: number
  ): boolean => {
    const question = readingQuestions.find((q) => q.id === questionId);
    if (!question || question.type !== "fill-in-blank-passage") return false;

    const correctAnswer = question.answers[blankIndex];
    const userAnswer = answers[questionId]?.[blankIndex];

    return (
      typeof userAnswer === "string" &&
      userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    );
  };

  const renderPassageWithBlanks = (passage: string, questionId: number) => {
    const parts = passage.split(/(\{\{\d+\}\})/);
    const question = readingQuestions.find((q) => q.id === questionId);
    if (!question || question.type !== "fill-in-blank-passage") return null;

    return (
      <div className="text-gray-800 leading-relaxed text-lg">
        {parts.map((part, index) => {
          const match = part.match(/\{\{(\d+)\}\}/);
          if (match) {
            const blankIndex = parseInt(match[1]) - 1;
            const userAnswer = answers[questionId]?.[blankIndex] as
              | string
              | undefined;
            const isCorrect = isFillInBlankCorrect(questionId, blankIndex);

            return (
              <span
                key={index}
                className={`inline-flex items-center mx-1 ${
                  submitted
                    ? isCorrect
                      ? "text-green-700"
                      : "text-red-700"
                    : ""
                }`}
              >
                <span className="font-semibold underline decoration-2 decoration-blue-500">
                  {userAnswer || `(${blankIndex + 1})`}
                </span>
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-sm border">
      <h2 className="text-xl font-bold mb-4">Reading Comprehension</h2>
      <p className="text-gray-600 mb-6">
        Read the passages carefully and answer the questions below.
      </p>
      <div className="space-y-10">
        {readingQuestions.map((question, qIndex) => (
          <div
            key={question.id}
            className="p-5 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex items-start gap-2 mb-4">
              <span className="font-bold text-lg text-blue-600">
                Passage {qIndex + 1}:
              </span>
            </div>

            {/* Two-column layout for comprehension */}
            {question.type === "comprehension" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left column: Passage */}
                <div className="p-4 bg-white rounded-md border border-gray-200 lg:sticky lg:top-6 lg:self-start max-h-[600px] overflow-y-auto">
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {question.passage}
                  </p>
                </div>

                {/* Right column: Questions */}
                <div className="space-y-5">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Answer the questions:
                  </h3>
                  {question.questions.map((subQ, subIndex) => (
                    <div
                      key={subQ.id}
                      className={`p-4 border rounded-md ${
                        submitted
                          ? isComprehensionAnswerCorrect(question.id, subQ.id)
                            ? "border-green-300 bg-green-50"
                            : "border-red-300 bg-red-50"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      <p className="font-medium text-gray-800 mb-3">
                        {subIndex + 1}. {subQ.question}
                      </p>
                      <div className="space-y-2">
                        {subQ.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                              answers[question.id]?.[subQ.id] === optionIndex
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q-${question.id}-${subQ.id}`}
                              value={optionIndex}
                              checked={
                                answers[question.id]?.[subQ.id] === optionIndex
                              }
                              onChange={() =>
                                handleComprehensionAnswer(
                                  question.id,
                                  subQ.id,
                                  optionIndex
                                )
                              }
                              disabled={submitted}
                              className="w-4 h-4"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>

                      {/* Show feedback after submission */}
                      {submitted && (
                        <div className="mt-3">
                          {isComprehensionAnswerCorrect(
                            question.id,
                            subQ.id
                          ) ? (
                            <p className="text-green-700 font-medium">
                              ✓ Correct!
                            </p>
                          ) : (
                            <p className="text-red-700">
                              ✗ Incorrect. Correct answer:{" "}
                              <strong>{subQ.options[subQ.answer]}</strong>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Show explanation after submission */}
                  {submitted && question.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-gray-700">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Single column layout for fill-in-blank */
              <>
                {/* Render passage with blanks */}
                <div className="mb-6 p-4 bg-white rounded-md border border-gray-200">
                  {renderPassageWithBlanks(question.passage, question.id)}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Choose words from the word bank to fill in the blanks:
                  </h3>

                  {/* Word bank */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="font-medium text-gray-700 mb-2">Word Bank:</p>
                    <div className="flex flex-wrap gap-2">
                      {question.wordBank.map((word, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (!submitted) {
                              // Find the first empty blank
                              for (
                                let i = 0;
                                i < question.answers.length;
                                i++
                              ) {
                                if (!answers[question.id]?.[i]) {
                                  handleFillInBlankAnswer(question.id, i, word);
                                  break;
                                }
                              }
                            }
                          }}
                          disabled={submitted}
                          className="px-3 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-blue-400 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual input for each blank */}
                  <div className="space-y-3">
                    {question.answers.map((_, blankIndex) => (
                      <div
                        key={blankIndex}
                        className={`p-3 border rounded-md ${
                          submitted
                            ? isFillInBlankCorrect(question.id, blankIndex)
                              ? "border-green-300 bg-green-50"
                              : "border-red-300 bg-red-50"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <label className="block mb-2 font-medium text-gray-700">
                          Blank {blankIndex + 1}:
                        </label>
                        <input
                          type="text"
                          value={
                            (answers[question.id]?.[blankIndex] as string) || ""
                          }
                          onChange={(e) =>
                            handleFillInBlankAnswer(
                              question.id,
                              blankIndex,
                              e.target.value
                            )
                          }
                          disabled={submitted}
                          placeholder="Type or click a word from the word bank"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        />

                        {/* Show feedback after submission */}
                        {submitted && (
                          <div className="mt-2">
                            {isFillInBlankCorrect(question.id, blankIndex) ? (
                              <p className="text-green-700 font-medium text-sm">
                                ✓ Correct!
                              </p>
                            ) : (
                              <p className="text-red-700 text-sm">
                                ✗ Incorrect. Correct answer:{" "}
                                <strong>{question.answers[blankIndex]}</strong>
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Show explanation after submission */}
                  {submitted && question.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-sm text-gray-700">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>{" "}
      {!submitted && (
        <div className="mt-6">
          <Button onClick={handleSubmit} size="lg" className="w-full sm:w-auto">
            Submit Reading Test
          </Button>
        </div>
      )}
    </div>
  );
}
