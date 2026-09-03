import { useState } from 'react';
import { Compass, Send, CheckCircle2, Heart, Globe, Share2, Mail, MessageCircle } from 'lucide-react';
import './Footer.css';

export default function Footer({ onOpenPlanner }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="footer" className="site-footer">
      <div className="container">
        {/* Top Newsletter Section */}
        <div className="footer-newsletter-banner glass-panel">
          <div className="newsletter-text">
            <h3 className="newsletter-title font-serif">
              Join the <span className="text-gold-italic">AURA Collective</span>
            </h3>
            <p className="newsletter-sub">
              Receive secret travel drops, private villa offers, and AI trip planning updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            {subscribed ? (
              <div className="subscribe-success">
                <CheckCircle2 size={18} className="icon-emerald" />
                <span>Thank you for subscribing to AURA!</span>
              </div>
            ) : (
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="btn-subscribe">
                  <span>Join</span>
                  <Send size={15} />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Footer Links Grid */}
        <div className="footer-links-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <a href="#hero" className="footer-brand">
              <Compass className="brand-icon" />
              <span className="brand-name font-display">AURA</span>
            </a>
            <p className="footer-brand-desc">
              Design-led travel platform creating hyper-personalized AI itineraries and luxury editorial journeys across 120+ countries.
            </p>
            <div className="social-links">
              <a href="#hero" className="social-icon-btn" aria-label="Global Community"><Globe size={18} /></a>
              <a href="#hero" className="social-icon-btn" aria-label="Share Stories"><Share2 size={18} /></a>
              <a href="#hero" className="social-icon-btn" aria-label="Newsletter"><Mail size={18} /></a>
              <a href="#hero" className="social-icon-btn" aria-label="Community Chat"><MessageCircle size={18} /></a>
            </div>
          </div>

          {/* Useful Navigation Links Column 1 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Destinations</h4>
            <ul className="footer-menu">
              <li><a href="#destinations">Santorini, Greece</a></li>
              <li><a href="#destinations">Kyoto, Japan</a></li>
              <li><a href="#destinations">Amalfi Coast, Italy</a></li>
              <li><a href="#destinations">Banff, Canada</a></li>
              <li><a href="#destinations">Bora Bora, Tahiti</a></li>
            </ul>
          </div>

          {/* Useful Navigation Links Column 2 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-menu">
              <li><a href="#hero">Home</a></li>
              <li><a href="#destinations">Featured Destinations</a></li>
              <li><a href="#location-explorer">Location Explorer</a></li>
              <li><a href="#experiences">Popular Experiences</a></li>
              <li>
                <a
                  href="#location-explorer"
                  onClick={(e) => {
                    if (onOpenPlanner) {
                      e.preventDefault();
                      onOpenPlanner();
                    }
                  }}
                >
                  AI Planner
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} AURA Travel Technologies Inc. All rights reserved.
          </p>
          <p className="crafted-text">
            Crafted with <Heart size={13} fill="#ef4444" color="#ef4444" /> for modern wanderers.
          </p>
        </div>
      </div>
    </footer>
  );
}
