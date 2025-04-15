
import argparse
import json
from transformers import pipeline
import numpy as np

def generate_story(theme, word_count):
    """
    Generate a story using a Hugging Face model.
    
    Args:
        theme (str): The theme for the story
        word_count (int): Target word count for the story
    
    Returns:
        str: The generated story
    """
    try:
        # Load a text generation model from Hugging Face
        # For local use, this will download the model the first time it's run
        generator = pipeline('text-generation', model='gpt2')
        
        # Create a prompt based on the theme
        prompts = {
            "fantasy": "In the magical kingdom of Eldoria, where dragons soared through rainbow skies,",
            "scifi": "The colony on Mars received a mysterious signal from deep space that",
            "mystery": "Detective Sarah Morgan found a cryptic note at the crime scene that read,",
            "romance": "When Emma bumped into the stranger at the bookstore, she had no idea he would",
            "adventure": "The ancient map revealed the location of a treasure that had been lost for centuries,",
            "horror": "The old house at the end of the street had been abandoned for years, until one night",
            "historical": "In the midst of the revolution, Marie discovered a secret document that could change history:"
        }
        
        # Use the theme prompt or default to fantasy
        prompt = prompts.get(theme.lower(), prompts["fantasy"])
        
        # Generate the text - we'll generate more than needed and then trim
        # Set max_length to approximate the desired word count plus the prompt
        # On average, 1 token is about 0.75 words
        target_length = int(word_count / 0.75) + 20
        
        outputs = generator(
            prompt,
            max_length=target_length,
            num_return_sequences=1,
            temperature=0.9,
            top_p=0.9,
            no_repeat_ngram_size=2
        )
        
        # Extract the generated text
        generated_text = outputs[0]['generated_text']
        
        # Clean up the text - break into paragraphs, etc.
        paragraphs = []
        current_paragraph = []
        
        for sentence in generated_text.split('. '):
            current_paragraph.append(sentence)
            if len(current_paragraph) >= 3 or np.random.random() < 0.2:  # Random paragraph breaks
                paragraphs.append('. '.join(current_paragraph) + '.')
                current_paragraph = []
        
        if current_paragraph:
            paragraphs.append('. '.join(current_paragraph) + '.')
        
        story = '\n\n'.join(paragraphs)
        
        # Trim to approximate word count
        words = story.split()
        if len(words) > word_count:
            story = ' '.join(words[:word_count])
            # Make sure we end with a proper sentence
            if not story.endswith('.'):
                story = story + '.'
        
        return story
        
    except Exception as e:
        print(f"Error generating story: {e}")
        return f"Once upon a time, there was an error in story generation. {str(e)}"

if __name__ == "__main__":
    # Set up command-line argument parsing
    parser = argparse.ArgumentParser(description='Generate a themed story')
    parser.add_argument('--theme', type=str, default='fantasy', help='Theme of the story')
    parser.add_argument('--words', type=int, default=300, help='Target word count')
    parser.add_argument('--output', type=str, help='Output file path (optional)')
    
    args = parser.parse_args()
    
    # Generate the story
    story = generate_story(args.theme, args.words)
    
    # Output the story
    if args.output:
        with open(args.output, 'w') as f:
            f.write(story)
    else:
        result = {
            "story": story,
            "word_count": len(story.split()),
            "theme": args.theme
        }
        print(json.dumps(result))
