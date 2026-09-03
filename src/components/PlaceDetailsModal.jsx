import { useEffect, useState } from 'react';
import { X, Star, MapPin, Phone, Clock, ExternalLink, Globe, Loader2, Sparkles } from 'lucide-react';
import { getPlaceDetails } from '../services/googlePlacesService';
import './PlaceDetailsModal.css';

export default function PlaceDetailsModal({ place, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const placeId = place?.placeId || place?.id;

    getPlaceDetails(placeId).then((data) => {
      if (isMounted) {
        setDetails(data);
        setLoading(false);
      }
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [place, onClose]);

  if (!place) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-glass-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close details">
          <X size={20} />
        </button>

        {loading ? (
          <div className="modal-loading-box">
            <Loader2 size={36} className="spin-loader icon-gold" />
            <p>Fetching Google Place Details...</p>
          </div>
        ) : (
          <div className="modal-body">
            {/* Header Banner */}
            <div className="modal-header-section">
              <div className="modal-badge-row">
                <span className="modal-category-chip">
                  <Sparkles size={12} /> Google Places API
                </span>
                {details?.rating && (
                  <span className="modal-rating-chip">
                    <Star size={13} fill="#eab308" color="#eab308" />
                    <span>{details.rating}</span>
                    <span className="count">({details.reviewsCount})</span>
                  </span>
                )}
              </div>

              <h2 className="modal-title font-serif">{details?.title || place.title}</h2>

              <p className="modal-address">
                <MapPin size={15} className="pin-icon" />
                <span>{details?.address || place.location}</span>
              </p>
            </div>

            {/* Editorial Summary */}
            <div className="modal-section">
              <h3 className="modal-subheading font-serif">Overview</h3>
              <p className="modal-summary-text">{details?.summary || place.description}</p>
            </div>

            {/* Info Grid */}
            <div className="modal-info-grid">
              {details?.phone && details.phone !== 'N/A' && (
                <div className="modal-info-box">
                  <Phone size={18} className="icon-gold" />
                  <div className="info-text">
                    <span className="label">Contact Phone</span>
                    <span className="val">{details.phone}</span>
                  </div>
                </div>
              )}

              {details?.openingHours && details.openingHours.length > 0 && (
                <div className="modal-info-box full-width">
                  <Clock size={18} className="icon-gold" />
                  <div className="info-text">
                    <span className="label">Opening Hours</span>
                    <ul className="hours-list">
                      {details.openingHours.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Action Links */}
            <div className="modal-actions-row">
              {details?.googleMapsUri && (
                <a
                  href={details.googleMapsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modal-action btn-maps"
                >
                  <MapPin size={16} />
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              )}

              {details?.websiteUri && (
                <a
                  href={details.websiteUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modal-action btn-website"
                >
                  <Globe size={16} />
                  <span>Official Website</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
