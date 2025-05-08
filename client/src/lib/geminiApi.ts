import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface AIStudyRecommendation {
  sessionStructure: string[];
  techniques: string[];
  environment: string[];
  motivationalQuote: string;
  aiGeneratedInsights: string;
  customizedTips: string[];
}

export async function generateAIRecommendations(
  learningStyle: string,
  attentionSpan: number,
  studyTime: string,
  environment: string,
  interests: string[]
): Promise<AIStudyRecommendation> {
  try {
    // Create a detailed prompt for the AI
    const prompt = `
    Generate personalized study recommendations for a student with the following preferences:
    
    - Learning Style: ${learningStyle || 'Not specified'}
    - Attention Span: ${attentionSpan || 'Not specified'} minutes
    - Best Study Time: ${studyTime || 'Not specified'}
    - Preferred Environment: ${environment || 'Not specified'}
    - Areas of Interest: ${interests.join(', ') || 'Not specified'}
    
    Please respond with a JSON object that contains:
    
    1. sessionStructure: Array of 4 strings with recommended study session structure
    2. techniques: Array of 4 strings with study techniques that match their learning style
    3. environment: Array of 3 strings with environment recommendations
    4. motivationalQuote: A single motivational quote tailored to their style
    5. aiGeneratedInsights: A paragraph with personalized insights
    6. customizedTips: Array of 3 strings with specific tips for their preferences
    
    Format each technique and tip with some basic HTML formatting like <strong></strong> for emphasis.
    Keep all responses concise and actionable.
    `;

    // Generate content with the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    try {
      // Extract the JSON part from the response text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in the response');
      }
      
      const jsonString = jsonMatch[0];
      const recommendations = JSON.parse(jsonString) as AIStudyRecommendation;
      
      return recommendations;
    } catch (jsonError) {
      console.error('Error parsing AI response as JSON:', jsonError);
      
      // Fallback with structured data if JSON parsing fails
      return {
        sessionStructure: [
          "Unable to generate personalized session structure",
          "Please try again later",
          "Our AI is currently learning",
          "Consider using the manual recommendation tool instead"
        ],
        techniques: [
          "Unable to generate personalized techniques",
          "Please try again later",
          "Our AI is currently learning",
          "Consider using the manual recommendation tool instead"
        ],
        environment: [
          "Unable to generate personalized environment recommendations",
          "Please try again later",
          "Consider using the manual recommendation tool instead"
        ],
        motivationalQuote: "The best way to predict the future is to create it. - Abraham Lincoln",
        aiGeneratedInsights: "We're experiencing difficulty generating personalized insights at the moment. Please try again later.",
        customizedTips: [
          "Unable to generate personalized tips",
          "Please try again later",
          "Consider using the manual recommendation tool instead"
        ]
      };
    }
    
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    throw error;
  }
}