import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface AIStudyRecommendation {
  sessionStructure: string[];
  techniques: string[];
  environment: string[];
  motivationalQuote: string;
  aiGeneratedInsights: string;
  customizedTips: string[];
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for newsletter subscription
  app.post('/api/newsletter', async (req, res) => {
    try {
      const { email, name, resourceInterests, skillLevel, agreedToTerms } = req.body;
      
      // Validate input
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Valid email is required' });
      }
      
      if (!agreedToTerms) {
        return res.status(400).json({ message: 'You must agree to receive our newsletter' });
      }
      
      // Log subscription info (in a real application, this would be saved to a database)
      console.log('New newsletter subscription:', {
        email,
        name: name || 'Not provided',
        resourceInterests: resourceInterests || [],
        skillLevel: skillLevel || 'Not specified',
        subscribedAt: new Date().toISOString()
      });
      
      // Return success response
      return res.status(200).json({ 
        message: 'Successfully subscribed to newsletter',
        subscribed: true 
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return res.status(500).json({ message: 'Server error during subscription' });
    }
  });

  // API endpoint for AI-powered study recommendations
  app.post('/api/ai-recommendations', async (req: Request, res: Response) => {
    try {
      const { learningStyle, attentionSpan, studyTime, environment, interests } = req.body;
      
      // Create a detailed prompt for the AI
      const prompt = `
      Generate personalized study recommendations for a student with the following preferences:
      
      - Learning Style: ${learningStyle || 'Not specified'}
      - Attention Span: ${attentionSpan || 'Not specified'} minutes
      - Best Study Time: ${studyTime || 'Not specified'}
      - Preferred Environment: ${environment || 'Not specified'}
      - Areas of Interest: ${interests?.join(', ') || 'Not specified'}
      
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
      
      try {
        // Extract the JSON part from the response text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in the response');
        }
        
        const jsonString = jsonMatch[0];
        const recommendations = JSON.parse(jsonString) as AIStudyRecommendation;
        
        return res.status(200).json(recommendations);
      } catch (jsonError) {
        console.error('Error parsing AI response as JSON:', jsonError);
        
        // Fallback with structured data if JSON parsing fails
        return res.status(200).json({
          sessionStructure: [
            "Start with a 10-minute overview of the topic",
            "Break down complex concepts into smaller parts",
            "Practice with examples for 20-30 minutes",
            "Take a 5-minute break every 25 minutes"
          ],
          techniques: [
            "<strong>Active recall</strong>: Test yourself on the material rather than just re-reading it",
            "<strong>Spaced repetition</strong>: Review material at increasing intervals over time",
            "<strong>Visual mapping</strong>: Create mind maps to organize information visually",
            "<strong>Teach it</strong>: Explain concepts to someone else or pretend to teach"
          ],
          environment: [
            "<strong>Minimize distractions</strong>: Turn off notifications and find a quiet place",
            "<strong>Optimize your workspace</strong>: Ensure good lighting and comfortable seating",
            "<strong>Use background noise wisely</strong>: Try ambient sounds or music without lyrics"
          ],
          motivationalQuote: "The expert in anything was once a beginner. The secret of getting ahead is getting started.",
          aiGeneratedInsights: "Based on your preferences, you seem to benefit from structured learning environments with visual aids. Consider incorporating more diagrams and charts into your study materials, and try alternating between focused study sessions and physical activities to maintain energy levels.",
          customizedTips: [
            "<strong>Set specific goals</strong> for each study session to maintain focus",
            "<strong>Use color-coding</strong> in your notes to help organize information",
            "<strong>Try the Pomodoro technique</strong> with 25-minute focused sessions followed by 5-minute breaks"
          ]
        });
      }
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      return res.status(500).json({ message: 'Error generating AI recommendations' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
