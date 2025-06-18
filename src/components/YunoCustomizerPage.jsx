import React, { useState, useEffect } from 'react';
import { Palette, Settings, Code, Monitor, ArrowLeft, Copy, Check, RotateCcw, Play, X, Send, Moon, Sun, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

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

// Mobile Detection Hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const screenWidth = window.innerWidth;
      
      setIsMobile(mobileRegex.test(userAgent) || screenWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Mobile Fallback Component
const MobileFallback = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-6">
      <GlassContainer className="max-w-md mx-auto text-center p-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Smartphone className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Desktop Experience Required
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          The Yuno Widget Customizer is designed for desktop use to provide the best interactive experience. Please visit this page on a laptop or desktop computer.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            Back to Home
          </Link>
          
          <Link
            to="/help"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-white/20 dark:bg-gray-700/30 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-gray-600/40 font-semibold rounded-xl transition-all duration-300"
          >
            View Help Center
          </Link>
        </div>
        
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          💡 You can still access all Yuno features on mobile devices once installed on your website
        </div>
      </GlassContainer>
    </div>
  );
};

const YunoCustomizerPage = () => {
  const isMobile = useIsMobile();

  // Show mobile fallback if on mobile device
  if (isMobile) {
    return <MobileFallback />;
  }

  // Configuration state
  const [config, setConfig] = useState({
    site_id: 'your_site_123',
    api_endpoint: 'https://luckylabs.pythonanywhere.com/ask',
    theme: 'dark',
    position: 'bottom-right',
    primary_color: '#FF6B35',
    accent_color: '#FF8C42',
    background_color: '',
    text_color: '',
    welcome_message: "Hi! I'm Yuno—how can I help you today?",
    teaser_message: "Questions about our platform? Try Yuno Now",
    trigger_text: "Ask Yuno",
    trigger_icon: "🔥",
    header_title: "Chat with Yuno",
    placeholder: "Type your message…",
    auto_show: true,
    auto_show_delay: 2000,
    show_teaser: true,
    width: '340px',
    height: '450px',
    border_radius: '16px',
    blur_effect: true,
    animation: 'slide'
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [copied, setCopied] = useState(false);
  const [demoState, setDemoState] = useState('bubble');
  const [showTyping, setShowTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  // Beautiful contextual presets
  const contextualPresets = [
    {
      name: "E-commerce Store",
      description: "Perfect for online shops and retail",
      icon: "🛒",
      gradient: "from-purple-500 to-pink-500",
      config: {
        primary_color: "#7C3AED",
        accent_color: "#EC4899",
        welcome_message: "Hi! Looking for something special? I'm here to help! 🛍️",
        teaser_message: "Need help finding the perfect item?",
        trigger_text: "Shop Assistant",
        trigger_icon: "🛒",
        header_title: "Shopping Help",
        placeholder: "Ask about products, sizes, shipping..."
      }
    },
    {
      name: "Restaurant & Food",
      description: "Delicious for cafes and restaurants",
      icon: "🍕",
      gradient: "from-orange-500 to-red-500",
      config: {
        primary_color: "#EA580C",
        accent_color: "#DC2626",
        welcome_message: "Hungry? I can help with our menu, orders, and reservations! 🍽️",
        teaser_message: "Craving something delicious?",
        trigger_text: "Order Help",
        trigger_icon: "🍕",
        header_title: "Restaurant Assistant",
        placeholder: "Ask about menu, allergies, delivery..."
      }
    },
    {
      name: "Healthcare & Wellness",
      description: "Caring support for medical services",
      icon: "🏥",
      gradient: "from-emerald-500 to-teal-500",
      config: {
        primary_color: "#10B981",
        accent_color: "#14B8A6",
        welcome_message: "Hello! I'm here to help with appointments, services, and health questions 🩺",
        teaser_message: "Need help with health services?",
        trigger_text: "Health Assistant",
        trigger_icon: "🏥",
        header_title: "Medical Support",
        placeholder: "Ask about appointments, services..."
      }
    },
    {
      name: "Travel & Hotels",
      description: "Wanderlust-ready for travel sites",
      icon: "✈️",
      gradient: "from-sky-500 to-indigo-500",
      config: {
        primary_color: "#0EA5E9",
        accent_color: "#6366F1",
        welcome_message: "Ready for your next adventure? Let me help plan your perfect trip! 🌍",
        teaser_message: "Planning your next getaway?",
        trigger_text: "Travel Guide",
        trigger_icon: "✈️",
        header_title: "Travel Assistant",
        placeholder: "Ask about destinations, bookings..."
      }
    },
    {
      name: "Tech & SaaS",
      description: "Modern support for software companies",
      icon: "💻",
      gradient: "from-violet-500 to-purple-500",
      config: {
        primary_color: "#8B5CF6",
        accent_color: "#A855F7",
        welcome_message: "Need help getting started? I'm your tech support companion! ⚡",
        teaser_message: "Questions about our platform?",
        trigger_text: "Get Support",
        trigger_icon: "💻",
        header_title: "Tech Support",
        placeholder: "Ask about features, bugs, integrations..."
      }
    },
    {
      name: "Real Estate",
      description: "Home sweet home for property sites",
      icon: "🏠",
      gradient: "from-amber-500 to-orange-500",
      config: {
        primary_color: "#F59E0B",
        accent_color: "#F97316",
        welcome_message: "Looking for your dream home? I'm here to help you find it! 🏡",
        teaser_message: "Ready to find your perfect home?",
        trigger_text: "Property Help",
        trigger_icon: "🏠",
        header_title: "Real Estate Guide",
        placeholder: "Ask about properties, mortgages..."
      }
    }
  ];

  // Available icons
  const availableIcons = ['💬', '🤖', '💡', '🛒', '🏥', '📚', '🔧', '❓', '💎', '🎮', '🏠', '✨', '🍜', '🌶️', '☕', '🎯', '🚀', '⭐', '🍕', '✈️', '💻', '🩺', '🔥'];

  // Update config function
  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  // Apply preset
  const applyPreset = (preset) => {
    setConfig(prev => ({ ...prev, ...preset.config }));
    setDemoState('bubble');
    setChatMessages([]);
  };

  // Demo functions
  const replayDemo = () => {
    setDemoState('bubble');
    setChatMessages([]);
    setUserInput('');
    
    if (config.auto_show && config.show_teaser) {
      setTimeout(() => {
        setDemoState('teaser');
      }, config.auto_show_delay);
    }
  };

  const openChat = () => {
    setDemoState('chat');
    setChatMessages([{ type: 'bot', message: config.welcome_message }]);
  };

  const sendDemoMessage = () => {
    if (!userInput.trim()) return;
    
    const newMessages = [...chatMessages, { type: 'user', message: userInput }];
    setChatMessages(newMessages);
    setUserInput('');
    setShowTyping(true);
    
    setTimeout(() => {
      setShowTyping(false);
      setChatMessages([...newMessages, { 
        type: 'bot', 
        message: "Thanks for trying the demo! This is how I'd respond to your question. 😊" 
      }]);
    }, 1500);
  };

  // Auto-show teaser demo
  useEffect(() => {
    if (config.auto_show && config.show_teaser && demoState === 'bubble') {
      const timer = setTimeout(() => {
        setDemoState('teaser');
      }, config.auto_show_delay);
      return () => clearTimeout(timer);
    }
  }, [config.auto_show, config.show_teaser, config.auto_show_delay, demoState]);

  // Generate script tag
  const generateScript = () => {
    let script = `<script src="https://luckylabs-yuno.github.io/luckylabs-yuno/yuno.js"\n`;
    
    script += `        site_id="${config.site_id}"\n`;
    
    if (config.api_endpoint !== 'https://luckylabs.pythonanywhere.com/ask') {
      script += `        api_endpoint="${config.api_endpoint}"\n`;
    }
    if (config.theme !== 'dark') script += `        theme="${config.theme}"\n`;
    if (config.position !== 'bottom-right') script += `        position="${config.position}"\n`;
    if (config.primary_color !== '#FF6B35') script += `        primary_color="${config.primary_color}"\n`;
    if (config.accent_color !== '#FF8C42') script += `        accent_color="${config.accent_color}"\n`;
    if (config.background_color) script += `        background_color="${config.background_color}"\n`;
    if (config.text_color) script += `        text_color="${config.text_color}"\n`;
    if (config.welcome_message !== "Hi! I'm Yuno—how can I help you today?") {
      script += `        welcome_message="${config.welcome_message}"\n`;
    }
    if (config.teaser_message !== "Let me know if you need help") {
      script += `        teaser_message="${config.teaser_message}"\n`;
    }
    if (config.trigger_text !== "Ask Yuno") script += `        trigger_text="${config.trigger_text}"\n`;
    if (config.trigger_icon !== "💬") script += `        trigger_icon="${config.trigger_icon}"\n`;
    if (config.header_title !== "Chat with Yuno") script += `        header_title="${config.header_title}"\n`;
    if (config.placeholder !== "Type your message…") script += `        placeholder="${config.placeholder}"\n`;
    if (!config.auto_show) script += `        auto_show="false"\n`;
    if (config.auto_show_delay !== 2000) script += `        auto_show_delay="${config.auto_show_delay}"\n`;
    if (!config.show_teaser) script += `        show_teaser="false"\n`;
    if (config.width !== '340px') script += `        width="${config.width}"\n`;
    if (config.height !== '450px') script += `        height="${config.height}"\n`;
    if (config.border_radius !== '16px') script += `        border_radius="${config.border_radius}"\n`;
    if (!config.blur_effect) script += `        blur_effect="false"\n`;
    if (config.animation !== 'slide') script += `        animation="${config.animation}"\n`;
    
    script += `        defer></script>`;
    
    return script;
  };

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Get widget colors for preview
  const getWidgetColors = () => {
    const isDark = config.theme === 'dark';
    return {
      bubble: config.accent_color 
        ? `linear-gradient(to right, ${config.primary_color}, ${config.accent_color})`
        : config.primary_color,
      panel: config.background_color || (isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.95)'),
      text: config.text_color || (isDark ? '#ffffff' : '#1a1a1a'),
      border: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
    };
  };

  const colors = getWidgetColors();
  
  const getPositionClasses = () => {
    switch(config.position) {
      case 'bottom-right': return 'bottom-6 right-6';
      case 'bottom-left': return 'bottom-6 left-6';
      case 'top-right': return 'top-6 right-6';
      case 'top-left': return 'top-6 left-6';
      default: return 'bottom-6 right-6';
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-x-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-300/20 rounded-full animate-pulse blur-xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-300/20 rounded-full animate-pulse delay-1000 blur-xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-300/20 rounded-full animate-pulse delay-500 blur-xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        {/* Back Button and Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 mb-6">
            <Palette className="w-4 h-4" />
            Interactive Widget Customizer
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Design Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Yuno Widget</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Customize every detail with a live, floating preview on the page.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <GlassContainer className="p-8">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-600 mb-6">
                {[
                  { id: 'basic', label: 'Basic', icon: Settings },
                  { id: 'design', label: 'Design', icon: Palette },
                  { id: 'advanced', label: 'Advanced', icon: Code }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                      activeTab === id
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Basic Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  {/* Beautiful Contextual Presets */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      ✨ Beautiful Presets
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {contextualPresets.map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => applyPreset(preset)}
                          className="group p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 transition-all duration-300 text-left bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${preset.gradient} rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                              {preset.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{preset.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{preset.description}</p>
                            </div>
                            <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="w-5 h-5" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Core Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Core Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Site ID *
                        </label>
                        <input
                          type="text"
                          value={config.site_id}
                          onChange={(e) => updateConfig('site_id', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="Enter your unique site ID"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Theme
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'dark', name: 'Dark Mode', icon: Moon },
                            { id: 'light', name: 'Light Mode', icon: Sun }
                          ].map(({ id, name, icon: Icon }) => (
                            <button
                              key={id}
                              onClick={() => updateConfig('theme', id)}
                              className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                                config.theme === id
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              <span className="font-medium">{name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Pickers */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Primary Color
                          </label>
                          <div className="relative">
                            <input
                              type="color"
                              value={config.primary_color}
                              onChange={(e) => updateConfig('primary_color', e.target.value)}
                              className="w-full h-12 rounded-xl border border-gray-300 dark:border-gray-600 cursor-pointer"
                            />
                            <div className="absolute inset-2 rounded-lg pointer-events-none" style={{ background: config.primary_color }}></div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Accent Color
                          </label>
                          <div className="relative">
                            <input
                              type="color"
                              value={config.accent_color}
                              onChange={(e) => updateConfig('accent_color', e.target.value)}
                              className="w-full h-12 rounded-xl border border-gray-300 dark:border-gray-600 cursor-pointer"
                            />
                            <div className="absolute inset-2 rounded-lg pointer-events-none" style={{ background: config.accent_color }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      💬 Messages & Text
                    </h3>
                    <div className="space-y-4">
                      {[
                        { key: 'welcome_message', label: 'Welcome Message', placeholder: 'First message from bot' },
                        { key: 'teaser_message', label: 'Teaser Message', placeholder: 'Preview message' },
                        { key: 'trigger_text', label: 'Button Text', placeholder: 'Trigger button text' },
                        { key: 'header_title', label: 'Header Title', placeholder: 'Chat window title' },
                        { key: 'placeholder', label: 'Input Placeholder', placeholder: 'Message input placeholder' }
                      ].map(({ key, label, placeholder }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {label}
                          </label>
                          <input
                            type="text"
                            value={config[key]}
                            onChange={(e) => updateConfig(key, e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Icon Selection */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      🎯 Trigger Icon
                    </h3>
                    <div className="grid grid-cols-6 gap-2">
                      {availableIcons.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => updateConfig('trigger_icon', icon)}
                          className={`w-12 h-12 rounded-lg border-2 text-xl transition-all hover:scale-105 ${
                            config.trigger_icon === icon
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                              : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Design Tab */}
              {activeTab === 'design' && (
                <div className="space-y-6">
                  {/* Advanced Colors */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Advanced Colors</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Background Color (optional)
                        </label>
                        <input
                          type="color"
                          value={config.text_color}
                          onChange={(e) => updateConfig('text_color', e.target.value)}
                          className="w-full h-12 rounded-xl border border-gray-300 dark:border-gray-600 cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-1">Override theme text color</p>
                      </div>
                    </div>
                  </div>

                  {/* Position & Size */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Position & Size</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Position
                        </label>
                        <select
                          value={config.position}
                          onChange={(e) => updateConfig('position', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="bottom-right">Bottom Right</option>
                          <option value="bottom-left">Bottom Left</option>
                          <option value="top-right">Top Right</option>
                          <option value="top-left">Top Left</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Width
                          </label>
                          <input
                            type="text"
                            value={config.width}
                            onChange={(e) => updateConfig('width', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., 340px"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Height
                          </label>
                          <input
                            type="text"
                            value={config.height}
                            onChange={(e) => updateConfig('height', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="e.g., 450px"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Border Radius
                        </label>
                        <input
                          type="text"
                          value={config.border_radius}
                          onChange={(e) => updateConfig('border_radius', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="e.g., 16px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Animation */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Animation</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Animation Style
                      </label>
                      <select
                        value={config.animation}
                        onChange={(e) => updateConfig('animation', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="slide">Slide</option>
                        <option value="fade">Fade</option>
                        <option value="scale">Scale</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  {/* Behavior */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Behavior Settings</h3>
                    <div className="space-y-4">
                      {[
                        { key: 'auto_show', label: 'Auto Show Teaser', desc: 'Automatically show teaser after delay' },
                        { key: 'show_teaser', label: 'Show Teaser', desc: 'Display preview message before opening chat' },
                        { key: 'blur_effect', label: 'Blur Effect', desc: 'Apply backdrop blur to widget panels' }
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                              {label}
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
                          </div>
                          <button
                            onClick={() => updateConfig(key, !config[key])}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              config[key] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          >
                            <div
                              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                                config[key] ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      ))}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Auto Show Delay (milliseconds)
                        </label>
                        <input
                          type="number"
                          value={config.auto_show_delay}
                          onChange={(e) => updateConfig('auto_show_delay', parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          min="0"
                          max="10000"
                          step="500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* API Configuration */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">API Configuration</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        API Endpoint
                      </label>
                      <input
                        type="text"
                        value={config.api_endpoint}
                        onChange={(e) => updateConfig('api_endpoint', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your chat API endpoint"
                      />
                    </div>
                  </div>
                </div>
              )}
            </GlassContainer>

            {/* Generated Code */}
            <GlassContainer className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Code className="w-5 h-5" />
                Generated Script Tag
              </h3>
              <div className="bg-gray-900 dark:bg-black rounded-xl p-4 mb-4">
                <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                  <code>{generateScript()}</code>
                </pre>
              </div>
              <button
                onClick={() => copyToClipboard(generateScript())}
                className={`w-full px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  copied 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Script Tag
                  </>
                )}
              </button>
            </GlassContainer>
          </div>

          {/* Interactive Preview Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            <GlassContainer className="p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Monitor className="w-6 h-6" />
                    Live Preview
                  </h2>
                  <button
                    onClick={replayDemo}
                    className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all"
                    title="Replay Demo"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  The interactive demo is floating on the page.
                </p>
              </div>
              
              <div className="text-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/20">
                  <p className="text-gray-700 dark:text-gray-300">
                    Look to the <strong>{config.position.replace('-', ' ')}</strong> of your screen to see the live widget.
                  </p>
              </div>

              {/* Demo Status */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Current State:</span>
                  <span className="font-medium capitalize">{demoState}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Theme:</span>
                  <span className="font-medium capitalize">{config.theme} mode</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Position:</span>
                  <span className="font-medium capitalize">{config.position.replace('-', ' ')}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Auto Show:</span>
                  <span className="font-medium">{config.auto_show && config.show_teaser ? `${config.auto_show_delay}ms` : 'Disabled'}</span>
                </div>
              </div>

              {/* Demo Instructions */}
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  💡 <strong>Try it:</strong> Click the floating widget, send messages, and see the teaser animation. Use the replay button to start over!
                </p>
              </div>
            </GlassContainer>
          </div>
        </div>

        {/* Installation Guide */}
        <div className="mt-12">
          <GlassContainer className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Installation Guide
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Copy Script Tag",
                  description: "Copy the generated script tag above with your custom configuration.",
                  icon: <Copy className="w-6 h-6" />
                },
                {
                  step: "2", 
                  title: "Paste in HTML",
                  description: "Add the script tag to your website's HTML, preferably before the closing </body> tag.",
                  icon: <Code className="w-6 h-6" />
                },
                {
                  step: "3",
                  title: "Go Live",
                  description: "Your customized Yuno widget will appear on your website instantly!",
                  icon: <Monitor className="w-6 h-6" />
                }
              ].map(({ step, title, description, icon }, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg">
                      {icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
            
            {/* Example Code Block */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Example HTML placement:</h4>
              <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
{`<!DOCTYPE html>
<html>
<head>
  <title>Your Website</title>
</head>
<body>
  ${generateScript()}
</body>
</html>`}
              </pre>
            </div>
          </GlassContainer>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <GlassContainer className="p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Go Live? 🚀
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your widget is perfectly customized! Copy the script tag above and paste it into your website's HTML to start engaging visitors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Join Beta Program
              </Link>
              <Link
                to="/help"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 dark:bg-gray-700/30 backdrop-blur-md border border-white/30 dark:border-gray-600/30 text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-gray-600/40 font-semibold rounded-xl transition-all duration-300"
                >
                Get Help
              </Link>
            </div>
          </GlassContainer>
        </div>
      </div>
      
      {/* --- FLOATING INTERACTIVE WIDGET DEMO (Exact Match to Real Widget) --- */}
      <div className={`fixed ${getPositionClasses()} z-50`}>
        {/* Bubble State - Exact match to real widget */}
        {demoState === 'bubble' && (
          <div
            className="inline-flex items-center cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1"
            style={{
              background: config.accent_color ? 
                `linear-gradient(to right, ${config.primary_color}, ${config.accent_color})` : 
                config.primary_color,
              color: '#ffffff',
              padding: '0 18px',
              height: '44px',
              borderRadius: '22px',
              boxShadow: '0 6px 20px rgba(255, 107, 53, 0.3)',
              fontSize: '14px',
              fontWeight: '600',
              gap: '10px',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}
            onClick={openChat}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
              e.target.style.background = config.accent_color ? 
                `linear-gradient(to right, ${config.accent_color}, ${config.primary_color})` : 
                config.primary_color;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.3)';
              e.target.style.background = config.accent_color ? 
                `linear-gradient(to right, ${config.primary_color}, ${config.accent_color})` : 
                config.primary_color;
            }}
          >
            <span style={{ 
              fontSize: '20px', 
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' 
            }}>
              {config.trigger_icon}
            </span>
            <span style={{ 
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' 
            }}>
              {config.trigger_text}
            </span>
          </div>
        )}

        {/* Teaser State - Exact match to real widget */}
        {demoState === 'teaser' && config.show_teaser && (
          <div className="flex flex-col gap-2 items-end">
            <div
              className="flex items-center gap-2"
              style={{
                background: config.theme === 'dark' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: config.blur_effect ? 'blur(30px)' : 'none',
                borderRadius: config.border_radius,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                padding: '4px',
                border: `1px solid ${config.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                animation: 'slideInUp 0.5s ease-out'
              }}
            >
              <button
                onClick={() => setDemoState('bubble')}
                style={{
                  width: '32px',
                  height: '32px',
                  background: config.theme === 'dark' ? 'rgba(40, 40, 40, 0.8)' : 'rgba(240, 240, 240, 0.8)',
                  color: config.theme === 'dark' ? '#a0a0a0' : '#666666',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '16px',
                  border: 'none',
                  transition: 'background 0.2s ease, color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = config.theme === 'dark' ? 'rgba(60, 60, 60, 0.9)' : 'rgba(220, 220, 220, 0.9)';
                  e.target.style.color = config.theme === 'dark' ? '#ffffff' : '#1a1a1a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = config.theme === 'dark' ? 'rgba(40, 40, 40, 0.8)' : 'rgba(240, 240, 240, 0.8)';
                  e.target.style.color = config.theme === 'dark' ? '#a0a0a0' : '#666666';
                }}
              >
                ×
              </button>
              <div
                style={{
                  flex: '1',
                  background: config.theme === 'dark' ? 'rgba(20, 20, 20, 0.95)' : 'rgba(248, 248, 248, 0.98)',
                  borderRadius: config.border_radius,
                  padding: '8px 12px',
                  fontSize: '14px',
                  color: config.theme === 'dark' ? '#ffffff' : '#1a1a1a'
                }}
              >
                {config.teaser_message}
              </div>
              <button
                onClick={openChat}
                style={{
                  background: config.accent_color ? 
                    `linear-gradient(to right, ${config.primary_color}, ${config.accent_color})` : 
                    config.primary_color,
                  color: '#fff',
                  border: 'none',
                  borderRadius: config.border_radius,
                  padding: '8px 14px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = config.accent_color ? 
                    `linear-gradient(to right, ${config.accent_color}, ${config.primary_color})` : 
                    config.primary_color;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = config.accent_color ? 
                    `linear-gradient(to right, ${config.primary_color}, ${config.accent_color})` : 
                    config.primary_color;
                }}
              >
                {config.trigger_text}
              </button>
            </div>
          </div>
        )}

        {/* Chat State - Exact match to real widget */}
        {demoState === 'chat' && (
          <div
            className="flex flex-col overflow-hidden"
            style={{
              background: config.theme === 'dark' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: config.blur_effect ? 'blur(30px)' : 'none',
              borderRadius: config.border_radius,
              width: config.width,
              maxHeight: config.height,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ' + (config.theme === 'dark' ? 'rgba(255, 107, 53, 0.2)' : 'rgba(0, 0, 0, 0.1)'),
              animation: 'slideIn 0.5s ease-out'
            }}
          >
            {/* Chat Header - Exact match */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: config.theme === 'dark' ? '#ffffff' : '#1a1a1a',
                background: config.theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.98)',
                backdropFilter: config.blur_effect ? 'blur(30px)' : 'none'
              }}
            >
              <span>{config.header_title}</span>
              <button
                onClick={() => setDemoState('bubble')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: config.theme === 'dark' ? '#a0a0a0' : '#666666',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = config.theme === 'dark' ? '#ffffff' : '#1a1a1a';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = config.theme === 'dark' ? '#a0a0a0' : '#666666';
                }}
              >
                ×
              </button>
            </div>

            {/* Powered by Yuno - Exact match */}
            <div
              style={{
                padding: '6px 12px',
                textAlign: 'center',
                fontSize: '11px',
                color: config.theme === 'dark' ? '#a0a0a0' : '#666666',
                background: 'rgba(0, 0, 0, 0.02)',
                borderBottom: `1px solid ${config.theme === 'dark' ? 'rgba(255, 107, 53, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`
              }}
            >
              Powered by <a 
                href="https://helloyuno.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: config.primary_color,
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                }}
              >
                HelloYuno
              </a>
            </div>

            {/* Messages - Exact match */}
            <div 
              className="flex-1 overflow-y-auto p-3"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.type === 'user' ? 'msg user' : 'msg bot'}
                  style={{
                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    marginLeft: msg.type === 'user' ? 'auto' : '0',
                    marginRight: msg.type === 'user' ? '0' : 'auto',
                    width: msg.type === 'user' ? '100%' : 'auto',
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    className="chatbot-bubble"
                    style={{
                      position: 'relative',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      maxWidth: '80%',
                      lineHeight: '1.5',
                      fontSize: '14px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontWeight: '400',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      whiteSpace: 'pre-wrap',
                      background: msg.type === 'user' ? 
                        config.primary_color : 
                        (config.theme === 'dark' ? 'rgba(20, 20, 20, 0.95)' : 'rgba(248, 248, 248, 0.98)'),
                      color: msg.type === 'user' ? 
                        '#ffffff' : 
                        (config.theme === 'dark' ? '#ffffff' : '#1a1a1a'),
                      border: msg.type === 'bot' ? 
                        `1px solid ${config.theme === 'dark' ? 'rgba(255, 107, 53, 0.2)' : 'rgba(0, 0, 0, 0.1)'}` : 
                        'none',
                      display: 'inline-block',
                      textAlign: 'left'
                    }}
                  >
                    {msg.message}
                    {/* Tail for message bubbles */}
                    <div
                      style={{
                        content: '',
                        position: 'absolute',
                        bottom: '-8px',
                        [msg.type === 'user' ? 'right' : 'left']: '20px',
                        borderWidth: '8px 8px 0 8px',
                        borderStyle: 'solid',
                        borderColor: `${msg.type === 'user' ? 
                          config.primary_color : 
                          (config.theme === 'dark' ? 'rgba(20, 20, 20, 0.95)' : 'rgba(248, 248, 248, 0.98)')
                        } transparent transparent transparent`
                      }}
                    />
                  </div>
                </div>
              ))}
              {showTyping && (
                <div className="flex justify-start">
                  <div
                    className="flex items-center gap-1 p-3 rounded-2xl"
                    style={{
                      background: config.theme === 'dark' ? 'rgba(20, 20, 20, 0.95)' : 'rgba(248, 248, 248, 0.98)',
                      border: `1px solid ${config.theme === 'dark' ? 'rgba(255, 107, 53, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`
                    }}
                  >
                    <span style={{ fontSize: '16px', marginRight: '6px' }}>💭</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Row - Exact match */}
            <div
              className="flex"
              style={{
                borderTop: `1px solid ${config.theme === 'dark' ? 'rgba(255, 107, 53, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                background: config.theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.98)',
                backdropFilter: config.blur_effect ? 'blur(30px)' : 'none'
              }}
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendDemoMessage()}
                placeholder={config.placeholder}
                style={{
                  flex: '1',
                  border: 'none',
                  padding: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'transparent',
                  color: config.theme === 'dark' ? '#ffffff' : '#1a1a1a'
                }}
              />
              <button
                onClick={sendDemoMessage}
                style={{
                  background: config.accent_color ? 
                    `linear-gradient(to right, ${config.primary_color}, ${config.accent_color})` : 
                    config.primary_color,
                  color: '#fff',
                  border: 'none',
                  padding: '0 16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = config.accent_color ? 
                    `linear-gradient(to right, ${config.accent_color}, ${config.primary_color})` : 
                    config.primary_color;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = config.accent_color ? 
                    `linear-gradient(to right, ${config.primary_color}, ${config.accent_color})` : 
                    config.primary_color;
                }}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { 
            transform: scale(0.5);
            opacity: 0.5;
          }
          50% { 
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default YunoCustomizerPage;