import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { MessageCircle, Zap, Globe, BarChart3, Shield, Sparkles, Moon, Sun, Play, ArrowRight, Check, Star, Users, Clock, HeadphonesIcon, ChevronDown, ChevronUp, Quote, TrendingUp, Rocket, Target } from 'lucide-react';

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

// Animated Counter
const AnimatedCounter = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Header Component
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
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Yuno
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Features</a>
          <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">How it Works</a>
          <a href="#demo" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Demo</a>
          <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-white/20 dark:bg-gray-700/30 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/40 transition-all duration-300"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <AnimatedButton variant="secondary">
            Start Free Trial
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
      
      <div ref={ref} className="container mx-auto px-6 py-20 relative z-10">
        <div className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
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
            Add a smart AI chatbot to your website in 2 minutes.<br />
            <span className="font-semibold">Capture leads, answer questions, and never lose a potential customer again.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <AnimatedButton className="text-xl px-12 py-6">
              Start Free Trial
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </AnimatedButton>
            <AnimatedButton variant="secondary" className="text-xl px-12 py-6">
              <Play className="w-6 h-6" />
              Watch Demo
            </AnimatedButton>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-medium">7-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-medium">2-minute setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Trusted by <AnimatedCounter target={1000} />+ websites</span>
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

// Enhanced Features Section
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
      description: "Automatically responds in 50+ languages. Support customers worldwide effortlessly.",
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

