import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function PlacementTest() {
  const [active, setActive] = useState<"listening" | "reading">("listening");

  // Listening state
  const [listeningAnswer, setListeningAnswer] = useState("");
  const listeningPrompt = "The quick brown fox jumps over the lazy dog.";

  // Reading state (simple multiple choice)
  const readingPassage = `
  Tom is a student who likes reading. He has two books. One book is about animals and the other is about space.
  `;
  const readingQuestions = [
    {
      id: 1,
      question: "What does Tom like?",
      options: ["Cooking", "Reading", "Sleeping"],
      answer: 1,
    },
    {
      id: 2,
      question: "One of Tom's books is about",
      options: ["Cars", "Animals", "Music"],
      answer: 1,
    },
  ];
  const [readingAnswers, setReadingAnswers] = useState<
    Record<number, number | null>
  >(() => ({}));

  const playAudio = () => {
    const utter = new SpeechSynthesisUtterance(listeningPrompt);
    utter.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
    toast.info("🔊 Playing audio...", { duration: 1500 });
  };

  const checkListening = () => {
    const normalize = (s: string) => s.trim().toLowerCase();
    if (normalize(listeningAnswer) === normalize(listeningPrompt)) {
      toast.success("🎉 Listening: Perfect match!");
    } else {
      toast.error("Not exact. Try again or listen more closely.");
    }
  };

  const setReadingAnswer = (qId: number, optionIndex: number) => {
    setReadingAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const checkReading = () => {
    const total = readingQuestions.length;
    let correct = 0;
    for (const q of readingQuestions) {
      const given = readingAnswers[q.id];
      if (typeof given === "number" && given === q.answer) correct++;
    }
    toast("Reading: You got " + correct + " / " + total);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Placement Test (Listening & Reading)
      </h1>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActive("listening")}
          className={`px-4 py-2 rounded-md ${
            active === "listening" ? "bg-blue-600 text-white" : "border"
          }`}
        >
          Listening
        </button>
        <button
          onClick={() => setActive("reading")}
          className={`px-4 py-2 rounded-md ${
            active === "reading" ? "bg-blue-600 text-white" : "border"
          }`}
        >
          Reading
        </button>
      </div>

      {active === "listening" ? (
        <section className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Listening</h2>
          <p className="text-gray-700 mb-3">
            Listen to the sentence and type what you hear.
          </p>

          <div className="flex items-center gap-3 mb-4">
            <Button onClick={playAudio}>Play</Button>
            <Button
              onClick={() => {
                setListeningAnswer("");
                toast("Cleared");
              }}
              variant="outline"
            >
              Clear
            </Button>
          </div>

          <Input
            value={listeningAnswer}
            onChange={(e) => setListeningAnswer(e.target.value)}
            placeholder="Type what you heard..."
          />

          <div className="mt-4">
            <Button onClick={checkListening}>Check</Button>
          </div>
        </section>
      ) : (
        <section className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Reading</h2>
          <p className="text-gray-700 mb-4">
            Read the short passage and answer the questions.
          </p>

          <div className="mb-4 p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-800 whitespace-pre-line">
              {readingPassage}
            </p>
          </div>

          <div className="space-y-4">
            {readingQuestions.map((q) => (
              <div key={q.id} className="p-3 border rounded">
                <p className="font-medium">{q.question}</p>
                <div className="mt-2 space-y-2">
                  {q.options.map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={readingAnswers[q.id] === idx}
                        onChange={() => setReadingAnswer(q.id, idx)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button onClick={checkReading}>Submit Reading</Button>
          </div>
        </section>
      )}
    </div>
  );
}
