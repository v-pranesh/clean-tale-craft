
# StoryMuse: AI-Powered Story Generator

## Project Overview
StoryMuse is an AI-powered web application that generates creative, engaging stories based on user-defined parameters. The application leverages modern web technologies for the frontend and state-of-the-art natural language processing models for the backend story generation.

## Technical Architecture

### Frontend
- **Framework**: React with TypeScript
- **UI Library**: Custom components using Shadcn UI
- **Styling**: Tailwind CSS for responsive, utility-first styling
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React's useState hooks for local component state
- **Routing**: React Router for page navigation
- **UI Features**:
  - Theme selection (fantasy, sci-fi, mystery, etc.)
  - Word count adjustment
  - Custom story prompt input
  - Story display with copy and download options
  - Responsive design for all device sizes

### Backend
- **Language**: Python 3.8+
- **Libraries**:
  - Transformers from Hugging Face for model access
  - NumPy for numerical operations
  - JSON for data exchange

### AI & NLP Components
- **Model Source**: Hugging Face's model hub
- **Primary Model**: GPT-2 for text generation (can be replaced with any Hugging Face compatible model)
- **NLP Techniques Used**:
  - Natural Language Generation (NLG)
  - Text continuation based on prompts
  - Temperature and top-p sampling for creative diversity
  - No-repeat n-gram size to prevent repetition
  
### Integration
- The frontend makes API calls to the Python backend
- Story generation parameters (theme, word count, prompt) are passed to the backend
- The backend processes these parameters, generates text using the AI model, formats it into paragraphs, and returns it to the frontend

## Key Features
1. **Theme-Based Generation**: Stories tailored to specific genres
2. **Custom Prompts**: User-provided ideas to guide story creation
3. **Adjustable Length**: Control over story word count
4. **Paragraph Formatting**: AI-generated content is structured into readable paragraphs
5. **Export Options**: Copy to clipboard or download as text file

## Technical Implementation Details

### NLP Processing Flow
1. The user inputs parameters (theme, word count, custom prompt)
2. The frontend sends these to the backend
3. The backend:
   - Constructs an appropriate starting prompt based on theme and user input
   - Configures the model with appropriate generation parameters
   - Uses the Hugging Face Transformers pipeline for text generation
   - Post-processes the text into paragraphs and truncates to desired length
4. The formatted story is returned to the frontend for display

### AI Model Configuration
- **Temperature**: 0.9 (controls randomness - higher values mean more creative but potentially less coherent text)
- **Top-p**: 0.9 (nucleus sampling parameter - controls diversity)
- **No-repeat ngram size**: 2 (prevents immediate repetition of word pairs)

## Deployment Options
1. **Local Development**:
   - Run React frontend with `npm run dev`
   - Python script accessible locally for development
2. **Production**:
   - Frontend can be built and deployed to any static hosting service
   - Backend can be deployed as a serverless function or API endpoint

## Running the Project Locally
1. Clone the repository
2. Install Node.js dependencies: `npm install`
3. Install Python dependencies: `pip install transformers torch numpy`
4. Start the development server: `npm run dev`
5. Access the application at `http://localhost:8080`

## Future Enhancements
- Integration with more powerful language models
- User accounts for saving favorite stories
- More customization options for story generation
- Voice narration of generated stories
- Multi-language support

This project demonstrates the practical application of modern web development techniques and natural language processing models to create an interactive, creative tool accessible through a browser interface.
