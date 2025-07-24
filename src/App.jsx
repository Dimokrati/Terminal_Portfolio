import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import Terminal from './components/Terminal';
import { Loader } from 'lucide-react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (replace with your actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds for demonstration

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen relative z-0 bg-black/90 flex items-center justify-center">
        <Loader className="relative z-10 h-12 w-12 animate-spin text-[#c5df67]" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black/90 text-green-400 font-mono">
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col lg:flex-row h-screen">
              <div className="w-full lg:w-1/4 
                              h-[100px] md:h-[150px] lg:h-full
                              border-b lg:border-b-0 lg:border-r 
                              border-gray-700">
                <UserProfile className="scale-90 md:scale-95 lg:scale-100" />
              </div>

              <div className="w-full lg:w-3/4 
                              h-[calc(100%-100px)] md:h-[calc(100%-150px)] lg:h-full">
                <Terminal />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
