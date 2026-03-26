import React from 'react';
import { motion } from 'framer-motion';
import { ValidationReport } from '../types';
import { MetricCard } from './MetricCard';
import { Lightbulb, Target, Rocket, ListChecks, Download, Share2, DollarSign } from 'lucide-react';

interface ReportViewProps {
  report: ValidationReport;
  idea: string;
  onReset: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, idea, onReset }) => {
  return (
    <div className="w-full max-w-6xl mx-auto pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />
        <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-4">Analysis Complete</h2>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Overall Potential: <span className="text-gradient-gold">{report.overallScore}</span>
        </h1>
        <div className="glass-panel inline-block px-6 py-4 rounded-xl max-w-2xl text-left">
          <p className="text-gray-300 text-sm italic">"{idea}"</p>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <MetricCard title="Market Demand" metric={report.marketDemand} icon="demand" delay={0.1} />
        <MetricCard title="Growth Potential" metric={report.growthPotential} icon="growth" delay={0.2} />
        <MetricCard title="Competition" metric={report.competition} icon="competition" delay={0.3} />
        <MetricCard title="Feasibility" metric={report.feasibility} icon="feasibility" delay={0.4} />
        
        {/* Special Monetization Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-panel p-6 rounded-2xl md:col-span-2 lg:col-span-2"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-dark-800 rounded-lg border border-white/5">
                <DollarSign className="w-5 h-5 text-gold-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Monetization Strategy</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${report.monetization.level === 'High' ? 'bg-green-500/20 text-green-400 border-green-500/30' : report.monetization.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
              {report.monetization.level} Potential
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-4">{report.monetization.explanation}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {report.monetization?.models?.map((model, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-gold-500/10 border border-gold-500/20 text-gold-200 text-xs rounded-lg">
                {model}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Suggestions */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-2 glass-panel-gold p-8 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-gold-400" />
            <h3 className="text-2xl font-bold text-white">Strategic Suggestions</h3>
          </div>
          <ul className="space-y-4">
            {report.suggestions?.map((suggestion, idx) => (
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (idx * 0.1) }}
                key={idx} 
                className="flex items-start gap-3 bg-dark-900/50 p-4 rounded-xl border border-white/5"
              >
                <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold-400 text-xs font-bold">{idx + 1}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{suggestion}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Extra Insights */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-6"
        >
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-gold-400" />
              <h4 className="font-semibold text-white">Target Audience</h4>
            </div>
            <p className="text-sm text-gray-400">{report.insights?.targetAudience}</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-5 h-5 text-gold-400" />
              <h4 className="font-semibold text-white">MVP Features</h4>
            </div>
            <ul className="space-y-2">
              {report.insights?.mvpFeatures?.map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500/50" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="w-5 h-5 text-gold-400" />
              <h4 className="font-semibold text-white">Next Steps</h4>
            </div>
            <ul className="space-y-3">
              {report.insights?.nextSteps?.map((step, idx) => (
                <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-gold-500 font-mono text-xs mt-0.5">{idx + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex justify-center gap-4 mt-12"
      >
        <button 
          onClick={onReset}
          className="px-6 py-3 rounded-xl font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          Analyze Another Idea
        </button>
        <button className="px-6 py-3 rounded-xl font-medium text-dark-900 bg-gold-gradient hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <Download className="w-4 h-4" /> Export PDF
        </button>
      </motion.div>
    </div>
  );
};
