export type ScoreLevel = 'Low' | 'Medium' | 'High';

export interface ValidationMetric {
  level: ScoreLevel;
  explanation: string;
}

export interface ValidationReport {
  marketDemand: ValidationMetric;
  growthPotential: ValidationMetric;
  monetization: ValidationMetric & { models: string[] };
  competition: ValidationMetric;
  feasibility: ValidationMetric;
  overallScore: ScoreLevel;
  suggestions: string[];
  insights: {
    targetAudience: string;
    mvpFeatures: string[];
    nextSteps: string[];
  };
}
