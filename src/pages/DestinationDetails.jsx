import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Clock,
  Compass,
  Sparkles,
  CloudSun,
  Wind,
  Droplets,
  MapPin,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { featuredDestinations } from '../data/mockData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuraChatbot from '../components/AuraChatbot';
import AIPlanner from '../components/AIPlanner';
import { usePexelsImage } from '../hooks/usePexelsImage';
import './DestinationDetails.css';

function FamousPlaceCard({ place }) {
  const { imageSrc } = usePexelsImage(place?.name, place?.image);

  return (
    <div className="famous-place-card glass-panel">
      <div className="famous-place-img-wrapper">
        <img
          src={imageSrc}
          alt={place?.name}
          className="famous-place-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = place?.image;
          }}
        />
      </div>
      <div className="famous-place-body">
        <h3 className="famous-place-title font-serif">{place?.name}</h3>
        <p className="famous-place-desc">{place?.description}</p>
      </div>
    </div>
  );
}

export default function DestinationDetails() {
  const { slug } = useParams();

  // Find destination matching slug or id
  const destination = featuredDestinations.find(
    (dest) => dest.slug === slug || dest.id === slug
  );

  const { imageSrc: heroImageSrc } = usePexelsImage(destination?.name, destination?.image);

  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  useEffect(() => {
    if (!destination) return;

    let isMounted = true;

    const fetchWeather = async () => {
      setLoadingWeather(true);
      setWeatherError(null);

      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      if (!apiKey || apiKey === 'MY_API_KEY' || apiKey.trim() === '') {
        if (isMounted) {
          setWeatherError('API Key Required (.env)');
          setLoadingWeather(false);
        }
        return;
      }

      try {
        let url = '';
        if (destination.lat !== undefined && destination.lon !== undefined) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${destination.lat}&lon=${destination.lon}&units=metric&appid=${apiKey}`;
        } else {
          const query = destination.weatherQuery || destination.name;
          url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&units=metric&appid=${apiKey}`;
        }

        let response = await fetch(url);

        // Fallback search by country/name if primary query returns 404
        if (!response.ok && response.status === 404) {
          const fallbackQuery = destination.name || destination.country;
          const fallbackUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(fallbackQuery)}&units=metric&appid=${apiKey}`;
          response = await fetch(fallbackUrl);
        }

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('API Key Activating (OpenWeather)');
          } else if (response.status === 404) {
            throw new Error('Location Not Found');
          } else {
            throw new Error(`API Error (${response.status})`);
          }
        }

        const data = await response.json();

        if (isMounted) {
          const tempVal = typeof data.main?.temp === 'number' ? `${Math.round(data.main.temp)}°C` : 'N/A';
          const conditionText = data.weather?.[0]?.main || data.weather?.[0]?.description || 'Clear';
          const windSpeedVal = typeof data.wind?.speed === 'number' ? `${data.wind.speed} m/s` : 'N/A';
          const humidityVal = typeof data.main?.humidity === 'number' ? `${data.main.humidity}%` : 'N/A';
          const locationName = data.name || destination.name;

          setWeather({
            temp: tempVal,
            condition: conditionText,
            windSpeed: windSpeedVal,
            humidity: humidityVal,
            locationName
          });
          setWeatherError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.warn(`Weather error for ${destination.name}:`, err.message);
          setWeatherError(err.message || 'Weather Unavailable');
        }
      } finally {
        if (isMounted) {
          setLoadingWeather(false);
        }
      }
    };

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [slug, destination]);

  // Invalid Destination State
  if (!destination) {
    return (
      <div className="app-landing-wrapper">
        <Navbar />
        <main className="destination-not-found-container container">
          <div className="not-found-card glass-panel">
            <div className="not-found-icon-wrapper">
              <AlertCircle size={48} className="icon-gold" />
            </div>
            <h1 className="not-found-title font-serif">Destination Not Found</h1>
            <p className="not-found-subtitle">
              We couldn't find a destination matching "{slug}". Explore our curated collection from the home page.
            </p>
            <Link to="/" className="btn-primary-gold">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-landing-wrapper">
      <Navbar />

      <main className="destination-details-page">
        {/* Navigation Bar Back Link */}
        <div className="container details-back-wrapper">
          <Link to="/" className="details-back-btn">
            <ArrowLeft size={18} />
            <span>Back to Destinations</span>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container details-hero-section">
          <div className="details-hero-banner">
            <img
              src={heroImageSrc}
              alt={destination.name}
              className="details-hero-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = destination.image;
              }}
            />
            <div className="details-hero-overlay"></div>

            <div className="details-hero-content">
              <div className="details-badge-row">
                <span className="details-category-chip">{destination.category}</span>
                {destination.badge && (
                  <span className="details-badge">{destination.badge}</span>
                )}
              </div>

              <h1 className="details-title font-serif">{destination.name}</h1>
              <p className="details-country">
                <MapPin size={16} className="pin-icon" />
                <span>{destination.country}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Quick Meta Row */}
        <section className="container details-meta-section">
          <div className="details-meta-bar glass-panel">
            <div className="meta-stat">
              <Star size={18} fill="#eab308" color="#eab308" />
              <div className="meta-stat-info">
                <span className="meta-stat-val">{destination.rating}</span>
                <span className="meta-stat-label">Rating</span>
              </div>
            </div>

            <div className="meta-divider"></div>

            <div className="meta-stat">
              <Compass size={18} className="icon-gold" />
              <div className="meta-stat-info">
                <span className="meta-stat-val" style={{ textTransform: 'capitalize' }}>
                  {destination.category}
                </span>
                <span className="meta-stat-label">Category</span>
              </div>
            </div>

            <div className="meta-divider"></div>

            <div className="meta-stat">
              <Clock size={18} className="icon-gold" />
              <div className="meta-stat-info">
                <span className="meta-stat-val">{destination.duration}</span>
                <span className="meta-stat-label">Suggested Duration</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="container details-main-grid">
          <div className="details-primary-col">
            {/* About Section */}
            <section className="details-card-section glass-panel">
              <h2 className="details-section-heading font-serif">
                About {destination.name}
              </h2>
              <p className="details-description-text">{destination.description}</p>
            </section>

            {/* Weather Section */}
            <section className="details-card-section glass-panel">
              <div className="weather-header">
                <h2 className="details-section-heading font-serif">Current Weather</h2>
                <span className={`weather-status-chip ${weatherError ? 'error' : ''}`}>
                  {loadingWeather ? (
                    <>
                      <Loader2 size={14} className="spin-loader" />
                      <span>Fetching Live Weather...</span>
                    </>
                  ) : weatherError ? (
                    <>
                      <AlertCircle size={14} />
                      <span>{weatherError}</span>
                    </>
                  ) : (
                    <>
                      <CloudSun size={14} />
                      <span>Live Climate API ({weather?.locationName})</span>
                    </>
                  )}
                </span>
              </div>
              
              <div className="weather-placeholder-grid">
                <div className="weather-widget-box">
                  {loadingWeather ? (
                    <Loader2 size={28} className="spin-loader weather-icon-gold" />
                  ) : (
                    <CloudSun size={28} className="weather-icon-gold" />
                  )}
                  <div className="weather-info">
                    <span className="weather-label">Real-time Weather</span>
                    <span className="weather-val-placeholder">
                      {loadingWeather ? (
                        'Loading temperature...'
                      ) : weatherError ? (
                        'Weather unavailable'
                      ) : (
                        `${weather?.temp} • ${weather?.condition}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="weather-widget-box">
                  {loadingWeather ? (
                    <Loader2 size={24} className="spin-loader weather-icon-subtle" />
                  ) : (
                    <Wind size={24} className="weather-icon-subtle" />
                  )}
                  <div className="weather-info">
                    <span className="weather-label">Wind Velocity</span>
                    <span className="weather-val-placeholder">
                      {loadingWeather ? 'Loading wind data...' : weatherError ? 'Data unavailable' : weather?.windSpeed}
                    </span>
                  </div>
                </div>

                <div className="weather-widget-box">
                  {loadingWeather ? (
                    <Loader2 size={24} className="spin-loader weather-icon-subtle" />
                  ) : (
                    <Droplets size={24} className="weather-icon-subtle" />
                  )}
                  <div className="weather-info">
                    <span className="weather-label">Humidity Level</span>
                    <span className="weather-val-placeholder">
                      {loadingWeather ? 'Loading humidity...' : weatherError ? 'Data unavailable' : weather?.humidity}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Famous Places Section */}
            {destination.famousPlaces && destination.famousPlaces.length > 0 && (
              <section className="details-famous-section">
                <h2 className="details-section-heading font-serif">Famous Places</h2>
                
                <div className="famous-places-grid">
                  {destination.famousPlaces.map((place, idx) => (
                    <FamousPlaceCard key={place.id || idx} place={place} />
                  ))}
                </div>
              </section>
            )}

            {/* AI Action Buttons */}
            <section className="details-actions-bar">
              <button
                className="btn-ai-action btn-ask-ai"
                onClick={() => setIsChatOpen(true)}
              >
                <Sparkles size={18} />
                <span>Ask AURA AI</span>
              </button>

              <button
                className="btn-ai-action btn-plan-trip"
                onClick={() => setIsPlannerOpen(true)}
              >
                <Compass size={18} />
                <span>Plan My Trip</span>
              </button>
            </section>
          </div>
        </div>
      </main>

      <AuraChatbot
        destination={destination}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <AIPlanner
        initialDestination={destination}
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
      />

      <Footer onOpenPlanner={() => setIsPlannerOpen(true)} />
    </div>
  );
}
