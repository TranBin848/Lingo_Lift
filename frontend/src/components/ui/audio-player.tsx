import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

interface AudioPlayerProps {
  text: string;
  disabled?: boolean;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export default function AudioPlayer({
  text,
  disabled = false,
  onPlayStateChange,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Estimate duration based on text length (rough approximation)
  const estimateDuration = (text: string) => {
    const wordsPerMinute = 150;
    const words = text.split(" ").length;
    return (words / wordsPerMinute) * 60;
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = () => {
    if (disabled) return;

    // Stop any existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.volume = isMuted ? 0 : volume;

    utteranceRef.current = utterance;
    const estimatedDuration = estimateDuration(text);
    setDuration(estimatedDuration);
    setCurrentTime(0);

    utterance.onstart = () => {
      setIsPlaying(true);
      onPlayStateChange?.(true);

      // Simulate progress
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= estimatedDuration) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return estimatedDuration;
          }
          return prev + 0.1;
        });
      }, 100);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
      setCurrentTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
      setCurrentTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    onPlayStateChange?.(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleSkipBackward = () => {
    // For speech synthesis, we restart from beginning
    // (true time manipulation isn't available with Web Speech API)
    handlePause();
    setCurrentTime(0);
  };

  const handleSkipForward = () => {
    // For speech synthesis, we can't truly skip forward
    // So we'll just restart
    handlePause();
    setCurrentTime(0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);

    // Update current utterance if playing
    if (utteranceRef.current && isPlaying) {
      window.speechSynthesis.cancel();
      handlePlay();
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    // Update current utterance if playing
    if (utteranceRef.current && isPlaying) {
      window.speechSynthesis.cancel();
      handlePlay();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Progress bar */}
      <div className="mb-3">
        <div className="relative h-1.5 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        {/* Empty space for balance */}
        <div className="w-32"></div>

        {/* Playback controls - centered */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipBackward}
            disabled={disabled || !isPlaying}
            className="h-9 w-9 hover:bg-gray-200"
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          {isPlaying ? (
            <Button
              variant="default"
              size="icon"
              onClick={handlePause}
              disabled={disabled}
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700"
            >
              <Pause className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="icon"
              onClick={handlePlay}
              disabled={disabled}
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700"
            >
              <Play className="h-5 w-5 ml-0.5" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipForward}
            disabled={disabled || !isPlaying}
            className="h-9 w-9 hover:bg-gray-200"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Volume control - right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            disabled={disabled}
            className="h-9 w-9 hover:bg-gray-200"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            disabled={disabled}
            className="w-20 h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
