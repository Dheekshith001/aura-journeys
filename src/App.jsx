import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedDestinations from './components/FeaturedDestinations';
import LocationExplorer from './components/LocationExplorer';
import PopularPlaces from './components/PopularPlaces';
import Footer from './components/Footer';
import AIPlanner from './components/AIPlanner';
import DestinationDetails from './pages/DestinationDetails';
import './App.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const target = document.getElementById('destinations');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleOpenPlanner = () => {
    setIsPlannerOpen(true);
  };

  return (
    <div className="app-landing-wrapper">
      {/* 1. Navbar */}
      <Navbar onOpenPlanner={handleOpenPlanner} />

      {/* 2. Hero Section */}
      <Hero searchTerm={searchTerm} onSearch={handleSearch} />

      {/* 3. Featured Destinations */}
      <FeaturedDestinations searchTerm={searchTerm} onClearSearch={handleClearSearch} setSearchTerm={setSearchTerm} />

      {/* 4. Explore by Location */}
      <LocationExplorer />

      {/* 5. Popular Places */}
      <PopularPlaces />

      {/* 6. AI Planner Component */}
      <AIPlanner
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
      />

      {/* 7. Footer */}
      <Footer onOpenPlanner={handleOpenPlanner} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:slug" element={<DestinationDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
