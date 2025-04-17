
import { toast } from 'sonner';

// API key for Gemini - in production, this should be stored securely
// For demonstration purposes, we're using a temporary key
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace this with your actual API key

export const generateStory = async (theme: string, wordCount: number, prompt: string = ''): Promise<string> => {
  try {
    // For demonstration, we'll simulate a call to the Gemini API
    // In production, you would make an actual API call to Gemini
    
    // Prepare the system instruction and user prompt
    const geminiPrompt = prepareGeminiPrompt(theme, wordCount, prompt);
    
    // Make API call to Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: geminiPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error('Failed to generate story with Gemini API');
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected response format from Gemini API');
    }
  } catch (error) {
    console.error('Error in generateStory:', error);
    
    // For demo purposes, return a mock story if the API call fails
    toast('Using fallback story generation', {
      description: 'API key not configured or service unavailable',
    });
    
    return getMockStory(theme, wordCount, prompt);
  }
};

// Helper function to prepare Gemini prompt based on theme, word count and user prompt
const prepareGeminiPrompt = (theme: string, wordCount: number, prompt: string): string => {
  const themeDescriptions: Record<string, string> = {
    'fantasy': 'magical world with dragons, wizards, and mystical creatures',
    'scifi': 'futuristic setting with advanced technology, space travel, or aliens',
    'mystery': 'suspenseful story involving a puzzle, crime, or unexplained phenomenon',
    'romance': 'emotional journey focused on relationships and love',
    'adventure': 'exciting journey or quest with challenges and discoveries',
    'horror': 'frightening or unsettling story designed to evoke fear',
    'historical': 'story set in a specific historical period with accurate details'
  };

  const themeDescription = themeDescriptions[theme] || themeDescriptions['fantasy'];
  
  return `
    Generate a creative, engaging short story with the following requirements:
    - Theme: ${theme} (${themeDescription})
    - Incorporate this idea: "${prompt}"
    - Word count: approximately ${wordCount} words
    - Format with proper paragraphs
    - Be imaginative and original
    - Create compelling characters and an interesting plot
    - Have a clear beginning, middle, and conclusion
    
    Write ONLY the story text, without any introductions, explanations, or meta commentary.
  `;
};