// Interactive Demo with Scripted Conversation
const InteractiveDemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [ref, inView] = useInView();

  const conversation = [
    { type: 'user', text: 'Hi! Do you have any electric bikes in stock?' },
    { type: 'bot', text: 'Hello! Yes, we have several electric bikes available. What type of riding are you planning to do?' },
    { type: 'user', text: 'Mostly city commuting, about 15 miles daily' },
    { type: 'bot', text: 'Perfect! For city commuting, I recommend our Urban Pro e-bike with 50-mile range. Would you like me to check current pricing and availability?' },
    { type: 'user', text: 'Yes please, and can I schedule a test ride?' },
    { type: 'bot', text: 'Absolutely! The Urban Pro is $2,299 and we have 3 in stock. I can help you schedule a test ride. Could I get your email to send you available time slots?' },
    { type: 'user', text: 'Sure, it\'s john.doe@email.com' },
    { type: 'bot', text: '🎉 Thank you John! I\'ve captured your details and will send you test ride availability within 5 minutes. A sales representative will also follow up about the Urban Pro.' }
  ];

  useEffect(() => {
    if (isPlaying && currentStep < conversation.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, conversation[currentStep]]);
        setCurrentStep(prev => prev + 1);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    if (currentStep >= conversation.length && isPlaying) {
      setTimeout(() => setIsPlaying(false), 1000);
    }
  }, [isPlaying, currentStep, conversation.length]);

  const resetDemo = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <section id="demo" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            See Yuno in
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Action</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Watch how Yuno transforms a regular website into an intelligent conversation platform
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <GlassContainer className="p-8">
            {/* Mock Browser */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg px-4 py-1 text-sm text-gray-600 dark:text-gray-300 flex-1">
                  https://demo-bike-store.com
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-xl p-8 min-h-[400px] relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    EcoBikes Store
                  </h3>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    🟢 Yuno Active
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Premium electric bikes for urban commuting and weekend adventures...
                </p>
                
                {/* Chat Widget */}
                <div className="absolute bottom-6 right-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform animate-pulse">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Chat Messages */}
                  {messages.length > 0 && (
                    <div className="absolute bottom-20 right-0 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">Yuno Assistant</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-4">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                          >
                            <div
                              className={`max-w-xs px-4 py-2 rounded-2xl ${
                                message.type === 'user'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                              }`}
                            >
                              {message.text}
                            </div>
                          </div>
                        ))}
                        
                        {isPlaying && currentStep < conversation.length && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center gap-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl px-6 py-3">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Lead captured in real-time!
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                👆 This website has Yuno installed - just like yours will!
              </p>
              
              <AnimatedButton 
                onClick={resetDemo}
                disabled={isPlaying}
                className="mb-4"
              >
                <Play className="w-5 h-5" />
                {isPlaying ? 'Demo Playing...' : 'Start Interactive Demo'}
              </AnimatedButton>
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Watch a realistic conversation that leads to customer capture
              </p>
            </div>
          </GlassContainer>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const [ref, inView] = useInView();
  
  const testimonials = [
    {
      name: "Sakshi Kaul",
      company: "TechStartup Inc",
      role: "Founder",
      image: "SC",
      text: "Yuno increased our lead conversion by 340% in the first month. The setup was literally 2 minutes - I couldn't believe how easy it was.",
      rating: 5
    },
    {
      name: "Mohan Gupta", 
      company: "EcoProducts",
      role: "Marketing Director",
      image: "MR",
      text: "Our customers love how Yuno answers questions instantly in multiple languages. It's like having a multilingual sales team 24/7.",
      rating: 5
    },
    {
      name: "Ekta Kapoore",
      company: "Local Law Firm",
      role: "Managing Partner", 
      image: "EW",
      text: "We used to miss so many inquiries after hours. Now Yuno captures every potential client and schedules consultations automatically.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Loved by
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Thousands</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join successful businesses who've transformed their websites with Yuno
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`transition-all duration-700 delay-${index * 200} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <GlassContainer className="p-8 h-full hover:scale-105 transition-all duration-500">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-blue-500 mb-4" />
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{testimonial.company}</p>
                  </div>
                </div>
              </GlassContainer>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: "Websites Using Yuno", value: 1000, suffix: "+" },
            { label: "Average Lead Increase", value: 340, suffix: "%" }, 
            { label: "Setup Time", value: 2, suffix: " min" },
            { label: "Customer Satisfaction", value: 4.9, suffix: "/5" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
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
      question: "How quickly can I get Yuno running on my website?",
      answer: "Incredibly fast! Once you sign up and add your website URL, we automatically scrape your content and train the AI. Then you just copy-paste one line of code. The entire process takes about 2 minutes."
    },
    {
      question: "What if my website is in a language other than English?",
      answer: "Yuno supports 50+ languages automatically. It will detect your website's language during setup and respond to visitors in their preferred language. No additional configuration needed."
    },
    {
      question: "How does Yuno know about my products and services?",
      answer: "Yuno automatically reads and learns from your website content, including product pages, FAQs, about pages, and any documents you upload. It becomes an expert on your business within minutes."
    },
    {
      question: "Can I customize how Yuno responds?",
      answer: "Yes! You can set your brand tone, add custom responses, upload additional documents, and even provide fallback contact information for complex queries."
    },
    {
      question: "What happens to the leads Yuno captures?",
      answer: "All leads are instantly available in your dashboard with full conversation context. You can also set up email notifications or integrate with your existing CRM system."
    },
    {
      question: "Is there a limit on website traffic or conversations?",
      answer: "Your plan includes 5,000 conversations per month, which covers most small to medium websites. If you need more, we offer volume add-ons or can discuss enterprise pricing."
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

// Enhanced Pricing Section - FIXED VERSION
const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [ref, inView] = useInView();

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
            {isAnnual && (
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                Save 20%
              </span>
            )}
          </div>
        </div>
        
        {/* FIXED: Added pt-8 to prevent badge cut-off */}
        <div className="max-w-5xl mx-auto pt-8">
          <GlassContainer className="p-8 md:p-12 text-center relative">
            {/* Popular Badge - FIXED positioning */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                🔥 MOST POPULAR
              </span>
            </div>
            
            <div className="mb-8 pt-4">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white">
                  {isAnnual ? '₹1,599' : '₹1,999'}
                </span>
                <span className="text-2xl text-gray-600 dark:text-gray-300">/month</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
                <span>${isAnnual ? '20' : '25'}/month USD</span>
                {isAnnual && <span className="text-green-600 dark:text-green-400 font-medium">Save ₹400/month</span>}
              </div>
            </div>
            
            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Pro Plan - Everything Included</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                "Unlimited websites",
                "5,000 conversations/month", 
                "Smart lead capture & analytics",
                "50+ language support",
                "Custom branding options",
                "Priority email support",
                "Advanced conversation insights",
                "CRM integration ready",
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
            
            {/* Money Back Guarantee */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-8">
              <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300">
                <Shield className="w-6 h-6 text-green-500" />
                <span className="font-medium">30-day money-back guarantee</span>
              </div>
            </div>
          </GlassContainer>
        </div>
        
        {/* Enterprise Option */}
        <div className="mt-12 text-center">
          <GlassContainer className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Need More? Enterprise Solutions Available
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Custom integrations, unlimited conversations, dedicated support, and white-label options.
            </p>
            <AnimatedButton variant="secondary">
              <HeadphonesIcon className="w-5 h-5" />
              Contact Sales
            </AnimatedButton>
          </GlassContainer>
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer - FIXED BUTTON COLOR
const Footer = () => {
  return (
    <footer className="py-16 bg-gray-900 dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Yuno
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              Transform your website visitors into customers with AI-powered conversations. 
              The easiest way to add intelligent chat to any website.
            </p>
            <div className="flex gap-4">
              {/* FIXED: Changed to primary button variant */}
              <AnimatedButton variant="primary" className="px-6 py-3">
                Start Free Trial
              </AnimatedButton>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <div className="space-y-3">
              <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#demo" className="block text-gray-400 hover:text-white transition-colors">Demo</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Integrations</a>
            </div>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
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


// Main App Component
const App = () => {
  useEffect(() => {
    // Add Yuno widget script
    const script = document.createElement('script');
    script.src = 'https://luckylabs-yuno.github.io/luckylabs-yuno/yuno.js';
    script.setAttribute('site_id', 'yuno_demo');
    script.defer = true;
    document.head.appendChild(script);
    
    // Add custom CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .animate-bounce-slow {
        animation: bounce 2s infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
        <Header />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <InteractiveDemoSection />
        <TestimonialsSection />
        <FAQSection />
        <PricingSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;