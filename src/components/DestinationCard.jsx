import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Clock, Thermometer, ArrowUpRight } from 'lucide-react';
import { usePexelsImage } from '../hooks/usePexelsImage';
import './DestinationCard.css';

export default function DestinationCard({ destination }) {
  const [isSaved, setIsSaved] = useState(false);
  const { imageSrc } = usePexelsImage(destination?.name, destination?.image);

  return (
    <div className="destination-card">
      {/* Image Container with Hover Scale */}
      <div className="card-image-wrapper">
        <img
          src={imageSrc}
          alt={destination?.name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = destination?.image;
          }}
        />
        <div className="card-image-overlay"></div>

        {/* Top Badges */}
        <div className="card-top-badges">
          <span className="card-category-badge">{destination.badge || destination.category}</span>
          <button
            className={`card-bookmark-btn ${isSaved ? 'saved' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            aria-label="Save Destination"
          >
            <Heart size={16} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : '#ffffff'} />
          </button>
        </div>

        {/* Quick Info Tags */}
        <div className="card-floating-info">
          {destination.temperature && (
            <div className="info-chip">
              <Thermometer size={13} className="chip-icon" />
              <span>{destination.temperature}</span>
            </div>
          )}
          {destination.duration && (
            <div className="info-chip">
              <Clock size={13} className="chip-icon" />
              <span>{destination.duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div className="card-header-row">
          <div>
            <span className="card-country">{destination.country}</span>
            <h3 className="card-title font-serif">{destination.name}</h3>
          </div>
          <div className="card-rating">
            <Star size={14} fill="#eab308" color="#eab308" />
            <span className="rating-score">{destination.rating}</span>
            {destination.reviewsCount && (
              <span className="rating-count">({destination.reviewsCount})</span>
            )}
          </div>
        </div>

        <p className="card-description">{destination.description}</p>

        <div className="card-footer-row">
          {destination.priceFrom ? (
            <div className="card-pricing">
              <span className="price-label">Starting from</span>
              <span className="price-value">{destination.priceFrom}</span>
            </div>
          ) : (
            <div className="card-pricing">
              <span className="price-label">Category</span>
              <span className="price-value" style={{ textTransform: 'capitalize' }}>
                {destination.category}
              </span>
            </div>
          )}

          <Link to={`/destination/${destination.slug || destination.id}`} className="card-explore-btn">
            <span>Details</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