// Temporary function to generate mock stories until API key is configured
const getMockStory = (theme: string, wordCount: number, prompt: string = ''): string => {
  // Create a unique story based on the theme and prompt
  const now = new Date();
  
  // Generate a different starting point for each theme based on the prompt
  const promptHash = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || Math.floor(Math.random() * 100);
  const timeHash = now.getSeconds() + now.getMinutes() * 60;
  const randomSeed = (promptHash + timeHash) % 100;
  
  // Base stories by theme
  const storyStarters: Record<string, string[]> = {
    fantasy: [
      `In the mystical land of Eldoria, where ancient trees whispered secrets to those who listened, young ${prompt || 'Lyra'} discovered a forgotten crystal amulet buried beneath the roots of the Great Oak.`,
      `The dragon's scales shimmered like emeralds in the moonlight as ${prompt || 'Prince Alden'} approached cautiously, ancient scroll in hand.`,
      `When the seven moons aligned, the hidden door in the mountain revealed itself, and ${prompt || 'Maya'} stepped through into a world unlike any she had known before.`
    ],
    scifi: [
      `The neural uplink activated with a soft chime as ${prompt || 'Dr. Chen'} settled into the lab chair, preparing to connect to the colony on distant Kepler-186f.`,
      `"Quantum fluctuation detected in sector seven," announced the ship's AI as ${prompt || 'Captain Rodriguez'} stared at the anomaly through the viewscreen.`,
      `${prompt || 'Ash'} discovered the ancient alien artifact buried beneath the Martian ice cap, not knowing it would rewrite humanity's understanding of the universe.`
    ],
    mystery: [
      `The envelope arrived on Tuesday, containing nothing but an old brass key and a photograph of ${prompt || 'a lighthouse'} I didn't recognize.`,
      `Detective ${prompt || 'Malone'} studied the crime scene, noting the peculiar arrangement of objects that seemed more like a message than random disorder.`,
      `The bookstore's hidden room contained journals dating back a century, and ${prompt || 'Professor Ellis'} realized they all documented murders that had actually happened.`
    ],
    romance: [
      `The antiquarian bookshop smelled of vanilla and dust when ${prompt || 'Emilia'} ducked inside to escape the sudden April rain, not knowing her life was about to change.`,
      `Every year on the same day, ${prompt || 'James'} received a postcard from a different country, each signed only with the initial 'S' and a small drawing of a bird.`,
      `When ${prompt || 'Olivia'} inherited her grandmother's cottage by the sea, she didn't expect to find love letters hidden beneath the floorboards—or to meet the grandson of the man who wrote them.`
    ],
    adventure: [
      `The satellite phone rang at 3 AM with news that would send ${prompt || 'Dr. Kazuo'} racing to the remote Siberian coordinates: "They've found it."`,
      `${prompt || 'Alex'} unfolded the weathered map that had been locked in the family vault for generations, finally ready to search for the treasure their ancestors had hidden.`,
      `The storm had washed away the small coastal path, forcing ${prompt || 'Mira'} and her companions to venture inland through uncharted jungle territory.`
    ],
    horror: [
      `The app appeared on ${prompt || 'my'} phone after the firmware update—a simple black icon with no name that couldn't be deleted.`,
      `${prompt || 'Jacob'} noticed that the shadows in the old house didn't always match the objects casting them, especially in the room where the previous owner had died.`,
      `The small town of ${prompt || 'Ravenwood'} had a tradition: no one went outside on the night of the harvest moon, and no one ever explained why.`
    ],
    historical: [
      `Constantinople, April 1453. As Ottoman forces assembled outside the walls, ${prompt || 'Anna Notaras'} worked frantically to preserve the ancient manuscripts in her father's library.`,
      `The letter informing ${prompt || 'Thomas'} of his inheritance arrived the same day as news of Napoleon's advance, forcing a choice between family legacy and patriotic duty.`,
      `When ${prompt || 'Sarah'} joined the suffragette movement in 1912, she never imagined it would lead her from rural Pennsylvania to the front lines of a revolution.`
    ]
  };
  
  // Select a random story starter based on the theme and random seed
  const themeStarters = storyStarters[theme] || storyStarters.fantasy;
  const selectedStarter = themeStarters[randomSeed % themeStarters.length];
  
  // Create a middle and ending that incorporates elements from the prompt
  const storyMiddles = [
    `What began as a simple discovery soon revealed itself to be much more significant. The implications would change everything ${prompt ? 'about ' + prompt : 'they thought they knew'}.`,
    `Each step forward revealed new challenges and unexpected allies. The journey was transforming ${prompt ? 'the way ' + prompt + ' saw the world' : 'their perspective completely'}.`,
    `Nobody could have predicted how quickly things would escalate, or how deeply ${prompt ? prompt + ' would be affected' : 'they would be drawn into the situation'}.`
  ];
  
  const storyEndings = [
    `In the end, it wasn't about the destination but the growth that occurred along the way. ${prompt ? prompt + ' had changed irrevocably' : 'Nothing would ever be the same'}.`,
    `Some questions were answered, but new mysteries emerged. ${prompt ? 'For ' + prompt + ', this was just the beginning' : 'This was clearly just the beginning of a larger story'}.`,
    `The final revelation brought both closure and new possibilities. ${prompt ? prompt + ' stood ready to face whatever came next' : 'Whatever came next, they would be ready'}.`
  ];
  
  // Select random story components based on different aspects of the random seed
  const middleIndex = (randomSeed * 3) % storyMiddles.length;
  const endingIndex = (randomSeed * 7) % storyEndings.length;
  
  // Combine the components into a complete story
  const fullStory = `${selectedStarter}\n\n${storyMiddles[middleIndex]}\n\n${storyEndings[endingIndex]}`;
  
  // Process the story to match the requested word count more accurately
  const words = fullStory.split(' ');
  
  // If the story is too long, trim it
  if (words.length > wordCount) {
    // Try to find a sentence end near the target word count
    let targetIndex = wordCount;
    while (targetIndex > wordCount * 0.8 && !words[targetIndex - 1].endsWith('.')) {
      targetIndex--;
    }
    
    // If we couldn't find a period, just cut at the exact word count
    if (targetIndex <= wordCount * 0.8) {
      targetIndex = wordCount;
    }
    
    return words.slice(0, targetIndex).join(' ');
  }
  
  // If the story is too short, it's fine to return as is
  return fullStory;
};
