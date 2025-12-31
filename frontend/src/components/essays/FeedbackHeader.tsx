import { motion } from 'framer-motion';
import { Award, Sparkles, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FeedbackHeaderProps {
  estimatedBandScore: number;
  overallScore: number;
  aiModel: string;
  processingTimeMs: number;
}

export function FeedbackHeader({
  estimatedBandScore,
  overallScore,
  aiModel,
  processingTimeMs,
}: FeedbackHeaderProps) {
  const [displayScore, setDisplayScore] = useState(0);

  // Animate score count-up
  useEffect(() => {
    let start = 0;
    const end = estimatedBandScore;
    const duration = 1500; // 1.5 seconds
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [estimatedBandScore]);

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return 'from-emerald-400 to-green-500';
    if (score >= 7.0) return 'from-green-400 to-emerald-500';
    if (score >= 6.0) return 'from-blue-400 to-indigo-500';
    if (score >= 5.0) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-orange-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 mb-8"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,white)]" />
      
      {/* Floating glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
        {/* Score Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <motion.div
              className={`w-32 h-32 rounded-full bg-gradient-to-br ${getScoreColor(estimatedBandScore)} flex items-center justify-center shadow-2xl`}
              animate={{
                boxShadow: [
                  '0 20px 60px rgba(0,0,0,0.3)',
                  '0 25px 70px rgba(255,255,255,0.4)',
                  '0 20px 60px rgba(0,0,0,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-center">
                <motion.div className="text-5xl font-bold text-white">
                  {displayScore.toFixed(1)}
                </motion.div>
                <div className="text-xs text-white/80 font-medium uppercase tracking-wider">
                  Band Score
                </div>
              </div>
            </motion.div>
            
            {/* Decorative ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 text-white/80 text-sm mb-2 justify-center lg:justify-start"
          >
            <Sparkles className="w-4 h-4" />
            <span>Chấm bởi AI</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl lg:text-4xl font-bold text-white mb-3"
          >
            Kết quả chấm bài Writing
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-lg mb-4"
          >
            Phân tích chi tiết theo 4 tiêu chí IELTS
          </motion.p>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
              <Award className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">
                Overall: <span className="font-semibold">{overallScore.toFixed(1)}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
              <Sparkles className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">{aiModel}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg">
              <Clock className="w-4 h-4 text-white/80" />
              <span className="text-sm text-white/90">
                Chấm trong {(processingTimeMs / 1000).toFixed(1)}s
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
