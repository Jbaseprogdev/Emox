# 🚀 Emolinkdn Setup Guide

## Prerequisites Installation

### 1. Install Node.js
1. Visit: https://nodejs.org/
2. Download the LTS version (20.x.x)
3. Run the installer
4. Restart your terminal

### 2. Verify Installation
```bash
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

## Project Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
cp env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. Supabase Setup
1. Go to https://supabase.com
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Run the SQL schema from README.md in your Supabase SQL editor

### 4. OpenAI Setup
1. Go to https://platform.openai.com
2. Create an account and get an API key

### 5. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000 to see your app!

## Troubleshooting

### If npm install fails:
- Make sure Node.js is properly installed
- Try clearing npm cache: `npm cache clean --force`
- Try using yarn: `npm install -g yarn && yarn install`

### If you get permission errors:
- On macOS/Linux: `sudo npm install`
- On Windows: Run terminal as administrator

### If port 3000 is in use:
- Use a different port: `npm run dev -- -p 3001`
- Or kill the process using port 3000

## Next Steps

1. **Test the app** - Create an account and explore features
2. **Customize** - Modify colors, prompts, or add features
3. **Deploy** - Use `npm run build` and deploy to Vercel
4. **Scale** - Add more features like notifications, analytics, etc.

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure Supabase database schema is properly set up
4. Check the README.md for detailed documentation 