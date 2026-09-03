import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Menu, X, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenPlanner }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/#hero' },
    { name: 'Destinations', href: '/#destinations' },
    { name: 'Experiences', href: '/#experiences' },
    { name: 'AI Planner', href: '/#location-explorer', isAi: true }
  ];

  const handleNavClick = (item, e) => {
    if (item.isAi && onOpenPlanner) {
      e.preventDefault();
      onOpenPlanner();
    } else {
      setActiveLink(item.name);
    }
    setMobileMenuOpen(false);
  };

  const handlePlannerClick = () => {
    setMobileMenuOpen(false);
    if (onOpenPlanner) {
      onOpenPlanner();
    } else {
      const el = document.getElementById('location-explorer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Compass className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-name font-display">AURA</span>
            <span className="brand-tagline">JOURNEYS</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav-desktop">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`nav-link ${activeLink === item.name ? 'active' : ''} ${item.isAi ? 'ai-pill' : ''}`}
              onClick={(e) => handleNavClick(item, e)}
            >
              {item.isAi && <Sparkles size={14} className="sparkle-icon" />}
              {item.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="navbar-actions">
          <button className="btn-plan-trip" onClick={handlePlannerClick}>
            <Sparkles size={16} />
            <span>Plan with AI</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="mobile-brand font-display">AURA</span>
          <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="mobile-drawer-links">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`mobile-nav-link ${activeLink === item.name ? 'active' : ''}`}
              onClick={(e) => handleNavClick(item, e)}
            >
              {item.isAi && <Sparkles size={18} className="sparkle-icon" />}
              <span>{item.name}</span>
            </a>
          ))}
          <button 
            className="btn-plan-trip-mobile"
            onClick={handlePlannerClick}
          >
            <Sparkles size={18} />
            <span>Launch AI Itinerary</span>
          </button>
        </div>
      </div>
    </header>
  );
}
