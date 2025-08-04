# 🔥 Firebase Setup Guide for Emolinkdn

## Overview
Emolinkdn has been migrated from Supabase to Firebase for authentication and database functionality. This guide will help you set up Firebase for your project.

## 🚀 Quick Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "emolinkdn")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

### 3. Set up Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### 4. Get Your Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (</>)
4. Register your app with a nickname (e.g., "emolinkdn-web")
5. Copy the configuration object

### 5. Update Environment Variables

Update your `.env` file with your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI Configuration (for AI features)
OPENAI_API_KEY=your_openai_api_key

# Optional: For production deployment
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔒 Security Rules

### Firestore Security Rules

Update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Journal entries - users can only access their own
    match /journal_entries/{entryId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
    
    // Emotion logs - users can only access their own
    match /emotions_log/{logId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
    
    // Vibe rooms - public rooms can be read by anyone, private by creator
    match /vibe_rooms/{roomId} {
      allow read: if resource.data.is_private == false || 
        (request.auth != null && request.auth.uid == resource.data.creator_id);
      allow write: if request.auth != null && 
        request.auth.uid == resource.data.creator_id;
    }
    
    // Chat messages - participants can read/write
    match /chat_messages/{messageId} {
      allow read, write: if request.auth != null;
    }
    
    // Threshold warnings - users can only access their own
    match /threshold_warnings/{warningId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.user_id;
    }
  }
}
```

## 🧪 Demo Mode

The app includes a demo mode that works without real Firebase credentials:

- **Demo Users**: Use any email ending with `@demo.com` and password `demo123`
- **Demo Data**: The app will show sample data for testing
- **No Setup Required**: Works immediately without Firebase configuration

## 🚀 Running the App

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the app**:
   - Open [http://localhost:3000](http://localhost:3000)
   - Use demo credentials or set up Firebase for full functionality

## 📱 Features Available

### With Demo Mode:
- ✅ Authentication (demo users)
- ✅ Dashboard with sample data
- ✅ Emotion detection interface
- ✅ Journal interface
- ✅ Vibe rooms interface
- ✅ UI/UX functionality

### With Real Firebase:
- ✅ Full user authentication
- ✅ Real-time data persistence
- ✅ User profiles
- ✅ Journal entries
- ✅ Emotion tracking
- ✅ Chat functionality
- ✅ Threshold warnings

## 🔧 Troubleshooting

### Common Issues:

1. **"Firebase not initialized" error**:
   - Check that all environment variables are set correctly
   - Ensure Firebase project is created and configured

2. **Authentication not working**:
   - Verify Email/Password auth is enabled in Firebase Console
   - Check that API keys are correct

3. **Database access denied**:
   - Update Firestore security rules
   - Ensure user is authenticated

4. **Demo mode not working**:
   - Check that environment variables are set to placeholder values
   - Restart the development server

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify Firebase configuration
3. Ensure all environment variables are set
4. Try demo mode first to isolate issues

---

**🎉 Your Emolinkdn app is now ready with Firebase!** 