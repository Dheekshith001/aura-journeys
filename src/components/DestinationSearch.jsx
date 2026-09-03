import { useState, useEffect } from 'react';
import { MapPin, Search, Sparkles } from 'lucide-react';
import './DestinationSearch.css';

export default function DestinationSearch({ searchTerm = '', onSearch }) {
  const [destination, setDestination] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDestination(searchTerm);
    }, 0);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const triggerSearch = (query) => {
    if (onSearch) {
      onSearch(query);
    } else {
      const target = document.getElementById('destinations');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerSearch(destination);
  };

  const handleTagClick = (tag) => {
    setDestination(tag);
    triggerSearch(tag);
  };

  return (
    <div className="destination-search-wrapper">
      <form onSubmit={handleSubmit} className="destination-search-form glass-panel">
        {/* Single Clean Destination Search Field */}
        <div className="search-field">
          <div className="field-icon">
            <MapPin size={22} className="icon-gold" />
          </div>
          <input
            type="text"
            placeholder="Search a destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="search-input"
            aria-label="Search destination"
          />
        </div>

        {/* Gold Explore Button */}
        <button type="submit" className="search-submit-btn">
          <Search size={18} />
          <span className="btn-text">Explore</span>
        </button>
      </form>

      {/* Quick Search Tag Suggestions */}
      <div className="search-tags">
        <span className="tags-label"><Sparkles size={13} /> Popular right now:</span>
        <button type="button" className="tag-pill" onClick={() => handleTagClick('Swiss Alps')}>Swiss Alps</button>
        <button type="button" className="tag-pill" onClick={() => handleTagClick('Machu Picchu')}>Machu Picchu</button>
        <button type="button" className="tag-pill" onClick={() => handleTagClick('Mount Everest')}>Mount Everest</button>
        <button type="button" className="tag-pill" onClick={() => handleTagClick('Bora Bora')}>Bora Bora</button>
      </div>
    </div>
  );
}
