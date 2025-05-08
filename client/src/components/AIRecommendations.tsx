import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { AIStudyRecommendation } from '@/lib/geminiApi';

interface AIRecommendationsProps {
  learningStyle: string;
  attentionSpan: number;
  studyTime: string;
  environment: string;
  interests: string[];
}

export default function AIRecommendations({
  learningStyle,
  attentionSpan,
  studyTime,
  environment,
  interests,
}: AIRecommendationsProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<AIStudyRecommendation | null>(null);
  const [activeTab, setActiveTab] = useState<'structure' | 'techniques' | 'environment' | 'insights'>('structure');

  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      setError(null);
      
      try {
        // Request AI recommendations from the server
        const response = await apiRequest('POST', '/api/ai-recommendations', {
          learningStyle,
          attentionSpan,
          studyTime,
          environment,
          interests
        });
        
        setRecommendations(response);
      } catch (err) {
        console.error('Error fetching AI recommendations:', err);
        setError('Failed to generate AI recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchRecommendations();
  }, [learningStyle, attentionSpan, studyTime, environment, interests]);

  if (loading) {
    return (
      <div className="py-10 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Generating AI-powered recommendations...</p>
        <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 bg-red-50 rounded-xl p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!recommendations) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Your AI-Powered Study Recommendations</h3>
        <p className="text-primary-100">
          Personalized recommendations based on your learning style and preferences
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-4 px-4 text-center transition-colors ${
            activeTab === 'structure' 
              ? 'text-primary border-b-2 border-primary font-medium' 
              : 'text-gray-500 hover:text-primary hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('structure')}
        >
          Session Structure
        </button>
        <button
          className={`flex-1 py-4 px-4 text-center transition-colors ${
            activeTab === 'techniques' 
              ? 'text-primary border-b-2 border-primary font-medium' 
              : 'text-gray-500 hover:text-primary hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('techniques')}
        >
          Techniques
        </button>
        <button
          className={`flex-1 py-4 px-4 text-center transition-colors ${
            activeTab === 'environment' 
              ? 'text-primary border-b-2 border-primary font-medium' 
              : 'text-gray-500 hover:text-primary hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('environment')}
        >
          Environment
        </button>
        <button
          className={`flex-1 py-4 px-4 text-center transition-colors ${
            activeTab === 'insights' 
              ? 'text-primary border-b-2 border-primary font-medium' 
              : 'text-gray-500 hover:text-primary hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
      </div>
      
      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'structure' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Recommended Study Session Structure</h4>
            <ul className="space-y-3">
              {recommendations.sessionStructure.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{item}</p>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
              <p className="text-primary-700 italic">"{recommendations.motivationalQuote}"</p>
            </div>
          </div>
        )}
        
        {activeTab === 'techniques' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Recommended Study Techniques</h4>
            <ul className="space-y-3">
              {recommendations.techniques.map((technique, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div dangerouslySetInnerHTML={{ __html: technique }} />
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {activeTab === 'environment' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Recommended Study Environment</h4>
            <ul className="space-y-3">
              {recommendations.environment.map((env, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div dangerouslySetInnerHTML={{ __html: env }} />
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {activeTab === 'insights' && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">AI-Generated Insights</h4>
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <p className="text-gray-700">{recommendations.aiGeneratedInsights}</p>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Customized Tips</h4>
            <ul className="space-y-3">
              {recommendations.customizedTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div dangerouslySetInnerHTML={{ __html: tip }} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Powered by Google Gemini AI
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm text-primary hover:bg-gray-100 rounded-lg transition"
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}