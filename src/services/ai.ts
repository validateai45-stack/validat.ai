import { ValidationReport } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Helper function to return mock data if API fails or key is missing
const getMockData = async (idea: string): Promise<ValidationReport> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isTech = idea.toLowerCase().includes('app') || idea.toLowerCase().includes('ai') || idea.toLowerCase().includes('platform');
      
      resolve({
        marketDemand: {
          level: isTech ? 'High' : 'Medium',
          explanation: "There is a growing trend in this sector, with users actively seeking streamlined solutions to this specific problem."
        },
        growthPotential: {
          level: 'High',
          explanation: "Highly scalable. Once the core infrastructure is built, expanding to new user bases requires marginal additional cost."
        },
        monetization: {
          level: 'Medium',
          explanation: "Users are willing to pay, but establishing initial trust is required before converting to premium tiers.",
          models: ['Freemium Subscription', 'B2B Enterprise Licensing', 'Pay-per-use API']
        },
        competition: {
          level: 'High',
          explanation: "The market is somewhat saturated with legacy players, but there is a clear gap for a modern, UX-focused alternative."
        },
        feasibility: {
          level: 'Medium',
          explanation: "Requires moderate technical effort and initial capital for development, but no unproven technology is needed."
        },
        overallScore: isTech ? 'High' : 'Medium',
        suggestions: [
          "Focus on a hyper-specific niche for your initial launch to build a passionate early adopter base.",
          "Implement a viral loop or referral system early on to lower customer acquisition costs.",
          "Consider offering a 'Done-For-You' concierge onboarding for your first 50 high-ticket customers."
        ],
        insights: {
          targetAudience: "Tech-savvy professionals aged 25-45, likely working in mid-sized modern enterprises or startups.",
          mvpFeatures: [
            "Core problem-solving workflow",
            "Basic user authentication & profiles",
            "One-click export/sharing functionality"
          ],
          nextSteps: [
            "Create a high-fidelity landing page to collect emails.",
            "Conduct 10-15 user interviews with your exact target demographic.",
            "Build a clickable Figma prototype before writing any code."
          ]
        }
      });
    }, 3500); // Simulate AI thinking time
  });
};

export const analyzeIdea = async (idea: string): Promise<ValidationReport> => {
  // Check if we have a real API key configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_API_KEY') {
    console.log("No Gemini API key found. Falling back to mock data.");
    return getMockData(idea);
  }

  try {
    const prompt = `You are an expert startup validator and venture capitalist. Analyse the user's startup idea and output a JSON object strictly matching this structure:
    {
      "marketDemand": { "level": "Low" | "Medium" | "High", "explanation": "2-3 lines explaining demand" },
      "growthPotential": { "level": "Low" | "Medium" | "High", "explanation": "Explain scalability" },
      "monetization": { "level": "Low" | "Medium" | "High", "explanation": "Revenue potential", "models": ["Model 1", "Model 2"] },
      "competition": { "level": "Low" | "Medium" | "High", "explanation": "Competitor landscape" },
      "feasibility": { "level": "Low" | "Medium" | "High", "explanation": "Tech/cost/time difficulty" },
      "overallScore": "Low" | "Medium" | "High",
      "suggestions": ["Actionable tip 1", "Actionable tip 2", "Actionable tip 3"],
      "insights": {
        "targetAudience": "Specific demographic",
        "mvpFeatures": ["Feature 1", "Feature 2", "Feature 3"],
        "nextSteps": ["Step 1", "Step 2", "Step 3"]
      }
    }
    Ensure the response is purely valid JSON.
    
    Idea to analyse: ${idea}`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch from Gemini');
    }

    // Parse the JSON string returned by Gemini into our TypeScript interface
    const jsonString = data.candidates[0].content.parts[0].text;
    const report: ValidationReport = JSON.parse(jsonString);
    return report;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    console.warn("Falling back to mock data due to API error.");
    return getMockData(idea);
  }
};
