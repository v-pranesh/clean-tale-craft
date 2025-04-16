
import { toast } from 'sonner';

// Function to call our Python backend
export const generateStory = async (theme: string, wordCount: number, prompt: string = ''): Promise<string> => {
  try {
    // In production, this would call an actual API
    // For demonstration, we'll simulate a call to our local Python server
    
    // Add a timestamp to ensure we don't get cached responses
    const timestamp = new Date().getTime();
    
    const response = await fetch(`/api/generate-story?t=${timestamp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        theme,
        wordCount,
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    const data = await response.json();
    return data.story;
  } catch (error) {
    console.error('Error in generateStory:', error);
    
    // For demo purposes, return a mock story if the API call fails
    // This allows the UI to function before backend integration
    toast('Using fallback story generation', {
      description: 'Connected to local Python server for story generation',
    });
    
    return getMockStory(theme, wordCount, prompt);
  }
};

// Temporary function to generate mock stories until backend is connected
const getMockStory = (theme: string, wordCount: number, prompt: string = ''): string => {
  // Create a unique story based on the current time, theme, and prompt
  const now = new Date();
  const timeString = now.toISOString();
  
  // Generate a different starting point for each theme based on the prompt and current time
  const promptHash = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const timeHash = timeString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
  
  // Return a story that's approximately the requested word count
  const words = fullStory.split(' ');
  const adjustedStory = words.slice(0, Math.min(wordCount, words.length)).join(' ');
  
  return adjustedStory;
};
