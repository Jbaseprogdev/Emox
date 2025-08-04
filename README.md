# Emolinkdn - Link Emotions. Empower People.

A smart emotional wellness app that empowers users to understand, track, and regulate their emotions through journaling, mood detection, and social connection.

## 🌟 Features

### Core Features
- **Authentication** - Complete sign up/sign in flow with Supabase
- **Emotion Detection** - Manual mood picker + camera-based facial detection
- **AI Journal** - Daily prompts, mood tagging, and AI-powered insights
- **Vibe Rooms** - Emotion-matched chat rooms for social connection
- **Threshold Warnings** - Smart alerts for high-risk emotional states
- **Dashboard** - Mood trends, streaks, and wellness insights

### Technical Features
- **Real-time Chat** - Live messaging in vibe rooms
- **AI Integration** - OpenAI-powered journal analysis and coaching
- **Responsive Design** - Mobile-first, beautiful UI with Tailwind CSS
- **Dark Mode** - Automatic theme switching
- **TypeScript** - Full type safety throughout the app

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account (optional - demo mode available)
- OpenAI API key (optional - for AI features)

### 1. Clone and Install
```bash
git clone <repository-url>
cd emolinkdn
npm install
```

### 2. Environment Setup
Copy the example environment file and fill in your credentials:
```bash
cp env.example .env.local
```

Edit `.env.local` with your actual values:
```env
# Firebase Configuration (optional - demo mode works without these)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI Configuration (optional - for AI features)
OPENAI_API_KEY=your_openai_api_key
```

### 3. Firebase Setup (Optional)

#### Demo Mode (Recommended for testing):
The app works immediately with demo data:
- Use any email ending with `@demo.com` and password `demo123`
- No Firebase setup required
- Sample data included for testing

#### Full Firebase Setup:
For production use, follow the [Firebase Setup Guide](./FIREBASE_SETUP.md):
1. Create a Firebase project
2. Enable Authentication
3. Set up Firestore Database
4. Configure security rules

### 4. Run the Development Server
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🏗️ Project Structure

```
emolinkdn/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── emotion/          # Emotion detection
│   ├── journal/          # AI journal
│   ├── vibe-rooms/       # Social features
│   └── threshold/        # Warning system
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase client & helpers
│   └── ai.ts            # AI integration
├── store/               # Zustand state management
├── types/               # TypeScript definitions
└── public/              # Static assets
```

## 🎨 Customization

### Colors and Themes
The app uses a custom Tailwind configuration with emotion-specific colors. You can modify `tailwind.config.js` to change the color scheme.

### AI Prompts
Edit the AI prompts in `lib/ai.ts` to customize the coaching responses and journal analysis.

### Database Schema
The Supabase schema is designed to be extensible. You can add new tables or modify existing ones as needed.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Adding New Features
1. Create new components in the appropriate directory
2. Add TypeScript types in `types/index.ts`
3. Update the database schema if needed
4. Add new Supabase functions in `lib/supabase.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you need help:
1. Check the documentation
2. Search existing issues
3. Create a new issue with details about your problem

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend
- [OpenAI](https://openai.com) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Next.js](https://nextjs.org) for the framework
- [Framer Motion](https://framer.com/motion) for animations

---

**Emolinkdn** - Empowering emotional wellness through technology and community. 💙 