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
- Supabase account
- OpenAI API key

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
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. Supabase Setup

#### Create a new Supabase project:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API

#### Set up the database schema:
Run the following SQL in your Supabase SQL editor:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journal entries
CREATE TABLE public.journal_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    mood_tag TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emotion logs
CREATE TABLE public.emotions_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    emotion_type TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vibe rooms
CREATE TABLE public.vibe_rooms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    creator_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    emotion_tag TEXT NOT NULL,
    is_private BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vibe room participants
CREATE TABLE public.vibe_room_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID REFERENCES public.vibe_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(room_id, user_id)
);

-- Chat messages
CREATE TABLE public.chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID REFERENCES public.vibe_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Threshold warnings
CREATE TABLE public.threshold_warnings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    emotion_type TEXT NOT NULL,
    score INTEGER NOT NULL,
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emotions_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vibe_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vibe_room_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threshold_warnings ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Journal entries policies
CREATE POLICY "Users can view own journal entries" ON public.journal_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries" ON public.journal_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries" ON public.journal_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries" ON public.journal_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Emotion logs policies
CREATE POLICY "Users can view own emotion logs" ON public.emotions_log
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own emotion logs" ON public.emotions_log
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Vibe rooms policies
CREATE POLICY "Users can view public rooms" ON public.vibe_rooms
    FOR SELECT USING (is_private = FALSE);

CREATE POLICY "Users can view private rooms they created" ON public.vibe_rooms
    FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Users can insert own rooms" ON public.vibe_rooms
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- Vibe room participants policies
CREATE POLICY "Users can view room participants" ON public.vibe_room_participants
    FOR SELECT USING (true);

CREATE POLICY "Users can join rooms" ON public.vibe_room_participants
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can view room messages" ON public.chat_messages
    FOR SELECT USING (true);

CREATE POLICY "Users can send messages" ON public.chat_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Threshold warnings policies
CREATE POLICY "Users can view own warnings" ON public.threshold_warnings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own warnings" ON public.threshold_warnings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own warnings" ON public.threshold_warnings
    FOR UPDATE USING (auth.uid() = user_id);

-- Functions and triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', 'User'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
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
│   ├── supabase.ts       # Supabase client & helpers
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