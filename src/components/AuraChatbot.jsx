import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Loader2, Bot, User, RefreshCw, MapPin, Compass, AlertCircle } from 'lucide-react';
import { askAuraAI } from '../services/geminiService';
import './AuraChatbot.css';

const SUGGESTED_QUESTIONS = [
  "What's the best time to visit?",
  "What should I pack?",
  "What are the must-see places?",
  "What local food should I try?"
];

let messageIdCounter = 0;
function generateUniqueId(prefix = 'msg') {
  messageIdCounter += 1;
  return `${prefix}-${messageIdCounter}`;
}

export default function AuraChatbot({ destination, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Sync initial message whenever modal opens for a new destination
  const activeDestKey = destination ? `${destination.name}-${destination.country}` : '';
  const prevDestKeyRef = useRef('');

  useEffect(() => {
    if (isOpen && destination && prevDestKeyRef.current !== activeDestKey) {
      prevDestKeyRef.current = activeDestKey;
      const initialGreeting = {
        id: `welcome-${destination.name}`,
        sender: 'ai',
        text: `Welcome to **${destination.name}** (${destination.country || 'Global'})! I am **AURA AI**, your luxury travel concierge. Ask me anything about local attractions, best seasons, packing advice, or dining highlights.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const timer = setTimeout(() => {
        setMessages([initialGreeting]);
        setError(null);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, destination, activeDestKey]);

  // Auto-scroll to newest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !destination) return null;

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputValue.trim();
    if (!query || loading) return;

    const userMessage = {
      id: generateUniqueId('user'),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setLoading(true);
    setError(null);

    try {
      const aiResponse = await askAuraAI(query, destination, messages);
      const aiMessage = {
        id: generateUniqueId('ai'),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.warn('AURA AI Chat Error:', err);
      setError(err.message || 'Unable to connect to Gemini AI. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderFormattedText = (text) => {
    if (!text) return null;

    const lines = text.split(/\r?\n/);

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="msg-spacing" />;

      const formatLineContent = (str) => {
        const parts = str.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
          }
          return part;
        });
      };

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const cleanBulletText = trimmed.replace(/^[-*]\s+/, '');
        return (
          <li key={idx} className="msg-bullet">
            {formatLineContent(cleanBulletText)}
          </li>
        );
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        const cleanNumText = trimmed.replace(/^\d+\.\s+/, '');
        return (
          <li key={idx} className="msg-bullet numbered">
            {formatLineContent(cleanNumText)}
          </li>
        );
      }

      if (trimmed.startsWith('#')) {
        const cleanHeadingText = trimmed.replace(/^#+\s*/, '');
        return (
          <h4 key={idx} className="msg-heading font-serif" style={{ color: 'var(--accent-gold)', margin: '0.6rem 0 0.25rem 0' }}>
            {formatLineContent(cleanHeadingText)}
          </h4>
        );
      }

      return (
        <p key={idx} className="msg-paragraph">
          {formatLineContent(line)}
        </p>
      );
    });
  };

  return (
    <div className="aura-chat-overlay" onClick={onClose}>
      <div className="aura-chat-drawer glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Chatbot Header */}
        <div className="aura-chat-header">
          <div className="aura-header-info">
            <div className="aura-bot-avatar">
              <Sparkles size={20} className="sparkle-gold" />
            </div>
            <div>
              <div className="aura-title-row">
                <h3 className="aura-bot-name font-serif">AURA AI</h3>
                <span className="aura-badge-live">Gemini 2.5 Flash</span>
              </div>
              <p className="aura-destination-subtitle">
                <MapPin size={13} className="pin-icon" />
                <span>{destination.name}, {destination.country}</span>
              </p>
            </div>
          </div>

          <button className="aura-chat-close-btn" onClick={onClose} aria-label="Close Chat">
            <X size={20} />
          </button>
        </div>

        {/* Suggested Question Chips */}
        <div className="aura-chips-bar">
          <span className="chips-label">Quick Suggestions:</span>
          <div className="chips-scroll">
            {SUGGESTED_QUESTIONS.map((chip, idx) => (
              <button
                key={idx}
                className="chip-btn"
                onClick={() => handleSendMessage(chip)}
                disabled={loading}
              >
                <Compass size={12} />
                <span>{chip}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message History Area */}
        <div className="aura-chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
              <div className="message-avatar">
                {msg.sender === 'ai' ? (
                  <Bot size={16} className="icon-ai" />
                ) : (
                  <User size={16} className="icon-user" />
                )}
              </div>

              <div className="message-bubble">
                <div className="message-content">
                  {renderFormattedText(msg.text)}
                </div>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="chat-message-row ai loading-state">
              <div className="message-avatar">
                <Bot size={16} className="icon-ai" />
              </div>
              <div className="message-bubble loading-bubble">
                <Loader2 size={18} className="spin-loader icon-gold" />
                <span>AURA AI is thinking...</span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="chat-error-card">
              <AlertCircle size={18} />
              <div className="error-text-content">
                <strong>AI Service Notification</strong>
                <p>{error}</p>
              </div>
              <button
                className="btn-retry-chat"
                onClick={() => handleSendMessage(messages[messages.length - 1]?.text)}
              >
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Text Input Area */}
        <div className="aura-chat-input-area">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="aura-input-form"
          >
            <input
              type="text"
              placeholder={`Ask AURA AI about ${destination.name}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="aura-chat-input"
              disabled={loading}
            />
            <button
              type="submit"
              className="aura-send-btn"
              disabled={!inputValue.trim() || loading}
              aria-label="Send Message"
            >
              {loading ? <Loader2 size={18} className="spin-loader" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
