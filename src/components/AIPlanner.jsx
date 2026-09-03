import { useState, useEffect } from 'react';
import { Sparkles, X, Compass, Loader2, RefreshCw, AlertCircle, ArrowLeft, Check, Calendar, Sun, Sunset, Moon } from 'lucide-react';
import { featuredDestinations } from '../data/mockData';
import { generateAuraItinerary } from '../services/geminiService';
import './AIPlanner.css';

const DURATIONS = ['3 Days', '5 Days', '7 Days', '10 Days'];
const INTERESTS_OPTIONS = ['Nature', 'Adventure', 'Culture', 'Food', 'Relaxation', 'Photography'];
const STYLES_OPTIONS = ['Relaxed', 'Balanced', 'Adventure'];

export default function AIPlanner({ initialDestination, isOpen, onClose }) {
  const [selectedDestId, setSelectedDestId] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('3 Days');
  const [selectedInterests, setSelectedInterests] = useState(['Nature', 'Adventure']);
  const [selectedStyle, setSelectedStyle] = useState('Balanced');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [itineraryResult, setItineraryResult] = useState(null);

  // Sync preselected destination when modal opens or initialDestination changes
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (initialDestination) {
          setSelectedDestId(initialDestination.id || initialDestination.slug);
        } else if (featuredDestinations.length > 0) {
          setSelectedDestId(featuredDestinations[0].id);
        }
        setError(null);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialDestination]);

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentDestination =
    featuredDestinations.find((d) => d.id === selectedDestId || d.slug === selectedDestId) ||
    featuredDestinations[0];

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerateItinerary = async () => {
    if (!currentDestination || loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await generateAuraItinerary(
        currentDestination,
        selectedDuration,
        selectedInterests,
        selectedStyle
      );
      setItineraryResult(result);
    } catch (err) {
      console.warn('AI Planner Error:', err);
      setError(err.message || 'Unable to generate itinerary. Please verify your Gemini API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setItineraryResult(null);
    setError(null);
  };

  const renderFormattedItinerary = (text) => {
    if (!text) return null;

    const lines = text.split(/\r?\n/);
    const elements = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const formatBold = (str) => {
        const parts = str.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
          }
          return part;
        });
      };

      // Day Heading match (e.g. Day 1, ## Day 2, Day 3: Explorer)
      if (/^(#*\s*)?Day\s+\d+/i.test(trimmed)) {
        const cleanDayTitle = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '');
        elements.push(
          <div key={`day-${idx}`} className="itinerary-day-header font-serif">
            <Calendar size={18} className="icon-gold" />
            <span>{cleanDayTitle}</span>
          </div>
        );
        return;
      }

      // Time of day markers (Morning / Afternoon / Evening)
      if (/^(#*\s*)?\*?\*?(Morning|Afternoon|Evening)\*?\*?:?/i.test(trimmed)) {
        const match = trimmed.match(/(Morning|Afternoon|Evening)/i);
        const timePeriod = match ? match[1] : 'Activity';
        const cleanTimeText = trimmed.replace(/^(#*\s*)?\*?\*?(Morning|Afternoon|Evening)\*?\*?:?\s*/i, '');

        let timeIcon = <Sun size={15} className="icon-gold" />;
        if (timePeriod.toLowerCase() === 'afternoon') timeIcon = <Sunset size={15} className="icon-gold" />;
        if (timePeriod.toLowerCase() === 'evening') timeIcon = <Moon size={15} className="icon-gold" />;

        elements.push(
          <div key={`time-${idx}`} className="itinerary-time-block glass-panel">
            <div className="time-block-label">
              {timeIcon}
              <span>{timePeriod}</span>
            </div>
            <div className="time-block-body">
              {cleanTimeText ? formatBold(cleanTimeText) : null}
            </div>
          </div>
        );
        return;
      }

      // Bullet points
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const cleanBulletText = trimmed.replace(/^[-*]\s+/, '');
        elements.push(
          <li key={`bullet-${idx}`} className="itinerary-bullet">
            {formatBold(cleanBulletText)}
          </li>
        );
        return;
      }

      // Paragraph
      elements.push(
        <p key={`p-${idx}`} className="itinerary-paragraph">
          {formatBold(line)}
        </p>
      );
    });

    return elements;
  };

  return (
    <div className="aura-planner-overlay" onClick={onClose}>
      <div className="aura-planner-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="planner-header">
          <div className="planner-title-group">
            <div className="planner-bot-icon">
              <Compass size={22} className="sparkle-gold" />
            </div>
            <div>
              <h3 className="planner-title font-serif">AURA AI</h3>
              <span className="planner-subtitle">AI TRIP PLANNER</span>
            </div>
          </div>

          <button className="planner-close-btn" onClick={onClose} aria-label="Close Planner">
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="planner-body">
          {loading ? (
            /* Loading State */
            <div className="planner-loading-view">
              <Loader2 size={42} className="spin-loader sparkle-gold" />
              <h4 className="loading-title font-serif">Crafting Custom Itinerary...</h4>
              <p className="loading-subtext">
                AURA AI is designing a bespoke {selectedDuration} {selectedStyle.toLowerCase()} journey to {currentDestination?.name} tailored to {selectedInterests.join(', ')}.
              </p>
            </div>
          ) : itineraryResult ? (
            /* Result View */
            <div className="planner-result-view">
              <div className="result-banner glass-panel">
                <div className="banner-top">
                  <span className="result-badge">
                    <Sparkles size={13} /> AURA AI ITINERARY
                  </span>
                  <span className="result-duration">{selectedDuration} • {selectedStyle}</span>
                </div>
                <h2 className="result-dest font-serif">{currentDestination?.name}</h2>
                <p className="result-meta">{currentDestination?.country} • {selectedInterests.join(' • ')}</p>
              </div>

              <div className="result-content-scroll">
                {renderFormattedItinerary(itineraryResult)}
              </div>

              <div className="result-actions-bar">
                <button
                  className="btn-planner-action btn-regenerate"
                  onClick={handleGenerateItinerary}
                  disabled={loading}
                >
                  <RefreshCw size={15} />
                  <span>Regenerate Itinerary</span>
                </button>

                <button
                  className="btn-planner-action btn-startover"
                  onClick={handleStartOver}
                >
                  <ArrowLeft size={15} />
                  <span>Start Over</span>
                </button>

                <button
                  className="btn-planner-action btn-close-modal"
                  onClick={onClose}
                >
                  <X size={15} />
                  <span>Close</span>
                </button>
              </div>
            </div>
          ) : (
            /* Form Step 1 */
            <div className="planner-form-view">
              {/* Error Alert */}
              {error && (
                <div className="planner-error-card">
                  <AlertCircle size={18} />
                  <div className="error-text">
                    <strong>Itinerary Generation Error</strong>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* 1. Destination Selector */}
              <div className="form-section">
                <label className="form-label font-serif">Select Destination:</label>
                <div className="dest-chips-grid">
                  {featuredDestinations.map((dest) => (
                    <button
                      key={dest.id}
                      className={`dest-chip ${selectedDestId === dest.id || selectedDestId === dest.slug ? 'active' : ''}`}
                      onClick={() => setSelectedDestId(dest.id)}
                    >
                      <span>{dest.name}</span>
                      {selectedDestId === dest.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Duration Selector */}
              <div className="form-section">
                <label className="form-label font-serif">Trip Duration:</label>
                <div className="option-row">
                  {DURATIONS.map((dur) => (
                    <button
                      key={dur}
                      className={`option-btn ${selectedDuration === dur ? 'active' : ''}`}
                      onClick={() => setSelectedDuration(dur)}
                    >
                      <span>{dur}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Interests Multi-select */}
              <div className="form-section">
                <label className="form-label font-serif">Interests (Select Multiple):</label>
                <div className="option-row wrap">
                  {INTERESTS_OPTIONS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        className={`option-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => toggleInterest(interest)}
                      >
                        <span>{interest}</span>
                        {isSelected && <Check size={13} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Travel Style */}
              <div className="form-section">
                <label className="form-label font-serif">Travel Style / Pacing:</label>
                <div className="option-row">
                  {STYLES_OPTIONS.map((style) => (
                    <button
                      key={style}
                      className={`option-btn ${selectedStyle === style ? 'active' : ''}`}
                      onClick={() => setSelectedStyle(style)}
                    >
                      <span>{style}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-submit-row">
                <button
                  className="btn-generate-itinerary"
                  onClick={handleGenerateItinerary}
                  disabled={!currentDestination || loading}
                >
                  <Sparkles size={18} />
                  <span>Generate My Itinerary</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
