import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Zap, Globe, BarChart3, Shield, Sparkles, Moon, Sun, Play, ArrowRight, Check, Star, Users, Clock, HeadphonesIcon, ChevronDown, ChevronUp, Quote, TrendingUp, Rocket, Target, Mail, Phone, MapPin, Send } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    // Apply theme to document
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Initialize theme
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// Animation Hook
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
};

// Neural Network Background Component
const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    let animationId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark 
          ? 'rgba(59, 130, 246, 0.8)' 
          : 'rgba(59, 130, 246, 0.6)';
        ctx.fill();
      });
      
      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = 0.4 * (1 - distance / 120);
            ctx.strokeStyle = isDark 
              ? `rgba(59, 130, 246, ${opacity})` 
              : `rgba(59, 130, 246, ${opacity * 0.7})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
    />
  );
};

// Enhanced Glass Container
const GlassContainer = ({ children, className = "", hover = true }) => {
  return (
    <div className={`
      bg-white/80 dark:bg-gray-800/80 
      backdrop-blur-xl 
      border border-white/30 dark:border-gray-600/30 
      rounded-2xl 
      shadow-2xl shadow-blue-500/10 dark:shadow-blue-400/20
      ${hover ? 'hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-3xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/30 transition-all duration-500' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Enhanced Animated Button
const AnimatedButton = ({ children, variant = "primary", className = "", disabled = false, ...props }) => {
  const baseClasses = "relative overflow-hidden transition-all duration-300 font-semibold rounded-full group disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-cyan-500 
      hover:from-blue-700 hover:to-cyan-600 
      text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/25
      transform hover:-translate-y-1 active:translate-y-0
      px-8 py-4
    `,
    secondary: `
      bg-white/20 dark:bg-gray-700/30 
      backdrop-blur-md border border-white/30 dark:border-gray-600/30
      text-gray-800 dark:text-white 
      hover:bg-white/30 dark:hover:bg-gray-600/40 
      hover:border-white/50 dark:hover:border-gray-500/50
      px-8 py-4
    `,
    ghost: `
      bg-transparent 
      text-gray-700 dark:text-gray-300 
      hover:text-blue-600 dark:hover:text-blue-400
      px-4 py-2
    `
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
};

// Enhanced Typing Animation
const TypingAnimation = ({ text, speed = 80, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}>|</span>
    </span>
  );
};

// Yuno Chat Demo Component
const YunoChatDemo = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    // Function to show Yuno demo
    const showYunoDemo = () => {
      // Check if Yuno widget exists
      const yunoWidget = document.querySelector('yuno-chat');
      if (yunoWidget) {
        // Trigger the chat to open
        const bubble = yunoWidget.shadowRoot?.querySelector('.bubble');
        if (bubble) {
          bubble.click();
        }
      } else {
        // Load Yuno script if not already loaded
        const existingScript = document.querySelector('script[src*="yuno-4.js"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = '/yuno-4.js'; // Assuming you'll serve this file from public folder
          script.setAttribute('site_id', 'yuno_demo');
          script.defer = true;
          document.head.appendChild(script);
          
          // Wait for script to load and then trigger
          script.onload = () => {
            setTimeout(() => {
              const yunoWidget = document.querySelector('yuno-chat');
              if (yunoWidget) {
                const bubble = yunoWidget.shadowRoot?.querySelector('.bubble');
                if (bubble) {
                  bubble.click();
                }
              }
            }, 500);
          };
        }
      }
    };

    // Add global function for demo trigger
    window.showYunoDemo = showYunoDemo;

    // Load Yuno script on page load
    if (!document.querySelector('script[src*="yuno-4.js"]')) {
      const script = document.createElement('script');
      script.src = '/yuno-4.js';
      script.setAttribute('site_id', 'yuno_demo');
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup
      delete window.showYunoDemo;
    };
  }, []);

  // Update theme when it changes
  useEffect(() => {
    const yunoWidget = document.querySelector('yuno-chat');
    if (yunoWidget && yunoWidget.updateTheme) {
      // If your widget has an updateTheme method
      yunoWidget.updateTheme(isDark ? 'dark' : 'light');
    } else if (yunoWidget) {
      // Or update via attribute
      yunoWidget.setAttribute('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  return null;
};

// Header Component - UPDATED
const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      fixed top-0 w-full z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg' 
        : 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-md'
      }
      border-b border-white/20 dark:border-gray-700/30
    `}>
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo - Make smaller on mobile */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img 
            src="/logo.svg" 
            alt="Yuno Logo" 
            className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
          />
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Yuno
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Features</a>
          <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">How it Works</a>
          <button onClick={() => window.showYunoDemo?.()} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Demo</button>
          <a 
            href="#pilot-program" 
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('pilot-program')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            Join Beta
          </a>
        </nav>

        {/* Mobile & Desktop Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-3 rounded-xl bg-white/20 dark:bg-gray-700/30 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/40 transition-all duration-300"
          >
            {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          
          {/* CTA Button - Responsive text */}
          <AnimatedButton 
            variant="secondary" 
            className="text-sm sm:text-base px-3 py-2 sm:px-8 sm:py-4"
            onClick={() => {
              document.getElementById('pilot-program')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            {/* Show different text on mobile vs desktop */}
            <span className="block sm:hidden">Join Beta</span>
            <span className="hidden sm:block">Join Beta Program</span>
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
};


// Enhanced Hero Section
const HeroSection = () => {
  const [ref, inView] = useInView();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <NeuralNetwork />
      
      <div ref={ref} className="container mx-auto pt-32 pb-20 relative z-10">
        <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mx-auto py-10">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
              <Sparkles className="w-4 h-4" />
              AI-Powered Website Conversations
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-600 dark:from-white dark:via-blue-200 dark:to-cyan-300 bg-clip-text text-transparent">
              Turn Website Visitors Into
            </span>
            <br />
            <TypingAnimation 
              text="Customers" 
              speed={120} 
              className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
            />
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-4xl mx-auto">
            Add a smart AI chatbot to your website in 15 minutes.<br />
            <span className="font-semibold">Capture leads, answer questions, and never lose a potential customer again.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <AnimatedButton 
              className="text-xl px-12 py-2"
              onClick={() => {
                document.getElementById('pilot-program')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Join Beta Program
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>
            <AnimatedButton variant="secondary" className="text-xl px-12 py-2" onClick={() => window.showYunoDemo?.()}>
              <Play className="w-6 h-6" />
              Watch Demo
            </AnimatedButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-medium">Free beta access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-medium">Personal setup included</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-medium">Limited spots available</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full opacity-20 animate-pulse blur-sm" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full opacity-20 animate-pulse delay-1000 blur-sm" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-300 rounded-full opacity-15 animate-pulse delay-500 blur-sm" />
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const [ref, inView] = useInView();
  
  const steps = [
    {
      number: "01",
      title: "Add Your Website",
      description: "Simply enter your website URL and we'll automatically scrape and analyze your content.",
      icon: <Globe className="w-8 h-8" />
    },
    {
      number: "02", 
      title: "AI Training",
      description: "Our AI learns from your website content, FAQs, and documents to provide accurate responses.",
      icon: <Zap className="w-8 h-8" />
    },
    {
      number: "03",
      title: "One-Line Setup", 
      description: "Copy and paste one line of code to your website. Your smart chatbot is now live!",
      icon: <Rocket className="w-8 h-8" />
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            How It
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get your AI chatbot up and running in minutes, not hours
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 dark:from-blue-600 dark:via-cyan-500 dark:to-blue-600" />
            
            {steps.map((step, index) => (
              <div key={index} className={`text-center transition-all duration-700 delay-${index * 200} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <GlassContainer className="p-8 relative">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="mt-6 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                </GlassContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Features Section (Updated)
const FeaturesSection = () => {
  const [ref, inView] = useInView();
  
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Setup",
      description: "Add one line of code to your website and you're live. No technical expertise required.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Multilingual",
      description: "Multilingual support coming soon. Will support customers worldwide effortlessly.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Lead Capture",
      description: "AI identifies purchase intent and captures visitor information at the perfect moment.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Your Content, Your Brand",
      description: "Trains exclusively on your website content to provide accurate, on-brand responses.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Track conversations, leads, and conversions with detailed analytics dashboard.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Never miss a customer inquiry. Your AI assistant works around the clock.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Modern Websites</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to transform your static website into a lead-generating machine
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className={`transition-all duration-700 delay-${index * 100} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <GlassContainer className="p-8 h-full hover:scale-105 transition-all duration-500 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </GlassContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, inView] = useInView();
  
  const faqs = [
      {
        question: "What is the Yuno Beta Program?",
        answer: "Our Beta Program offers free access to Yuno with personal setup and support while we perfect our platform. You get professional chatbot installation worth ₹25,000 at no cost, and we get valuable feedback to improve our product."
      },
      {
        question: "How do I get started with the Beta Program?",
        answer: "Simply fill out our beta application form with your website URL and contact details. We'll review your application and reach out within 48 hours to schedule your personal onboarding call and setup."
      },
      {
        question: "What's included in the beta access?",
        answer: "Beta members get: personal onboarding call, custom AI training on your content, white-glove installation, priority support, and direct input into Yuno's development roadmap. Everything is included at no cost during the beta period."
      },
      {
        question: "How long does the beta program last?",
        answer: "The beta program runs while we're perfecting our self-service platform. Beta members will have early access to new features and preferential pricing when we launch our public plans."
      },
      {
        question: "Do I need technical knowledge to participate in the beta?",
        answer: "Not at all! That's the beauty of our beta program - we handle everything for you. Our team personally installs and configures Yuno on your website. You just need to provide access to add one line of code."
      },
      {
        question: "How quickly will my chatbot be ready?",
        answer: "Once accepted into the beta, we'll schedule a setup call within 48 hours. After our brief consultation, your custom-trained chatbot will be live on your website within 24-48 hours."
      },
      {
        question: "What if I'm not happy with the setup?",
        answer: "We're committed to your success! During the beta, we'll work with you to refine and perfect your chatbot until it meets your expectations. Your feedback helps us improve the product for everyone."
      }
    ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Frequently Asked
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about getting started with Yuno
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className={`transition-all duration-500 delay-${index * 100} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <GlassContainer className="mb-4 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 dark:hover:bg-gray-700/10 transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-blue-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                
                <div className={`transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </GlassContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PilotProgramSection = () => {
  const [formData, setFormData] = useState({
    website_url: '',
    email: '',
    first_name: '',
    business_type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Remove spots left counter and related states
  const [isVisible, setIsVisible] = useState(false);

  // Subtle entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/pilot-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        alert(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Pilot signup error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
              <Check className="w-10 h-10 text-white relative z-10" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Welcome to Beta! 🎉
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We'll analyze your website and reach out within 24 hours with your custom Yuno setup.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-xl">What happens next?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[
                  { step: "1", icon: <Zap className="w-6 h-6" />, title: "Analysis", desc: "We analyze your website content" },
                  { step: "2", icon: <Shield className="w-6 h-6" />, title: "Setup", desc: "Custom Yuno configuration" },
                  { step: "3", icon: <TrendingUp className="w-6 h-6" />, title: "Launch", desc: "Code delivered via email" }
                ].map((item, index) => (
                  <div key={index} className={`transition-all duration-500 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3 text-white relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
                      <span className="relative z-10">{item.icon}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pilot-program" className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-300/10 rounded-full animate-pulse blur-xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-300/10 rounded-full animate-pulse delay-1000 blur-xl" />
      
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Beta Badge with Subtle Animation */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 border border-blue-200 dark:border-blue-700/50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
            <Sparkles className="w-4 h-4" />
            Exclusive Beta Program
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Join Our Exclusive
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Beta Program</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Get free access to Yuno with personal setup and training while we perfect our platform.
            <br />
            <span className="font-semibold text-gray-800 dark:text-gray-200">Help shape the future of AI chatbots!</span>
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits Section */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                  <Star className="w-4 h-4" />
                  <span className="relative z-10">₹25,000 Value - Beta Access</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  What Beta Members Get
                </h3>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Users className="w-6 h-6" />,
                    title: "Personal Onboarding Call",
                    description: "15-minute 1:1 consultation to understand your business and customize Yuno perfectly",
                    color: "from-blue-500 to-cyan-400"
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: "Custom AI Training", 
                    description: "We manually train Yuno on your specific content, FAQs, and business processes",
                    color: "from-green-500 to-emerald-400"
                  },
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "White-Glove Setup",
                    description: "Professional installation with guaranteed perfect configuration - no technical skills needed",
                    color: "from-purple-500 to-pink-400"
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: "Priority Support & Feedback",
                    description: "Direct access to our team + your input helps shape Yuno's development roadmap",
                    color: "from-orange-500 to-red-400"
                  }
                ].map((benefit, index) => (
                  <div key={index} className={`flex items-start gap-4 transition-all duration-500 delay-${index * 100 + 500} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg relative overflow-hidden group`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
                      <span className="relative z-10">{benefit.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 dark:via-blue-800/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-blue-800 dark:text-blue-200">Beta Program Details</span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                    We're perfecting our platform and need partners to help us build the best AI chatbot experience. 
                    You get professional setup and priority support, we get valuable feedback to improve Yuno.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Form Section */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-400/10 dark:to-cyan-400/10 animate-pulse" />
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Apply for Beta Access
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Professional setup within 48 hours
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Website URL *
                      </label>
                      <input
                        type="text"
                        name="website_url"
                        value={formData.website_url}
                        onChange={handleInputChange}
                        placeholder="yourwebsite.com or www.yourwebsite.com"
                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Business Type
                      </label>
                      <select
                        name="business_type"
                        value={formData.business_type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                      >
                        <option value="">Select your business type</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="saas">SaaS/Software</option>
                        <option value="services">Professional Services</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="legal">Legal</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="education">Education</option>
                        <option value="restaurant">Restaurant/Food</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.website_url || !formData.email || !formData.first_name}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting Application...
                          </>
                        ) : (
                          <>
                            Apply for Beta Access
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </button>
                    
                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Beta access • Professional setup included • Partnership opportunity
                      </p>
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                        <span>✓ No payment required</span>
                        <span>✓ Setup within 48h</span>
                        <span>✓ Priority support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

// Enhanced Pricing Section - Updated
const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Start free, then choose the plan that scales with your business
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full transition-all ${isAnnual ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all ${isAnnual ? 'left-9' : 'left-1'}`} />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              Annual
            </span>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto pt-8">
          <GlassContainer className="p-8 md:p-12 text-center relative">
            {/* Popular Badge */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                🔥 MOST POPULAR
              </span>
            </div>
            
            <div className="mb-8 pt-4">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                {isAnnual && (
                  <span className="text-3xl text-gray-400 dark:text-gray-500 line-through mr-2">
                    ₹23,999
                  </span>
                )}
                <span className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white">
                  {isAnnual ? '₹19,999' : '₹1,999'}
                </span>
                <span className="text-2xl text-gray-600 dark:text-gray-300">
                  {isAnnual ? '/year' : '/month'}
                </span>
              </div>
              {isAnnual && (
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-medium">
                  <span className="text-2xl">🎉</span>
                  <span>Save ₹4,000 annually!</span>
                  <span className="text-2xl">✨</span>
                </div>
              )}
            </div>
            
            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Pro Plan - Everything Included</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                "1 website",
                "5,000 conversations/month", 
                "Smart lead capture & analytics",
                "Multilingual support (coming soon)",
                "Priority email support",
                "Mobile-optimized widget"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-left">
                  <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 mb-8">
              <AnimatedButton className="text-xl px-16 py-6 w-full md:w-auto">
                Start 7-Day Free Trial
                <ArrowRight className="w-6 h-6" />
              </AnimatedButton>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No credit card required • Cancel anytime • Setup in 2 minutes
              </p>
            </div>
          </GlassContainer>
        </div>
        
        {/* Enterprise Option - Updated */}
        <div className="mt-12 text-center">
          <GlassContainer className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Need More? Enterprise Solutions Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Custom integrations, unlimited conversations, dedicated support, and white-label options.
            </p>
            <AnimatedButton variant="secondary" onClick={() => navigate('/contact')}>
              <HeadphonesIcon className="w-5 h-5" />
              Connect with us
            </AnimatedButton>
          </GlassContainer>
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer - Updated
const Footer = () => {
  return (
    <footer className="py-16 bg-gray-900 dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
                <img 
                  src="/HelloYuno.png" 
                  alt="Yuno Logo" 
                  className="w-14 h-14 object-contain"
                />
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Yuno
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              Transform your website visitors into customers with AI-powered conversations. 
              The easiest way to add intelligent chat to any website.
            </p>
            <div className="flex gap-4">
              <AnimatedButton 
                variant="primary" 
                className="px-6 py-3"
                onClick={() => {
                  document.getElementById('pilot-program')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Join Beta Program
              </AnimatedButton>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <div className="space-y-3">
              <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#PilotProgramSection" className="block text-gray-400 hover:text-white transition-colors">Join Beta</a>
              <button onClick={() => window.showYunoDemo?.()} className="block text-gray-400 hover:text-white transition-colors text-left">Demo</button>
              <Link to="/help" className="block text-gray-400 hover:text-white transition-colors">Help Center</Link>
            </div>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <div className="space-y-3">
              <Link to="/help" className="block text-gray-400 hover:text-white transition-colors">Help Center</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Yuno. All rights reserved. Made with ❤️ for businesses worldwide.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>🇮🇳 Proudly made in India</span>
            <span>🌍 Serving globally</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Contact Us Page
const ContactPage = () => {
  const [ref, inView] = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    enquiry_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        enquiry_type: 'general'
      });
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    console.error('Contact form error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      <NeuralNetwork />
      
      <div className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-6">
          <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Get in
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions? Need help setting up? Our team is here to help you succeed.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <GlassContainer className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Let's Start a Conversation
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Whether you're looking to get started with Yuno, need technical support, or want to discuss enterprise solutions, we're here to help.
                </p>
                
                <div className="space-y-6">
                  {/* Contact details temporarily commented out
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                      <p className="text-gray-600 dark:text-gray-300">hello@yuno.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                      <p className="text-gray-600 dark:text-gray-300">+91 XXX XXX XXXX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Visit Us</h3>
                      <p className="text-gray-600 dark:text-gray-300">Bangalore, India</p>
                    </div>
                  </div>
                  */}
                  
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    <p className="text-lg">We'll get back to you within 24 hours!</p>
                  </div>
                </div>
              </GlassContainer>

              <GlassContainer className="p-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Response Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">General Inquiries:</span>
                    <span className="text-gray-900 dark:text-white font-medium"> 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Technical Support:</span>
                    <span className="text-gray-900 dark:text-white font-medium"> 12 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Enterprise Sales:</span>
                    <span className="text-gray-900 dark:text-white font-medium"> 4 hours</span>
                  </div>
                </div>
              </GlassContainer>
            </div>

            {/* Contact Form */}
            <GlassContainer className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                  <p className="text-green-700 dark:text-green-300">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                  <p className="text-red-700 dark:text-red-300">Sorry, there was an error sending your message. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="enquiry_type"
                    value={formData.enquiry_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                    <option value="enterprise">Enterprise Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <AnimatedButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="w-5 h-5" />
                </AnimatedButton>
              </form>
            </GlassContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Help Center / FAQ Page
const HelpPage = () => {
  const [ref, inView] = useInView();
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

const faqCategories = [
  {
    title: "Beta Program",
    faqs: [
      {
        question: "What is the Yuno Beta Program?",
        answer: "Our Beta Program offers free access to Yuno with personal setup and support while we perfect our platform. You get professional chatbot installation worth ₹25,000 at no cost, and we get valuable feedback to improve our product."
      },
      {
        question: "How do I get started with the Beta Program?",
        answer: "Simply fill out our beta application form with your website URL and contact details. We'll review your application and reach out within 48 hours to schedule your personal onboarding call and setup."
      },
      {
        question: "What's included in the beta access?",
        answer: "Beta members get: personal onboarding call, custom AI training on your content, white-glove installation, priority support, and direct input into Yuno's development roadmap. Everything is included at no cost during the beta period."
      },
      {
        question: "How long does the beta program last?",
        answer: "The beta program runs while we're perfecting our self-service platform. Beta members will have early access to new features and preferential pricing when we launch our public plans."
      }
    ]
  },
  {
    title: "Getting Started",
    faqs: [
      {
        question: "Do I need technical knowledge to participate in the beta?",
        answer: "Not at all! That's the beauty of our beta program - we handle everything for you. Our team personally installs and configures Yuno on your website. You just need to provide access to add one line of code."
      },
      {
        question: "How quickly will my chatbot be ready?",
        answer: "Once accepted into the beta, we'll schedule a setup call within 48 hours. After our brief consultation, your custom-trained chatbot will be live on your website within 24-48 hours."
      },
      {
        question: "What if I'm not happy with the setup?",
        answer: "We're committed to your success! During the beta, we'll work with you to refine and perfect your chatbot until it meets your expectations. Your feedback helps us improve the product for everyone."
      }
    ]
  },
  {
    title: "Features & Functionality",
    faqs: [
      {
        question: "What types of questions can Yuno answer?",
        answer: "Yuno can answer questions about your products, services, pricing, company information, and any content from your website. During the beta setup, we'll also train it on your specific FAQs and business processes."
      },
      {
        question: "Can I customize how Yuno responds?",
        answer: "Absolutely! During your personal onboarding call, we'll configure Yuno's tone to match your brand, add specific responses for your common questions, and set up appropriate fallback responses for complex queries."
      },
      {
        question: "Does Yuno work on mobile devices?",
        answer: "Yes! Yuno is fully responsive and works perfectly on desktop, tablet, and mobile devices. The chat widget automatically adapts to different screen sizes for optimal user experience."
      },
      {
        question: "What languages does Yuno support?",
        answer: "Currently, Yuno works best with English content. Multilingual support is in development and will be one of the first features we test with our beta community."
      }
    ]
  },
  {
    title: "Beta Support & Feedback",
    faqs: [
      {
        question: "What kind of support do beta members get?",
        answer: "Beta members receive priority support with direct access to our development team. You can reach us via email, and we typically respond within 12 hours. We also schedule regular check-ins to gather feedback."
      },
      {
        question: "How can I provide feedback during the beta?",
        answer: "We value your input! You can share feedback through regular check-in calls, email, or our dedicated beta feedback channel. Your suggestions directly influence Yuno's development roadmap."
      },
      {
        question: "What happens when the beta ends?",
        answer: "Beta participants will get early access to our paid plans with special pricing. We'll provide advance notice before any transition and ensure continuity of service for your chatbot."
      },
      {
        question: "Can I make changes to my chatbot during the beta?",
        answer: "Yes! During the beta, we can update your chatbot's training, modify responses, or adjust its behavior based on your needs. Just contact our support team, and we'll implement changes quickly."
      }
    ]
  },
  {
    title: "Technical Information",
    faqs: [
      {
        question: "How does Yuno learn about my business?",
        answer: "Our team personally analyzes your website content, including product pages, service descriptions, FAQs, and any additional documents you provide. We then manually train Yuno to understand your business and respond accurately."
      },
      {
        question: "What if Yuno doesn't know how to answer a question?",
        answer: "We configure smart fallback responses during setup. Yuno can collect visitor contact information, offer to connect them with your team, or provide your contact details for complex queries it can't handle."
      },
      {
        question: "How do I update my website content in Yuno?",
        answer: "During the beta, simply contact our support team when you update your website content. We'll manually update Yuno's training to reflect your changes. In the future, this will be automated."
      },
      {
        question: "Is my data secure with Yuno?",
        answer: "Absolutely. We follow industry-standard security practices to protect your data and your visitors' information. All conversations are encrypted, and we never share your data with third parties."
      }
    ]
  }
];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      <NeuralNetwork />
      
      <div className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-6">
          <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Help
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Center</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Find answers to common questions and get help with Yuno
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <GlassContainer className="p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for help..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pl-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </GlassContainer>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-4xl mx-auto">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                  {category.title}
                </h2>
                
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    return (
                      <GlassContainer key={faqIndex} className="overflow-hidden">
                        <button
                          onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 dark:hover:bg-gray-700/10 transition-all"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0">
                            {openIndex === globalIndex ? (
                              <ChevronUp className="w-6 h-6 text-blue-500" />
                            ) : (
                              <ChevronDown className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        <div className={`transition-all duration-300 ${openIndex === globalIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                          <div className="px-6 pb-6">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </GlassContainer>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-16 text-center">
            <GlassContainer className="p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Still need help?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <AnimatedButton variant="primary">
                    <Mail className="w-5 h-5" />
                    Contact Support
                  </AnimatedButton>
                </Link>
                <AnimatedButton variant="secondary" onClick={() => window.showYunoDemo?.()}>
                  <Play className="w-5 h-5" />
                  Try Demo
                </AnimatedButton>
              </div>
            </GlassContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Terms of Service Page
const TermsPage = () => {
  const [ref, inView] = useInView();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      <NeuralNetwork />
      
      <div className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-6">
          <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Terms of
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Service</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Last updated: December 2024
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <GlassContainer className="p-8 md:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  By accessing and using Yuno's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Description of Service</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Yuno provides AI-powered chatbot services for websites. Our service allows you to add intelligent conversation capabilities to your website to engage with visitors and capture leads.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. User Accounts</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  To use our service, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Acceptable Use</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You agree to use Yuno's services only for lawful purposes and in accordance with these Terms. You shall not:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit any harmful or malicious content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Payment and Billing</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Paid services are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change our pricing with 30 days' notice.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Data and Privacy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy. By using our service, you consent to the collection and use of your information as outlined in our Privacy Policy.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Intellectual Property</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Yuno and its original content, features, and functionality are owned by Yuno and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">8. Termination</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">9. Limitation of Liability</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  In no event shall Yuno, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">10. Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We reserve the right to modify these terms at any time. We will provide notice of significant changes via email or through our service. Your continued use of the service after such modifications constitutes acceptance of the updated terms.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">11. Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  If you have any questions about these Terms of Service, please contact us at legal@yuno.com or through our contact page.
                </p>
              </div>
            </GlassContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Page
const PrivacyPage = () => {
  const [ref, inView] = useInView();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      <NeuralNetwork />
      
      <div className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-6">
          <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Privacy
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Policy</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Last updated: December 2024
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <GlassContainer className="p-8 md:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Information We Collect</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                  <li>Create an account or use our services</li>
                  <li>Contact us for support or inquiries</li>
                  <li>Subscribe to our newsletter or marketing communications</li>
                  <li>Participate in surveys or provide feedback</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. How We Use Your Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns and improve user experience</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. Information Sharing</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information in the following situations: with service providers who assist us in operating our platform, when required by law, or to protect our rights and safety.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Data Security</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Data Retention</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We retain your personal information for as long as necessary to provide you with our services and as described in this privacy policy. We may also retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Your Rights</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Rectify inaccurate personal information</li>
                  <li>Erase your personal information in certain circumstances</li>
                  <li>Object to or restrict processing of your personal information</li>
                  <li>Data portability in certain circumstances</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Cookies and Tracking</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We use cookies and similar tracking technologies to collect and track information about your use of our service. You can control cookies through your browser settings, but disabling cookies may limit your ability to use certain features of our service.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">8. Third-Party Services</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">9. Children's Privacy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">10. Changes to This Policy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">11. Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at privacy@yuno.com or through our contact page.
                </p>
              </div>
            </GlassContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Home Page Component (Landing Page)
const HomePage = () => {
  return (
    <>
      <YunoChatDemo />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FAQSection />
      <PilotProgramSection />
    </>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;