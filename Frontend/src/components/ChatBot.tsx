import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Badge from './Badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'data' | 'chart';
  data?: any;
}

const ChatBot: React.FC = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm MOTOBOT, your virtual VFD assistant. I can help you with motor diagnostics, fault analysis, and system monitoring. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    "What is the current fault?",
    "Show last 5 alerts",
    "Explain UVF fault",
    "Show system status"
  ];

  // Mock sensor data for responses
  const mockSensorData = {
    current: { ia: 12.5, ib: 12.3, ic: 12.7 },
    voltage: { vab: 415.2 },
    speed: 1450,
    motorStatus: 'Healthy',
    lastFault: 'Under Voltage',
    confidence: 93.21
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('current fault') || message.includes('fault detected')) {
      return `The current system status shows: **${mockSensorData.lastFault}** detected with ${mockSensorData.confidence}% confidence. The motor is currently **${mockSensorData.motorStatus}**. Would you like me to explain this fault type or show you the sensor readings?`;
    }
    
    if (message.includes('motor status') || message.includes('system status')) {
      return `**Current Motor Status:** ${mockSensorData.motorStatus}\n\n**Live Sensor Readings:**\n• Phase A Current: ${mockSensorData.current.ia}A\n• Phase B Current: ${mockSensorData.current.ib}A\n• Phase C Current: ${mockSensorData.current.ic}A\n• Voltage (Vab): ${mockSensorData.voltage.vab}V\n• Speed: ${mockSensorData.speed} rad/s\n\nAll parameters are within normal operating ranges.`;
    }
    
    if (message.includes('uvf') || message.includes('under voltage')) {
      return `**Under Voltage Fault (UVF)** occurs when the supply voltage drops below the acceptable threshold (typically <380V).\n\n**Causes:**\n• Power supply issues\n• Grid voltage fluctuations\n• Loose connections\n\n**Effects:**\n• Reduced motor torque\n• Potential motor damage\n• System shutdown for protection\n\nThe ML model detects this by analyzing voltage patterns and current signatures.`;
    }
    
    if (message.includes('ovf') || message.includes('over voltage')) {
      return `**Over Voltage Fault (OVF)** happens when voltage exceeds safe limits (typically >450V).\n\n**Causes:**\n• Grid voltage spikes\n• Regenerative braking\n• Capacitor bank switching\n\n**Protection:** The system automatically triggers emergency shutdown to prevent equipment damage.`;
    }
    
    if (message.includes('ptpf') || message.includes('phase to phase')) {
      return `**Phase-to-Phase Fault (PTPF)** is a short circuit between two phases.\n\n**Symptoms:**\n• Unbalanced currents\n• Voltage distortion\n• Excessive heat generation\n\n**Detection:** Our ML model analyzes current waveform patterns to identify this fault with high accuracy.`;
    }
    
    if (message.includes('ptgf') || message.includes('phase to ground')) {
      return `**Phase-to-Ground Fault (PTGF)** occurs when a phase conductor contacts ground.\n\n**Indicators:**\n• Ground fault current\n• Voltage imbalance\n• Insulation breakdown\n\n**Action:** Immediate system shutdown to prevent electrical hazards.`;
    }
    
    if (message.includes('overload') || message.includes('olf')) {
      return `**Overload Fault (OLF)** happens when motor current exceeds rated capacity.\n\n**Common Causes:**\n• Mechanical overload\n• Blocked rotor\n• Voltage imbalance\n\n**Current Limits:** Ia, Ib, Ic should stay below 20A for this motor.`;
    }
    
    if (message.includes('ml model') || message.includes('machine learning')) {
      return `Our **ML Classification System** uses a trained model (model_v3.pkl) that analyzes:\n\n• Current waveforms (Ia, Ib, Ic)\n• Voltage patterns (Vab)\n• Speed variations\n• Frequency domain features\n\nThe model classifies 6 fault types: NOM, UVF, OVF, PTPF, PTGF, OLF with real-time confidence scoring.`;
    }
    
    if (message.includes('alerts') || message.includes('last 5')) {
      return `**Recent System Alerts:**\n\n🟡 10:03:45 - Under Voltage (Warning)\n🔴 09:45:22 - Phase Imbalance (Critical)\n🟡 09:30:15 - Overload (Warning)\n🟢 09:15:30 - System Normal (Info)\n🟡 08:45:10 - Voltage Fluctuation (Warning)\n\nWould you like details on any specific alert?`;
    }
    
    if (message.includes('team') || message.includes('built') || message.includes('developer')) {
      return `This **VFD Fault Diagnostic System** was developed by:\n\n👨‍💻 **Yashodip More** - Project Lead & ML Engineer\n👩‍💻 **Komal Kumavat** - Frontend Developer & UI/UX\n👩‍💻 **Priya Sharma** - Backend Developer\n👨‍💻 **Rahul Singh** - Hardware Integration\n\nWe're passionate about creating intelligent industrial monitoring solutions!`;
    }
    
    if (message.includes('help') || message.includes('commands')) {
      return `I can help you with:\n\n🔍 **Diagnostics:** Current faults, sensor readings, system status\n📊 **Analytics:** Historical data, trends, alerts\n🧠 **ML Insights:** Model predictions, fault explanations\n⚙️ **Controls:** Motor operations, emergency procedures\n👥 **Support:** Team info, technical documentation\n\nTry asking: "What's the motor status?" or "Explain UVF fault"`;
    }
    
    if (message.includes('voltage') && message.includes('speed')) {
      return `**Current Readings:**\n• Voltage (Vab): ${mockSensorData.voltage.vab}V ✅\n• Motor Speed: ${mockSensorData.speed} rad/s ✅\n\nBoth parameters are within normal operating ranges. The voltage is stable and speed is at rated value.`;
    }
    
    // Default fallback
    return `I didn't quite understand that. I'm specialized in VFD diagnostics and motor monitoring. Try asking about:\n\n• Motor status or faults\n• Sensor readings\n• Fault explanations (UVF, OVF, PTPF, etc.)\n• System alerts\n• ML model information\n\nOr use one of the suggestions below! 🤖`;
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // If chat is closed, increment unread count
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }

      // Text-to-speech if enabled
      if (voiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botResponse.text.replace(/\*\*/g, '').replace(/\n/g, ' '));
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text: string) => {
    // Convert markdown-style formatting to JSX
    return text.split('\n').map((line, index) => (
      <div key={index}>
        {line.split('**').map((part, i) => 
          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        )}
      </div>
    ));
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
          
          {unreadCount > 0 && !isOpen && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className={`fixed bottom-0 right-6 w-96 h-[600px] rounded-t-xl shadow-2xl border-l border-t border-r z-40 flex flex-col ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <div className={`p-4 border-b rounded-t-xl ${
            isDark ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🤖</span>
                </div>
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    MOTOBOT
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your Virtual VFD Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`p-2 rounded-lg transition-colors ${
                    voiceEnabled 
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? isDark 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-600 text-white'
                      : isDark
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {formatMessage(message.text)}
                  </div>
                  <div className={`text-xs mt-1 opacity-70`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark ? 'bg-gray-400' : 'bg-gray-500'
                    }`} style={{ animationDelay: '0ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark ? 'bg-gray-400' : 'bg-gray-500'
                    }`} style={{ animationDelay: '150ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDark ? 'bg-gray-400' : 'bg-gray-500'
                    }`} style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className={`px-4 py-2 border-t ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(suggestion)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask MOTOBOT anything..."
                className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className={`p-2 rounded-lg transition-colors ${
                  inputText.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : isDark
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;