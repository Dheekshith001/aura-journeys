export const categories = [
  { id: "all", name: "All Destinations" },
  { id: "mountains", name: "Mountains" },
  { id: "historic", name: "Historic" },
  { id: "adventure", name: "Adventure" },
  { id: "nature", name: "Nature" },
  { id: "tropical", name: "Tropical" }
];

export const featuredDestinations = [
  {
    id: "dest-1",
    slug: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    category: "mountains",
    duration: "7 Days",
    rating: 4.9,
    lat: 46.56,
    lon: 7.96,
    weatherQuery: "Interlaken,CH",
    description: "Discover dramatic alpine peaks, peaceful valleys, crystal-clear lakes, and unforgettable mountain experiences in the Swiss Alps.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    badge: "Alpine Heights",
    famousPlaces: [
      {
        id: "fp-1-1",
        name: "Matterhorn",
        description: "One of the world's most iconic mountain peaks, rising dramatically above the Swiss Alps.",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-1-2",
        name: "Jungfraujoch",
        description: "A spectacular high-altitude destination offering panoramic views of the Swiss Alps and surrounding glaciers.",
        image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-1-3",
        name: "Interlaken",
        description: "A scenic Swiss town nestled between lakes and mountains, perfect for alpine adventures.",
        image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-1-4",
        name: "Lauterbrunnen Valley",
        description: "A breathtaking valley surrounded by towering cliffs, waterfalls, and dramatic alpine scenery.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "dest-2",
    slug: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    category: "historic",
    duration: "6 Days",
    rating: 4.9,
    lat: -13.1631,
    lon: -72.545,
    weatherQuery: "Cusco,PE",
    description: "Explore the legendary Inca citadel surrounded by spectacular Andes mountains, ancient trails, and breathtaking landscapes.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    badge: "Inca Heritage",
    famousPlaces: [
      {
        id: "fp-2-1",
        name: "Machu Picchu",
        description: "An extraordinary ancient Inca citadel surrounded by the spectacular mountains of Peru.",
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-2-2",
        name: "Huayna Picchu",
        description: "The iconic mountain overlooking Machu Picchu, offering dramatic views of the ancient ruins.",
        image: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-2-3",
        name: "Sacred Valley",
        description: "A beautiful Andean valley filled with ancient Inca sites, mountain landscapes, and traditional villages.",
        image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-2-4",
        name: "Cusco",
        description: "A historic Peruvian city known for its Inca heritage, colonial architecture, and gateway to Machu Picchu.",
        image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "dest-3",
    slug: "mount-everest",
    name: "Mount Everest",
    country: "Nepal",
    category: "adventure",
    duration: "12 Days",
    rating: 4.9,
    lat: 27.9881,
    lon: 86.925,
    weatherQuery: "Namche Bazaar,NP",
    description: "Journey into the Himalayas and experience the breathtaking landscapes surrounding the world's highest mountain.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    badge: "Himalayan Summit",
    famousPlaces: [
      {
        id: "fp-3-1",
        name: "Everest Base Camp",
        description: "The legendary trekking destination at the foot of Mount Everest in the Himalayas.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-3-2",
        name: "Namche Bazaar",
        description: "A famous Sherpa mountain town and an important stop for trekkers heading toward Everest Base Camp.",
        image: "https://images.unsplash.com/photo-1575881875475-31023242e3f9?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-3-3",
        name: "Tengboche Monastery",
        description: "A peaceful Buddhist monastery surrounded by spectacular Himalayan peaks.",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-3-4",
        name: "Kala Patthar",
        description: "A renowned Himalayan viewpoint offering extraordinary views of Mount Everest.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "dest-4",
    slug: "grand-canyon",
    name: "Grand Canyon",
    country: "USA",
    category: "nature",
    duration: "5 Days",
    rating: 4.8,
    lat: 36.1069,
    lon: -112.1129,
    weatherQuery: "Flagstaff,US",
    description: "Witness one of the world's most spectacular natural landscapes, carved through millions of years of geological history.",
    image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=80",
    badge: "Natural Wonder",
    famousPlaces: [
      {
        id: "fp-4-1",
        name: "Grand Canyon South Rim",
        description: "The most visited section of the Grand Canyon, offering spectacular panoramic views of the canyon.",
        image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-4-2",
        name: "Grand Canyon Skywalk",
        description: "A glass viewing platform extending over the canyon and providing dramatic views of the landscape.",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-4-3",
        name: "Colorado River",
        description: "The powerful river that carved the Grand Canyon and continues through its dramatic landscape.",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-4-4",
        name: "Horseshoe Bend",
        description: "A famous viewpoint where the Colorado River makes a dramatic horseshoe-shaped curve.",
        image: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "dest-5",
    slug: "iceland",
    name: "Iceland",
    country: "Iceland",
    category: "nature",
    duration: "8 Days",
    rating: 4.9,
    lat: 64.1466,
    lon: -21.9426,
    weatherQuery: "Reykjavik,IS",
    description: "Discover glaciers, volcanic landscapes, powerful waterfalls, geothermal lagoons, and the magical Northern Lights.",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
    badge: "Aurora & Ice",
    famousPlaces: [
      {
        id: "fp-5-1",
        name: "Blue Lagoon",
        description: "A world-famous geothermal spa surrounded by Iceland's volcanic landscape.",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-5-2",
        name: "Gullfoss",
        description: "One of Iceland's most spectacular waterfalls, cascading through a dramatic canyon.",
        image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-5-3",
        name: "Skógafoss",
        description: "A powerful waterfall surrounded by Iceland's rugged southern landscape.",
        image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-5-4",
        name: "Jökulsárlón Glacier Lagoon",
        description: "A stunning glacial lagoon filled with floating icebergs near Iceland's southern coast.",
        image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "dest-6",
    slug: "bora-bora",
    name: "Bora Bora",
    country: "French Polynesia",
    category: "tropical",
    duration: "6 Days",
    rating: 4.9,
    lat: -16.5004,
    lon: -151.7415,
    weatherQuery: "Bora Bora,PF",
    description: "Escape to crystal-clear lagoons, dramatic volcanic peaks, coral reefs, and unforgettable island scenery.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    badge: "Island Sanctuary",
    famousPlaces: [
      {
        id: "fp-6-1",
        name: "Mount Otemanu",
        description: "The iconic volcanic peak rising dramatically above Bora Bora's turquoise lagoon.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-6-2",
        name: "Matira Beach",
        description: "A beautiful tropical beach known for clear water, soft sand, and spectacular sunsets.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-6-3",
        name: "Coral Gardens",
        description: "A vibrant snorkeling area where visitors can discover tropical marine life and coral reefs.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "fp-6-4",
        name: "Bora Bora Lagoon",
        description: "A breathtaking turquoise lagoon surrounding the island and its famous volcanic peaks.",
        image: "https://images.unsplash.com/photo-1589979481223-deb893043163?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export const popularPlaces = [
  {
    id: "place-1",
    title: "Swiss Alps Mountain Escape",
    destination: "Swiss Alps",
    location: "Swiss Alps, Switzerland",
    category: "Alpine Expedition",
    rating: 4.9,
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80",
    description: "Experience breathtaking alpine scenery, mountain villages, scenic railways, and unforgettable views of the Matterhorn.",
    highlights: ["Matterhorn views", "Glacier Express railway", "Interlaken scenic trail"]
  },
  {
    id: "place-2",
    title: "Everest Base Camp Trek",
    destination: "Mount Everest",
    location: "Mount Everest, Nepal",
    category: "Mountain Trekking",
    rating: 4.9,
    duration: "12 Days",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    description: "Journey through the Himalayas, Sherpa villages, and spectacular mountain landscapes on the legendary Everest Base Camp route.",
    highlights: ["Sherpa heritage", "Namche Bazaar access", "Kala Patthar panorama"]
  },
  {
    id: "place-3",
    title: "Iceland Northern Lights Adventure",
    destination: "Iceland",
    location: "Reykjavík, Iceland",
    category: "Wilderness & Aurora",
    rating: 4.9,
    duration: "8 Days",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    description: "Chase the Northern Lights while exploring glaciers, waterfalls, volcanic landscapes, and Iceland's dramatic wilderness.",
    highlights: ["Aurora Borealis hunting", "Blue Lagoon thermal spa", "Gullfoss waterfall"]
  },
  {
    id: "place-4",
    title: "Bora Bora Lagoon Escape",
    destination: "Bora Bora",
    location: "Bora Bora, French Polynesia",
    category: "Tropical Lagoon",
    rating: 4.9,
    duration: "6 Days",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Explore turquoise lagoons, coral gardens, tropical beaches, and the spectacular Mount Otemanu.",
    highlights: ["Turquoise lagoon cruise", "Coral Gardens snorkeling", "Mount Otemanu backdrop"]
  }
];

export const nearbyMockData = [
  {
    id: "near-1",
    name: "Matterhorn Peak Viewpoint",
    distance: "5 km away",
    category: "Alpine Scenic",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "near-2",
    name: "Sacred Valley Sanctuary",
    distance: "14 km away",
    category: "Historic Trail",
    rating: 4.88,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "near-3",
    name: "Blue Lagoon Hot Springs",
    distance: "22 km away",
    category: "Geothermal Spa",
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80"
  }
];
