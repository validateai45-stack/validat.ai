import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, BrainCircuit, AlertTriangle } from 'lucide-react';
import { analyzeIdea } from './services/ai';
import { ValidationReport } from './types';
import { ReportView } from './components/ReportView';

const EXAMPLE_IDEAS = [
  "AI-powered meal planning based on blood test results",
  "Marketplace connecting local chefs with private dinner hosts",
  "B2B SaaS helping independent gyms automate member retention"
];

function App() {
  const [idea, setIdea] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<ValidationReport | null>(null);

  // Check if we are using the placeholder API key
  const isDemoMode = !import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'YOUR_API_KEY';

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setIsAnalyzing(true);
    // Call the AI service (will use mock data if in demo mode, or real Gemini API if key is present)
    const result = await analyzeIdea(idea);
    setReport(result);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setReport(null);
    setIdea('');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 font-sans relative overflow-hidden selection:bg-gold-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-500/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="relative z-20 bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-400 text-sm py-2.5 px-4 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span><strong>Demo Mode:</strong> You are seeing mock data. Open the <code>.env</code> file and replace <code>YOUR_API_KEY</code> with your real Gemini API key to enable live AI analysis.</span>
        </div>
      )}

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/5 bg-dark-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold-gradient flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Sparkles className="w-4 h-4 text-dark-900" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Validator<span className="text-gold-500">AI</span></span>
          </div>
          <div className="flex gap-4">
            <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Login</button>
            <button className="text-sm font-medium px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isAnalyzing && !report && (
            <motion.div 
              key="input-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-3xl text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4" />
                Powered by Gemini 2.5 Flash
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
                Validate Your <br/>
                <span className="text-gradient-gold">Startup Idea</span> in Seconds 🚀
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Stop guessing. Get instant, data-driven feedback on market demand, competition, and feasibility before you write a single line of code.
              </p>

              <form onSubmit={handleAnalyze} className="relative group">
                <div className="absolute -inset-1 bg-gold-gradient rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <div className="relative flex flex-col md:flex-row gap-4 bg-dark-800 p-2 rounded-2xl border border-white/10 shadow-2xl">
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe your startup idea... (e.g., An AI-powered platform that helps freelance designers automate client onboarding)"
                    className="w-full bg-transparent text-white placeholder-gray-500 px-6 py-4 outline-none resize-none h-32 md:h-auto min-h-[60px] text-lg"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={!idea.trim()}
                    className="md:w-auto w-full px-8 py-4 bg-gold-gradient text-dark-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.3)] whitespace-nowrap"
                  >
                    Analyze Idea
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Example Ideas Section */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex flex-col items-center gap-3"
              >
                <p className="text-sm text-gray-500">Not sure where to start? Try an example:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {EXAMPLE_IDEAS.map((example, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setIdea(example)}
                      className="text-xs md:text-sm text-gray-400 bg-white/5 hover:bg-gold-500/10 hover:text-gold-300 border border-white/5 hover:border-gold-500/30 px-4 py-2 rounded-full transition-all duration-300"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </motion.div>
              
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Instant Results</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Detailed Reports</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Actionable Steps</span>
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              key="loading-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="relative w-32 h-32 mb-8">
                <motion.div 
                  className="absolute inset-0 border-4 border-gold-500/20 rounded-full"
                />
                <motion.div 
                  className="absolute inset-0 border-4 border-gold-500 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit className="w-10 h-10 text-gold-400 animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Analyzing your idea...</h2>
              <p className="text-gray-400">Evaluating market demand, competition, and feasibility</p>
            </motion.div>
          )}

          {report && !isAnalyzing && (
            <motion.div
              key="report-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <ReportView report={report} idea={idea} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
