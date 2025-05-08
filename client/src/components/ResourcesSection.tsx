import { Link } from 'wouter';

export default function ResourcesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Resources</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our curated collection of resources to enhance your study experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Resource category 1 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <img 
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
              alt="Study technique resources" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Study Techniques</h3>
              <p className="text-gray-600 mb-4">
                Learn about proven study methods like spaced repetition, retrieval practice, and the Feynman Technique.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">12 Resources</span>
                <Link href="#">
                  <a className="text-primary hover:text-primary/90 font-medium flex items-center">
                    Explore
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Resource category 2 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <img 
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
              alt="Time management resources" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Time Management</h3>
              <p className="text-gray-600 mb-4">
                Discover tools and strategies to organize your schedule, prioritize tasks, and avoid procrastination.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">9 Resources</span>
                <Link href="#">
                  <a className="text-primary hover:text-primary/90 font-medium flex items-center">
                    Explore
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Resource category 3 */}
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500" 
              alt="Study environment resources" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Focus & Environment</h3>
              <p className="text-gray-600 mb-4">
                Learn how to create an optimal study space and maintain concentration during study sessions.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">7 Resources</span>
                <Link href="#">
                  <a className="text-primary hover:text-primary/90 font-medium flex items-center">
                    Explore
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="#">
            <a className="inline-flex items-center px-6 py-3 border border-primary text-primary bg-white hover:bg-primary-50 rounded-lg transition duration-150 ease-in-out font-medium">
              View All Resources
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
