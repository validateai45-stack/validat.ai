import React from 'react';
import { motion } from 'framer-motion';
import { ValidationMetric } from '../types';
import { TrendingUp, Users, DollarSign, Swords, Hammer } from 'lucide-react';

interface MetricCardProps {
  title: string;
  metric: ValidationMetric;
  icon: 'demand' | 'growth' | 'money' | 'competition' | 'feasibility';
  delay?: number;
}

const icons = {
  demand: <Users className="w-5 h-5 text-gold-400" />,
  growth: <TrendingUp className="w-5 h-5 text-gold-400" />,
  money: <DollarSign className="w-5 h-5 text-gold-400" />,
  competition: <Swords className="w-5 h-5 text-gold-400" />,
  feasibility: <Hammer className="w-5 h-5 text-gold-400" />,
};

const getScoreColor = (level: string, isCompetition: boolean = false) => {
  if (isCompetition) {
    if (level === 'Low') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (level === 'Medium') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  }
  
  if (level === 'High') return 'bg-green-500/20 text-green-400 border-green-500/30';
  if (level === 'Medium') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  return 'bg-red-500/20 text-red-400 border-red-500/30';
};

const getProgressWidth = (level: string) => {
  if (level === 'High') return 'w-full';
  if (level === 'Medium') return 'w-2/3';
  return 'w-1/3';
};

export const MetricCard: React.FC<MetricCardProps> = ({ title, metric, icon, delay = 0 }) => {
  const isComp = icon === 'competition';
  const badgeColor = getScoreColor(metric.level, isComp);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-panel p-6 rounded-2xl hover:border-gold-500/40 transition-colors duration-300 group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-dark-800 rounded-lg border border-white/5 group-hover:border-gold-500/30 transition-colors">
            {icons[icon]}
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeColor}`}>
          {metric.level}
        </span>
      </div>
      
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        {metric.explanation}
      </p>

      <div className="w-full bg-dark-800 rounded-full h-1.5 mb-1 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: metric.level === 'High' ? '100%' : metric.level === 'Medium' ? '66%' : '33%' }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className={`h-1.5 rounded-full ${isComp ? (metric.level === 'High' ? 'bg-red-500' : metric.level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500') : (metric.level === 'High' ? 'bg-green-500' : metric.level === 'Medium' ? 'bg-yellow-500' : 'bg-red-500')}`}
        />
      </div>
    </motion.div>
  );
};
