# AI-Axoloti-Generator

AI Axoloti Generator - Create and Customize your own amphibious friend using Google's Gemini AI!

## Features

- 🎨 Generate custom axolotl images with AI
- 🎭 Customize colors, sizes, accessories, and styles
- ✨ Edit generated images with AI-powered modifications
- 🏆 Hall of Fame gallery for your creations
- 📤 Share your axolotls on social media

## Setup

### Prerequisites

- Node.js 18+ installed
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Bigpoppablunt1/AI-Axoloti-Generator.git
cd AI-Axoloti-Generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Gemini API key to the `.env` file:
```
GEMINI_API_KEY=your_actual_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:3000 in your browser

### Production URL

The app is deployed at: **https://axolotlworld.com**

### Railway Deployment

1. Push your code to GitHub

2. Create a new project on [Railway](https://railway.app)

3. Connect your GitHub repository

4. Add the environment variable in Railway:
   - Go to your project settings
   - Click on "Variables"
   - Add: `GEMINI_API_KEY` with your API key

5. Railway will automatically deploy your app!

**Important**: Make sure the `GEMINI_API_KEY` environment variable is set in Railway, otherwise the app will show a blue screen and fail to load.

## Technology Stack

- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Google Gemini AI (Imagen & Vision models)
- Railway for deployment

## Troubleshooting

### Blue Screen Issue

If you see just a blue screen when accessing the site:

1. **Check Environment Variables**: Make sure `GEMINI_API_KEY` is set in Railway
2. **Check Browser Console**: Press F12 and look for errors in the Console tab
3. **Verify API Key**: Ensure your Gemini API key is valid and has the necessary permissions
4. **Check Railway Logs**: Look at the deployment logs in Railway for any errors

### API Errors

If image generation fails:
- Verify your Gemini API key is correct
- Check that you have sufficient API quota
- Make sure your API key has access to the Imagen model

## License

MIT
