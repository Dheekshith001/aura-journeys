import { useEffect, useRef } from 'react';
import { ChevronDown, Globe2 } from 'lucide-react';
import DestinationSearch from './DestinationSearch';
import './Hero.css';

export default function Hero({ searchTerm, onSearch }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented by browser:', err);
      });
    }
  }, []);

  const scrollToDestinations = () => {
    const section = document.getElementById('destinations');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background Travel Video Container */}
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/custom-hero-video.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Dark Gradient Overlay for Text Legibility */}
        <div className="hero-montage-overlay"></div>
      </div>

      {/* Hero Content Container */}
      <div className="container hero-content">
        <div className="hero-badge-wrapper">
          <div className="badge">
            <Globe2 size={14} />
            <span>Design-Led Travel & AI Planning</span>
          </div>
        </div>

        <h1 className="hero-title font-serif">
          Unveil the World’s Most <span className="text-gold-italic">Captivating</span> Horizons
        </h1>

        <p className="hero-subtitle">
          Experience bespoke luxury itineraries, handpicked sanctuary retreats, and intelligent location discovery tailored to your sense of wanderlust.
        </p>

        {/* Prominent Search Bar */}
        <DestinationSearch searchTerm={searchTerm} onSearch={onSearch} />

        {/* Scroll Down Indicator */}
        <div className="scroll-indicator" onClick={scrollToDestinations}>
          <span className="scroll-text">Explore Destinations</span>
          <div className="scroll-arrow">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}
