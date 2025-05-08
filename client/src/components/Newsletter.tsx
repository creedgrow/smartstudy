import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }
    
    if (!agreedToTerms) {
      setMessage('Please agree to receive educational content.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await apiRequest('POST', '/api/newsletter', { email, agreedToTerms });
      setEmail('');
      setAgreedToTerms(false);
      setMessage('Thank you for subscribing to our newsletter!');
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-2xl font-bold text-white mb-4">Join Our Newsletter</h2>
              <p className="text-primary-100 mb-6">
                Get weekly study tips, new resources, and motivational content delivered to your inbox.
              </p>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full px-4 py-3 border-0 focus:ring-2 focus:ring-white rounded-lg" 
                    placeholder="Your email address"
                  />
                </div>
                <div className="flex items-start">
                  <input 
                    id="terms" 
                    name="terms" 
                    type="checkbox" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="h-5 w-5 text-primary border-0 rounded focus:ring-white mt-1"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-primary-100">
                    I agree to receive educational content and occasional updates.
                  </label>
                </div>
                {message && (
                  <div className={`text-sm ${message.includes('Thank you') ? 'text-green-100' : 'text-red-100'}`}>
                    {message}
                  </div>
                )}
                <div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-white text-primary hover:bg-primary-50 font-medium rounded-lg transition"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
              </form>
            </div>
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=1000" 
                alt="Student studying at desk" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
