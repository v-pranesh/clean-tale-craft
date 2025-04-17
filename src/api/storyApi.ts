
import { toast } from 'sonner';

// API key for Gemini - in production, this should be stored securely
// For demonstration purposes, we're using a temporary key
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace this with your actual API key

export const generateStory = async (theme: string, wordCount: number, prompt: string = ''): Promise<string> => {
  try {
    // Add timestamp and random seed to prevent caching and ensure uniqueness
    const timestamp = new Date().getTime();
    const randomSeed = Math.floor(Math.random() * 10000);
    
    // Prepare the system instruction and user prompt
    const geminiPrompt = prepareGeminiPrompt(theme, wordCount, prompt, timestamp, randomSeed);
    
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
          temperature: 0.9, // Increased for more variety
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
    
    // For demo purposes, return a unique mock story if the API call fails
    toast('Using fallback story generation', {
      description: 'API key not configured or service unavailable',
    });
    
    return getMockStory(theme, wordCount, prompt);
  }
};

// Helper function to prepare Gemini prompt based on theme, word count and user prompt
const prepareGeminiPrompt = (theme: string, wordCount: number, prompt: string, timestamp: number, randomSeed: number): string => {
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
  
  // Include timestamp and random seed to ensure a unique prompt every time
  return `
    Generate a creative, engaging short story with the following requirements:
    - Theme: ${theme} (${themeDescription})
    - Incorporate this idea: "${prompt}"
    - Word count: approximately ${wordCount} words
    - Format with proper paragraphs
    - Be imaginative and original (IMPORTANT: create a completely unique story different from any previous ones)
    - Create compelling characters and an interesting plot
    - Have a clear beginning, middle, and conclusion
    - Uniqueness tag: ${timestamp}-${randomSeed} (use this for inspiration but do not include in the story)
    
    Write ONLY the story text, without any introductions, explanations, or meta commentary.
  `;
};

