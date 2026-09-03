import { useState } from 'react';
import { popularPlaces } from '../data/mockData';
import PlaceCard from './PlaceCard';
import PlaceDetailsModal from './PlaceDetailsModal';
import { searchNearbyPlaces } from '../services/googlePlacesService';
import { Sparkles, Navigation, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import './PopularPlaces.css';

export default function PopularPlaces() {
  const [placesList, setPlacesList] = useState(popularPlaces);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage({
        type: 'error',
        text: 'Geolocation is not supported by your browser.'
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setStatusMessage({
          type: 'success',
          text: `Location Detected (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). Searching Google Places...`
        });

        try {
          const nearbyResults = await searchNearbyPlaces(latitude, longitude);
          setPlacesList(nearbyResults);
          setStatusMessage({
            type: 'success',
            text: `Showing ${nearbyResults.length} nearby popular places based on your location!`
          });
        } catch (err) {
          console.warn('Error fetching Google Places:', err);
        } finally {
          setLoading(false);
        }
      },
      (_err) => {
        setLoading(false);
        setStatusMessage({
          type: 'error',
          text: 'Location permission denied or unavailable. Showing featured experiences.'
        });
      },
      { timeout: 10000 }
    );
  };

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
            Popular <span className="text-gold-italic">Places & Activities</span>
          </h2>

          <p className="section-subtitle">
            Discover handpicked bucket-list destinations or detect your live location to find real-time nearby attractions.
          </p>

          {/* Location Trigger Control */}
          <div className="popular-location-bar">
            <button
              className={`btn-popular-location ${loading ? 'loading' : ''}`}
              onClick={handleUseMyLocation}
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={16} className="spin-loader" />
              ) : (
                <Navigation size={16} />
              )}
              <span>{loading ? 'Detecting Location & Google Places...' : 'Use My Location'}</span>
            </button>
          </div>

          {/* Feedback Alert */}
          {statusMessage && (
            <div className={`popular-status-chip ${statusMessage.type}`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 size={14} />
              ) : (
                <AlertCircle size={14} />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>

        {/* Grid of Places */}
        <div className="places-grid">
          {placesList.map((place) => (
            <PlaceCard
              key={place.id || place.placeId}
              place={place}
              onExplore={(p) => setSelectedPlace(p)}
            />
          ))}
        </div>

        {/* Place Details Modal (Google Places Place Details API) */}
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
