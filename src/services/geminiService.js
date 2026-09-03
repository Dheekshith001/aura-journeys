/**
 * Google Gemini AI Service for AURA AI Travel Concierge
 * Integrates with Gemini 2.5 Flash / Gemini 3.5 Flash via Google Generative Language API
 */

function getApiKey() {
  return (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
}

/**
 * Sends a question with destination context to Google Gemini AI API.
 *
 * @param {string} userQuestion
 * @param {Object} destinationContext (contains name, country, description, famousPlaces)
 * @returns {Promise<string>} Gemini response text
 */
export async function askAuraAI(userQuestion, destinationContext = null) {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === 'MY_API_KEY') {
    throw new Error('Gemini API key is unconfigured in your .env file (VITE_GEMINI_API_KEY).');
  }

  const systemPrompt = `You are AURA AI, an elite luxury travel concierge for AURA Journeys.
Your role is to provide direct, comprehensive, elegant, and highly structured answers to travel questions.

STRICT RESPONSE RULES:
1. DO NOT include repetitive greetings, welcome phrases, or boilerplate intros like "Welcome to [Destination]..." in your response.
2. Directly answer the user's specific question immediately in your first sentence.
3. For packing questions ("What should I pack?"), provide a clear, structured, bulleted packing list (clothing, footwear, gear, sun protection) specifically tailored to the active destination.
4. For timing questions ("Best time to visit?"), directly specify ideal months, peak/shoulder seasons, and weather conditions.
5. For places questions ("Must-see places?"), directly list top landmarks, viewpoints, and experiences.
6. For food questions ("Local food to try?"), directly list traditional dishes and regional specialties.
7. Use bold text (**item**) for key headings/names and clear bullet points for lists.
8. Provide complete, fully written answers. Do NOT cut off mid-sentence.`;

  let userPrompt = '';
  if (destinationContext && destinationContext.name) {
    const famousPlacesList = destinationContext.famousPlaces
      ? destinationContext.famousPlaces.map((fp) => fp.name || fp.title).join(', ')
      : '';

    userPrompt = `[ACTIVE DESTINATION CONTEXT]
Destination: ${destinationContext.name}
Country / Region: ${destinationContext.country || 'Global'}
Description: ${destinationContext.description || 'Luxury destination'}
Famous Attractions: ${famousPlacesList || 'Local landmarks'}

[USER QUESTION]
${userQuestion}`;
  } else {
    userPrompt = userQuestion;
  }

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048
    }
  };

  const models = ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-3.5-flash-lite'];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) {
          return responseText;
        }
      }

      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData?.error?.message || `API status ${response.status}`;
      lastError = new Error(errorMsg);

      if (response.status === 404 || response.status === 503) {
        continue;
      } else {
        throw lastError;
      }
    } catch (err) {
      lastError = err;
      if (err.message && err.message.includes('API key')) {
        throw err;
      }
    }
  }

  throw lastError || new Error('Unable to connect to Gemini AI. Please check your API key.');
}

/**
 * Generates a day-by-day luxury travel itinerary using Google Gemini AI API.
 *
 * @param {Object} destinationContext (name, country, description, famousPlaces)
 * @param {string|number} durationDays (e.g. "3 Days", 3, 5, 7, 10)
 * @param {Array<string>} interests (e.g. ["Nature", "Adventure"])
 * @param {string} travelStyle (e.g. "Relaxed", "Balanced", "Adventure")
 * @returns {Promise<string>} Structured Day-by-Day Itinerary text
 */
export async function generateAuraItinerary(
  destinationContext,
  durationDays = '5 Days',
  interests = ['Nature', 'Culture'],
  travelStyle = 'Balanced'
) {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === 'MY_API_KEY') {
    throw new Error('Gemini API key is unconfigured in your .env file (VITE_GEMINI_API_KEY).');
  }

  const famousPlacesList = destinationContext?.famousPlaces
    ? destinationContext.famousPlaces.map((fp) => fp.name || fp.title).join(', ')
    : '';

  const systemPrompt = `You are AURA AI, an expert luxury travel itinerary planner for AURA Journeys.

Create a practical, destination-specific itinerary based on the supplied destination and traveler preferences.

Return a clear day-by-day itinerary.

For EVERY single day, provide:
- **Morning**
- **Afternoon**
- **Evening**

Use the destination's known famous places when appropriate (${famousPlacesList}).

Keep the itinerary realistic and logically organized.
Do not claim live availability, bookings, prices, or real-time conditions.
Do not include a generic welcome message.
Return only the itinerary content suitable for displaying to the user.`;

  const interestsText = Array.isArray(interests) && interests.length > 0 ? interests.join(', ') : 'Highlights';

  const userPrompt = `[DESTINATION CONTEXT]
Destination Name: ${destinationContext?.name || 'Selected Destination'}
Country / Region: ${destinationContext?.country || 'Global'}
Overview: ${destinationContext?.description || 'Luxury travel destination'}
Known Attractions: ${famousPlacesList || 'Local landmarks'}

[TRIP PREFERENCES]
Trip Duration: ${durationDays}
Traveler Interests: ${interestsText}
Pacing / Travel Style: ${travelStyle}

Please generate the complete ${durationDays} day-by-day itinerary with Morning, Afternoon, and Evening activities for each day.`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2500
    }
  };

  const models = ['gemini-3.5-flash', 'gemini-2.5-flash', 'gemini-3.5-flash-lite'];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (responseText) {
          return responseText;
        }
      }

      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData?.error?.message || `API status ${response.status}`;
      lastError = new Error(errorMsg);

      if (response.status === 404 || response.status === 503) {
        continue;
      } else {
        throw lastError;
      }
    } catch (err) {
      lastError = err;
      if (err.message && err.message.includes('API key')) {
        throw err;
      }
    }
  }

  throw lastError || new Error('Unable to generate itinerary via Gemini AI. Please check your API key.');
}
