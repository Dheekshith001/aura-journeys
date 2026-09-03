# AURA Journeys — Premium AI-Powered Travel Application

**AURA Journeys** is a modern, high-performance React travel application designed for modern wanderers. It delivers a luxury travel experience with real-time location awareness, live climate intelligence, dynamic high-resolution photography, interactive Google Places discovery, an AI travel assistant, and personalized day-by-day itinerary generation powered by **Google Gemini AI**.

---

## 🌐 Live Demo

🔗 [https://aura-journeys.vercel.app](https://aura-journeys.vercel.app)

---

## ✨ Features

- **Premium Responsive Landing Page**: Features a luxury dark navy and champagne gold design language with dynamic video background headers and glassmorphism UI elements.
- **Looping Hero Background Video**: High-definition cinematic background video loop with instant smooth navigation.
- **Destination Browsing**: Curated featured destinations with category badges and suggested durations.
- **Destination Search**: Real-time keyword filtering across destination names, countries, and tags.
- **Destination Category Filtering**: Category tabs (*Mountains*, *Historic*, *Adventure*, *Nature*, *Tropical*).
- **Individual Destination Detail Pages**: Dedicated editorial pages for world-class destinations including the Swiss Alps, Machu Picchu, Mount Everest, Grand Canyon, Iceland, and Bora Bora.
- **Famous Places / Landmarks**: Curated landmark cards for each active destination with high-definition imagery and descriptions.
- **Browser Geolocation**: Real-time browser position detection to discover nearby attractions.
- **Manual City / Location Search**: Interactive geocoding search (*e.g., Chennai, Anantapur, Paris, Tokyo*) querying live Google Places around any typed location.
- **Google Places Nearby Attractions**: Displays nearby scenic viewpoints, historic sanctuaries, national parks, and heritage spots with ratings and reviews.
- **Place Details Modal**: Interactive pop-up featuring full address, opening hours, contact phone numbers, user review counts, and direct Google Maps links.
- **Real-time OpenWeather Data**: Live temperature (°C), weather status, wind speed (m/s), and humidity (%) integrated via the **OpenWeather API**.
- **Dynamic Pexels Imagery**: Dynamic landscape photography fetched on-the-fly via the **Pexels Search API** with fallback handlers.
- **AURA AI Destination Chatbot**: Google Gemini-powered destination concierge chatbot providing tailored packing advice, best travel seasons, landmark guides, and local culinary highlights.
- **AI Itinerary Planner**: Bespoke day-by-day travel plan generator customized by trip duration (3, 5, 7, 10 Days), interests (Nature, Adventure, Culture, Food, Relaxation, Photography), and travel pacing (Relaxed, Balanced, Adventure).
- **Day-by-Day Morning/Afternoon/Evening Itinerary**: Clearly formatted itineraries structured into **Morning**, **Afternoon**, and **Evening** time blocks.
- **Loading States**: Animated spinners and feedback status badges during API fetches.
- **Error States**: User-friendly notification cards with retry controls if network requests fail.
- **Empty States**: Clear feedback when search terms or location queries return no matching results.
- **Denied-Location Handling**: Graceful fallback to featured regional experiences if location access is denied.
- **Responsive Desktop / Tablet / Mobile UI**: Optimized across all device viewports with drawer menus and floating overlays.
- **Accessibility-Conscious Interactions**: ARIA controls, keyboard accessibility (Escape to close modals, Enter to submit forms), and clean contrast ratio.

---

## 🛠️ Tech Stack

- **React** (`^19.2.8`) — UI library and component structure
- **Vite** (`^8.2.2`) — Next-generation frontend tooling and build server
- **JavaScript** (ES6+) — Core application logic and asynchronous fetching
- **CSS** — Custom Vanilla CSS design system with glassmorphism utility tokens
- **React Router** (`^7.18.3`) — Client-side routing (`/`, `/destination/:slug`)
- **Lucide React** (`^1.39.0`) — UI icon set
- **Oxlint** (`^1.79.0`) — Lightweight, high-speed JavaScript/JSX linter

---

## 🌐 APIs Used

- **Google Gemini API** (`gemini-3.5-flash` / `gemini-2.5-flash` / `gemini-3.5-flash-lite`):
  - Powers the AURA AI destination concierge chatbot (`askAuraAI`) for real-time travel Q&A.
  - Generates custom day-by-day travel itineraries (`generateAuraItinerary`) structured into Morning, Afternoon, and Evening activities.
- **OpenWeather API**:
  - Retrieves live current weather, temperature in °C, weather status, wind speed, and humidity for active destinations.
- **Pexels API**:
  - Dynamically fetches high-resolution landscape photography for destination hero banners and famous place cards.
- **Google Places API (New)**:
  - `places:searchNearby`: Discovers tourist attractions, parks, and landmarks centered at detected or searched coordinates.
  - `places:searchText`: Geocodes typed city names into latitude/longitude coordinates.
  - `places/{placeId}`: Fetches full place details, opening hours, contact details, and Google Maps links.
- **Browser Geolocation API**:
  - Captures the user's current latitude and longitude coordinates upon authorization.

---

## 🧭 How It Works

1. **Explore Destinations**: Browse curated featured destinations on the main landing page.
2. **Search / Filter Destinations**: Filter by travel categories or search by destination name.
3. **Open Destination Details**: Click on any destination card to open its dedicated page.
4. **View Live Weather & Destination Imagery**: See real-time weather metrics and Pexels imagery.
5. **View Famous Places**: Inspect curated landmark highlights for the destination.
6. **Use Current Location or Search for a City**: Authorize geolocation or search any city name in the Location Explorer.
7. **Discover Nearby Places**: View top attractions fetched dynamically from Google Places API.
8. **Open Place Details**: Click **"Explore"** on any place card to inspect address, hours, phone, and Google Maps links.
9. **Ask AURA AI Questions**: Click **"Ask AURA AI"** on any destination page to open the Gemini AI chatbot and ask destination questions.
10. **Generate a Personalized AI Itinerary**: Click **"Plan My Trip"** or **"Plan with AI"** to open the AI Itinerary Planner, customize duration, interests, and style, and receive a complete Day 1, Day 2, Day 3... Morning/Afternoon/Evening schedule.

---

## 📸 Screenshots

<!-- Screenshot: Home / Hero will be added before final submission -->
<!-- Screenshot: Destination Details will be added before final submission -->
<!-- Screenshot: Location / Nearby Places will be added before final submission -->
<!-- Screenshot: AURA AI Chatbot will be added before final submission -->
<!-- Screenshot: AI Itinerary Planner will be added before final submission -->
<!-- Screenshot: Mobile responsive view will be added before final submission -->

---

## 🔐 Environment Variables

The application reads external API keys via Vite environment variables. Create a `.env` file in the root directory:

```env
VITE_OPENWEATHER_API_KEY=
VITE_PEXELS_API_KEY=
VITE_GOOGLE_PLACES_API_KEY=
VITE_GEMINI_API_KEY=
```

> **Security Note**: Environment variables are protected from source control via `.gitignore`. Never commit API secret values.

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Dheekshith001/aura-journeys.git
cd aura-journeys
npm install
```

### 2. Configure Environment Variables
Create a `.env` file and add your credentials:
```env
VITE_OPENWEATHER_API_KEY=your_openweather_key
VITE_PEXELS_API_KEY=your_pexels_key
VITE_GOOGLE_PLACES_API_KEY=your_google_places_key
VITE_GEMINI_API_KEY=your_gemini_key
```

### 3. Run Application
```bash
npm run dev
```

---

## 📜 License

Crafted for the **AURA Journeys** Front-End Developer assignment submission.  
© 2026 AURA Travel Technologies Inc. All rights reserved.
