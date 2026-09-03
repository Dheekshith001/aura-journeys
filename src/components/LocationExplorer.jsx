import { useState } from 'react';
import { MapPin, Navigation, Search, Loader2, Sparkles, Compass, CheckCircle2, AlertCircle, ArrowRight, Star, X } from 'lucide-react';
import { searchNearbyPlaces, searchPlacesByCity } from '../services/googlePlacesService';
import PlaceDetailsModal from './PlaceDetailsModal';
import { usePexelsImage } from '../hooks/usePexelsImage';
import './LocationExplorer.css';

function NearbyExplorerCard({ item, onExplore }) {
  const { imageSrc } = usePexelsImage(item?.title || item?.name, item?.image);

  return (
    <div className="nearby-card glass-panel" style={{ borderRadius: '1rem', overflow: 'hidden', padding: '1rem' }}>
      <div style={{ height: '160px', borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '0.85rem', position: 'relative' }}>
        <img
          src={imageSrc}
          alt={item.name || item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = item.image;
          }}
        />
      </div>
      <div className="nearby-details">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span className="nearby-category" style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
            {item.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            <Star size={12} fill="#eab308" color="#eab308" /> {item.rating}
          </span>
        </div>

        <h4 className="nearby-name font-serif" style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 500 }}>
          {item.title || item.name}
        </h4>

        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: 1.4 }}>
          {item.location || item.description}
        </p>

        <button
          className="card-explore-btn"
          style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem', width: '100%', justifyContent: 'center' }}
          onClick={() => onExplore && onExplore(item)}
        >
          <span>Explore</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function LocationExplorer({ onSearchStateChange }) {
  const [cityInput, setCityInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleClearLocationSearch = () => {
    setNearbyPlaces([]);
    setLocationStatus(null);
    setCityInput('');
    if (onSearchStateChange) {
      onSearchStateChange(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus({
        type: 'error',
        message: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    setLoading(true);
    setLocationStatus(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationStatus({
          type: 'success',
          message: `Location Detected (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). Fetching Google Places...`
        });

        try {
          const results = await searchNearbyPlaces(latitude, longitude);
          setNearbyPlaces(results);
          if (onSearchStateChange) {
            onSearchStateChange(results.length > 0);
          }
          setLocationStatus({
            type: 'success',
            message: `Found ${results.length} nearby attractions for your current location!`
          });
        } catch (err) {
          console.warn('Geolocation Places Error:', err);
        } finally {
          setLoading(false);
        }
      },
      (_error) => {
        setLoading(false);
        setLocationStatus({
          type: 'error',
          message: 'Unable to retrieve location. Please check browser permissions.'
        });
      },
      { timeout: 8000 }
    );
  };

  const handleCitySearch = async (e) => {
    e.preventDefault();
    if (!cityInput.trim()) return;

    setLoading(true);
    setLocationStatus({
      type: 'success',
      message: `Geocoding "${cityInput.trim()}" & searching Google Places...`
    });

    try {
      const res = await searchPlacesByCity(cityInput.trim());
      setNearbyPlaces(res.places);
      if (onSearchStateChange) {
        onSearchStateChange(res.places.length > 0);
      }
      setLocationStatus({
        type: 'success',
        message: `Showing ${res.places.length} attractions near "${res.locationName}"`
      });
    } catch (err) {
      setLocationStatus({
        type: 'error',
        message: err.message || `Unable to find attractions for "${cityInput}"`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="location-explorer" className="location-section">
      <div className="container">
        {/* Main Glass Explorer Banner */}
        <div className="explorer-banner glass-panel">
          <div className="banner-content">
            <div className="badge">
              <Navigation size={14} />
              <span>Location Awareness Engine</span>
            </div>

            <h2 className="banner-title font-serif">
              Discover Treasures <span className="text-gold-italic">Around You</span>
            </h2>

            <p className="banner-description">
              Enter any city name (e.g. Chennai, Paris, Tokyo) or tap into real-time location detection to unearth hidden gems and popular attractions.
            </p>

            {/* Interactive Control Box */}
            <div className="explorer-controls">
              <form onSubmit={handleCitySearch} className="city-search-box">
                <MapPin size={18} className="search-icon-gold" />
                <input
                  type="text"
                  placeholder="Enter city name (e.g. Chennai, Paris, Tokyo)..."
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="city-input"
                />
                <button type="submit" className="btn-search-city" disabled={loading}>
                  {loading ? <Loader2 size={16} className="spin-loader" /> : <Search size={16} />}
                  <span>Search</span>
                </button>
              </form>

              <div className="controls-or-divider">
                <span>OR</span>
              </div>

              <button
                className={`btn-use-location ${loading ? 'loading' : ''}`}
                onClick={handleUseMyLocation}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 size={18} className="spin-loader" />
                ) : (
                  <Navigation size={18} />
                )}
                <span>{loading ? 'Detecting...' : 'Use My Location'}</span>
              </button>
            </div>

            {/* Feedback Status Alert */}
            {locationStatus && (
              <div className={`location-status-badge ${locationStatus.type}`}>
                {locationStatus.type === 'success' ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                <span>{locationStatus.message}</span>
              </div>
            )}
          </div>

          {/* Decorative Radar Visual */}
          <div className="banner-visual">
            <div className="radar-circle circle-1"></div>
            <div className="radar-circle circle-2"></div>
            <div className="radar-circle circle-3"></div>
            <div className="radar-pin">
              <Compass size={32} className="radar-compass" />
            </div>
          </div>
        </div>

        {/* Nearby Recommendations Output */}
        {nearbyPlaces.length > 0 && (
          <div className="nearby-results-section">
            <div className="results-header">
              <h3 className="results-title font-serif">
                <Sparkles size={18} className="icon-gold" />
                <span>Search Recommendations</span>
              </h3>
              <div className="results-header-actions">
                <span className="results-count">{nearbyPlaces.length} places found</span>
                <button
                  type="button"
                  onClick={handleClearLocationSearch}
                  className="btn-clear-location-search"
                >
                  <X size={14} />
                  <span>Clear & Show Popular Places</span>
                </button>
              </div>
            </div>

            <div className="nearby-grid">
              {nearbyPlaces.map((item) => (
                <NearbyExplorerCard
                  key={item.id || item.placeId}
                  item={item}
                  onExplore={(p) => setSelectedPlace(p)}
                />
              ))}
            </div>
          </div>
        )}

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
