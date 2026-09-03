# AURA Journeys — Premium AI-Powered Travel Application

**AURA Journeys** is a modern React travel application designed for travelers to explore destinations, view real-time weather, discover famous and nearby places, ask an AI travel assistant questions, and generate personalized day-by-day itineraries powered by **Google Gemini AI**.

---

## 🌐 Live Demo

🔗 [Visit AURA Journeys](https://aura-journeys.vercel.app)

---

## ✨ Features

- **Premium Responsive Landing Page** — Luxury dark navy and champagne-gold visual design with glassmorphism UI elements.
- **Looping Hero Background Video** — Cinematic background video creating an immersive landing experience.
- **Destination Browsing** — Explore a curated collection of destinations with categories, ratings, and suggested durations.
- **Destination Search** — Search destinations by name or country.
- **Destination Category Filtering** — Filter destinations by Mountains, Historic, Adventure, Nature, and Tropical categories.
- **Individual Destination Detail Pages** — Dedicated pages for Swiss Alps, Machu Picchu, Mount Everest, Grand Canyon, Iceland, and Bora Bora.
- **Famous Places & Landmarks** — Each destination includes notable attractions with descriptions and imagery.
- **Browser Geolocation** — Detect the visitor's current location when permission is granted.
- **Manual Location Search** — Search for a city or location to discover nearby attractions.
- **Google Places Nearby Attractions** — Dynamically retrieves nearby tourist attractions and landmarks.
- **Place Details Modal** — Displays address, opening hours, contact information, ratings, review counts, and Google Maps links.
- **Real-Time Weather** — Displays current temperature, weather condition, wind speed, and humidity using OpenWeather.
- **Dynamic Pexels Imagery** — Destination and landmark images are fetched dynamically using the Pexels API.
- **AURA AI Travel Assistant** — Gemini-powered chatbot for destination questions such as what to pack, when to visit, what to see, and local food recommendations.
- **AI Itinerary Planner** — Generates personalized travel plans based on destination, duration, interests, and travel style.
- **Day-by-Day Itinerary** — AI-generated plans are displayed as readable Morning, Afternoon, and Evening sections.
- **Loading States** — User-friendly loading indicators during API requests.
- **Error States** — Clear error messages and retry handling for failed requests.
- **Empty States** — Helpful feedback when searches return no results.
- **Denied-Location Handling** — Graceful fallback when the visitor does not allow location access.
- **Responsive Design** — Optimized for desktop, tablet, and mobile devices.
- **Accessibility-Conscious UI** — Keyboard interactions, ARIA controls, readable contrast, and accessible interactive elements.

---

## 🛠️ Tech Stack

- **React** — Component-based user interface
- **Vite** — Frontend build tool and development server
- **JavaScript (ES6+)** — Application logic and API integration
- **CSS** — Custom responsive styling and glassmorphism design
- **React Router DOM** — Client-side routing
- **Lucide React** — Interface icons
- **Oxlint** — JavaScript and JSX linting

---

## 🌐 APIs Used

### Google Gemini API

Used for:

- AURA AI destination chatbot
- Destination-related travel questions
- Personalized AI itinerary generation
- Morning, Afternoon, and Evening itinerary planning

### OpenWeather API

Used to retrieve:

- Current temperature
- Weather condition
- Wind speed
- Humidity

### Pexels API

Used to dynamically retrieve:

- Destination images
- Famous-place images
- High-resolution travel photography

### Google Places API (New)

Used for:

- Nearby place discovery
- Location-based attraction search
- City/location search
- Place details
- Opening hours
- Contact information
- Google Maps links

### Browser Geolocation API

Used to obtain the visitor's current latitude and longitude when location permission is granted.

---

## 🧭 How It Works

1. **Explore Destinations** — Browse curated destinations from the landing page.
2. **Search and Filter** — Search destinations or filter them by travel category.
3. **View Destination Details** — Open a dedicated destination page.
4. **Check Live Weather** — View current weather information from OpenWeather.
5. **Discover Famous Places** — Explore curated landmarks and attractions.
6. **Use Location Awareness** — Allow browser location access to discover nearby places.
7. **Search a Location Manually** — Enter a city such as Chennai, Paris, or Tokyo.
8. **Explore Nearby Places** — Google Places dynamically returns nearby attractions.
9. **View Place Details** — Open a place to see additional information and Google Maps navigation.
10. **Ask AURA AI** — Ask the Gemini-powered assistant questions about the destination.
11. **Plan a Trip with AI** — Select duration, interests, and travel style to generate a personalized day-by-day itinerary.

---

## 📸 Screenshots

### 🏠 Home / Hero

<img width="1917" height="1078" alt="AURA Journeys Home Hero" src="https://github.com/user-attachments/assets/b7ea5264-5627-4e2b-9c1d-51a70b00b7b9" />

### 🌍 Destination Details

<img width="1917" height="1078" alt="AURA Journeys Destination Details" src="https://github.com/user-attachments/assets/5b0c94cd-3cce-45a1-bdd3-445ac7674d41" />

### 📍 Location & Nearby Places

<img width="1917" height="1078" alt="AURA Journeys Location and Nearby Places" src="https://github.com/user-attachments/assets/c51fc17b-8f9e-4b5f-9e9e-666b129ab87d" />

### 🤖 AURA AI Chatbot

<img width="1917" height="1078" alt="AURA Journeys AI Chatbot" src="https://github.com/user-attachments/assets/c646fb1c-6214-41cd-8d78-67c20c58694a" />

### 🗺️ AI Itinerary Planner

<img width="1135" height="942" alt="AURA Journeys AI Itinerary Planner" src="https://github.com/user-attachments/assets/332c026b-4be5-449d-b646-729d5c90f8e8" />

---

## 🔐 Environment Variables

The application uses environment variables for API configuration.

Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=
VITE_PEXELS_API_KEY=
VITE_GOOGLE_PLACES_API_KEY=
VITE_GEMINI_API_KEY=
