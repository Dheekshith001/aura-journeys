import { useState } from 'react';
import { popularPlaces } from '../data/mockData';
import PlaceCard from './PlaceCard';
import PlaceDetailsModal from './PlaceDetailsModal';
import { Sparkles } from 'lucide-react';
import './PopularPlaces.css';

export default function PopularPlaces() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <section id="experiences" className="experiences-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="badge">
            <Sparkles size={14} />
            <span>Unrivaled Experiences</span>
          </div>

          <h2 className="section-title font-serif">
            Popular <span className="text-gold-italic">Places</span>
          </h2>

          <p className="section-subtitle">
            Discover handpicked bucket-list destinations and iconic travel experiences.
          </p>
        </div>

        {/* Grid of Places */}
        <div className="places-grid">
          {popularPlaces.map((place) => (
            <PlaceCard
              key={place.id || place.placeId}
              place={place}
              onExplore={(p) => setSelectedPlace(p)}
            />
          ))}
        </div>

        {/* Place Details Modal */}
        {selectedPlace && (
          <PlaceDetailsModal
            place={selectedPlace}
            onClose={() => setSelectedPlace(null)}
          />
        )}
      </div>
    </section>
  );
}