// Enhanced function to generate more varied mock stories
const getMockStory = (theme: string, wordCount: number, prompt: string = ''): string => {
  // Create truly unique variables for each call
  const now = new Date();
  const timeHash = now.getTime();
  const randomSeed = Math.floor(Math.random() * 1000000);
  
  // Characters for different themes
  const characters: Record<string, string[]> = {
    fantasy: ['Elara the elf mage', 'Thorin the dwarf warrior', 'Zephyr the dragon whisperer', 'Lyra the forest guardian', 'Orion the celestial knight'],
    scifi: ['Commander Nova', 'Dr. Quantum', 'AI-X7', 'Starwalker Zara', 'Neuro Engineer Kai'],
    mystery: ['Detective Blackwood', 'Professor Enigma', 'Agent Shadow', 'Sleuth Harper', 'Inspector Graves'],
    romance: ['Olivia Rose', 'Ethan Rivers', 'Sofia Winters', 'James Hartley', 'Isabella Moon'],
    adventure: ['Explorer Jackson', 'Captain Amelia', 'Ranger Tristan', 'Treasure Hunter Maya', 'Wilderness Guide Leo'],
    horror: ['Dr. Nightmare', 'Ghost Hunter Violet', 'Medium Samuel', 'Paranormal Researcher Elle', 'Occultist Victor'],
    historical: ['Lady Elizabeth', 'Commander William', 'Merchant Alistair', 'Duchess Eleanor', 'Soldier Thomas']
  };
  
  // Settings for different themes
  const settings: Record<string, string[]> = {
    fantasy: ['the enchanted forest of Eldenroot', 'the floating islands of Aetheria', 'the crystal caverns beneath Mount Drakon', 'the magical academy of Luminaris', 'the borderlands between the mortal realm and the Fae kingdom'],
    scifi: ['aboard the starship Nebula', 'in the domed city of New Terra', 'on the mining colony of Asteroid X-9', 'in the virtual reality construct called Nexus', 'during the great interplanetary migration'],
    mystery: ['in the fog-shrouded town of Ravenhollow', 'at the abandoned Blackmoore Estate', 'during the annual masquerade ball', 'in the sealed room of the museum', 'aboard the overnight express train'],
    romance: ['at the cliffside lighthouse', 'during the summer festival', 'in the quaint bookshop on Maple Street', 'at the international art exhibition', 'among the cherry blossoms of Sakura Park'],
    adventure: ['in the uncharted jungles of Amazonia', 'aboard the treasure hunting vessel "Fortuna"', 'along the ancient Silk Road', 'in the shifting sands of the Crimson Desert', 'high in the peaks of the Frost Mountains'],
    horror: ['at the Blackwood Sanitarium', 'in the forgotten village of Mist Haven', 'within the walls of the ancient cathedral', 'during the longest night of the year', 'in the house where time stands still'],
    historical: ['during the height of the Renaissance', 'as the Roman Empire began to fall', 'amid the Industrial Revolution', 'on the eve of the French Revolution', 'during the Golden Age of Piracy']
  };
  
  // Plot elements for different themes
  const plots: Record<string, string[]> = {
    fantasy: ['a prophecy coming true', 'a magical artifact awakening', 'a curse that needs breaking', 'a portal to another world opening', 'an ancient being returning'],
    scifi: ['a strange signal from deep space', 'a malfunction in the ship\'s AI', 'a time anomaly appearing', 'a breakthrough in teleportation technology', 'first contact with an alien species'],
    mystery: ['a priceless artifact disappearing', 'a series of coded messages', 'a witness with conflicting testimony', 'a locked room murder', 'a decades-old cold case reopening'],
    romance: ['a chance meeting changing everything', 'a childhood promise remembered', 'a rivalry turning to affection', 'a secret admirer revealed', 'a second chance at love'],
    adventure: ['a hidden treasure map discovered', 'a rescue mission gone wrong', 'a race against rival explorers', 'a journey to fulfill a dying wish', 'a quest to find a legendary creature'],
    horror: ['strange noises in the walls', 'a town where people vanish at night', 'an antique mirror showing impossible reflections', 'an invitation to a house that shouldn\'t exist', 'a book whose words change when no one is looking'],
    historical: ['a secret treaty negotiation', 'a royal scandal threatening the crown', 'a revolutionary idea spreading', 'a meeting that changed the course of history', 'a forgotten hero\'s last stand']
  };
  
  // Select random elements based on the theme and random seeds
  const themeChars = characters[theme] || characters.fantasy;
  const themeSettings = settings[theme] || settings.fantasy;
  const themePlots = plots[theme] || plots.fantasy;
  
  const charIndex = (randomSeed % themeChars.length);
  const settingIndex = ((randomSeed * 3) % themeSettings.length);
  const plotIndex = ((randomSeed * 7) % themePlots.length);
  
  // Select or create a character name using the prompt if provided
  const character = prompt ? prompt : themeChars[charIndex];
  const setting = themeSettings[settingIndex];
  const plotElement = themePlots[plotIndex];
  
  // Construct a unique beginning, middle, and end
  const beginning = `${character} found themselves in ${setting} when ${plotElement} suddenly changed everything. The air itself seemed to hold its breath as destiny began to unfold.`;
  
  const middles = [
    `What started as curiosity quickly became a test of courage and wit. Each step forward revealed new challenges that would require all their skills to overcome.`,
    `They weren't prepared for the consequences of their discovery, but there was no turning back now. The path ahead was fraught with danger, but also with extraordinary possibility.`,
    `Nobody else seemed to notice the changes at first, giving them precious time to investigate. But soon they wouldn't be the only one seeking answers - or power.`,
    `The situation demanded action, even though the risks were unclear. With determination and a bit of luck, they gathered allies who could help navigate this unexpected journey.`,
    `Ancient legends spoke of such moments, but experiencing it firsthand was something else entirely. They would need to learn quickly if they hoped to succeed.`
  ];
  
  const endings = [
    `When the dust settled, nothing was quite the same - least of all themselves. Some questions were answered, but new mysteries emerged on the horizon.`,
    `In the end, they made a choice that would echo through time. Whether it was the right one, only the future would reveal.`,
    `The journey had changed them in ways they never expected, opening doors to possibilities they hadn't imagined before. This was not an end, but a beginning.`,
    `Sometimes the greatest victories are the ones no one else will ever know about. They smiled, keeping their secret close as they looked toward tomorrow.`,
    `What they discovered would remain with them always, a reminder that even in the darkest moments, hope and courage can light the way forward.`
  ];
  
  // Select different parts based on different aspects of the random seed
  const middleIndex = timeHash % middles.length;
  const endingIndex = (timeHash * 13) % endings.length;
  
  // Combine the parts into a complete story
  const fullStory = `${beginning}\n\n${middles[middleIndex]}\n\n${endings[endingIndex]}`;
  
  // Adjust word count
  const words = fullStory.split(' ');
  if (words.length > wordCount) {
    // Find a sentence end near target word count
    let targetIndex = wordCount;
    while (targetIndex > wordCount * 0.8 && targetIndex > 0 && !words[targetIndex - 1].endsWith('.')) {
      targetIndex--;
    }
    
    // If we couldn't find a sentence end, just cut at word count
    if (targetIndex <= wordCount * 0.75) {
      targetIndex = wordCount;
    }
    
    return words.slice(0, targetIndex).join(' ') + '.';
  }
  
  // If story is too short, it's fine as is
  return fullStory;
};
