import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import pronunciationQuestions from "../../mocks/pronunciationQuestions";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SpeechRecognitionLike {
  start: () => void;
  stop?: () => void;
  onresult?: (ev: unknown) => void;
  onerror?: (ev: unknown) => void;
  onend?: () => void;
  lang?: string;
  interimResults?: boolean;
  maxAlternatives?: number;
}

function normalizeText(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s']/gi, "")
    .trim()
    .toLowerCase();
}

function wordOverlapScore(target: string, actual: string) {
  const t = normalizeText(target).split(/\s+/).filter(Boolean);
  const a = normalizeText(actual).split(/\s+/).filter(Boolean);
  if (t.length === 0) return 0;
  let match = 0;
  for (const w of t) if (a.includes(w)) match++;
  return match / t.length;
}

interface PronunciationSectionProps {
  onComplete?: (score: { correct: number; total: number }) => void;
}

export default function PronunciationSection({
  onComplete,
}: PronunciationSectionProps) {
  // Pronunciation flow: store transcripts and selected options per question id
  const [transcripts, setTranscripts] = useState<Record<number, string>>({});
  const [linkingAnswers, setLinkingAnswers] = useState<Record<number, number>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{
    correct: number;
    total: number;
    advice: string;
  } | null>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [recognizing, setRecognizing] = useState(false);
  const [activeQId, setActiveQId] = useState<number | null>(null);

  useEffect(() => {
    // initialize SpeechRecognition if available
    const ctor = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (ctor) {
      const r = new ctor();
      r.lang = "en-US";
      r.interimResults = false;
      // set maxAlternatives if supported
      if ("maxAlternatives" in r) (r as any).maxAlternatives = 1;
      r.onresult = (ev: any) => {
        const text = ev?.results?.[0]?.[0]?.transcript || "";
        if (activeQId !== null) {
          setTranscripts((prev) => ({ ...prev, [activeQId]: text }));
        }
      };
      r.onerror = (ev: any) => {
        console.warn("Speech recognition error", ev);
        toast.error("Speech recognition error or permission denied");
        setRecognizing(false);
      };
      r.onend = () => setRecognizing(false);
      // assign with a safe cast to our local interface
      recognitionRef.current = r as unknown as SpeechRecognitionLike;
    }
  }, [activeQId]);

  const playPrompt = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    toast.info("🔊 Playing prompt...");
  };

  const startListening = (qId: number) => {
    const r = recognitionRef.current;
    setActiveQId(qId);
    if (r) {
      try {
        r.start();
        setRecognizing(true);
      } catch (e) {
        console.warn(e);
        toast("Could not start recognition");
      }
    } else {
      toast(
        "Speech recognition not supported in this browser. You can type your attempt instead."
      );
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    const total = pronunciationQuestions.length;

    pronunciationQuestions.forEach((q) => {
      if (q.type === "word" || q.type === "sentence") {
        const expected = q.type === "word" ? q.word : q.sentence;
        const actual = transcripts[q.id] || "";
        const score = wordOverlapScore(expected, actual);
        if (score >= 0.6) correct++;
      } else if (q.type === "linking") {
        const given = linkingAnswers[q.id];
        if (given === q.answer) correct++;
      }
    });

    const percentage = (correct / total) * 100;
    let advice = "";
    if (percentage >= 80) {
      advice = "Excellent pronunciation! You have a strong foundation.";
    } else if (percentage >= 60) {
      advice = "Good effort! Keep practicing to improve clarity.";
    } else {
      advice = "Practice more with listening and repeating exercises.";
    }

    setResults({ correct, total, advice });
    setSubmitted(true);
    toast.success("Pronunciation test submitted!");

    // Notify parent component
    if (onComplete) {
      onComplete({ correct, total });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Pronunciation</h2>

      <p className="mb-4 text-sm text-gray-600">
        Answer all 7 pronunciation questions below, then submit your test at the
        bottom.
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
        {pronunciationQuestions.map((q, idx) => (
          <div
            key={q.id}
            className="pb-6 border-b border-gray-100 last:border-b-0"
          >
            <div className="font-semibold text-sm text-gray-500 mb-2">
              Question {idx + 1} / {pronunciationQuestions.length}
            </div>

            {q.type === "word" && (
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Listen and repeat the word
                </h3>
                <p className="mb-3 text-gray-700 font-medium">{q.word}</p>
                <div className="flex gap-2 mb-3">
                  <Button size="sm" onClick={() => playPrompt(q.word)}>
                    Play
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startListening(q.id)}
                    disabled={recognizing}
                  >
                    {recognizing && activeQId === q.id
                      ? "Listening..."
                      : "Record Answer"}
                  </Button>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Transcript:{" "}
                  {transcripts[q.id] || (
                    <em className="text-gray-400">(not recorded)</em>
                  )}
                </p>
                <Input
                  placeholder="Or type your answer here..."
                  value={transcripts[q.id] || ""}
                  onChange={(e) =>
                    setTranscripts((prev) => ({
                      ...prev,
                      [q.id]: e.target.value,
                    }))
                  }
                  disabled={submitted}
                />
              </div>
            )}

            {q.type === "linking" && (
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Listen to the passage and pick the linked words
                </h3>
                <p className="mb-3 text-gray-700">{q.passage}</p>
                <div className="flex gap-2 mb-3">
                  <Button size="sm" onClick={() => playPrompt(q.passage)}>
                    Play Passage
                  </Button>
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <label key={optIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`linking-${q.id}`}
                        checked={linkingAnswers[q.id] === optIdx}
                        onChange={() =>
                          setLinkingAnswers((prev) => ({
                            ...prev,
                            [q.id]: optIdx,
                          }))
                        }
                        disabled={submitted}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {q.type === "sentence" && (
              <div>
                <h3 className="text-md font-semibold mb-2">
                  Listen and read the sentence aloud
                </h3>
                <p className="mb-3 text-gray-700 font-medium">{q.sentence}</p>
                <div className="flex gap-2 mb-3">
                  <Button size="sm" onClick={() => playPrompt(q.sentence)}>
                    Play
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startListening(q.id)}
                    disabled={recognizing}
                  >
                    {recognizing && activeQId === q.id
                      ? "Listening..."
                      : "Record Answer"}
                  </Button>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Transcript:{" "}
                  {transcripts[q.id] || (
                    <em className="text-gray-400">(not recorded)</em>
                  )}
                </p>
                <Input
                  placeholder="Or type your answer here..."
                  value={transcripts[q.id] || ""}
                  onChange={(e) =>
                    setTranscripts((prev) => ({
                      ...prev,
                      [q.id]: e.target.value,
                    }))
                  }
                  disabled={submitted}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit button at the bottom */}
      <div className="mt-6 flex gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit}>Submit Pronunciation Test</Button>
        ) : (
          <Button variant="outline" onClick={() => window.location.reload()}>
            Restart Test
          </Button>
        )}
      </div>
    </div>
  );
}
