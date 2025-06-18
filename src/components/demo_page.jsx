import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Monitor, MessageCircle } from 'lucide-react';

const DemoPage = () => {
  useEffect(() => {
    // Auto-trigger the Yuno demo when page loads
    setTimeout(() => {
      if (window.showYunoDemo) {
        window.showYunoDemo();
      }
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden pt-24">
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-full animate-pulse blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-300/20 rounded-full animate-pulse delay-1000 blur-xl" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 mb-6">
            <Play className="w-4 h-4" />
            Interactive Demo
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            See Yuno in
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Action</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Watch how Yuno transforms a regular website into an intelligent conversation platform
          </p>
        </div>

        {/* Demo Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-3xl shadow-2xl p-8 mb-12">
            {/* Browser Mockup */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-sm text-gray-600 dark:text-gray-300">
                  https://demo-bike-store.com
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 min-h-[400px] relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">EcoBikes Store</h2>
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Yuno Active
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Premium electric bikes for urban commuting and weekend adventures...
                </p>

                {/* Demo Instructions */}
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Interactive Demo Started!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Look for the Yuno chatbot in the bottom-right corner of this page. 
                    Click it to start a conversation and see how it works!
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      💡 <strong>Try asking:</strong> "What are your best electric bikes?" or "Do you offer financing?"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Features */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Smart Responses",
                  description: "AI understands context and provides relevant answers",
                  icon: "🧠"
                },
                {
                  title: "Lead Capture",
                  description: "Automatically captures visitor information when they show interest",
                  icon: "📝"
                },
                {
                  title: "Real-time Learning",
                  description: "Continuously improves based on conversations",
                  icon: "⚡"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Add Yuno to Your Website?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join our beta program and get personalized setup within 48 hours
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/#pilot-program"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Join Beta Program
                </Link>
                <Link
                  to="/customizer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 dark:bg-gray-700/30 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-gray-600/40 font-semibold rounded-xl transition-all duration-300"
                >
                  <Monitor className="w-5 h-5 mr-2" />
                  Customize Widget
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;