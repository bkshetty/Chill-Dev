# Safe Route - Setup Guide

This guide will help you set up the Safe Route Community Map application from scratch.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Authentication**:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
   - Enable "Google" provider
   - Configure OAuth consent screen if needed

3. **Enable Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in production mode"
   - Select a location for your database

4. **Get Firebase Config**:
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps" section
   - Click "Add app" > Web app
   - Register your app
   - Copy the config object

5. **Update Config File**:
   - Open `src/firebase/config.ts`
   - Replace the placeholder config with your actual Firebase config

### 3. Deploy Security Rules

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init
# Select: Firestore, Hosting
# Use existing project
# Use default settings

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## Firebase Configuration Details

### Authentication Setup

1. **Email/Password Authentication**:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
   - No additional configuration needed

2. **Google Authentication**:
   - Go to Authentication > Sign-in method
   - Enable "Google"
   - Add your domain to authorized domains
   - Configure OAuth consent screen

### Firestore Security Rules

The application includes comprehensive security rules in `firestore.rules`:

- **Public Read Access**: Anyone can read safety reports
- **Verified Women Only**: Only verified women can create reports
- **User Ownership**: Users can only edit/delete their own reports
- **Data Validation**: All data is validated before storage

### Database Structure

**Users Collection** (`/users/{userId}`):
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  isVerifiedWoman: boolean;
  createdAt: Date;
}
```

**Reports Collection** (`/reports/{reportId}`):
```typescript
{
  type: 'safe' | 'unsafe';
  description: string;
  latitude: number;
  longitude: number;
  userId: string;
  userDisplayName: string;
  isVerifiedWoman: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Development Workflow

### Local Development

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Run Firebase Emulators** (optional):
   ```bash
   firebase emulators:start
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

### Testing Features

1. **Authentication**:
   - Test email/password signup
   - Test Google sign-in
   - Verify user profile creation

2. **Map Functionality**:
   - Test map loading
   - Test marker display
   - Test report creation (verified women only)

3. **Security Rules**:
   - Test report creation permissions
   - Test report editing permissions
   - Test data validation

## Deployment

### Deploy to Firebase Hosting

1. **Build the Application**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

3. **Deploy Only Hosting**:
   ```bash
   firebase deploy --only hosting
   ```

### Environment Variables

For production deployment, consider using environment variables:

1. Create `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   ```

2. Update `src/firebase/config.ts`:
   ```typescript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };
   ```

## Troubleshooting

### Common Issues

1. **Firebase Config Error**:
   - Ensure you've copied the correct config
   - Check that all required fields are present

2. **Authentication Issues**:
   - Verify Authentication is enabled in Firebase Console
   - Check that authorized domains include your domain

3. **Firestore Permission Denied**:
   - Deploy the security rules: `firebase deploy --only firestore:rules`
   - Check that rules are properly formatted

4. **Map Not Loading**:
   - Ensure Leaflet CSS is included in `index.html`
   - Check browser console for errors

5. **Build Errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run lint`

### Getting Help

- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review the [React-Leaflet Documentation](https://react-leaflet.js.org/)
- Open an issue in the GitHub repository

## Next Steps

After setup, consider:

1. **Customization**:
   - Update the default map center to your city
   - Customize the color scheme
   - Add additional report types

2. **Features**:
   - Add image uploads for reports
   - Implement report categories
   - Add user verification system

3. **Analytics**:
   - Add Firebase Analytics
   - Track user engagement
   - Monitor report quality

4. **Performance**:
   - Implement report pagination
   - Add map clustering
   - Optimize bundle size
