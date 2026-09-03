import { useState } from 'react';
import { featuredDestinations, categories } from '../data/mockData';
import DestinationCard from './DestinationCard';
import { Compass, Sparkles, X, SearchX } from 'lucide-react';
import './FeaturedDestinations.css';

export default function FeaturedDestinations({ searchTerm = '', onClearSearch }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const query = searchTerm.trim().toLowerCase();

  const filteredDestinations = featuredDestinations.filter((dest) => {
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch = !query ||
      dest.name.toLowerCase().includes(query) ||
      dest.country.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="destinations" className="featured-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="badge">
            <Compass size={14} />
            <span>Curated Portfolio</span>
          </div>

          <h2 className="section-title font-serif">
            Iconic <span className="text-gold-italic">Destinations</span> Across the Globe
          </h2>

          <p className="section-subtitle">
            Immerse yourself in extraordinary landscapes, timeless heritage, and secluded coastal retreats.
          </p>

          {/* Active Search Filter Indicator */}
          {searchTerm.trim() && (
            <div className="active-search-bar">
              <span className="search-result-text">
                Search results for <strong className="text-gold-highlight">"{searchTerm.trim()}"</strong>
              </span>
              <button
                type="button"
                className="clear-search-btn"
                onClick={onClearSearch}
                aria-label="Clear Search"
              >
                <X size={14} />
                <span>Clear search</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="category-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.id === 'all' && <Sparkles size={14} />}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Grid of Destination Cards or Clean Empty State */}
        {filteredDestinations.length > 0 ? (
          <div className="destinations-grid">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="empty-destinations-state glass-panel">
            <div className="empty-icon-wrapper">
              <SearchX size={42} className="empty-icon" />
            </div>
            <h3 className="empty-title font-serif">No destinations found</h3>
            <p className="empty-subtitle">
              Try searching for another destination or adjust your filters.
            </p>
            {searchTerm.trim() && (
              <button type="button" className="clear-search-action-btn" onClick={onClearSearch}>
                <X size={14} />
                <span>Clear Search</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
