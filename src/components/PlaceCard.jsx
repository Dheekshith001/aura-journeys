import { useState } from 'react';
import { Star, Heart, MapPin, Clock, ArrowRight } from 'lucide-react';
import { usePexelsImage } from '../hooks/usePexelsImage';
import './PlaceCard.css';

export default function PlaceCard({ place, onExplore }) {
  const [isLiked, setIsLiked] = useState(false);
  const { imageSrc } = usePexelsImage(place?.title || place?.destination, place?.image);

  return (
    <div className="place-card">
      <div className="place-image-container">
        <img
          src={imageSrc}
          alt={place?.title}
          className="place-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = place?.image;
          }}
        />
        <div className="place-image-gradient"></div>

        <span className="place-category-tag">{place.category}</span>

        <button
          className={`place-like-btn ${isLiked ? 'liked' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
          aria-label="Bookmark Experience"
        >
          <Heart size={16} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : '#ffffff'} />
        </button>
      </div>

      <div className="place-card-body">
        <div className="place-location-row">
          <MapPin size={13} className="location-pin" />
          <span>{place.location}</span>
        </div>

        <h3 className="place-title font-serif">{place.title}</h3>

        {/* Highlights List */}
        {place.highlights && place.highlights.length > 0 && (
          <div className="place-highlights">
            {place.highlights.map((h, i) => (
              <span key={i} className="highlight-pill">• {h}</span>
            ))}
          </div>
        )}

        <div className="place-footer-row">
          <div className="place-meta">
            <div className="meta-item">
              <Star size={13} fill="#eab308" color="#eab308" />
              <span className="meta-val">{place.rating}</span>
            </div>
            {place.duration && (
              <>
                <span className="meta-sep">•</span>
                <div className="meta-item">
                  <Clock size={13} className="icon-subtle" />
                  <span className="meta-val">{place.duration}</span>
                </div>
              </>
            )}
          </div>

          {place.price ? (
            <div className="place-price-tag">
              <span className="price-num">{place.price}</span>
              <span className="price-person">/ person</span>
            </div>
          ) : (
            <button
              className="card-explore-btn"
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.825rem' }}
              onClick={() => onExplore && onExplore(place)}
            >
              <span>Explore</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
