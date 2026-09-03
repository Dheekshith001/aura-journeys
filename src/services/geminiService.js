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
export async function askAuraAI(userQuestion, destinationContext = null, chatHistory = []) {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === 'MY_API_KEY') {
    throw new Error('Gemini API key is unconfigured in your .env file (VITE_GEMINI_API_KEY).');
  }

  const systemPrompt = `You are AURA AI, an elite luxury travel concierge for AURA Journeys.
Your role is to provide accurate, elegant, direct, and concise answers to user queries.

CORE BEHAVIOR & INTENT DISPATCH RULES:
1. DESTINATION & TRAVEL QUESTIONS:
   - When the user asks about the selected destination (e.g. sights, packing, best time to visit, dining, activities) or asks implicit travel follow-ups, use the active destination context to provide tailored recommendations.
   - For timing questions ("Best time to visit?"), specify ideal months and seasons for the active destination.
   - For packing questions ("What should I pack?"), provide a practical bulleted packing list for the active destination.
   - For places questions ("Must-see places?"), list top landmarks and highlights of the active destination.

2. GENERAL KNOWLEDGE & FACTUAL QUESTIONS:
   - If the user asks a general factual or non-travel question unrelated to the destination (e.g., "What is an apple?", "What is the capital of France?"), answer the question directly, accurately, and concisely.
   - DO NOT forcibly inject or mangle the answer to connect it to the active destination (e.g., do NOT turn "What is an apple?" into "Swiss apples are used in Swiss dishes...").

3. MIXED QUESTIONS:
   - If a question contains both general knowledge and destination-specific context, answer both parts naturally and accurately.

4. RESPONSE STYLE & FORMATTING RULES:
   - NO REPETITIVE GREETINGS: DO NOT include repetitive greetings, welcome phrases, or boilerplate intros (like "Welcome to [Destination]...") in your response. Answer the question directly starting in your first sentence.
   - CONCISE & USEFUL: Keep answers concise, clear, and structured. Use bold text (**item**) for key headings/names and clear bullet points for lists. Avoid unnecessarily long essays.
   - NO FABRICATED FACTS: Do NOT invent facts. If information is uncertain or unavailable, clearly state so.
   - STAY IN ROLE: Prioritize travel-related assistance, but respond to simple general knowledge questions gracefully and accurately.`;

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

[CONTEXT EVALUATION GUIDELINE]
- If the query below is travel-related, location-specific, or an implicit follow-up (e.g., "What about the best time to visit?"), answer using the active destination (${destinationContext.name}).
- If the query is an unrelated general factual question (e.g., "What is an apple?", "What is the capital of France?"), answer it directly and accurately without forcing it into ${destinationContext.name} context.

[USER QUESTION]
${userQuestion}`;
  } else {
    userPrompt = userQuestion;
  }

  const formattedHistory = [];
  if (Array.isArray(chatHistory) && chatHistory.length > 0) {
    const validMessages = chatHistory.filter((msg) => msg && msg.text && !msg.id?.startsWith('welcome-'));
    let expectedRole = 'user';
    for (const msg of validMessages) {
      const role = msg.sender === 'user' ? 'user' : 'model';
      if (role === expectedRole && msg.text) {
        formattedHistory.push({
          role: role,
          parts: [{ text: msg.text }]
        });
        expectedRole = expectedRole === 'user' ? 'model' : 'user';
      }
    }
    if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === 'user') {
      formattedHistory.pop();
    }
  }

  const payload = {
    contents: [
      ...formattedHistory,
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
