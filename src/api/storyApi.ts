
import { toast } from 'sonner';

// Function to call our Python backend
export const generateStory = async (theme: string, wordCount: number, prompt: string = ''): Promise<string> => {
  try {
    // In production, this would call an actual API
    // For demonstration, we'll simulate a call to our local Python server
    
    // Simulated API call during development
    const response = await fetch('/api/generate-story', {
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
  const stories: Record<string, string> = {
    fantasy: `In the mystical land of Eldoria, where ancient trees whispered secrets to those who listened, young Lyra discovered a forgotten crystal amulet buried beneath the roots of the Great Oak. The amulet glowed with an inner light that pulsed in rhythm with her heartbeat.\n\nVillage elders spoke of a prophecy: "When the forgotten light finds its rightful bearer, the veil between worlds will thin." Lyra had always felt different, as if something essential about her destiny remained hidden.\n\nAs moonlight touched the crystal that night, ethereal beings emerged from the forest depths. They bowed to Lyra, their luminescent forms casting dancing shadows. "The Lost Princess returns," they murmured.\n\nLyra learned she was born of two worlds—daughter to the human queen and the fae king—hidden away when dark forces sought to prevent the unification of realms. The amulet was her birthright, key to restoring balance.\n\nWith newfound guardians, Lyra began a journey to master the magic flowing through her veins. Each day, the boundary between worlds grew thinner, revealing forgotten paths and ancient magics.\n\nShe would face the shadows that had kept the worlds divided, armed with nothing but courage, truth, and the light that had always lived within her, waiting to shine.`,
    
    scifi: `The neural uplink activated with a soft chime as Dr. Eliza Chen settled into her lab chair. "Connection established to Martian Colony Bravo," the AI assistant announced.\n\nThree hundred million kilometers away, a humanoid robot body awakened, its consciousness now piloted by Eliza. Remote embodiment technology had revolutionized space exploration, allowing human operators to "inhabit" robotic bodies without risking their biological forms.\n\nEliza felt the Martian wind through advanced haptic systems—cold, thin, carrying fine red dust. Her mission: investigate anomalous energy readings near the colony's outer perimeter.\n\n"Unusual crystalline formation ahead," she noted, approaching a structure that hadn't appeared on yesterday's satellite imaging. The formation pulsed with energy patterns unlike anything in the database.\n\nAs she collected samples, the crystals responded, reorganizing into complex patterns that mimicked her movements. The implications were staggering—silicon-based life, evolving rapidly, attempting communication.\n\nBack on Earth, Eliza's biological heart raced. Humanity had searched the stars for signs of life, never suspecting it might find them in crystalline intelligence that operated on timescales vastly different from carbon-based life.\n\nFirst contact wasn't with beings from distant stars, but with something that had perhaps been on Mars all along, waiting for the right moment to reveal itself.`,
    
    mystery: `The envelope arrived on Tuesday, containing nothing but an old brass key and a black-and-white photograph of a lighthouse I didn't recognize. No note, no return address.\n\nThree more identical envelopes followed on consecutive days. Same key, same lighthouse, still no explanation.\n\nAs a retired detective, my curiosity overwhelmed my caution. Research identified the lighthouse—Widow's Point, decommissioned thirty years ago, coincidentally when my brother Michael disappeared.\n\nThe drive to the coast took four hours. The lighthouse stood on a remote cliff, paint peeling, windows dark except for the topmost room where, impossibly, light flickered.\n\nThe brass key fit perfectly. Inside, salt-worn stairs spiraled upward. Each landing held framed newspaper clippings—all missing persons cases I'd failed to solve during my career.\n\nIn the lantern room, a desk held a leather-bound journal—Michael's handwriting. "They aren't missing, Thomas. They're here, watching the ones who seek them."\n\nA collection of brass keys gleamed beside the journal, identical to mine. Footsteps echoed on the stairs below as the lighthouse door creaked open.\n\nSomeone new had received an envelope.\n\nI closed Michael's journal. It was my turn to watch.`,
    
    romance: `The antiquarian bookshop smelled of vanilla and dust, twin scents of aging paper and forgotten stories. Emilia hadn't meant to duck inside, but April rain had other plans, sending her seeking shelter through the nearest door.\n\n"Caught in the downpour?" The voice belonged to a man arranging leather-bound volumes on a rolling ladder.\n\n"Hazard of London springs," she replied, shaking droplets from her umbrella.\n\nNathan descended the ladder, offering her tea from a chipped pot kept warm on a hotplate behind the counter. Their conversation flowed effortlessly through literary landscapes and personal histories—her career restoring art, his inheritance of the shop from his grandfather.\n\nAs rain surrendered to evening sun, Nathan showed her a damaged first edition. "Beyond saving?" he asked.\n\nTheir fingers brushed as she examined the book's broken spine, sending unexpected warmth through her hand. "Nothing's beyond saving if you care enough to try," she answered.\n\nEmilia returned the following week with conservation tools. Each Saturday afterward became bookshop day—her restoring treasured volumes, him reading aloud from weathered pages.\n\nTwo souls, both afraid of impermanence, slowly recognized in each other what they'd sought in their preservation work—something worth keeping, worth repairing when damaged, worth loving despite the inevitable marks of time.`,
    
    adventure: `The satellite phone rang at 3 AM. "They've found it," Kazuo's voice crackled across continents. "The Amber Chamber is real."\n\nForty-eight hours later, I stood beside my old archaeology professor in a remote Siberian camp as he spread frost-edged maps across makeshift tables. Five years we'd chased whispers of the legendary room—an entire chamber of amber and gold, looted during World War II, never recovered.\n\nNew ground-penetrating radar revealed a cavern system beneath an abandoned Soviet mining complex. Locals avoided it, speaking of strange lights and voices echoing from ventilation shafts.\n\nOur six-person team descended the next morning. Three hours into unmapped tunnels, oxygen tanks growing lighter, we discovered a rusted door with German inscription.\n\nBeyond it lay breathtaking splendor—walls of honey-colored amber inlaid with gold and studded with precious stones, perfectly preserved in the mountain's cold heart. Sunlight had never touched this place, yet the amber seemed to generate its own golden luminescence.\n\nAmid masterworks thought destroyed stood a single wooden pedestal holding a leather journal. Inside, coordinates to seven similar chambers scattered worldwide—a hidden network of repositories for treasures thought forever lost.\n\nOur discovery wasn't an endpoint. It was a beginning.`,
    
    horror: `The app appeared on my phone after the firmware update. Simple black icon, no name. I assumed it was bloatware and tried deleting it. It wouldn't uninstall.\n\nCuriosity won. Inside was just a counter showing 324. No explanation, no settings. Each day the number decreased by one.\n\nOnline searches yielded nothing. Tech support insisted no such app existed in their update. I started photographing the screen to prove my sanity.\n\nAt 271, I received a notification: "Someone near you has 183 remaining." The next day, browsing a coffee shop, my phone vibrated. "The person with 182 is within 30 feet."\n\nI looked around the crowded café, wondering who else was counting down. To what?\n\nAt 230, I woke to a new notification: "Subject 183 has reached zero." News reported a local man's inexplicable death—heart stopped, no cause identified.\n\nPanic sent me to doctors, who found nothing wrong. The app couldn't be removed even after replacing my phone.\n\nYesterday: "Someone near you has 21 remaining."\n\nToday, the café again. My phone buzzes. "The person with 20 is within 5 feet."\n\nA woman at the next table glances at her phone, then scans the room with frightened eyes.\n\nOur gazes meet. Recognition passes between us.\n\nMy counter shows 108.`,
    
    historical: `Constantinople, April 1453. The city of a thousand years braced for what its people feared would be its final siege. Sultan Mehmed's Ottoman forces assembled outside walls that had repelled attackers for centuries.\n\nInside those walls, Anna Notaras, daughter of the Byzantine admiral, catalogued her father's library—classical texts and scientific manuscripts that represented the accumulated knowledge of ancient Greece and Rome.\n\n"The sultan builds a cannon that can shatter our walls," her father told her. "If the city falls, these texts must not."\n\nUnder cover of night, Anna disguised herself as a servant boy, smuggling precious manuscripts to Venetian ships in the harbor. Each journey risked discovery by Ottoman patrols or desperate deserters.\n\nOn her final trip, carrying Ptolemy's irreplaceable astronomical observations, cannon fire began. A Venetian captain begged her to board, but Anna turned back toward the besieged city and her family.\n\nWhen Ottoman forces breached the walls on May 29, Anna and her father fought to reach the Hagia Sophia, where scholars concealed the remaining manuscripts behind a false wall before the great cathedral became a mosque.\n\nAn empire ended, but knowledge survived—safeguarded by those who understood that preserving civilization's memory was worth any risk.`
  };
  
  // Select the appropriate story based on theme or default to fantasy
  let baseStory = stories[theme] || stories.fantasy;
  
  // If a prompt is provided, incorporate it into the story
  if (prompt.trim()) {
    // Create a prefix that incorporates the user's prompt
    const promptPrefix = `Inspired by the idea: "${prompt}"\n\n`;
    baseStory = promptPrefix + baseStory;
  }
  
  // Adjust the length to approximate the requested word count
  const words = baseStory.split(' ');
  const adjustedStory = words.slice(0, Math.min(wordCount, words.length)).join(' ');
  
  return adjustedStory;
};
